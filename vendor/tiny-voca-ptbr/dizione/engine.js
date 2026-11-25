// Text -> phoneme ids: normalization, lexicon (MFA, CC BY 4.0), rule fallback, punctuation and pauses.
// Port of engine.py. Pure TypeScript with no dependencies; works in Node and in the browser.
import { phonemizeWord } from "./g2p.js";
import { normalize } from "./normalize.js";
import { BOS, EOS, ID, PHONES, PUNCTUATION, SP, SYMBOLS, UNK } from "./symbols.js";
export const VERSION = 1; // must match engine.py VERSION: bumped whenever the phonemes for the same text change
const FUNCTION_WORDS = new Set("o a os as um uma uns umas e de da do das dos em no na nos nas ao aos à às por pelo pela pelos pelas com sem para pra pro que se me te lhe lhes vos mas ou já".split(" "));
const LETTER_NAMES = {
    a: "a", b: "bê", c: "cê", d: "dê", e: "é", f: "éfi", g: "gê", h: "agá", i: "i", j: "jota",
    k: "cá", l: "éli", m: "ême", n: "êni", o: "ó", p: "pê", q: "quê", r: "érri", s: "ésse",
    t: "tê", u: "u", v: "vê", w: "dáblio", x: "xis", y: "ípsilon", z: "zê"
};
const PUNCT_MAP = [["“", '"'], ["”", '"'], ["‘", "'"], ["’", "'"], ["–", "—"], ["-", "—"], ["[", "("], ["]", ")"],
    ["…", "…"], ["«", '"'], ["»", '"']];
const PUNCT = new Set(PUNCTUATION);
const WORD_CHARS = "a-záàâãéêíóôõúüç";
const TOKEN = new RegExp(`[${WORD_CHARS}]+(?:-[${WORD_CHARS}]+)*|[,.;:?!…—"'()]|\\s+|\\S`, "giu");
const STARTS_WORD = new RegExp(`^[${WORD_CHARS}]`, "iu");
export class Phonemes {
    symbols = [];
    stress = [];
    get ids() { return this.symbols.map((s) => ID.get(s) ?? ID.get(UNK)); }
    add(s, stress = 0) { this.symbols.push(ID.has(s) ? s : UNK); this.stress.push(stress); }
    get length() { return this.symbols.length; }
    toString() { return this.symbols.map((s, i) => (this.stress[i] ? "ˈ" : "") + s).join(" "); }
}
// Siglas em maiúsculas (2 a 5 letras) são soletradas: GPU, CPU, USB. As de SPELLED são soletradas mesmo sendo
// também uma palavra do léxico (IA, TI); as de AS_WORD são lidas como palavra (PIX, ONU, NASA).
const SPELLED = new Set("ia ti tv pc rg ui ux ai ue eua".split(" "));
const AS_WORD = new Set(("onu otan nasa fifa unesco unicef pix enem sus cep detran ibama inmetro sebrae senai sesc sesi usp unicamp " +
    "embrapa anatel anvisa aneel inpe opep ok").split(" "));
