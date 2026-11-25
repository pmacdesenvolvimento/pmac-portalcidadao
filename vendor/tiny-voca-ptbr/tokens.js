// Port of tiny_voca.text.tokenize for the dizione-ptbr front end: (is_punctuation, value) pieces -> model tokens.
// The model was trained on exactly this sequence (word gaps become <sp> only after a phone, repeated marks collapse),
// which is not what dizione.phonemize() returns, so the demo must use this and not Dizione.phonemize.
export function makeTokenizer({ SYMBOLS, PHONES, VOWEL_PHONES }) {
  const ID = new Map(SYMBOLS.map((s, i) => [s, i]));
  const PHONE_SET = new Set(PHONES);
  const [BOS, EOS, SP, UNK] = ["<bos>", "<eos>", "<sp>", "<unk>"];
  return function tokenize(pieces) {
    const symbols = [BOS], stress = [0];
    for (const [punctuation, value] of pieces) {
      if (punctuation) {
        if (symbols[symbols.length - 1] !== value) { symbols.push(value); stress.push(0); }   // "!!" -> "!"
        continue;
      }
      for (const word of value) {
        const last = symbols[symbols.length - 1];
        if (PHONE_SET.has(last) || last === UNK) { symbols.push(SP); stress.push(0); }
        for (const [phone, level] of word) {
          symbols.push(PHONE_SET.has(phone) ? phone : UNK);
          stress.push(level);
        }
      }
    }
    symbols.push(EOS); stress.push(0);
    if (!symbols.some((s) => PHONE_SET.has(s) || s === UNK)) return null;      // nothing to pronounce
    const text = symbols.map((s, i) => (stress[i] ? "ˈ" : "") + s).join(" ");
    return { symbols, ids: symbols.map((s) => ID.get(s)), stress, text };
  };
}
