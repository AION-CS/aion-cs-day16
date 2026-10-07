import { LEVEL_LABEL, LINES } from "@/data/ladder";
import { CHURN_TRUTH, CUSTOMERS, CUST_BY_ID, KNOWN_LABEL, PICK_WHY, VALUABLE_TRUTH } from "@/data/forecast";
import { AB, AB_PARTS, MEANINGS, MEANING_TRUTH, MEASURE_TRUTH, PATTERNS, PATTERN_IDS, PMEASURES, RECORDS, RISK_LABEL, TRUTH_COUNTS, TRUTH_LEFT, UNCERTAINTIES, riskOf } from "@/data/patterns";
import { BUDGET, JOINS_LABEL, MEASURES, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore, roiOf } from "@/data/measures";
import {
  ACTION_LABEL,
  ARCH_BY_ID,
  ARCH_IDS,
  COMPS,
  COMP_BY_ID,
  CRIT_IDS,
  DECISIONS,
  LOGIC_OWNER_LABEL,
  MODEL_COMPS,
  MODEL_DECISION,
  MODEL_GREATEST,
  OWNER_ACCEPT_LOGIC,
  PRINCIPLES,
  PRINCIPLE_IDS,
  PRINCIPLE_MUST,
  R2_BUDGET,
  R2_MONTHS,
  SITUATIONS,
  SOURCES,
  USE_LABEL,
  actionOf,
  maxRating,
  useOf,
} from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { MODEL_ARCH, MODEL_TIER, PANEL, TIER_LABEL } from "@/data/route2Panel";
import { monthsOf, planOf } from "@/lib/r2Panel";
import { MODEL_ORDER } from "@/data/mentorKey";
import { euro } from "@/lib/lang";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options. Each key gives the expected answer and a
 * reason per option, including why each rejected option is rejected, plus a teaching note wherever more than one answer defends.
 * Never exported and never shown to a learner. Mentor tools stay in English (CLAUDE.md #32); the option labels they quote follow the
 * site's language.
 */
export type AnswerKeyOption = { label: string; expected: boolean; why: string };
export type AnswerKeyBlock = { title: string; expected: string; options: AnswerKeyOption[]; teachingNote?: string };

const B = ["—", "Low", "Mid", "High"];

/* ------------------------------------------------------------------ Route 1 */

export function sortKey(): AnswerKeyBlock {
  return {
    title: "Block 1.1 · Result KPI, driver or activity count (Core, Level 1)",
    expected: LINES.map((r, i) => `${i + 1} → ${LEVEL_LABEL[r.truth]}`).join(" · "),
    options: LINES.flatMap((r, i) => [
      { label: `Figure ${i + 1} → ${LEVEL_LABEL[r.truth]}`, expected: true, why: r.why },
      ...(Object.entries(r.rejected) as [keyof typeof LEVEL_LABEL, string][]).map(([tag, why]) => ({ label: `Figure ${i + 1} → ${LEVEL_LABEL[tag]}`, expected: false, why })),
    ]),
    teachingNote:
      "Three of each. The traps are figure 3 (the conversion of trial users sounds like a sales activity, but signing is a decision the customer makes: result), figure 6 (the time to the first report sounds like an onboarding result, but it comes before renewal and moves it: driver) and figure 9 (check-in calls made sound like a driver of retention, but they count what the account managers did: activity count). Ask every figure the one question of Materi A1: whose behaviour is counted, the customer's decision, the customer's behaviour before it, or ours? A learner who calls the churn rate a driver is confusing it with a cause: it is what the board is judged by. The cost of reading a figure wrong is on both sides: an activity count shown as success hides that nothing changed, and a driver filed as a result arrives too late to act on. The extra figure of the learner is judged, not checked: look for something the systems could count, its kind, and a “so …” that says why it warns early.",
  };
}

export function pickKey(): AnswerKeyBlock {
  return {
    title: "Block 1.3a/b · Where a measure helps most, where an analysis can run on data we have (Optional)",
    expected: `Helps most: ${VALUABLE_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")} · Can run on data we have: ${CHURN_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")}`,
    options: CUSTOMERS.map((c) => ({
      label: `${c.name} · ${c.volume} customers · ${c.leave}% cancelled · cause DataDriven can act on: ${c.decision ? "yes" : "no"} · data: ${KNOWN_LABEL[c.known]}`,
      expected: VALUABLE_TRUTH.includes(c.id) || CHURN_TRUTH.includes(c.id),
      why: `${VALUABLE_TRUTH.includes(c.id) ? "Helps most. " : CHURN_TRUTH.includes(c.id) ? "Can run on data we have. " : "Neither list. "}${PICK_WHY[c.id]}`,
    })),
    teachingNote: "The traps are the customers who moved to a competitor's all-in-one suite (62% cancel, but DataDriven cannot change the choice: stay in touch) and the customers whose finance team asks for the contract end date (40% cancel, but they have most likely decided already). Late payment tempts on the data side: the finance data is fully joined, but only 8% cancel and it is not a cause DataDriven can act on. The reseller customers are 22%, below the 25% line, and the reseller owns the relationship. The two lists differ on purpose: the groups where a measure helps most have no joined data yet, and the best-joined group is not where a measure helps most.",
  };
}

export function tagKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 · Family of behaviour pattern (Optional)",
    expected: RECORDS.map((o) => `${o.code} → ${PATTERNS[o.truth].label}`).join(" · "),
    options: RECORDS.flatMap((o) => [
      { label: `${o.code} → ${PATTERNS[o.truth].label}`, expected: true, why: o.why },
      ...(Object.entries(o.rejected) as [keyof typeof PATTERNS, string][]).map(([s, why]) => ({ label: `${o.code} → ${PATTERNS[s].label}`, expected: false, why })),
    ]),
    teachingNote: `${PATTERN_IDS.map((p) => `${TRUTH_COUNTS[p]} ${PATTERNS[p].label} (${TRUTH_LEFT[p]} moved with churn)`).join(", ")}. D-06 (exports to Excel) is the trap: it is counted by the platform and shows depth of use, even though it did not move with churn; tag what a finding measures, not how it behaved. D-08 (tickets) and D-09 (the survey score) are contact and feedback although neither moved with churn. D-10 (extra licences) tempts toward depth of use, but it is an order seen in sales: what they buy and pay. Use the pair tests of Materi A5: how often or how much, system or person, talking or money.`,
  };
}

