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
