---
name: Generate TuanEL Lesson
description: Master skill to orchestrate the creation of a TuanEL lesson by calling specialized sub-skills.
---

# Generate TuanEL Lesson Master Skill

When the user asks to generate a new lesson from a `rawinput` folder for the TuanEL project, you MUST act as an orchestrator and delegate tasks by reading and executing the following sub-skills in exactly this order.

## 1. Preparation
- **Analyze Data**: Read all files in `rawinput/DDMMYYYY/`. Identify grammar topics, vocabulary, and test boundaries. Do not mix questions from different tests.
- **Setup Folder**: Create `lessons/YYYY-MM-DD-slug/`.

## 2. Execute Sub-skills
To execute these sub-skills, use the `view_file` tool to read their `SKILL.md` instructions, then perform the work they describe:
1. **Theory Page**: Read and follow `gen_tuanel_theory/SKILL.md` to create `index.html`.
2. **Practice Data**: Read and follow `gen_tuanel_data/SKILL.md` to create `t1.js`, `t2.js`, etc.
3. **Practice Page**: Read and follow `gen_tuanel_practice/SKILL.md` to create `practice.html`.
4. **Theory Quiz**: Read and follow `gen_tuanel_quiz/SKILL.md` to create a short theory-review `quiz.html`.

## 3. Finalization
- **Register Lesson**: Update `index.html` in the root directory by appending the new lesson to the `LESSONS` array.