export function rowKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Link, when it shows and what to do, per family (Optional)",
    expected: PATTERN_IDS.map((p) => `${PATTERNS[p].label}: ${RISK_LABEL[riskOf(TRUTH_LEFT[p], TRUTH_COUNTS[p])!]} · ${MEANINGS.find((m) => m.id === MEANING_TRUTH[p])!.label} · ${PMEASURES.find((m) => m.id === MEASURE_TRUTH[p])!.label}`).join(" | "),
    options: PATTERN_IDS.flatMap((p) =>
      PMEASURES.map((m) => ({
        label: `${PATTERNS[p].label} → ${m.label}`,
        expected: m.id === MEASURE_TRUTH[p],
        why:
          m.id === MEASURE_TRUTH[p]
            ? `${PATTERNS[p].means} This use fits exactly that.`
            : m.id === "bonus"
              ? "A bonus on a number rewards reporting it, not moving it, and invites gaming; it fits no family."
              : "This use fits a different family; read when this family shows and who sees it.",
      })),
    ),
    teachingNote: "The link is checked against the learner's own tally from 2.1, not against the reference, so a learner who mis-tagged one finding is not punished twice. With the reference tags, use of the platform is Strong (3 of 3 moved with churn), depth of use Strong (2 of 3), contact and feedback Partial (1 of 3) and what they buy and pay None (0 of 3: orders, late invoices and discounts followed a decision already made).",
  };
}

export function uncKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Uncertainties in the churn figures (Optional)",
    expected: UNCERTAINTIES.filter((w) => w.real).map((w) => w.label).join(" · "),
    options: UNCERTAINTIES.map((w) => ({ label: w.label, expected: w.real, why: w.why })),
    teachingNote: "Any two of the four real uncertainties complete the block. The most important is “intensive customers may simply be bigger and keener”: a correlation is not a cause, which is why Block 2.3 asks for a fair test. The three false ones are common beliefs about customer data; each is contradicted in the material.",
  };
}

