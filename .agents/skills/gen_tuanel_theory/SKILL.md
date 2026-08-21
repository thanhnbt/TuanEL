---
name: Generate TuanEL Theory Page
description: Sub-skill to generate the index.html grammar theory page for TuanEL.
---

# Generate TuanEL Theory Page Skill

This skill governs the creation of `index.html`.

## Content & Tone
- **Cross-Reference Consistency**: ALWAYS analyze previously generated lessons (e.g., `2026-07-30-viet-lai-cau`) for theory presentation style. Ensure all grammar explanations include three parts: 🌟 "Khi nào dùng" (context), ✏️ "Viết văn" (application), and 💬 "Ví dụ giao tiếp" to maintain high pedagogical quality. Do not invent dry formats.
- **Language**: Vietnamese, tailored for 9-year-olds preparing for Grade 6 entrance exams.
- **Conversational Tone**: Use kid-friendly analogies (e.g., "Hành động đóng cửa" cho quá khứ đơn, "Phép thuật ảo tưởng" cho If loại 2). Avoid dry definitions.
- **Bilingual Terminology**: Use bilingual terms for ALL grammar concepts to help students learn academic vocabulary, formatted as `<span class='en-term'>English Term</span> <span class='vi-hint'>(Vietnamese)</span>`. Examples: `Plural Countable Noun (danh từ đếm được số nhiều)`, `Affirmative sentences (câu khẳng định)`. Always use dual-language format for terms like Countable/Uncountable Nouns, Singular/Plural Nouns, Verbs, Adjectives, Adverbs, Subjects, and Objects.
- **Keyword Highlighting**: Wrap grammar keywords in `<span class='ch'>`. This includes quantifiers (MANY, MUCH, ALL), indefinite pronouns (SOME-, ANY-), and comparative keywords (more, -er).

## UI Components & Formatting
- **Sticky Topbar**: Use `.lesson-topbar > .lesson-topbar-inner` with `.back-link` and `.sub-nav`. The tabs should be "Ngữ pháp" [active], "Quiz", and "Practice". Do NOT include CSS for `.lesson-topbar`, `.sub-nav`, `.container`, or `body` in the `<style>` block. These are now handled globally in `style.css`.
- **Formulas**: `.formula-content` MUST strictly contain ONLY grammar formulas (e.g., `S + V-ed / V2`). Explanations go outside in a `<div class="tip">`.
- **Pedagogical Tips**: The `<div class="tip">` explaining the grammar MUST contain these 3 sections separated by `<br>`:
  - 🌟 **Khi nào dùng:** Context of when to use it in real life.
  - ✏️ **Viết văn:** How to apply it in writing tests/essays.
  - 💬 **VD:** A conversational English example.
- **Transformations**: Use `.formula-line`, `.formula-arrow`, and `.result`.
- **Examples**: ALWAYS use `.ex-group` containing `.ex-item` with `.ex-label`, `.orig`, `.arrow-line`, `.rewrite`, and `.vi` classes.
- **Tables**: Use `.change-table` for conversions (Pronouns, etc.).

## Base Structure
- Ensure `<!DOCTYPE html><html lang="vi">`
- Include full inline `<style>` covering standard styling, `@media print`, `@media (monochrome)`.
- Append e-ink script: `if(localStorage.getItem('eink')==='true') document.body.classList.add('eink');`

## Workflow Automation Script
Instead of manually generating HTML for raw docx theory files (which is token-heavy and prone to formatting errors), **ALWAYS prioritize using the automation script** located at `scripts/format_grammar_theory.py`.
- **Usage:** `python format_grammar_theory.py <input_docx_extracted.txt> <output_html_file>`
- The script automatically parses headers, injects CSS, maps dual-language terminology with priority matching (avoiding substring overlap), and highlights keywords.
- Only manually generate the theory `index.html` if the input is too unstructured for the script or if doing minor targeted edits.
