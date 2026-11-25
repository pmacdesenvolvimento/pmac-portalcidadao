// Text normalization for Brazilian Portuguese. Line-by-line port of normalize.py: the output must be identical.
// Python's \b is Unicode-aware, JavaScript's is ASCII-only, so the word boundaries are spelled out with lookarounds.
const BS = "(?<![\\p{L}\\p{N}_])"; // \b before a word character
const BE = "(?![\\p{L}\\p{N}_])"; // \b after a word character
const UNITS = ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze",
    "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
const TENS = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
const HUNDREDS = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos",
    "oitocentos", "novecentos"];
const FEM = { um: "uma", dois: "duas" };
const FEMININE_NOUNS = "horas?|semanas?|vez|vezes|pessoas?|casas?|coisas?|mulheres|mulher|meninas?|cadeiras?|páginas?|partes?|crianças?|famílias?|aulas?";
const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro",
    "novembro", "dezembro"];
const ORD_M = new Map([[1, "primeiro"], [2, "segundo"], [3, "terceiro"], [4, "quarto"], [5, "quinto"],
    [6, "sexto"], [7, "sétimo"], [8, "oitavo"], [9, "nono"], [10, "décimo"], [20, "vigésimo"], [30, "trigésimo"],
    [40, "quadragésimo"], [50, "quinquagésimo"], [60, "sexagésimo"], [70, "septuagésimo"], [80, "octogésimo"],
    [90, "nonagésimo"], [100, "centésimo"]]);