export function abKey(): AnswerKeyBlock {
  return {
    title: "Block 2.3 · A fair A/B test (Optional)",
    expected: AB_PARTS.map((k) => `${AB[k].label}: ${AB[k].options.find((o) => o.right)!.label}`).join(" | "),
    options: AB_PARTS.flatMap((k) =>
      AB[k].options.map((o) => ({
        label: `${AB[k].label} → ${o.label}`,
        expected: o.right,
        why: o.right
          ? k === "change"
            ? "One change only, so a difference can be put down to it."
            : k === "control"
              ? "Chance decides who is in which group, and both groups live through the same weeks."
              : k === "kpi"
                ? "The goal is customers who stay; the test is judged by the share of low-use customers who renew and are still active after 90 days, not by dashboards viewed or calls made."
                : "The size is fixed before the start, so nobody stops at a lucky moment; waiting until the renewal date includes the customers who decide late."
          : o.clue,
      })),
    ),
    teachingNote: "The check flags a wrong option per part (three options each, so naming the part does not hand over the answer), a hypothesis without “if … because …” and a rule without a number. The hypothesis and the rule are judged: look for one change, one KPI, a reason, and a rule written before the test that includes a guardrail.",
  };
}

export function measureKey(): AnswerKeyBlock {
  const rows = [...MEASURES].sort((a, b) => modelScore(b.id) - modelScore(a.id));
  return {
    title: "Block 2.4 · The three measures (Core, Level 2)",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((x) => x.id === id)!.name).join(", ")} · ${euro(MODEL_COST)} of ${euro(BUDGET)}`,
    options: rows.map((x) => ({
      label: `${x.name} · ${explainBucket(x.evidence)} × ${x.model.effect} × ${x.model.feasibility} = ${modelScore(x.id)} · ${euro(x.cost)} · ${x.weeks} weeks · ROI ${roiOf(x.id)}% · aims at ${JOINS_LABEL[x.joins]} · answers ${x.targets.length ? x.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none"}`,
      expected: MODEL_MEASURES.includes(x.id),
      why: `${x.verdict} ${x.model.note}`,
    })),
    teachingNote: `Score = Economic Viability × Effect × Sustainability (the plan's evaluation). The check looks only at economic viability, which follows from who the measure is printed to aim at. The return on investment is computed by the app from the printed parts and read next to the score; it never decides the choice (the tips mail and the discount show why: a number that looks acceptable can still come from customers who would have stayed). Which problems a choice answers, and when it starts working, is shown by the picture under the cards, not by a verdict. Effect and sustainability are judged; the model values are here. The model three cost ${euro(MODEL_COST)} of ${euro(BUDGET)}. A different, well-reasoned choice is acceptable in a decision part (CLAUDE.md #38): the reasons for the two judged scores must be there.`,
  };
}

export function orderKey(): AnswerKeyBlock {
  return {
    title: "Block 2.4 · The order (Core, Level 2)",
    expected: MODEL_ORDER.map((id) => MEASURES.find((x) => x.id === id)!.name).join(" → "),
    options: MODEL_ORDER.map((id, i) => ({
      label: `${i + 1}. ${MEASURES.find((x) => x.id === id)!.name} (${modelScore(id)})`,
      expected: true,
      why: i === 0 ? "Score 18 (tied with the joined health view): it goes only to customers whose use has fallen, reads the earliest signal and starts within six weeks, with the highest return on investment." : i === 1 ? "Score 18: it joins the usage log and the CRM DataDriven already has, and its first offer is measured on a random half, so it keeps working without new budget." : "Score 12: it builds depth of use, the slow sign that predicts staying, but it aims at everyone with few modules and needs a trainer per session.",
    })),
    teachingNote: "The first two tie at 18, so a learner who puts the joined health view first defends it too: it can be tested on a random half and it makes every later measure readable. A learner who puts the module training first defends it as well: depth of use is the sign most tied to staying. The model orders by score, and puts the alerts first because they act on the earliest signal; the health view can then read their results. A different order with a clear reason exports.",
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Principles of the control system (Optional)",
    expected: `${PRINCIPLES[PRINCIPLE_MUST[0]].name} and ${PRINCIPLES[PRINCIPLE_MUST[1]].name}, plus a third that is not “collect every metric you can find” or “buy one churn-prediction model first”`,
    options: PRINCIPLE_IDS.map((c) => ({
      label: PRINCIPLES[c].name,
      expected: PRINCIPLE_MUST.includes(c) || c === "owners" || c === "review",
      why:
        c === "defs"
          ? "Required: without one page per customer that the teams all read, every action starts from different facts; this is “the data is not used”."
          : c === "rules"
            ? "Required: a written rule with an owner for every alert is the answer to the risk that a good alert is never acted on."
            : c === "owners"
              ? "A good third: a KPI without someone who can move it stays a number on a screen."
              : c === "review"
                ? "A good third: a monthly review of the measures against the customers who really stayed is how DataDriven improves step by step."
                : c === "hoard"
                  ? "Rejected: more metrics add noise and hide the few that matter (Materi A5)."
                  : "Rejected: nothing changes for customers until the platform runs, which takes longer than the four months, and nobody can explain its scores to a customer.",
    })),
    teachingNote: "The check only asks for the joined customer view and the written rule with an owner. The third is judged; KPI owners and the monthly review both defend.",
  };
}

