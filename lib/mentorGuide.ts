import { BUDGET, CUSTOMER_YEAR, JOINS_LABEL, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore, roiOf } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { KEY_L1, KEY_R2 } from "@/data/mentorKey";
import { ARCH_BY_ID, ARCH_IDS, COMP_BY_ID, KPI_BY_ID, MODEL_GREATEST, PRINCIPLES, R2_BUDGET, R2_MONTHS } from "@/data/route2";
import type { PrincipleId } from "@/data/route2";
import { KPI_AIM } from "@/data/route2Extra";
import { MODEL_TIER, PANEL, READY_BAR } from "@/data/route2Panel";
import type { Tier } from "@/data/route2Panel";
import { euro, tt } from "@/lib/lang";
import { inUseOf, monthsOf, planOf, rangeOf } from "@/lib/r2Panel";

/**
 * Mentor-only worked answers for every task question the answer keys (lib/answerKey.ts) do not already cover: the numeric fields,
 * with every step of the calculation written out with its numbers, and the free-text answers, with the model text and what a good
 * answer must contain. Shown only after the mentor bar is unlocked, never exported. Numbers are computed from the same constants as
 * the tables, the calculators and the answer checks, so they cannot drift from the model answers. Mentor tools stay English
 * (CLAUDE.md #32); the model answers quoted follow the site's language, because the fill enters them in that language.
 */
export type WorkedStep = { label: string; calc: string; result: string };
export type MentorGuide = { title: string; answer: string; example?: string; steps?: WorkedStep[]; why?: string; lookFor?: string[]; pitfalls?: string[] };

const n = (v: number) => (Math.round(v * 100) / 100).toLocaleString("en-US");
const L1 = () => KEY_L1();
const R2 = () => KEY_R2();

/* ------------------------------------------------------------------ Route 1 */

export function extraInsightGuide(): MentorGuide {
  return {
    title: "1.1 · One extra figure DataDriven should watch (Core)",
    answer: L1().extraInsight ?? "",
    example: tt(
      "Company A could watch the share of reports a customer builds with its own data in the first 60 days. It is a driver: the platform counts it by itself, it comes before renewal, and a customer who has built its own reports is built into its work, so a low figure at day 60 warns before any notice. Write yours for DataDriven: which figure, which kind it is and why it could warn early.",
      "Unternehmen A könnte den Anteil der Berichte beobachten, die ein Kunde in den ersten 60 Tagen mit eigenen Daten baut. Es ist ein Treiber: Die Plattform zählt ihn selbst, er kommt vor der Verlängerung, und ein Kunde, der eigene Berichte gebaut hat, ist in seine Arbeit eingebaut, also warnt ein niedriger Wert an Tag 60 vor jeder Kündigung. Schreiben Sie Ihre für DataDriven: welche Zahl, welche Art sie ist und warum sie früh warnen könnte.",
    ),
    why: "An extra figure of your own names something a system could count, says which kind it is (result KPI, driver or activity count) and why it could warn early. The test of Materi A1: whose behaviour is counted?",
    lookFor: ["A concrete figure a system could count (not “better data”).", "Its kind: result, driver or activity count.", "Why it could warn early, before a notice (“so …”)."],
    pitfalls: ["“Newsletters sent”: an activity count, it warns of nothing.", "“Customers lost next year”: a result, it arrives when it is too late to act."],
  };
}

export function meaningGuide(): MentorGuide {
  return {
    title: "1.2 · What the renewal figures mean (Optional)",
    answer: L1().meaning ?? "",
    lookFor: ["At least one printed figure (60%, 90%, one and a half times as often, or the 120 and 90 renewed customers).", "What to do first: watch use as an early signal and call customers whose use falls, then test it fairly.", "Said as an estimate: intensive customers may simply be keener or bigger."],
    pitfalls: ["A sentence with no figure: the app asks for one.", "“More use makes customers stay”: the two groups may differ in other ways, so it is a correlation, not a cause."],
  };
}

