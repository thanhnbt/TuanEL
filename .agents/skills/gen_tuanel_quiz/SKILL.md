---
name: Generate TuanEL Quiz Page
description: Sub-skill to generate the short theory quiz.html page for TuanEL.
---

# Generate TuanEL Theory Quiz Skill

This skill governs the creation of `quiz.html`.

## Definition
The "Quiz" is a short, focused test (around 5-10 questions) designed specifically to review the grammar theory presented in `index.html`. It should test the analogies and core formulas taught.

## Logic
- Synthesize the quiz questions directly from the grammar topics covered in `index.html`. 
- Topbar navigation has "Quiz" active. Do NOT include CSS for `.lesson-topbar`, `.sub-nav`, `.container`, or `body` in the `<style>` block. These are now handled globally in `style.css`.
- Uses a simplified submission engine without the complex tabs of the Practice page.