export function sourceKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · Data sources of the control system (Optional)",
    expected: SOURCES.map((s) => `${s.name}: ${USE_LABEL[useOf(s)]}`).join(" · "),
    options: SOURCES.map((s) => ({
      label: `${s.name} → ${USE_LABEL[useOf(s)]}`,
      expected: true,
      why: !s.decision ? `The customer decides nothing through it, so a control system built on it would watch many who never meant to leave: not central, however complete (${s.complete}%).` : s.complete >= 80 ? `The customer decides something through it (“${s.decision}”) and ${s.complete}% of its data reaches the joined view: use now.` : `The customer decides something through it (“${s.decision}”), but only ${s.complete}% of its data reaches the joined view: improve the data first.`,
    })),
    teachingNote: "The newsletter is the trap: 95% complete, but nobody decides to leave by not opening it. The tickets and call notes are the other: keep talking or go quiet is central, but only 55% are logged, so the logging comes first.",
  };
}

export function compKey(): AnswerKeyBlock {
  return {
    title: "Block 3.3 · KPIs and ratings (Optional)",
    expected: `${MODEL_COMPS.map((id) => COMP_BY_ID[id].name).join(", ")}; greatest leverage: ${COMP_BY_ID[MODEL_GREATEST].name}`,
    options: COMPS.map((l) => ({
      label: `${l.name}: ${CRIT_IDS.map((c) => `${c} ${B[l.model[c]]} (max ${B[maxRating(l.id, c)]})`).join(", ")}`,
      expected: MODEL_COMPS.includes(l.id),
      why: l.note,
    })),
    teachingNote: "The check flags only a rating above what the printed facts allow and counts how many chosen KPIs show a change early. The renewal rate is the model's greatest lever: High on all four and the result the whole system exists for. A learner who picks the active-use rate defends it as the earliest signal before a notice, and one who picks the share contacted within a week defends it as the first sign the alerts lead to action.",
  };
}

export function logicKey(): AnswerKeyBlock {
  return {
    title: "Block 3.4 · Measures tested: roll out, keep testing or stop (Optional)",
    expected: SITUATIONS.map((s) => `${s.signal}: ${ACTION_LABEL[actionOf(s)]} · ${OWNER_ACCEPT_LOGIC[s.id].map((o) => LOGIC_OWNER_LABEL[o]).join(" or ")}`).join(" | "),
    options: SITUATIONS.map((s) => ({
      label: `${s.signal} (lift ${s.lift}%, ${s.cases} customers)`,
      expected: true,
      why:
        actionOf(s) === "intervene"
          ? `Lift ${s.lift}% on ${s.cases} customers: clear and proven, guardrail intact. Customer success makes the calls or runs the training, so customer success rolls it out.`
          : actionOf(s) === "watch"
            ? s.lift >= 10
              ? `Lift ${s.lift}% looks strong, but ${s.cases} customers are too few: keep testing; ${s.id === "renewal" ? "sales and account management run it on" : "the data team runs it on"}.`
              : `Lift ${s.lift}%: a small difference, and some customers asked to be taken off the list. Keep testing a stronger variant; the data team runs it.`
            : `Lift ${s.lift}%: no real gain${s.lift < 0 ? ", and margin lost" : ""}. Stop, so no owner.`,
    })),
    teachingNote: "The director's call to the sponsor is the trap: +25% tempts learners to roll out, but forty customers can be chance. The “tips” banner is the second: six hundred customers prove there is almost no difference, so a large sample does not rescue a tiny lift. The 20% discount for everyone with low use is stopped: worse, and it trains customers to ask again.",
  };
}

