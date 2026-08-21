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

## Phonetics & Stress Special Rules
- **Theory Inclusion**: If the topic involves Phonetics/Stress, you MUST inject the relevant Theory cards (from the theory page) at the very top of `practice.html` (inside `.container` but before `.test-tabs`). Assign specific IDs to these cards (e.g., `id="theory-stress"`, `id="theory-vowels"`) so the anchor links in the data hints can smooth scroll to them.
- **Audio Setup**: You MUST inject `<script src="../../js/config.js"></script>` to load `window.MW_API_KEY`.
- **Speak Function**: You MUST inject the `speak(word)` function into the `<script>` block. This function must fetch audio from `https://www.dictionaryapi.com/api/v3/references/sd3/json/${word}?key=${window.MW_API_KEY}` and parse the first object's `hwi.prs[0].sound.audio` field to construct the mp3 URL (`https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdir}/${audio}.mp3`). It must fallback to `window.speechSynthesis` if the API fails or no audio is found. Add `.loading` state to the clicked word's DOM element while fetching.