export function insightGuide(i: number): MentorGuide {
  const a = (L1().insights ?? [])[i];
  return {
    title: `1.3 · Insight ${i + 1} (Optional)`,
    answer: a ? `${a.basis ?? ""} · ${a.text}` : "",
    why: "Three insights, each from a different data source (CRM, usage data, feedback and interactions) and each saying what DataDriven would do about the pattern. The app checks only that each names a source, is long enough and says what follows.",
    lookFor: ["A concrete pattern in a concrete group (a fall in active days, a missed call, a low score).", "The data source it is read from (CRM, usage, feedback).", "What DataDriven would do about it (“so …”)."],
    pitfalls: ["A number on a dashboard with no action: ask what exactly someone would do.", "Two insights from the same data source."],
  };
}

export function reflectGuide(k: "interpret" | "causation" | "decider"): MentorGuide {
  const r = L1().reflect;
  return {
    title: k === "interpret" ? "1.4 · When a signal is worth watching, and when not (Optional)" : k === "causation" ? "1.4 · Correlation versus cause (Optional)" : "1.4 · The wrong signals and the unnecessary costs (Optional)",
    answer: r ? r[k] : "",
    lookFor:
      k === "interpret"
        ? ["Worth watching: it comes before the cancellation and the customer's own data shows it (a fall against its own average).", "Not worth building a measure on: it only follows a decision already made (a late invoice, a discount)."]
        : k === "causation"
          ? ["A correlation says two things move together; a cause says one changes the other.", "Intensive customers may simply be keener or bigger; only a fair test (a random half, the same weeks) shows what a measure adds."]
          : ["The wrong signals: ones that follow a decision, or activity counts that rise while nothing changes.", "Where unnecessary costs arise: a dashboard of many metrics nobody acts on, a discount that repeats every year.", "Starts with the few signals that come early and that the systems count."],
  };
}

export function misreadGuide(): MentorGuide {
  return {
    title: "2.1 · Your three signals (Optional)",
    answer: L1().misread ?? "",
    example: tt("Company A steers its retention by three signals. Reports built per month against the customer's own average, from the usage log, aim: a fall of a third triggers a call that week; the system counts it. The share of its five modules a customer uses, from the product configuration, aim: one or two modules trigger a training offer. Tickets in a row without an answer, from the ticket tool, aim: the account manager calls within two days; a person has to log it. Choose yours from DataDriven's twelve findings.", "Unternehmen A steuert seine Retention mit drei Signalen. Gebaute Berichte pro Monat im Vergleich zum eigenen Durchschnitt des Kunden, aus dem Nutzungslog, Ziel: Ein Rückgang um ein Drittel löst in dieser Woche einen Anruf aus; das System zählt es. Der Anteil seiner fünf Module, die ein Kunde nutzt, aus der Produktkonfiguration, Ziel: Ein oder zwei Module lösen ein Schulungsangebot aus. Tickets hintereinander ohne Antwort, aus dem Ticket-Tool, Ziel: Der Account Manager ruft innerhalb von zwei Tagen an; eine Person muss es festhalten. Wählen Sie Ihre aus den zwölf Befunden von DataDriven."),
    lookFor: ["At least one use-of-the-platform signal (it moved with churn most).", "At least one from contact and feedback or depth of use.", "For each: where the number comes from and a target; saying why each is a signal and not noise is a strong answer."],
    pitfalls: ["The survey score as the only signal: it arrives last, only if the customer answers, and it did not move with churn.", "A discount or an order as the signal: it follows a decision already made."],
  };
}

