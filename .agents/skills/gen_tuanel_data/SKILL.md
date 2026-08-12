---
name: Generate TuanEL Practice Data
description: Sub-skill to extract and format Javascript practice data arrays for TuanEL.
---

# Generate TuanEL Practice Data Skill

This skill governs the creation of JavaScript data files (e.g., `t1.js`, `t2.js`) to be consumed by `practice.html`.

## Extraction Rules
- Create one JavaScript data file per test based on exact boundaries from the original source.
- If answers are missing in the raw data, deduce them logically based on English grammar rules.

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
