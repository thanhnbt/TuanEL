---
name: Generate TuanEL Practice Page
description: Sub-skill to generate the practice.html interactive testing page for TuanEL.
---

# Generate TuanEL Practice Page Skill

This skill governs the creation of `practice.html` (formerly known as the quiz page).

## Structure Requirements
- Same sticky top navigation as the theory page, but with the "Practice" tab active. Do NOT include CSS for `.lesson-topbar`, `.sub-nav`, `.container`, or `body` in the `<style>` block. These are now handled globally in `style.css`.
- Display a grammar badge summarizing topics.
- Render **ALL questions at once** (scroll-down format).
- Include "Shuffle" toggle button and test tabs (if multiple tests).
- Sticky submit bar at the bottom with "Kiểm tra" and "Làm lại" buttons.

## Practice Engine Logic & UX
- **Validation**: Enforce that the user has answered at least 2/3 of the total questions (`Math.ceil(order.length * 2 / 3)`) before allowing submission. If they haven't, show an `alert` and `return`.
- **Scoring**: Display score in format `X/answered (đã làm N/total)`.
- **Feedback**: Apply `.correct` (green) and `.wrong` (red) classes. Reveal a `.hint-box` with English grammar explanations under answered questions *only*. Unanswered questions remain hidden.
- **UX Rules**: 
  - Do NOT use `window.scrollTo` after submitting (prevents disorienting jumps). 
  - Do NOT set `onclick=null` on the submit button. Use `if(phase!=='answer')return;` to guard against double clicks so the button continues to work after switching test tabs.