export function abGuide(): MentorGuide {
  const k = L1().ab;
  return {
    title: "2.3 · Hypothesis and decision rule (Optional)",
    answer: k ? `${k.hyp} · ${k.rule}` : "",
    example: tt("Company A tests a training on an unused module. Hypothesis: if the trainer shows a low-use customer an unused module on its own data, then the share who renew and are still active after 90 days rises, because the customer sees a use for the platform it had not seen. Rule, written before the start: roll out if the renewal rate is at least 8 points above the control group with 80 customers per group and requests for discounts stay under 5%; keep testing between 3 and 8 points; stop below 3. Write yours for DataDriven's test card.", "Unternehmen A testet eine Schulung zu einem ungenutzten Modul. Hypothese: Wenn der Trainer einem Kunden mit geringer Nutzung ein ungenutztes Modul an seinen eigenen Daten zeigt, dann steigt der Anteil, der verlängert und nach 90 Tagen noch aktiv ist, weil der Kunde einen Nutzen der Plattform sieht, den er nicht kannte. Regel, vor dem Start geschrieben: ausrollen, wenn die Verlängerungsquote bei 80 Kunden pro Gruppe mindestens 8 Punkte über der Kontrollgruppe liegt und die Rabattanfragen unter 5 % bleiben; weiter testen zwischen 3 und 8 Punkten; stoppen unter 3. Schreiben Sie Ihre für die Testkarte von DataDriven."),
    lookFor: ["Hypothesis: one change, the KPI expected to move, and a reason (“because …”).", "Decision rule written before the test: a threshold to roll out, a band to keep testing, a point to stop.", "A guardrail in the rule (requests for discounts, customers who ask to be taken off the list)."],
    pitfalls: ["“The call will help”: no KPI, no reason.", "A rule without numbers, or one decided after looking at the result."],
  };
}

export function scoreGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  const e = explainBucket(m.evidence);
  return {
    title: `2.4 · ${m.name}`,
    answer: `${e} × ${m.model.effect} × ${m.model.feasibility} = ${modelScore(id)}`,
    steps: [
      { label: "Price from its parts (printed on the card)", calc: m.costParts.map((c) => n(c.amount)).join(" + "), result: euro(m.cost) },
      { label: "Economic viability from who it aims at (A7)", calc: `aims at ${JOINS_LABEL[m.joins]} → only the customers whose use has fallen and a signal can be read: 3 · those customers with others mixed in: 2 · every customer whatever the signal: 1`, result: String(e) },
      { label: "Return on investment, computed by the app: (customers kept × yearly value − cost) ÷ cost", calc: `(${m.kept} × ${n(CUSTOMER_YEAR)} − ${n(m.cost)}) ÷ ${n(m.cost)}`, result: `${roiOf(id)}%` },
      { label: "Score = Economic Viability × Effect × Sustainability", calc: `${e} × ${m.model.effect} × ${m.model.feasibility}`, result: String(modelScore(id)) },
    ],
    why: `${m.model.note} Answers: ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none of the three problems"}. A different, well-reasoned effect or sustainability score is acceptable: only the score that follows a printed rule is checked.`,
    pitfalls:
      id === "chatbot"
        ? ["Economic viability 3 “because it is cheap”: cost does not decide it, who the measure aims at does; it is printed to aim at every customer: 1.", "Effect 3 “because tips help customers”: a message that watches no signal does not answer a sign of trouble: 1."]
        : id === "suite"
          ? [`Effect 3 or sustainability 3 “because it uses all our data”: it is in use only after ${m.weeks} weeks, beyond the four months (the picture shows no bar of working time), and a score nobody can explain gives an account manager nothing to say.`, `Adding it to the usage alert and the health view: ${euro(m.cost + MEASURE_BY_ID.unified.cost + MEASURE_BY_ID.predictive.cost)}, over the ${euro(BUDGET)} budget.`]
          : id === "app"
            ? ["Economic viability 2 “because it only costs when a customer renews”: it is offered to every customer with low use, including those who would have renewed anyway: 1.", "Effect 2 “because it keeps customers”: it buys the renewal without changing why use is low, and the discount repeats every year: 1. Its return on investment looks acceptable only because it counts customers who would have stayed."]
            : undefined,
  };
}

