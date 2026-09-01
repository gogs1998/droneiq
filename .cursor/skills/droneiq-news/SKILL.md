---
name: droneiq-news
description: Write or edit DroneIQ News tab copy. Use when adding, rewriting, or fact-checking /news articles.
---

# DroneIQ news desk

Read and follow these skills first, in this order:

1. `.cursor/skills/source-verification/SKILL.md`
2. `.cursor/skills/fact-check-workflow/SKILL.md`
3. `.cursor/skills/newsroom-style/SKILL.md`
4. `.cursor/skills/ai-writing-detox/SKILL.md`

They are vendored from [jamditis/claude-skills-journalism](https://github.com/jamditis/claude-skills-journalism) (`journalism-core`, MIT). License: `.cursor/skills/JOURNALISM-CORE-LICENSE`.

## House overrides

- Readers are UK. Spell **metres**, **organisation** where the CAA does. Keep **en-GB**.
- AP still governs numbers, dates in body copy (`Sept. 1, 2026`; `9 a.m.`), attribution (`said`), inverted pyramid, sentence-case headlines, ledes under 35 words.
- No Oxford comma unless the sentence is ambiguous without it.
- Primary sources only for facts: CAA, legislation.gov.uk, DJI media centre / store / ViewPoints. Trade blogs are leads, not copy.
- Do not invent flight tests, prices, or menu steps. Do not document illegal bypasses.
- Third person in articles. Masthead/desk note may use “DroneIQ.”
- After each piece, update `data/news-checks.ts` (claim, rating, source URL, accessed date).