export function architectureKey(): AnswerKeyBlock {
  const spent = MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const alt = { ...MODEL_TIER, routing: "now" as const };
  const inUse = (id: ArchId) => 1 + monthsOf(id);
  const why: Record<ArchId, string> = {
    foundation: `Now. Every alert reads it and is measured by it; it starts in month 1, no later than the first alert (the test “the base comes first”). At ${ARCH_BY_ID.foundation.weeks} weeks it is in use in month ${inUse("foundation")}.`,
    chat: `Now. ${euro(ARCH_BY_ID.chat.cost)} for ${ARCH_BY_ID.chat.weeks} weeks: one customer ID and one set of codes across the usage log, the CRM and the survey tool. It names no KPI by itself, but it puts the use, the contract value and the contacts of every customer into the joined view the health score reads, so it is the item “After data is ready” waits for.`,
    personal: "Now. The early-warning alerts read the usage log, which is 82% complete (67% if the data is weaker: it then rests on data below 80%, which is why Step B asks what the learner watches). Not now is defensible too, if the learner prefers to wait for the weaker-data case.",
    routing: `After data is ready. Its data (contract values and how many signals point to churn) is only 60% complete; with the data clean-up Now it starts in month 2 and is in use in month ${1 + monthsOf("chat") + monthsOf("routing")}, inside the ${R2_MONTHS} months. Now is possible too, but it starts in month 1 on data below 80% and the data test opens.`,
    training: `Now. ${euro(ARCH_BY_ID.training.cost)} for ${ARCH_BY_ID.training.weeks} weeks so that account managers open calls with the signal that triggered the alert and log what the customer said. A defensible cut if the learner needs the room, and then the reading says so.`,
    tracking: `Now. ${euro(ARCH_BY_ID.tracking.cost)} for ${ARCH_BY_ID.tracking.weeks} weeks: every new measure goes to a random half first and a monthly review keeps, changes or stops each one. A defensible cut, and then the reading names the cost: nobody tests a measure before it grows.`,
    suite: `Not now. A black box: no KPI it moves, its reasons and results are not shown, ${euro(ARCH_BY_ID.suite.cost)} takes the plan ${euro(ARCH_BY_ID.suite.cost + spent - R2_BUDGET)} over the budget, and at ${ARCH_BY_ID.suite.weeks} weeks it is in use only in month ${inUse("suite")}, after the ${R2_MONTHS} months. Two tests open (purpose, budget and months).`,
    relaunch: `Not now. A 20% discount for every customer with low use names no customer KPI (it counts discounts accepted) and is not connected to why use is low; it would push the plan ${euro(ARCH_BY_ID.relaunch.cost + spent - R2_BUDGET)} over the budget. It is the discount trap of Route 1.`,
  };
  return {
    title: "Step A · The system: when does each item happen? (Core, Level 3)",
    expected: `Model: Now ${MODEL_ARCH.filter((id) => MODEL_TIER[id] === "now").map((id) => PANEL[id].short).join(", ")} · After data ${MODEL_ARCH.filter((id) => MODEL_TIER[id] === "later").map((id) => PANEL[id].short).join(", ")} (${euro(spent)} of ${euro(R2_BUDGET)}) · Not now ${ARCH_IDS.filter((id) => MODEL_TIER[id] === "not").map((id) => PANEL[id].short).join(", ")}`,
    options: ARCH_IDS.map((id) => ({ label: `${PANEL[id].short} → ${TIER_LABEL[MODEL_TIER[id]]}`, expected: MODEL_TIER[id] !== "not", why: why[id] })),
    teachingNote: `The panel shows four tests as facts, none a verdict, and the learner decides. A different, well-reasoned set is acceptable (CLAUDE.md #38): for example the health score by value Now (the data test opens, ${planOf({ tier: alt }, 0).holding} of ${planOf({ tier: alt }, 0).applicable} tests hold), the training or the A/B test routine cut to make room, or going over the budget with a reason. Doing nothing (no item Now) is incomplete, not wrong: the task asks for the system to be built.`,
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Step B · The investment decision (Core, Level 3)",
    expected: DECISIONS.find((d) => d.id === MODEL_DECISION)!.label,
    options: DECISIONS.map((d) => ({ label: d.label, expected: d.id !== "wait", why: d.id === MODEL_DECISION ? d.why : d.id === "commit" ? `${d.why} ${d.rejected}` : d.rejected })),
    teachingNote: `“Buy the platform” and “Build in stages” are both decisions, with different reasoning; the plan rejects only “Wait”, because the brief asks for an investment decision despite an unclear forecast: the usage log and the contract data are already 88% and 92% complete and can start within weeks, and customers whose use falls stay unapproached meanwhile. All three stay selectable. A different, well-reasoned decision is acceptable (CLAUDE.md #38): the reason must be written.`,
  };
}
