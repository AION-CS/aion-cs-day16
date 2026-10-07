# Retention Lab · Day 16

**Customer Retention & Buying Behaviour in B2B IT Sales · Module 8, Day 3 of 3.**
*Data-driven customer success: which figures to steer by, which patterns in the customer data move with churn, how to test a measure fairly, how to weigh measures by return on investment, and how to build a data-driven control system.*
A self-study companion: study material with live instruments, two tasks and two working documents, in **English and German**
(EN | DE in the top bar, `../CLAUDE.md` #32). It carries the shared standards `../CLAUDE.md` #1 to #47 and the two-route form of #30.
From Day 13 it follows **#48: one Core block and one Core card per level** (see the deviations).

The case company is **DataDriven Sales GmbH** (a reporting and analytics platform for the Mittelstand, about 1,400 customers, about €4,800 a year per customer, Case assumption): usage, contract and feedback data sit in three places, churn is found when the notice arrives and the measures cannot be measured.
Budget €150,000 and four months (Route 1), €180,000 and four months (Route 2, Case assumption).
Route 2 puts the learner in the Chief Customer Officer's chair: build a data-driven control system and make an investment decision despite an unclear forecast.

This repo was bootstrapped from `day15` (chrome, primitives, store pattern, tokens, language machinery, the generic diagram components in
`components/materi/diagrams.tsx`) and its content replaced. Several data identifiers keep earlier names; each file's header says what they hold now:
`CUSTOMERS` holds the eight groups of customers (`leave` = share who cancelled, `decision` = the cause is one DataDriven can act on, `known` = how much of the data is joined to the CRM),
`PILOT` the renewal figures by level of use (`control` = low use, `variant` = intensive use), `LINES` the nine figures from the reports, `LevelTag` the kind of figure (result KPI, driver, activity count),
`Basis` the three data sources (CRM, usage, feedback), `PatternId` the four families of behaviour pattern (use, depth of use, contact and feedback, what they buy and pay),
`MeasureArea` the lever (watch the signal, build depth of use, run a fair test, give a discount); in `MEASURES` the fields `exp`, `eff`, `fea` hold
Economic Viability, Effect and Sustainability and `kept` the customers kept a year (for the return on investment); the Route 2 item ids `chat` (data clean-up), `personal` (early-warning alerts), `routing` (health score by value),
`tracking` (A/B test routine), `relaunch` (20% discount for low use), `suite` (vendor churn platform), `foundation` (KPI system and joined customer view), `training` (playbooks and training).

## Routes

| Route | Content | Export |
|---|---|---|
| `/route-1/` **Levels 1 + 2** | **Materi A**: seven cards, 60 min (A1 what to steer by: result KPI, driver, activity count **Core**, A2 three data sources, A3 where an analysis pays and what data it can use, A4 what a gap in the data is worth, A5 four families of behaviour pattern, A6 correlation is not a cause: a fair A/B test and continuous optimisation, A7 choosing measures: economic viability × effect × sustainability and the return on investment **Core**). **Task 1, Data Control File**: 1.1 **Core** (sort nine figures into result KPI, driver or activity count, and name one extra figure), 1.2 to 1.4 Optional, 2.1 to 2.3 Optional, 2.4 **Core** (choose three of six measures, score, read the return on investment, reason, order). | `1-{name}-day16-l1l2-data-control-file.html` |
| `/route-2/` **Level 3** | **Materi B**: five cards, 60 min (B5 how a data-driven control system is built, and how to invest under an unclear forecast **Core**). **Task 2, Control System Memo**: the live panel, **Step A** (build the system, eight items Now / After data is ready / Not now) and **Step B** (decide despite an unclear forecast) are one Core frame; Optional “Go deeper” 3.1 to 3.4. | `2-{name}-day16-l3-control-system-memo.html` |

Minutes: Materi A 60 + Task 1 64 (Core 20), Materi B 60 + Task 2 53 (Core 19). All in `lib/routes.ts`.

## Stack

Next.js 14 · TypeScript · Tailwind (CS tokens) · Zustand + `persist` (key `cs-d16-v1`, version 1, `skipHydration`, deep merge, pure `migratePersisted`) · static export.

```bash
npm install
npm run dev
npm run typecheck
npm run verify:calc  # re-derives every figure, rule, panel bar/test/category, Core-only fill, in both languages
npm run build        # stop `npm run dev` first
```

## Mentor bar

First element on every page. `muchson123` fills every model answer of both routes (and the name if empty); answer keys and worked answers appear
after the same unlock. Convenience gate, not security; a reload locks it.

## Notes on deviations

1. **#48 (this day onward): one Core block and one Core card per level.** Route 1: Core blocks 1.1 and 2.4, Core cards A1 and A7. Route 2: Core card B5 and
   one Core frame (Step A + Step B counted as one unit in the ring). Everything else is folded, never removed, and Core never reads Optional (#40).
2. **Plan mapping (#44).** The plan's Level 1 items (what a KPI is and which kinds there are, the data sources, find the segments worth analysing, develop insights) →
   1.1 Core (sort the figures and add one of your own) and Optional 1.2–1.4 (renewal figures, three insights, coaching reflection); the case study (analyse the data, find patterns, design a fair test,
   prioritise measures with Economic Viability × Effect × Sustainability within €150,000 and four months, with a return on investment per measure, #45) → 2.4 Core with
   2.1–2.3 Optional (behaviour patterns, uncertainties, a fair test); the Level 3 transfer project (target vision, central data sources, a KPI system, an optimisation process,
   a prioritised architecture, and an investment decision under uncertainty) → Step A / Step B, with Optional 3.1 to 3.4.
3. **Return on investment (plan calculation, #44).** The plan names a return on investment per measure. It is computed by the app from two printed parts per measure (customers kept a year × €4,800, and the cost) and printed on every card, in the mentor worked answer (`lib/mentorGuide.ts`) and in the export; the learner reads it and is not asked to calculate it. Materi A7 teaches the formula with a worked example on Main Analytics (other numbers). All other figures (rates, lift, revenue at stake) are printed or computed by the app; no calculator or number method is built, so #43 does not apply.
4. **Not rebuilt in this pass:** the Word documents (#31) and videos (#33).
5. **Every figure beyond the brief is a Case assumption** (the €4,800 a year, groups, shares, rates, costs, weeks, data shares, customers kept, KPI baselines).
6. **The worked-example companies** are Main Analytics (Materi A) and Spree Software (Materi B); the task never prints its own answer.
7. **The economic criterion of Block 2.4** is read from a printed fact (“aims at”): only customers whose use has fallen and where a signal can be read scores 3, a mix scores 2, every customer scores 1.

## Dependency checklist (#40)

| Item | Status | Reads from | Core-safe |
|---|---|---|---|
| 1.1 Result KPI, driver or activity count? | **Core** | brief, own items, card A1 | ✓ |
| 1.2, 1.3, 1.4, 2.1, 2.2, 2.3 | Optional | brief, own items, cards A2–A6 | self-contained |
| 2.4 Three measures, scored and ordered | **Core** | brief, own items, card A7 | ✓ |
| Panel, Step A, Step B (one Core frame) | **Core** | printed item facts, “the numbers today”, card B5; Step B quotes Step A | ✓ |
| 3.1 to 3.4 | Optional | own items, cards B1–B4 | self-contained |
| Cards A1, A7, B5 | Core | each other and the case | ✓ |
| Cards A2–A6, B1–B4 | Optional | — | no Core block cites them |

`verify:calc` scans the Core blocks and cards for names of Optional blocks and cards and fills only the Core blocks to check the missing lists empty.

## Verified

`tsc`, `verify:calc`, production build, static export served locally from a clean `localStorage`: mentor fill, Route 1 and Route 2 render, no console errors.
