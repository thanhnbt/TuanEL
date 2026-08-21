---
name: Generate TuanEL Practice Data
description: Sub-skill to extract and format Javascript practice data arrays for TuanEL.
---

# Generate TuanEL Practice Data Skill

This skill governs the creation of JavaScript data files (e.g., `t1.js`, `t2.js`) to be consumed by `practice.html`.

## Extraction Rules
- Create one JavaScript data file per test based on exact boundaries from the original source.
- If answers are missing in the raw data, deduce them logically based on English grammar rules.

## Phonetics & Stress Special Rules
- If the test involves **Phonetics (Ngữ Âm)** or **Stress (Trọng Âm)**, the `exp` data MUST NOT be a plain string. It must be highly detailed HTML containing IPA, "Sound It Out" phonetic spelling, part of speech, syllable count, and a `speak()` audio icon for every single option.
- You MUST read `.agents/rules/tuanel_phonetics_stress.md` for the exact HTML structure and anchor link implementation before generating JS data for phonetics.

## Explanations, Keyword Highlighting & Theory Links
- **Theory Link:** For grammar practices, ALWAYS inject a `<div class='hint-rule'>` anchor link to the theory page (`index.html`) at the very beginning of the `exp` string. It MUST include `target='_blank'` to prevent losing test state, and the link text MUST state the specific grammar topic being tested (e.g. "Sự hòa hợp Chủ ngữ - Động từ", "So sánh", "Đại từ"):
  - `<div class='hint-rule' style='margin-bottom: 8px;'><a href='index.html' target='_blank' style='color: var(--teal); font-weight: 700; font-size: 0.9rem; text-decoration: none; padding: 4px 8px; background: #f0fdfa; border-radius: 6px; display: inline-block; border: 1px solid #ccfbf1;'>📚 Xem lại Lý thuyết: [Tên Chủ Đề Ngữ Pháp] &uarr;</a></div>`
- **Bilingual Terminology**: Just like in Theory generation, use bilingual terms for ALL grammar concepts to help students learn academic vocabulary. Format them with italicized Vietnamese translations: `English Term <i>(Vietnamese)</i>`.
- **Keyword Highlighting**: Wrap grammar keywords (e.g., `simple past form`, `singular verb`, `plural subject`, `superlative`) in `<span class='ch'>` to make them stand out in red.
  - Example of fully formatted explanation:
    `Rule: 'The series of TV programs' is a <span class='ch'>singular collective subject</span> <i>(chủ ngữ tập hợp số ít)</i> -> requires a <span class='ch'>singular verb</span> <i>(động từ số ít)</i>.`

## Data Schema
```javascript
window.TESTS = window.TESTS || [];
window.TESTS.push({
  name: "Test Name",
  badge: "📘 Topic 1 · Topic 2", 
  questions: [
    {
      q: "Question text with _____ blank", 
      opts: ["A", "B", "C", "D"], 
      ans: 0, 
      exp: "Signal: 'last weekend' (past) -> Third Conditional" // MUST be in English and explicitly point out "Signal words".
    },
    // For reading passages, add 'passage' to the FIRST question of the group:
    {
      q: "...", opts: [...], ans: N, exp: "...", 
      passage: "The reading passage text with _(N)_ blanks..."
    }
  ]
});
```
