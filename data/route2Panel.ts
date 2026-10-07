import { ARCH_IDS } from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Route 2 control panel reads (CLAUDE.md #47). Every figure is a Case assumption and is printed on the item cards and in "the
 * numbers today", so the Core frame never reads an Optional block (#40): `data` is the share of the data an approach reads that already reaches the
 * joined customer view, the same figure the source list of the “Go deeper” part prints for the source it also names (a check in
 * `npm run verify:calc` keeps them equal). Nothing here asks the learner to calculate (#44): the panel computes it and says what it means.
 * (Identifiers keep the names of the file this was built from: `chat` is the data clean-up, `personal` the early-warning alerts,
 * `routing` the health score by value, `tracking` the A/B test routine, `relaunch` the 20% discount for low use.)
 */
export type Tier = "now" | "later" | "not";
export const TIER_IDS: Tier[] = ["now", "later", "not"];
export const TIER_LABEL = bi({ now: t("Now", "Jetzt"), later: t("After data is ready", "Wenn die Daten bereit sind"), not: t("Not now", "Jetzt nicht") });

/** The "weaker data" scenario: every readiness figure is this many points lower (the plan's “incomplete data situation”). */
export const WEAK_POINTS = 15;
/** An approach starts on data that is at least this complete (the rule of Materi B5; the same bar as the “Go deeper” part's). */
export const READY_BAR = 80;

/** Where an item sits in the architecture diagram. */
export type Layer = "suite" | "site" | "engine" | "people" | "base";

export type PanelFacts = {
  layer: Layer;
  /** Short name for the diagram. */
  short: string;
  /** What the item does for the system, in one phrase after "Moves". */
  moves: string;
  /** It moves a named KPI of customers (a rate customers' behaviour changes). */
  named: boolean;
  /** It makes the other items measurable or usable (the scoreboard and list, the data clean-up, the training, the test-and-learn routine). */
  enabler: boolean;
  /** Its effect can be measured once it is in place (a named KPI, or the measurement system itself). */
  measured: boolean;
  /** Share of the data it reads that already reaches the joined customer view today (percent), or null when it needs no data to start. */
  data: number | null;
  /** The data clean-up prepares the data this item reads: it is ready when the clean-up is in use before the item starts. */
  cleaned: boolean;
  blackBox: boolean;
};

export const PANEL: Record<ArchId, PanelFacts> = bi({
  foundation: { layer: "base" as Layer, short: t("KPI system and joined customer view", "KPI-System und verbundene Kundenansicht"), moves: t("no KPI by itself: every measure reads one customer page, and every KPI and every return on investment is counted once for all of them", "keinen KPI selbst: Jede Maßnahme liest eine Kundenseite, und jeder KPI und jeder Return on Investment wird einmal für alle gezählt"), named: false, enabler: true, measured: true, data: null, cleaned: false, blackBox: false },
  chat: { layer: "people" as Layer, short: t("Data clean-up and connection", "Datenbereinigung und Anbindung"), moves: t("no KPI by itself: use, contract value and contacts of a customer are recorded the same way in the usage log, the CRM and the survey tool", "keinen KPI selbst: Nutzung, Vertragswert und Kontakte eines Kunden werden in Nutzungslog, CRM und Umfragetool gleich erfasst"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  personal: { layer: "engine" as Layer, short: t("Early-warning alert", "Frühwarn-Alarm"), moves: t("the share of low-use customers who are contacted within a week, by matching the alert to the signal", "den Anteil der Kunden mit geringer Nutzung, die innerhalb einer Woche kontaktiert werden, indem der Alarm zum Signal passt"), named: true, enabler: false, measured: true, data: 82, cleaned: false, blackBox: false },
  routing: { layer: "engine" as Layer, short: t("Health score by value", "Health Score nach Wert"), moves: t("the renewal rate, by sending effort to the customers worth most and skipping the stable ones", "die Renewal Rate, indem der Aufwand an die wertvollsten Kunden geht und die stabilen übersprungen werden"), named: true, enabler: false, measured: true, data: 60, cleaned: true, blackBox: false },
  training: { layer: "people" as Layer, short: t("Playbook and training", "Playbook und Training"), moves: t("no KPI by itself: the account managers open calls with the signal that triggered the alert and log what the customer said", "keinen KPI selbst: Die Account Manager eröffnen Anrufe mit dem Signal, das den Alarm auslöste, und halten fest, was der Kunde sagte"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  tracking: { layer: "people" as Layer, short: t("A/B test routine", "A/B-Test-Routine"), moves: t("the renewal rate, by testing every measure on a random half first and keeping only what the renewal rates and the return on investment support", "die Renewal Rate, indem jede Maßnahme zuerst an einer zufälligen Hälfte getestet wird und nur behalten wird, was Verlängerungsquoten und Return on Investment stützen"), named: true, enabler: true, measured: true, data: null, cleaned: false, blackBox: false },
  suite: { layer: "suite" as Layer, short: t("Vendor churn platform", "Churn-Plattform des Anbieters"), moves: t("no KPI it reports: it scores every customer and its reasons and results are not shown", "keinen KPI, den es berichtet: Es bewertet jeden Kunden, und seine Gründe und Ergebnisse werden nicht gezeigt"), named: false, enabler: false, measured: false, data: null, cleaned: false, blackBox: true },
  relaunch: { layer: "site" as Layer, short: t("20% discount for low use", "20 % Rabatt bei geringer Nutzung"), moves: t("no KPI it names: it counts discounts accepted, which is revenue given away, and it is not connected to why use is low", "keinen KPI, den er nennt: Er zählt angenommene Rabatte, also verschenkten Umsatz, und ist nicht damit verbunden, warum die Nutzung gering ist"), named: false, enabler: false, measured: false, data: null, cleaned: false, blackBox: false },
});

/** The approaches that read the shared list: the early-warning alerts and the health score by value. */
export const ENGINE_IDS: ArchId[] = ["personal", "routing"];
/** The item the "After data is ready" tier waits for (a clean record puts the data into the joined view), and the one that makes everything else measurable. */
export const CLEAN_ID: ArchId = "chat";
export const KPI_SYSTEM_ID: ArchId = "foundation";

/**
 * The model plan (CLAUDE.md #47): the six items that fit the budget; the health score by value waits for the data clean-up to put
 * its data into the joined view; the vendor platform and the discount for low use stay out (the platform is in use only in month 7,
 * after the 4 months; the discount names no KPI and is not connected).
 */
export const MODEL_TIER: Record<ArchId, Tier> = { foundation: "now", chat: "now", personal: "now", routing: "later", training: "now", tracking: "now", suite: "not", relaunch: "not" };
export const MODEL_ARCH: ArchId[] = ARCH_IDS.filter((id) => MODEL_TIER[id] !== "not");
