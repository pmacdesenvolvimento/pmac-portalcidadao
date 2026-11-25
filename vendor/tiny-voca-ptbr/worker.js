// Runs the local phonemizer and ONNX model off the main thread.
// Messages in: {type: "load"} and {type: "speak", id, text, voice, speed}.
// Messages out: status, ready, done (with the whole clip), and error.
// Adapted from the tiny-voca demo by Muhammed Nazeem (Apache-2.0): Pyodide and the Python phonemizer are gone.
// Modified for Portal Cidadão: local inference and letter-by-letter tax acronym pronunciation.

import * as ortModule from "../onnxruntime-web/ort.wasm.min.js";
import { Dizione } from "./dizione/engine.js";
import * as symbols from "./dizione/symbols.js";
import { makeTokenizer } from "./tokens.js";

const ort = ortModule.default || ortModule;
const ORT = new URL("../onnxruntime-web/", import.meta.url).href;
let dizione, tokenize, session, config, provider = "wasm";
const status = (text, progress) => postMessage({ type: "status", text, progress });

async function download(url, label) {
  return fetchBytes(new URL(url, import.meta.url), label);
}

async function fetchBytes(url, label) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  const total = Number(response.headers.get("content-length")) || 0;
  if (!response.body || !total) return new Uint8Array(await response.arrayBuffer());
  const reader = response.body.getReader();
  const chunks = [];
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    status(label, received / total);
  }
  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return bytes;
}

async function loadPhonemizer() {
  status("Carregando o fonemizador");
  const [lexicon, table] = await Promise.all([
    download("./dizione/data/lexicon.tsv?v=pronunciation-fix-2", "Carregando o dicionário").then((b) => new TextDecoder().decode(b)),
    download("./dizione/data/open_table.json", "Carregando o dicionário").then((b) => JSON.parse(new TextDecoder().decode(b))),
  ]);
  dizione = new Dizione(lexicon, table);
  tokenize = makeTokenizer(symbols);
}

async function loadModel(wanted) {
  config = await (await fetch(new URL("./model.json", import.meta.url))).json();
  const bytes = await download("./model.onnx", "Carregando o modelo");
  status("Iniciando o modelo");
  ort.env.wasm.wasmPaths = ORT;
  ort.env.wasm.numThreads = 1;
  const order = wanted === "wasm" ? ["wasm"] : navigator.gpu ? ["webgpu", "wasm"] : ["wasm"];
  let lastError = null;
  for (const name of order) {
    try {
      session = await ort.InferenceSession.create(bytes, { executionProviders: [name] });
      // A first run makes the shaders and checks that this browser really runs the whole graph.
      provider = name;
      await synthesize(tokenize(dizione.pieces("Olá.")), 0, 1);
      return;
    } catch (error) { lastError = error; session = null; }
  }
  throw lastError;
}

const ABBREVIATIONS = /(?:(?<![A-Za-zÀ-ÖØ-öø-ÿ0-9_])(?:dr|dra|prof|profa|sr|sra|srta|av|tel|obs|etc|ex|nº|vs)|(?<![A-Za-zÀ-ÖØ-öø-ÿ0-9_])[A-ZÀ-ÖØ-Ý])\.$/i;