const ABBREVIATIONS = {
    dr: "doutor", dra: "doutora", sr: "senhor", sra: "senhora", srta: "senhorita", prof: "professor",
    profa: "professora", av: "avenida", tel: "telefone", etc: "etcétera", obs: "observação",
    vc: "você", vcs: "vocês", pq: "porque", tb: "também", tbm: "também", blz: "beleza", msg: "mensagem",
    obg: "obrigado", td: "tudo", hj: "hoje", q: "que", "ñ": "não",
};
function fem(words, isFem) {
    if (!isFem)
        return words;
    const out = [];
    for (let w of words.split(/\s+/).filter(Boolean)) {
        w = Object.hasOwn(FEM, w) ? FEM[w] : w;
        if (w.endsWith("entos") && w !== "cento")
            w = w.slice(0, -2) + "as";
        out.push(w);
    }
    return out.join(" ");
}
function below1000(n) {
    if (n < 20)
        return UNITS[n];
    if (n < 100) {
        const t = Math.floor(n / 10), u = n % 10;
        return TENS[t] + (u ? ` e ${UNITS[u]}` : "");
    }
    if (n === 100)
        return "cem";
    const h = Math.floor(n / 100), r = n % 100;
    return HUNDREDS[h] + (r ? ` e ${below1000(r)}` : "");
}
/** Cardinal in words, 0 .. 999 999 999 999 (larger numbers are read digit by digit). `isFem` gives uma/duas/duzentas… */
export function numberToWords(value, isFem = false) {
    const big = BigInt(value);
    if (big < 0n)
        return "menos " + numberToWords(-big, isFem);
    if (big === 0n)
        return "zero";
    if (big >= 10n ** 12n)
        return [...big.toString()].map((d) => numberToWords(Number(d))).join(" ");
    const n = Number(big);
    const scales = [[1e9, "bilhão", "bilhões"], [1e6, "milhão", "milhões"], [1e3, "mil", "mil"]];
    const parts = [];
    let rest = n;
    for (const [v, sing, plur] of scales) {
        const g = Math.floor(rest / v);
        rest = rest % v;
        if (g) {
            if (v === 1e3)
                parts.push([g === 1 ? "mil" : fem(below1000(g), isFem) + " mil", g]);
            else
                parts.push([`${below1000(g)} ${g === 1 ? sing : plur}`, g]);
        }
    }
    if (rest)
        parts.push([fem(below1000(rest), isFem), rest]);
    let out = parts[0][0];
    for (let i = 1; i < parts.length; i++) {
        const [txt, g] = parts[i];
        const last = i === parts.length - 1;
        out += (last && (g < 100 || g % 100 === 0) ? " e " : " ") + txt;
    }
    return out;
}
const digitsToInt = (s) => BigInt(s.replaceAll(".", ""));
function decimal(frac) {
    if (frac.startsWith("0") || frac.length > 3)
        return [...frac].map((d) => numberToWords(Number(d))).join(" ");
    return numberToWords(Number(frac));
}
function money(_m, g1, g2) {
    const whole = digitsToInt(g1);
    const cents = Number((g2 || "0").padEnd(2, "0").slice(0, 2));
    const out = [];
    if (whole)
        out.push(`${numberToWords(whole)} ${whole === 1n ? "real" : "reais"}`);
    if (cents)
        out.push(`${numberToWords(cents)} ${cents === 1 ? "centavo" : "centavos"}`);
    return out.join(" e ") || "zero reais";
}
function percent(_m, g1, g2) {
    const n = numberToWords(digitsToInt(g1));
    return `${n}${g2 ? " vírgula " + decimal(g2) : ""} por cento`;
}
function hours(h) {
    return `${numberToWords(h, true)} ${h === 1 ? "hora" : "horas"}`;
}
function time(m, g1, g2) {
    const h = Number(g1), mi = Number(g2 || 0);
    if (h > 24 || mi > 59)
        return m;
    let out = hours(h);
    if (mi)
        out += ` e ${numberToWords(mi)} ${mi === 1 ? "minuto" : "minutos"}`;
    return out;
}
function date(m, g1, g2, g3) {
    const d = Number(g1), mo = Number(g2);
    if (!(d >= 1 && d <= 31 && mo >= 1 && mo <= 12))
        return m;
    const day = d === 1 ? "primeiro" : numberToWords(d);
    let out = `${day} de ${MONTHS[mo - 1]}`;
    if (g3) {
        let y = Number(g3);
        y = y < 100 ? y + 2000 : y;
        out += ` de ${numberToWords(y)}`;
    }
    return out;
}
function ordinal(m, g1, g2) {
    const n = Number(g1), isFem = g2 === "ª" || g2 === "a";
    let w;
    if (ORD_M.has(n))
        w = ORD_M.get(n);
    else if (n > 10 && n < 100 && n % 10 && ORD_M.has(Math.floor(n / 10) * 10))
        w = ORD_M.get(Math.floor(n / 10) * 10) + " " + ORD_M.get(n % 10);
    else
        return m;
    return isFem ? w.split(/\s+/).filter(Boolean).map((x) => (x.endsWith("o") ? x.slice(0, -1) + "a" : x)).join(" ") : w;
}
function abbr(m, g1) {
    const rep = Object.hasOwn(ABBREVIATIONS, g1.toLowerCase()) ? ABBREVIATIONS[g1.toLowerCase()] : undefined;
    if (rep === undefined)
        return m;
    const first = g1[0];
    return first !== first.toLowerCase() && g1.length > 1 ? rep[0].toUpperCase() + rep.slice(1) : rep;
}
const RE_MONEY = /R\$\s*(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d{1,2}))?/gu;
const RE_PERCENT = /(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d+))?\s*%/gu;
const RE_DATE = new RegExp(`${BS}(\\d{1,2})/(\\d{1,2})(?:/(\\d{4}|\\d{2}))?${BE}`, "gu");
const RE_TIME = new RegExp(`${BS}(\\d{1,2})(?:h|:)(\\d{2})?(?!\\d)`, "gu");
const RE_ORDINAL = new RegExp(`${BS}(\\d+)\\s?([ºª])`, "gu");
const RE_DECIMAL = /(\d{1,3}(?:\.\d{3})+|\d+),(\d+)/gu;
const RE_FEM = new RegExp(`${BS}(\\d{1,3}(?:\\.\\d{3})*|\\d+)(\\s+)(${FEMININE_NOUNS})${BE}`, "gu");
const RE_NUMBER = /\d{1,3}(?:\.\d{3})+|\d+/gu;
const RE_ABBR = new RegExp(`${BS}([A-Za-zñ]{1,5})${BE}\\.?`, "gu");
export function normalize(text) {
    let t = text;
    t = t.replace(RE_MONEY, money);
    t = t.replace(RE_PERCENT, percent);
    t = t.replace(RE_DATE, date);
    t = t.replace(RE_TIME, time);
    t = t.replace(RE_ORDINAL, ordinal);
    t = t.replace(RE_DECIMAL, (_m, a, b) => `${numberToWords(digitsToInt(a))} vírgula ${decimal(b)}`);
    // feminine nouns: "21 horas" -> "vinte e uma horas"
    t = t.replace(RE_FEM, (_m, a, sp, noun) => numberToWords(digitsToInt(a), true) + sp + noun);
    t = t.replace(RE_NUMBER, (m) => numberToWords(digitsToInt(m)));
    // abbreviations, with or without the final dot ("Dr." and "Dr" -> doutor)
    t = t.replace(RE_ABBR, abbr);
    return t.replace(/[ \t]+/g, " ").trim();
}
