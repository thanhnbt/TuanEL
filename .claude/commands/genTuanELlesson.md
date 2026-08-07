# /genTuanELlesson — Generate a new TuanEL lesson from raw input

## Overview

Create a complete lesson for the TuanEL English Daily site from raw input materials in `rawinput/DDMMYYYY/`. The lesson targets a ~9 year old Vietnamese student preparing for Grade 6 CLC entrance exams.

## Input

The user provides a `rawinput/DDMMYYYY/` folder containing source materials (OCR'd HTML, scanned PDFs, text files). Read all files in that folder to understand:
- Grammar topics covered
- Exercise/test questions (multiple choice, fill-in, writing)
- Vocabulary lists
- Reading passages

## Output Structure

### 1. Create lesson folder: `lessons/YYYY-MM-DD-short-slug/`

Naming: use the date from raw input (convert DDMMYYYY → YYYY-MM-DD) + a short English slug describing the content.

### 2. Required files (minimum)

#### `index.html` — Grammar/theory page
```
- <!DOCTYPE html><html lang="vi">
- <title>[Topic] — [DD/MM] — English Daily</title>
- <link rel="stylesheet" href="../../css/style.css">
- Full inline <style> block with:
  - Normal responsive styles
  - @media print { ... }
  - @media (monochrome) { ... }
  - body.eink, body.eink * { ... }
- Sticky .lesson-topbar > .lesson-topbar-inner:
  - .back-link → "../../index.html"
  - .sub-nav tabs (Ngữ pháp active, Quiz link, Writing link if applicable)
- .container with grammar content using:
  - .grammar-section for each topic
  - .formula boxes (.formula-label + .formula-content + .struct spans)
  - .ex-group > .ex-item for examples
  - .ch / .ch-bg for highlighted grammar changes
  - .tip for tips
  - .change-table for transformation tables
- E-ink init: if(localStorage.getItem('eink')==='true')document.body.classList.add('eink');
```

#### `quiz.html` — Interactive quiz (all-at-once format)
```
- Same topbar, quiz tab active
- Test tabs for multiple tests (if applicable)
- Grammar badge showing topics per test
- Shuffle toggle button
- ALL questions rendered at once (scroll-down exam style)
- Each question: .q-item with .q-text + .opts (4 clickable .opt buttons)
- Reading passages: .passage-block before related questions
- Sticky submit bar with "Kiểm tra" button + "Làm lại" button
- On submit:
  - Correct answers → green highlight (.correct class)
  - Wrong answers → red highlight (.wrong class) + correct one green
  - Show .hint-box (English grammar explanation) under answered questions only
  - Unanswered questions get no hint
  - Display score X/answered (đã làm N/total) in submit bar
  - Lock all options (pointer-events: none)
- Can submit without answering all questions
```

#### Quiz data files (`t1.js`, `t2.js`, etc.) — one per test
```javascript
window.TESTS=window.TESTS||[];
window.TESTS.push({
  name:"Test Name",
  badge:"📘 Topic1 · Topic2",
  questions:[
    {q:"Question with _____ blank", opts:["A","B","C","D"], ans:0, exp:"English grammar hint"},
    // For reading passages, add passage field to first question of group:
    {q:"...", opts:[...], ans:N, exp:"...", passage:"The reading passage text with _(N)_ blanks..."},
  ]
});
```

#### Optional: `writing.html`, `vocab.html`

### 3. Register in homepage

Add entry to `LESSONS` array in root `index.html`:
```javascript
{ "date": "YYYY-MM-DD", "title": "...", "path": "lessons/YYYY-MM-DD-slug/index.html", "tags": ["grammar","vocab",...] }
```

## Key Rules

1. **Explanations (exp field) must be in English** — concise grammar hints, not full sentences
2. **UI text in Vietnamese** — buttons, labels, navigation
3. **Grammar explanations for theory page in Vietnamese** — age-appropriate for 9 year old
4. **All CSS must include print + monochrome + eink variants**
5. **Quiz shows ALL questions at once** — not one-by-one. Submit reveals hints + score.
6. **After submit**: correct = green, wrong = red, unanswered = no feedback
7. **Respect CLAUDE.md chunking rule**: max 100 lines per Write/Edit call, text output between calls

## Execution Strategy

1. Read all raw input files in the specified folder
2. Identify: grammar topics, question types, passages, answer keys
3. Plan lesson structure (which pages needed, how many tests)
4. Use parallel sub-agents for large data files (quiz data)
5. Create files in chunks respecting the 100-line limit
6. Register lesson on homepage
7. Verify with `node -c` on all JS files

## Quiz Answer Determination

When raw input doesn't provide answer keys, determine correct answers based on:
- Grammar rules from the theory content
- Standard English usage
- Context clues in the questions
- Reading passage coherence

Always double-check answers are grammatically sound before writing data files.
