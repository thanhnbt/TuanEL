# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
## ⛔ OVERRIDE RULE — Output Size Limit (APPLIES TO ALL SKILLS, NO EXCEPTION)

> **THIS RULE OVERRIDES ANY CONFLICTING INSTRUCTION FROM ANY SKILL OR WORKFLOW.**
> **If a skill says "write file", "generate table", or "export" without mentioning chunking, THIS RULE STILL APPLIES.**
> **NO skill, command, or workflow may bypass this rule. Violation = connection timeout = ALL output lost.**

### Hard Limits — NEVER violate:

1. **EVERY Write/Edit call**: max **100 lines** of content
2. **Wide tables (≥10 columns, e.g. 14-column template)**: max **10 rows** per Write/Append call
3. **Between each Write/Append**: MUST output at least 1 line of text before calling the next tool

### How to write large files (mandatory pattern):

STEP 1: Write(file, header + rows 1-10)
        → output text: "✓ Rows 1-10 done."
STEP 2: Edit/Append(file, rows 11-20)
        → output text: "✓ Rows 11-20 done."
STEP 3: Edit/Append(file, rows 21-30)
        → output text: "✓ Rows 21-30 done."
... continue until all rows are written ...

### ❌ FORBIDDEN — Anti-Patterns (will cause timeout, ALL output lost):

| ❌ FORBIDDEN                                       | ✅ Correct replacement                               |
| -------------------------------------------------- | --------------------------------------------------- |
| Write a file with > 100 lines in one call          | Split into multiple Write/Append calls (≤100 lines) |
| Write a 14-col table with > 10 rows in one call   | Split: Write header+10 rows, append next 10 rows... |
| Generate entire template mapping then write once   | Generate in batches of 10 rows, write immediately   |
| No text output between consecutive Write calls     | MUST output "✓ Done batch N. Continuing..." each time |
| Write > 50 TCs into 1 file in a single Write call | Split into 5-8 Write/Append calls                   |

### Technical reason:

Corporate proxy idle timeout = 300s. When Write/Edit tool_use content is large → Bedrock internal
processing exceeds 300s without streaming any data back to client → proxy kills connection →
ALL output is lost, must redo from scratch. Small chunks = each call completes in < 60s = proxy stays alive.

## Project Overview

TuanEL ("English Daily") is a static HTML website for recording English learning content targeting a ~9 year old Vietnamese student preparing for competitive Grade 6 entrance exams (lớp 6 CLC). Deployed on GitHub Pages.

## Architecture

- **No build system** — pure static HTML/CSS/JS, no bundler, no framework
- **Homepage** (`index.html`): contains an inline `LESSONS` array that registers all lessons; `js/app.js` renders the list with search/filter
- **Lessons** (`lessons/YYYY-MM-DD-slug/`): each lesson is a self-contained multi-page unit (index.html, writing.html, quiz.html, optionally vocab.html). Each file embeds its own `<style>` block with full CSS including print, monochrome, and e-ink (`body.eink`) support
- **Raw input** (`rawinput/DDMMYYYY/`): source materials (scanned PDFs, OCR'd HTML) used to create lessons
- **Template** (`template/lesson-template.html`): starter template, but actual lessons diverge significantly from it with custom inline styles and richer interactivity
- **Audio**: Merriam-Webster Dictionary API (key in `js/config.js`) with `speechSynthesis` fallback

## Creating a New Lesson

1. Create folder: `lessons/YYYY-MM-DD-short-slug/`
2. Create HTML files (index.html + quiz.html minimum), each with:
   - Sticky `.lesson-topbar` with back-link to `../../index.html` and `.sub-nav` tabs
   - Inline `<style>` with full print/monochrome/eink support (copy from most recent lesson)
   - E-ink toggle reads from `localStorage.getItem('eink')`
3. Register in homepage `index.html` by adding to the `LESSONS` array:
   ```javascript
   { "date": "YYYY-MM-DD", "title": "...", "path": "lessons/YYYY-MM-DD-slug/index.html", "tags": ["grammar","vocab",...] }
   ```

## Key Patterns in Lesson Pages

- **Grammar lessons**: Use `.formula` boxes (with `.formula-label`, `.formula-content`, `.struct` spans), `.ex-group` > `.ex-item` for examples, `.ch` / `.ch-bg` for highlighted changes, `.tip` for tips, `.change-table` for transformation tables
- **Quiz pages**: JavaScript quiz engine with question data arrays, progress bar, score screen, shuffle mode. Quiz types include: fill-in-the-blank with text input, multiple-choice buttons, two-step identify-then-write
- **Writing pages**: Exercise cards with text inputs, answer checking via `norm()` string comparison with `/` for alternatives
- **Answer matching**: `norm(s)` lowercases, trims, collapses spaces, strips trailing period. Alternatives separated by `/` in answer strings generate all combinations

## Serving Locally

Open `index.html` directly in a browser (file:// protocol works) or use any static server:
```
npx serve .
# or
python -m http.server 8000
```

## Content Language

- UI text and grammar explanations are in Vietnamese
- Target student is Vietnamese; explanations use Vietnamese analogies appropriate for a 9-year-old
- Grammar content sources are English intermediate-level tests