const CAPS_RUNS = /[A-Z]{2,}(?![a-z])|[A-Z]?[a-z]+|[A-Z]/g;
export class Dizione {
    lexicon = new Map();
    openTable;
    /** @param lexiconTsv contents of data/lexicon.tsv  @param openTable parsed data/open_table.json */
    constructor(lexiconTsv, openTable) {
        this.openTable = openTable;
        for (const line of lexiconTsv.split("\n")) {
            if (!line)
                continue;
            const tab = line.indexOf("\t");
            const w = tab < 0 ? line : line.slice(0, tab);
            const p = tab < 0 ? "" : line.slice(tab + 1);
            this.lexicon.set(w, p.split(/\s+/).filter(Boolean).map((t) => [t.replace(/^ˈ+/, ""), t.startsWith("ˈ") ? 1 : 0]));
        }
    }
    /** Loads the two data files from URLs (browser or Node 18+). */
    static async fromUrls(lexiconUrl, openTableUrl) {
        const [lex, table] = await Promise.all([fetch(lexiconUrl).then((r) => r.text()), fetch(openTableUrl).then((r) => r.json())]);
        return new Dizione(lex, table);
    }
    spell(w, useLexicon) {
        const out = [];
        for (const c of w)
            out.push(...this.pronounce(Object.hasOwn(LETTER_NAMES, c) ? LETTER_NAMES[c] : c, useLexicon));
        // only the last letter name is stressed (GPU = jê-pê-ˈu): stressing each one makes the acronym slow and staccato
        let last = -1;
        out.forEach(([, st], i) => { if (st)
            last = i; });
        return out.map(([p], i) => [p, i === last ? 1 : 0]);
    }
    pronounce(word, useLexicon = true) {
        word = word.normalize("NFC");
        const w = word.toLowerCase();
        const inLexicon = useLexicon && this.lexicon.has(w);
        if (/^[A-Z]{2,5}$/.test(word) && !AS_WORD.has(w) && (SPELLED.has(w) || !inLexicon))
            return this.spell(w, useLexicon);
        if (/^[A-Z]{2,5}s$/.test(word) && !AS_WORD.has(w.slice(0, -1)))
            return [...this.spell(w.slice(0, -1), useLexicon), ["s", 0]]; // GPUs, APIs
        if (!inLexicon && /^[A-Za-z]+$/.test(word) && /[A-Z]{2}/.test(word) && /[a-z]/.test(word)) {
            const out = []; // WebGPU -> Web + GPU
            for (const part of word.match(CAPS_RUNS) ?? [])
                out.push(...this.pronounce(part, useLexicon));
            return out;
        }
        const hit = useLexicon ? this.lexicon.get(w) : undefined;
        if (hit)
            return FUNCTION_WORDS.has(w) ? hit.map(([p]) => [p, 0]) : hit;
        if (!/[aeiouáàâãéêíóôõú]/.test(w) && Array.from(w).length > 1 && /^\p{L}+$/u.test(w))
            return this.spell(w, useLexicon);
        if (w.includes("-")) {
            const out = [];
            for (const part of w.split("-").filter(Boolean))
                out.push(...this.pronounce(part, useLexicon));
            return out;
        }
        const ph = phonemizeWord(this.openTable, w);
        return FUNCTION_WORDS.has(w) ? ph.map(([p]) => [p, 0]) : ph;
    }
    /** The interface tiny-voca's front end expects: (isPunctuation, value) items. */
    pieces(text, useLexicon = true) {
        const out = [];
        let words = [];
        for (const m of clean(text).matchAll(TOKEN)) {
            const tok = m[0];
            if (/^\s+$/u.test(tok))
                continue;
            if (STARTS_WORD.test(tok))
                words.push(this.pronounce(tok, useLexicon));
            else if (PUNCT.has(tok)) {
                if (words.length) {
                    out.push([false, words]);
                    words = [];
                }
                out.push([true, tok]);
            }
        }
        if (words.length)
            out.push([false, words]);
        return out;
    }
    /** Whole text to symbols. Words are separated by <sp>; punctuation is kept as its own symbol. */
    phonemize(text, useLexicon = true, doNormalize = true) {
        const t = clean(text, doNormalize);
        const out = new Phonemes();
        out.add(BOS);
        let pendingSpace = false;
        for (const m of t.matchAll(TOKEN)) {
            const tok = m[0];
            if (/^\s+$/u.test(tok)) {
                pendingSpace = out.length > 1;
                continue;
            }
            if (STARTS_WORD.test(tok)) {
                if (pendingSpace)
                    out.add(SP);
                pendingSpace = false;
                for (const [ph, st] of this.pronounce(tok, useLexicon))
                    out.add(ph, st);
            }
            else if (PUNCT.has(tok)) {
                out.add(tok);
                if (tok === "(" || tok === '"' || tok === "'")
                    pendingSpace = false;
            }
            // anything else (symbols, leftover digits, emoji) is skipped
        }
        out.add(EOS);
        return out;
    }
}
function clean(text, doNormalize = true) {
    let t = doNormalize ? normalize(text) : text;
    for (const [a, b] of PUNCT_MAP)
        t = t.replaceAll(a, b);
    return t;
}
export { PHONES, SYMBOLS };
