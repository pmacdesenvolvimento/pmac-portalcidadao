# Lexicon license

`lexicon.tsv` is derived from the **Portuguese (Brazil) MFA dictionary v2.0.0a**
by Michael McAuliffe and Morgan Sonderegger (Montreal Forced Aligner), released under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Source: https://github.com/MontrealCorpusTools/mfa-models (release `dictionary-portuguese_brazil_mfa-v2.0.0a`)

Changes made by SemFence (Gustavo Toledo):
- one pronunciation per word: the variant with the highest probability;
- `c` -> `k` and `ɟ` -> `ɡ`; `ʎ` -> `l` and `ɲ` -> `n` in words without "lh"/"nh" (the dictionary palatalizes them before "i"; the voices we target do not);
- the lexical stress mark `ˈ` was added with the rules in `g2p.py` (the dictionary has no stress).
- 119 entries were replaced (84) or added (35) with the pronunciation the rules give for a respelling written as the word is
  said in Brazilian Portuguese, so that English words and names are read the Brazilian way (for example `download`,
  `megabytes`, `Mac`, `Goiânia`, `Goiás`). The respellings are listed in `data/loanwords.tsv` of the source repository and
  applied by `scripts/add_loanwords.py`. They are our own work, not part of the MFA dictionary.

```bibtex
@techreport{mfa_portuguese_brazil_mfa_dictionary_2022,
  author = {McAuliffe, Michael and Sonderegger, Morgan},
  title  = {Portuguese (Brazil) MFA dictionary v2.0.0a},
  year   = {2022},
  month  = {May}
}
```

The code of this package is Apache-2.0 (see `LICENSE` at the root). The lexicon keeps CC BY 4.0.
`open_table.json` (open/close vowel decisions) was estimated from the same dictionary.

Additional pronunciation changes in the Portal Cidadão copy:
- `serviços` now includes the final /s/ absent from its original entry.
- `todos` uses a lengthened final /s/ so the plural is clearer with the bundled voice.
- `raquel` uses the open /ɛ/ vowel requested for the assistant's name.
