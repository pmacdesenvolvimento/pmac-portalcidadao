const VOWELS = "aeiouáàâãéêíóôõúü";
const ACCENT = new Set("áàâéêíóôú");
const STRONG = new Set("aeoáàâãéêóôõ");
const NASAL_OF = { a: "ɐ̃", e: "ẽ", i: "ĩ", o: "õ", u: "ũ" };
const STOPS = new Set("pbdɡtk");
const NOT_AFTER_STOP = new Set(["l", "ɾ", "w", "j", ..."aeiouɐɛɔ", "ɐ̃", "ẽ", "ĩ", "õ", "ũ", "w̃", "j̃"]);
const has = (set, c) => set.includes(c);
// ───────────────────────────── 1. letters -> units ─────────────────────────────
function splitRun(run) {
    const out = [];
    let cur = run[0];
    for (let i = 1; i < run.length; i++) {
        const c = run[i];
        const p = cur[cur.length - 1];
        const hiatus = (STRONG.has(p) && STRONG.has(c) && !(has("ãõ", p) && has("oe", c))) || has("íú", c) || has("íú", p);
        if (hiatus) {
            out.push(cur);
            cur = c;
        }
        else
            cur += c;
    }
    out.push(cur);
    return out;
}
function unitsOf(w) {
    const n = w.length;
    let i = 0;
    const out = [];
    while (i < n) {
        const c = w[i];
        if (c === "ü") {
            out.push({ kind: "C", g: "uw", start: i });
            i += 1;
            continue;
        }
        if (has(VOWELS, c)) {
            let j = i;
            while (j < n && has(VOWELS, w[j]) && w[j] !== "ü")
                j++;
            let pos = i;
            for (const piece of splitRun(w.slice(i, j))) {
                out.push({ kind: "V", g: piece, start: pos });
                pos += piece.length;
            }
            i = j;
            continue;
        }
        const two = w.slice(i, i + 2);
        if (["ch", "lh", "nh", "rr", "ss", "sç", "xc"].includes(two)) {
            out.push({ kind: "C", g: two, start: i });
            i += 2;
            continue;
        }
        if (two === "sc" && i + 2 < n && has("eéêií", w[i + 2])) {
            out.push({ kind: "C", g: "sc", start: i });
            i += 2;
            continue;
        }
        if (has("qg", c) && i + 1 < n && w[i + 1] === "u" && i + 2 < n) {
            const nxt = w[i + 2];
            if (has("eéêií", nxt)) {
                out.push({ kind: "C", g: c + "_", start: i });
                i += 2;
                continue;
            } // que, qui, gue, gui
            if (has("aáâãoóôõ", nxt)) {
                out.push({ kind: "C", g: c, start: i });
                out.push({ kind: "C", g: "uw", start: i + 1 });
                i += 2;
                continue;
            }
        }
        out.push({ kind: "C", g: c, start: i });
        i += 1;
    }
    return out;
}
// ───────────────────────────── 2. stress ─────────────────────────────
function stressNucleus(nuclei, word) {
    if (nuclei.length === 1)
        return 0;
    for (let k = 0; k < nuclei.length; k++)
        if ([...nuclei[k]].some((c) => ACCENT.has(c)))
            return k;
    if (["ia", "io", "ie", "ua", "ue", "uo"].includes(nuclei[nuclei.length - 1]) && /(ia|io|ie|ua|ue|uo)(s|m)?$/.test(word)
        && ![...word].some((c) => has("ãõ", c)))
        return nuclei.length - 1;
    for (let k = 0; k < nuclei.length; k++)
        if ([...nuclei[k]].some((c) => has("ãõ", c)))
            return k;
    if (/(a|e|o|as|es|os|am|em|ens)$/.test(word))
        return nuclei.length - 2;
    return nuclei.length - 1;
}
function stressedLetter(nu) {
    const cs = [...nu];
    for (let k = 0; k < cs.length; k++)
        if (ACCENT.has(cs[k]) || has("ãõ", cs[k]))
            return k;
    return 0;
}
function openOrClose(table, vowel, word, after) {
    const tail = word.slice(after);
    for (const L of [3, 2, 1, 0]) {
        const key = `${vowel}|${tail.slice(0, L)}`;
        if (Object.hasOwn(table, key))
            return table[key];
    }
    return "close";
}
// ───────────────────────────── 3. units -> phones ─────────────────────────────
export function phonemizeWord(table, word) {
    return phonemizeDebug(table, word).map(([p, s]) => [p, s]);
}
export function phonemizeDebug(table, word) {
    const w = word.toLowerCase().trim().normalize("NFC");
    if (w.includes("-")) {
        const out = [];
        for (const part of w.split("-").filter(Boolean))
            out.push(...phonemizeDebug(table, part));
        return out;
    }
    const units = unitsOf(w);
    const vidx = [];
    units.forEach((u, k) => { if (u.kind === "V")
        vidx.push(k); });
    if (vidx.length === 0)
        return Array.from(w).map((c, i) => [c, 0, i, c]);
    const nuclei = vidx.map((k) => units[k].g);
    const st = stressNucleus(nuclei, w);
    const stressedUnit = vidx[st];
    const lastV = vidx[vidx.length - 1];
    const nUnits = units.length;
    const ph = []; // [phone, stress, unit_index]
    const put = (p, s = 0, k = -1) => { ph.push([p, s, k]); };
    let k = 0;
    while (k < nUnits) {
        const u = units[k];
        // ───────── vowels
        if (u.kind === "V") {
            const letters = u.g;
            const isStressed = k === stressedUnit;
            const tail = units.slice(k + 1);
            const wordFinal = k === lastV && tail.every((t) => t.kind === "C" && t.g === "s");
            const pre = vidx.indexOf(k) < st;
            if (["ão", "ãe", "õe", "ãi"].includes(letters)) {
                const first = letters === "õe" ? "õ" : "ɐ̃";
                put(first, isStressed ? 1 : 0, k);
                put(letters === "ão" ? "w̃" : "j̃", 0, k);
                k += 1;
                continue;
            }
            let nasal = false;
            const nasalNh = tail.length > 0 && tail[0].kind === "C" && tail[0].g === "nh";
            const beforeNasalV = tail.length > 0 && tail[0].kind === "C" && (tail[0].g === "m" || tail[0].g === "n")
                && k + 2 < nUnits && units[k + 2].kind === "V";
            if (tail.length > 0 && tail[0].kind === "C" && (tail[0].g === "m" || tail[0].g === "n")) {
                const after = k + 2 < nUnits ? units[k + 2] : null;
                nasal = after === null || after.kind === "C";
            }
            nasal = nasal || nasalNh;
            const initialEs = k === 0 && tail.length > 0 && tail[0].kind === "C" && (tail[0].g === "s" || tail[0].g === "x")
                && k + 2 < nUnits && units[k + 2].kind === "C";
            const sl = stressedLetter(letters);
            const lets = [...letters];
            for (let ci = 0; ci < lets.length; ci++) {
                const c = lets[ci];
                const lastLetter = ci === lets.length - 1;
                if (ci > 0 && has("iu", c)) {
                    put(c === "i" ? "j" : "w", 0, k);
                    continue;
                } // off-glide
                if (ci === 0 && c === "i" && lets.length === 2 && has("aeo", lets[1]) && !isStressed && !pre) {
                    put("j", 0, k);
                    continue;
                }
                const s = isStressed && ci === sl ? 1 : 0;
                const base = c.normalize("NFD")[0];
                const fin = wordFinal && lastLetter;
                let p;
                if (c === "ã")
                    p = "ɐ̃";
                else if (c === "õ")
                    p = "õ";
                else if (base === "a")
                    p = ((fin && !s) || (s && beforeNasalV && lastLetter)) ? "ɐ" : "a";
                else if (base === "e") {
                    if (c === "é")
                        p = "ɛ";
                    else if (c === "ê")
                        p = "e";
                    else if (s)
                        p = openOrClose(table, "e", w, u.start + ci + 1) === "open" ? "ɛ" : "e";
                    else if (fin || initialEs)
                        p = "i";
                    else
                        p = "e";
                }
                else if (base === "o") {
                    if (c === "ó")
                        p = "ɔ";
                    else if (c === "ô")
                        p = "o";
                    else if (s)
                        p = openOrClose(table, "o", w, u.start + ci + 1) === "open" ? "ɔ" : "o";
                    else if (fin)
                        p = "u";
                    else
                        p = "o";
                }
                else
                    p = base;
                if (nasal && lastLetter && Object.hasOwn(NASAL_OF, base) && !has("ãõ", c))
                    p = NASAL_OF[base];
                put(p, s, k);
            }
            if (nasalNh) {
                put("j̃", 0, k);
                k += 2;
                continue;
            }
            if (nasal) {
                const tailAfter = units.slice(k + 2).map((t) => t.g).join("");
                if (letters.endsWith("e") && (tailAfter === "" || tailAfter === "s"))
                    put("j̃", 0, k);
                else if (letters.endsWith("a") && tailAfter === "" && !isStressed)
                    put("w̃", 0, k);
                k += 2;
                continue;
            }
            k += 1;
            continue;
        }
        // ───────── consonants
        const prevU = k ? units[k - 1] : null;
        const nextU = k + 1 < nUnits ? units[k + 1] : null;
        const prevV = prevU !== null && prevU.kind === "V";
        const nextV = nextU !== null && nextU.kind === "V";
        const nl = nextU ? nextU.g.slice(0, 1) : "";
        const c = u.g;
        if (c === "uw")
            put("w", 0, k);
        else if (c === "h") { /* silent */ }
        else if (c === "ch")
            put("ʃ", 0, k);
        else if (c === "lh")
            put("ʎ", 0, k);
        else if (c === "nh")
            put("ɲ", 0, k);
        else if (c === "rr")
            put("x", 0, k);
        else if (["ss", "sç", "ç", "sc", "xc"].includes(c))
            put("s", 0, k);
        else if (c === "q" || c === "q_")
            put("k", 0, k);
        else if (c === "g_")
            put("ɡ", 0, k);
        else if (c === "c")
            put(nextV && has("eéêií", nl) ? "s" : "k", 0, k);
        else if (c === "g")
            put(nextV && has("eéêií", nl) ? "ʒ" : "ɡ", 0, k);
        else if (c === "j")
            put("ʒ", 0, k);
        else if (c === "l")
            put(nextV ? "l" : "w", 0, k);
        else if (c === "r") {
            if (prevU === null || (prevU.kind === "C" && ["n", "l", "s"].includes(prevU.g)))
                put("x", 0, k);
            else if (nextV && prevU !== null)
                put("ɾ", 0, k);
            else
                put("x", 0, k);
        }
        else if (c === "s") {
            if (prevV && nextV)
                put("z", 0, k);
            else if (nextU && nextU.kind === "C" && has("bdgvzjlmnr", nl) && nextU.g !== "nh" && nextU.g !== "lh")
                put("z", 0, k);
            else
                put("s", 0, k);
        }
        else if (c === "z")
            put(nextU === null ? "s" : "z", 0, k);
        else if (c === "x") {
            if (prevU === null)
                put("ʃ", 0, k);
            else if (prevU.kind === "V" && prevU.g === "e") { // ex-
                if (!nextV)
                    put("s", 0, k);
                else if (k === 1 || w.startsWith("inex") || w.startsWith("hex"))
                    put("z", 0, k); // exame, inexistente
                else {
                    put("k", 0, k);
                    put("s", 0, k);
                } // sexo, anexo, reflexo
            }
            else
                put("ʃ", 0, k);
        }
        else if (c === "y")
            put("i", 0, k);
        else
            put(c, 0, k); // b d f k m n p t v w
        k += 1;
    }
    // ───────── epenthetic [i] between a stop and a non-liquid consonant (ad-vo-ga-do -> a dʒ i v o ɡ a d u)
    const out = [];
    for (let idx = 0; idx < ph.length; idx++) {
        const [p, s, kk] = ph[idx];
        out.push([p, s, kk]);
        const nxt = idx + 1 < ph.length ? ph[idx + 1] : null;
        if (nxt && STOPS.has(p) && nxt[2] !== kk && !NOT_AFTER_STOP.has(nxt[0]) && units[nxt[2]].g !== "x")
            out.push(["i", 0, kk]);
    }
    // ───────── palatalization: t, d before [i]
    const res = [];
    for (let idx = 0; idx < out.length; idx++) {
        let [p] = out[idx];
        const [, s, kk] = out[idx];
        const nxt = idx + 1 < out.length ? out[idx + 1][0] : "";
        if (p === "t" && (nxt === "i" || nxt === "ĩ"))
            p = "tʃ";
        else if (p === "d" && (nxt === "i" || nxt === "ĩ"))
            p = "dʒ";
        res.push([p, s, kk >= 0 ? units[kk].start : -1, kk >= 0 ? units[kk].g : ""]);
    }
    return res;
}