// Sentences, without breaking after titles, initials or inside numbers.
// tiny_voca.infer.sentences in the Python package splits the same way; keep the two alike.
function sentences(text) {
  const parts = [];
  let current = "";
  for (const piece of text.replace(/\s+/g, " ").trim().split(/(?<=[.!?…]["')\]]?)\s+(?=["'(\[]?[A-Z0-9À-ÖØ-Ý])/)) {
    current = current ? current + " " + piece : piece;
    if (!ABBREVIATIONS.test(current)) { parts.push(current); current = ""; }
  }
  if (current) parts.push(current);
  return parts.filter((part) => /[\p{L}\p{N}]/u.test(part));
}

// A full stop is added when the text ends without a mark: before a final mark the voice lengthens the last
// syllable and lets the sound fall, without one the audio breaks off. tiny_voca.infer.finished does the same.
function finished(text) {
  const body = text.replace(/\s+$/, "");
  if (!body) return text;
  const last = body.split(/\s+/).pop();
  const marked = /[\p{L}\p{N}]/u.test(last) ? /[.!?…,;:]["'”’)\]»]*$/.test(last) : /[.!?…]/.test(last) || /^[,;:]$/.test(last);
  return marked ? text : body + ".";
}

// One utterance holds at most max_tokens phonemes; longer sentences are cut at commas, then by words.
// A sentence with nothing to pronounce gives no utterance.
function fit(sentence) {
  const result = tokenize(dizione.pieces(sentence));
  if (!result) return [];
  if (result.ids.length <= config.max_tokens - 12) return [result];
  const pieces = sentence.split(/(?<=[,;:—])\s+/);
  if (pieces.length > 1) return pieces.flatMap(fit);
  const words = sentence.split(" ");
  if (words.length < 2) return [];
  const half = Math.ceil(words.length / 2);
  return [...fit(words.slice(0, half).join(" ")), ...fit(words.slice(half).join(" "))];
}

async function synthesize(phones, voice, speed) {
  const count = phones.ids.length;
  const integers = (values) => new ort.Tensor("int64", BigInt64Array.from(values.map(BigInt)), [1, count]);
  const scalar = (value) => new ort.Tensor("float32", Float32Array.from([value]), [1]);
  const output = await session.run({
    tokens: integers(phones.ids), stress: integers(phones.stress),
    voice: new ort.Tensor("int64", BigInt64Array.from([BigInt(voice)]), [1]),
    speed: scalar(speed), pitch_shift: scalar(0), pitch_range: scalar(1),
  });
  const audio = output.audio.getData
    ? await output.audio.getData()
    : output.audio.data;
  return audio instanceof Float32Array ? audio : Float32Array.from(audio);
}

// The model sometimes peaks above 1.0, which would clip in the 16-bit file. Scale the whole clip down then.
const PEAK = 0.99;
function limitPeak(samples) {
  let loudest = 0;
  for (let i = 0; i < samples.length; i++) loudest = Math.max(loudest, Math.abs(samples[i]));
  if (loudest > PEAK) for (let i = 0; i < samples.length; i++) samples[i] *= PEAK / loudest;
}

// Shown when no sentence of a text could be read. tiny_voca.infer.speak_text says the same.
const PORTUGUESE_ONLY = "O tiny-voca-ptbr só lê português do Brasil (pt-BR) por enquanto.";

function spellTaxAcronyms(text) {
  return text
    .replace(/\bIPTU\b/gi, "i pê tê u")
    .replace(/\bITBI\b/gi, "i tê bê i");
}

async function speak({ id, text, voice, speed }) {
  const started = performance.now();
  const list = sentences(finished(spellTaxAcronyms(text)));
  const chunks = [];
  let phonemeTime = 0;
  let modelTime = 0;
  for (let index = 0; index < list.length; index++) {
    let mark = performance.now();
    const utterances = fit(list[index]);
    phonemeTime += performance.now() - mark;
    for (const phones of utterances) {
      mark = performance.now();
      const audio = await synthesize(phones, voice, speed);
      modelTime += performance.now() - mark;
      chunks.push(audio);
    }
  }
  if (!chunks.length) {
    postMessage({ type: "error", id, message: PORTUGUESE_ONLY, plain: true });
    return;
  }
  const length = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const audio = new Float32Array(length);
  let offset = 0;
  for (const chunk of chunks) { audio.set(chunk, offset); offset += chunk.length; }
  limitPeak(audio);
  postMessage({ type: "done", id, audio, sampleRate: config.sample_rate, phonemeTime, modelTime, provider,
                totalTime: performance.now() - started }, [audio.buffer]);
}

self.onmessage = async ({ data }) => {
  try {
    if (data.type === "load") {
      await loadPhonemizer();
      await loadModel(data.provider);
      postMessage({ type: "ready", voices: config.voices, sampleRate: config.sample_rate, provider });
    } else if (data.type === "speak") {
      await speak(data);
    }
  } catch (error) {
    postMessage({ type: "error", id: data.id, message: String(error && error.message || error) });
  }
};
