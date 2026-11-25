// Symbol table of the front end. APPEND-ONLY: must stay identical to symbols.py (the model embeds ids, not strings).
export const PAD = "<pad>", BOS = "<bos>", EOS = "<eos>", SP = "<sp>", UNK = "<unk>";
export const SPECIALS = [PAD, BOS, EOS, SP, UNK];
export const PUNCTUATION = [",", ".", "?", "!", ";", ":", '"', "'", "(", ")", "—", "…"];
export const PHONES = [
    // consonants
    "p", "b", "t", "d", "k", "ɡ", "f", "v", "s", "z", "ʃ", "ʒ", "x", "m", "n", "ɲ", "l", "ʎ", "ɾ", "tʃ", "dʒ",
    // glides
    "j", "w", "j̃", "w̃",
    // oral vowels
    "a", "ɐ", "e", "ɛ", "i", "o", "ɔ", "u",
    // nasal vowels
    "ɐ̃", "ẽ", "ĩ", "õ", "ũ",
];
export const SYMBOLS = [...SPECIALS, ...PUNCTUATION, ...PHONES];
export const ID = new Map(SYMBOLS.map((s, i) => [s, i]));
if (ID.size !== SYMBOLS.length)
    throw new Error("duplicated symbol");
export const VOWEL_PHONES = new Set("a ɐ e ɛ i o ɔ u ɐ̃ ẽ ĩ õ ũ".split(" "));