/** The reason a learner gives for a measure's two judged scores (CLAUDE.md #45). The mentor's answer is the measure's own model note. */
export function reasonGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  return {
    title: `2.4 · Why ${m.name} gets its effect and sustainability scores`,
    answer: `Effect ${m.model.effect}, sustainability ${m.model.feasibility}: ${m.model.note}`,
    example: tt("Company A's “20% discount for every customer with low use”: effect 1, because it buys the renewal without changing why use is low; sustainability 1, because it gives away margin every year and cannot be kept up. Give your own reason for each score, with a fact printed on the card.", "Der „Rabatt von 20 % für jeden Kunden mit geringer Nutzung“ von Unternehmen A: Wirkung 1, weil er die Verlängerung erkauft, ohne zu ändern, warum die Nutzung gering ist; Nachhaltigkeit 1, weil er jedes Jahr Marge verschenkt und sich nicht durchhalten lässt. Geben Sie für jeden Wert Ihren eigenen Grund an, mit einer auf der Karte gedruckten Tatsache."),
    why: "Effect and sustainability are judgements; a different score with a clear reason is as good as the model. The reason should say whether the measure deals with a signal that comes before the cancellation (effect) and whether it can be kept up after the four months with people and tools DataDriven already has (sustainability).",
    lookFor: ["Effect: which signal is addressed, and whether the customer notices it before deciding.", "Sustainability: what it takes (time, tools, people, a repeating discount) and whether it lasts after the four months.", "A fact from the card, not only “it is good”."],
  };
}

export function whyGuide(): MentorGuide {
  return {
    title: "2.4 · Why the first priority goes first (Core)",
    answer: L1().why ?? "",
    example: tt("Company A puts its usage alert first: it scores 18 and aims only at customers whose use has fallen, with a return on investment of 150%. The health view comes second and is tested on a random half. Together they cost €60,000 of €100,000. The discount for everyone with low use stays out: it aims at everyone, so it scores 1. Make the same three statements about your own measures.", "Unternehmen A setzt seinen Nutzungs-Alarm an die erste Stelle: Er erzielt 18 und zielt nur auf Kunden, deren Nutzung gefallen ist, mit einem Return on Investment von 150 %. Die Health-Ansicht kommt als Zweites und wird an einer zufälligen Hälfte getestet. Zusammen kosten sie 60.000 € von 100.000 €. Der Rabatt für alle mit geringer Nutzung bleibt draußen: Er zielt auf alle, also erzielt er 1. Machen Sie dieselben drei Aussagen über Ihre eigenen Maßnahmen."),
    steps: [
      { label: "Model plan cost", calc: MODEL_MEASURES.map((id) => n(MEASURE_BY_ID[id].cost)).join(" + "), result: euro(MODEL_COST) },
      { label: "Left of the budget", calc: `${n(BUDGET)} − ${n(MODEL_COST)}`, result: euro(BUDGET - MODEL_COST) },
    ],
    lookFor: ["The order and what decides it (the score, or the problem of the brief it answers).", `The cost against ${euro(BUDGET)}.`, "What was left out, said as a decision (the same message to everyone, a discount that repeats, over budget or too slow, or no problem answered), and the return on investment the app printed."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleTextGuide(c: PrincipleId): MentorGuide {
  return {
    title: `3.1 · ${PRINCIPLES[c].name} (Optional)`,
    answer: (R2().principleText ?? {})[c] ?? PRINCIPLES[c].means,
    lookFor: ["What changes for DataDriven's teams or customers.", "Which problem of the brief it answers (the data is not used, churn is found too late, no control over what works) or which risk (a good alert that is never acted on)."],
    pitfalls: c === "hoard" || c === "blackbox" ? ["This principle is one the key rejects; if the learner kept it, ask which of the many metrics anyone acts on, or what an account manager would say to a customer who received a score nobody can explain."] : undefined,
  };
}

export function greatestGuide(): MentorGuide {
  return {
    title: "3.3 · The KPI with the greatest leverage (Optional)",
    answer: `${COMP_BY_ID[MODEL_GREATEST].name} · ${R2().greatestWhy ?? ""}`,
    example: tt("Company A picks “the share of customers with at least eight active days” as its greatest-leverage KPI: it is linked to staying, counted every week for every customer by the systems, so every measure can be judged within weeks, and it answers the problem that churn is found too late. Name your own KPI, the tests it passes best and the problem of the brief it answers.", "Unternehmen A wählt „den Anteil der Kunden mit mindestens acht aktiven Tagen“ als KPI mit der größten Hebelwirkung: Er ist mit dem Bleiben verbunden und wird jede Woche für jeden Kunden von den Systemen gezählt, sodass sich jede Maßnahme innerhalb von Wochen beurteilen lässt, und er beantwortet das Problem, dass Churn zu spät erkannt wird. Nennen Sie Ihren eigenen KPI, die Tests, die er am besten besteht, und das Problem des Auftrags, das er beantwortet."),
    lookFor: ["One of the learner's three KPIs.", "The tests that decide it (early and linked to coming back together).", "The problem of the brief it answers (churn found too late, or no control over what works)."],
    pitfalls: ["Dashboards viewed as greatest “because it is counted weekly and complete”: it is not linked to staying."],
  };
}

const ids = (m: Record<string, Tier>, f: (t: Tier) => boolean) => ARCH_IDS.filter((id) => f(m[id] ?? "not"));

export function architectureGuide(): MentorGuide {
  const model = MODEL_TIER;
  const funded = ids(model, (t) => t !== "not");
  const mr2 = { tier: model };
  const plan = planOf(mr2, 0);
  const weak = planOf(mr2, 1);
  const r = rangeOf(mr2);
  const cost = funded.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const meas = (p: typeof plan) => funded.filter((id) => PANEL[id].measured && p.items[id].measOk && p.items[id].dataOk && !p.items[id].late && !PANEL[id].blackBox);
  const sum = (list: (keyof typeof ARCH_BY_ID)[]) => list.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const measuredIds = meas(plan);
  const measuredWeakIds = meas(weak);
  const riskWeak = funded.filter((id) => PANEL[id].blackBox || !weak.items[id].dataOk || weak.items[id].late);
  const plus = (list: string[]) => list.join(" + ");
  const sp = planOf({ tier: { ...model, suite: "now" as const } }, 0);
  const rl = planOf({ tier: { ...model, relaunch: "now" as const } }, 0);
  const pn = planOf({ tier: { ...model, routing: "now" as const } }, 0);
  return {
    title: "Step A · The system and what the panel shows for it (Core)",
    answer: `Now: ${ids(model, (t) => t === "now").map((id) => PANEL[id].short).join(", ")}. After data is ready: ${ids(model, (t) => t === "later").map((id) => PANEL[id].short).join(", ")}. Not now: ${ids(model, (t) => t === "not").map((id) => PANEL[id].short).join(", ")}.`,
    steps: [
      { label: "Funded items (every Now and After data item)", calc: plus(funded.map((id) => n(ARCH_BY_ID[id].cost))), result: euro(cost) },
      { label: "Budget left", calc: `${n(R2_BUDGET)} − ${n(cost)}`, result: euro(R2_BUDGET - cost) },
      { label: `Month in use = start + weeks ÷ 4, rounded up (Now starts in month 1; After data starts when the data clean-up is in use, month ${1 + monthsOf("chat")})`, calc: funded.map((id) => `${PANEL[id].short}: ${plan.items[id].start} + ${ARCH_BY_ID[id].weeks} ÷ 4 → ${inUseOf(mr2, id)}`).join(" · "), result: `all by month ${Math.max(...funded.map((id) => inUseOf(mr2, id)!))} of ${R2_MONTHS}` },
      { label: "Measurable, brief's data: money on measured items with data complete and in use in time ÷ funded money", calc: `(${plus(measuredIds.map((id) => n(ARCH_BY_ID[id].cost)))}) ÷ ${n(cost)} = ${n(sum(measuredIds))} ÷ ${n(cost)}`, result: `${r.meas[0]}%` },
      { label: `Measurable, data 15 points weaker (the early-warning alerts drop to ${(PANEL.personal.data ?? 0) - 15}%)`, calc: `${n(sum(measuredWeakIds))} ÷ ${n(cost)}`, result: `${r.meas[1]}%` },
      { label: "Risk: money on a black box, on data below 80% complete or in use after the months ÷ funded money", calc: `0 ÷ ${n(cost)} (brief) · ${n(sum(riskWeak))} ÷ ${n(cost)} (weaker)`, result: `${r.risk[0]}% · ${r.risk[1]}%` },
    ],
    why: `The model set holds all four tests with the brief's data (${plan.holding} of ${plan.applicable}) and opens the data test when the data is 15 points weaker (${weak.holding} of ${weak.applicable}). That open test is the reason Step B asks what the learner watches. The numbers on screen are computed from one data file, so this table equals the panel.`,
    lookFor: ["At least one item Now (the task asks for a system).", "The KPI system and the joined customer view are in place no later than any alert.", `Nothing the learner cannot explain or measure is funded without a reason, and nothing arrives after the ${R2_MONTHS} months without one.`],
    pitfalls: [
      `Adding the vendor platform: ${euro(sp.bars.spent)} funded, ${euro(sp.bars.over)} over the budget, Risk ${sp.bars.risk}% (a black box, in use only in month ${sp.items.suite.inUse}), and ${sp.holding} of ${sp.applicable} tests hold.`,
      `Adding the 20% discount for low use: ${euro(rl.bars.spent)} funded, ${euro(rl.bars.over)} over the budget; it names no customer KPI and is not connected to why use is low, so ${rl.holding} of ${rl.applicable} tests hold.`,
      `Setting the health score by value to Now beside the model set: it starts in month 1 on data ${PANEL.routing.data}% complete, below ${READY_BAR}%, so the data test opens (${pn.holding} of ${pn.applicable} hold); After data with the data clean-up Now starts it in month ${1 + monthsOf("chat")}.`,
      "Leaving the KPI system and the joined customer view out: every alert loses its link to the view and the KPIs, so the Measurable bar falls to nothing.",
    ],
  };
}

export function visionGuide(): MentorGuide {
  return {
    title: "Step A · The target vision (Core)",
    answer: R2().vision ?? "",
    example: tt(
      "Company A will see a customer's trouble weeks before the notice: one page shows use and contract, and the account manager calls the customers whose use has fallen within a week. It steers by two KPIs, and every new measure has to move one of them before it grows. Write your own target vision for DataDriven.",
      "Unternehmen A wird den Ärger eines Kunden Wochen vor der Kündigung sehen: Eine Seite zeigt Nutzung und Vertrag, und der Account Manager ruft die Kunden, deren Nutzung gefallen ist, innerhalb einer Woche an. Es steuert über zwei KPIs, und jede neue Maßnahme muss einen davon bewegen, bevor sie wächst. Schreiben Sie Ihr eigenes Zielbild für DataDriven.",
    ),
    why: "The plan asks for a target vision of a data-driven control system. It is the one place the learner says, in two sentences, what the whole system is for, before the items.",
    lookFor: ["What the system does for the company and its customers (trouble seen early, customers kept).", "Steering by a few KPIs, not by single offers.", "Two sentences, in the learner's own words."],
  };
}

export function giveUpGuide(): MentorGuide {
  return {
    title: "Step A · What the plan gives, and what the learner gives up (Core)",
    answer: R2().giveUp ?? "",
    example: tt(
      "Company A's plan gives it one joined customer view, an A/B test routine and alerts that run on data that is complete enough. It gives up a churn platform, which names no KPI, and €25,000 stay unspent. If the data is weaker, the alerts rest on data below 80%, so they are watched first. Write yours about your own plan: what it gives, what it costs or leaves open.",
      "Der Plan von Unternehmen A gibt ihm eine verbundene Kundenansicht, eine A/B-Test-Routine und Alarme, die auf ausreichend vollständigen Daten laufen. Es verzichtet auf eine Churn-Plattform, die keinen KPI nennt, und 25.000 € bleiben ungenutzt. Sind die Daten schwächer, beruhen die Alarme auf Daten unter 80 %, also werden sie zuerst beobachtet. Schreiben Sie Ihre über Ihren eigenen Plan: was er gibt, was er kostet oder offen lässt.",
    ),
    why: "Every plan gives something and costs something. Writing it first, before the system's reading is opened, is what makes the learner think about the trade-off instead of reading it off.",
    lookFor: ["One thing the plan gives (measured, complete data, in budget, in time).", `One thing it costs or leaves open (an item not now, data below 80%, an item after the ${R2_MONTHS} months, budget unspent).`, "A link to the two data scenarios if the learner saw them."],
  };
}

export function decisionWhyGuide(): MentorGuide {
  return {
    title: "Step B · Why this decision (Core)",
    answer: R2().decisionWhy ?? "",
    example: tt(
      "Company A builds in stages: the joined customer view and the test routine start first, so every alert reads one customer and every measure is tested on a random half from its first week, and the big platform waits because nobody could say what to tell a customer who got a score it cannot explain. Write your reason for your own decision.",
      "Unternehmen A baut in Stufen: Die verbundene Kundenansicht und die Testroutine starten zuerst, damit jeder Alarm einen Kunden liest und jede Maßnahme ab ihrer ersten Woche an einer zufälligen Hälfte getestet wird, und die große Plattform wartet, weil niemand sagen könnte, was man einem Kunden sagt, der einen Score bekam, den sie nicht erklären kann. Schreiben Sie Ihre Begründung für Ihre eigene Entscheidung.",
    ),
    why: "A decision part has no single right answer (CLAUDE.md #38): what counts is a clear reason, and that it fits the learner's own Step A. If the decision and Step A disagree, the panel hints and the reason should explain it.",
    lookFor: ["Names the decision and one rule from Materi B5 it rests on.", "Fits the learner's own Step A, or says why it does not.", "Says how the unclear forecast is handled (start with the data that is complete, test on a small group, measure from week one)."],
  };
}

export function watchGuide(): MentorGuide {
  const cleanMonth = inUseOf({ tier: MODEL_TIER }, "personal") ?? 0;
  const conv = KPI_BY_ID.conv;
  const eng = KPI_BY_ID.engage;
  return {
    title: "Step B · What the learner watches, and when they would stop (Core)",
    answer: R2().watch ?? "",
    example: tt(
      "Company A watches the share of low-use customers who are contacted within a week: today it is 25%, and if it has not clearly risen by month 3 on enough customers, it stops adding alerts and rewrites its call guide. It also watches the discount requests after calls: if they rise above 5%, it pauses the call that triggers them. Write yours with the figure from your own plan.",
      "Unternehmen A beobachtet den Anteil der Kunden mit geringer Nutzung, die innerhalb einer Woche kontaktiert werden: Heute liegt er bei 25 %, und ist er bis Monat 3 bei genug Kunden nicht deutlich gestiegen, hört es auf, Alarme hinzuzufügen, und schreibt seinen Gesprächsleitfaden neu. Es beobachtet auch die Rabattanfragen nach Anrufen: Steigen sie über 5 %, pausiert es den Anruf, der sie auslöst. Schreiben Sie Ihre mit der Zahl aus Ihrem eigenen Plan.",
    ),
    why: `A figure about customers (the renewal rate, or the share of low-use customers not contacted after 30 days), not the company's own output (dashboards viewed, calls made), a month in which it can first be read (the early-warning alerts are in use from month ${cleanMonth} in the model, so a figure can first be read from month ${cleanMonth}), and an action. The numbers are the ones printed in “the numbers today”: ${conv.baseline}% renewal rate today with an aim of ${KPI_AIM.conv}%; ${eng.baseline}% of low-use customers not contacted after 30 days today with an aim of ${KPI_AIM.engage}%; the data bar is ${READY_BAR}%.`,
    lookFor: ["A customer figure, with today's value.", "A month by which it can be read.", "What the learner does if it falls short (stop, pause, change one thing)."],
    pitfalls: ["Dashboards viewed or calls made as the figure: that counts what DataDriven did.", "No month: a sign nobody can act on."],
  };
}
