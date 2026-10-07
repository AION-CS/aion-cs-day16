import { bi, t } from "@/lib/lang";

/**
 * Route 2 (Level 3) data: the Transfer Project. DataDriven Sales' Chief Customer Officer builds a data-driven control system for customer success with a
 * limited budget, an incomplete data situation and conflicting goals (cost against customer value), and makes an investment decision under uncertainty (an
 * unclear forecast). Every figure is a Case assumption (the plan gives the role, the situation and the constraints, not numbers). (Identifiers keep the names
 * of the file this was built from: a "source" is a data source of the control system, a "component" is a KPI candidate, a "situation" is a test result of
 * an A/B test, `complete` is the share of a source's data that reaches the joined customer view.)
 */
export const R2_BUDGET = 180000;
export const R2_MONTHS = 4;
export type Bucket = 1 | 2 | 3;

/* ------------------------------------------------------------------ 3.1 · target vision of a control system */

export type PrincipleId = "defs" | "rules" | "owners" | "review" | "hoard" | "blackbox";
export const PRINCIPLE_IDS: PrincipleId[] = ["defs", "rules", "owners", "review", "hoard", "blackbox"];
export const PRINCIPLES = bi({
  defs: { id: "defs" as PrincipleId, name: t("One joined customer view shared by customer success, sales and product", "Eine verbundene Kundenansicht, die Customer Success, Vertrieb und Produkt teilen"), means: t("The three teams read the same page per customer: use, modules, contacts, tickets and contract. Every action starts from the same facts.", "Die drei Teams lesen dieselbe Seite pro Kunde: Nutzung, Module, Kontakte, Tickets und Vertrag. Jede Maßnahme beginnt bei denselben Fakten.") },
  rules: { id: "rules" as PrincipleId, name: t("Every alert has a written rule and a named owner", "Jeder Alarm hat eine schriftliche Regel und einen benannten Owner"), means: t("For each alert it is written down which signal triggers it, who acts within how many days and what is logged, so nobody waits for somebody else.", "Für jeden Alarm ist festgehalten, welches Signal ihn auslöst, wer innerhalb wie vieler Tage handelt und was festgehalten wird, damit niemand auf jemand anderen wartet.") },
  owners: { id: "owners" as PrincipleId, name: t("Every KPI has an owner who can move it", "Jeder KPI hat einen Owner, der ihn bewegen kann"), means: t("Someone answers for each number and has the means to change it.", "Jemand steht für jede Zahl ein und hat die Mittel, sie zu ändern.") },
  review: { id: "review" as PrincipleId, name: t("A monthly review compares each measure with the customers who actually stayed: keep, change or stop it", "Ein monatliches Review vergleicht jede Maßnahme damit, welche Kunden wirklich blieben: behalten, ändern oder stoppen"), means: t("Every month the same few numbers: how many customers were reached, how many renewed, the return on investment, and a decision on each measure.", "Jeden Monat dieselben wenigen Zahlen: wie viele Kunden erreicht wurden, wie viele verlängerten, der Return on Investment, und eine Entscheidung zu jeder Maßnahme.") },
  hoard: { id: "hoard" as PrincipleId, name: t("Collect every metric you can find; the more on the dashboard, the better the decisions", "Jede Kennzahl sammeln, die man findet; je mehr im Dashboard, desto besser die Entscheidungen"), means: t("Every number the systems produce goes on the dashboard, whether it moves with churn or not.", "Jede Zahl, die die Systeme erzeugen, kommt ins Dashboard, ob sie sich mit dem Churn bewegt oder nicht.") },
  blackbox: { id: "blackbox" as PrincipleId, name: t("Buy one churn-prediction model and act on its scores before anything else is agreed", "Ein Churn-Vorhersagemodell kaufen und nach seinen Scores handeln, bevor irgendetwas anderes vereinbart ist"), means: t("Nothing is cleaned or agreed until a vendor model scores every customer by itself.", "Nichts wird bereinigt oder abgestimmt, bis ein Anbietermodell jeden Kunden selbst bewertet.") },
});
/** A control system needs both: one joined view (so every action knows the customer) and a written rule with an owner (so no alert is left to chance). */
export const PRINCIPLE_MUST: PrincipleId[] = ["defs", "rules"];
export const PRINCIPLE_TRAP: PrincipleId[] = ["hoard", "blackbox"];

/* ------------------------------------------------------------------ 3.2 · the data sources of the control system */

export type SourceId = "pricing" | "quote" | "chat" | "onboarding" | "social" | "renewal" | "blog" | "careers";
export const SOURCE_IDS: SourceId[] = ["pricing", "quote", "chat", "onboarding", "social", "renewal", "blog", "careers"];
export type Use = "core" | "later" | "leave";
export const USE_LABEL = bi({ core: t("Central: use now", "Zentral: jetzt nutzen"), later: t("Central: improve the data first", "Zentral: zuerst die Daten verbessern"), leave: t("Not central", "Nicht zentral") });
/** `decision` is what the customer decides through it (null when nothing); `complete` is the share of its data that reaches the joined customer view. */
export type Source = { id: SourceId; name: string; decision: string | null; complete: number; cost: number };
export const SOURCES: Source[] = bi([
  { id: "pricing" as SourceId, name: t("The platform's usage log: active days, logins, reports", "Das Nutzungslog der Plattform: aktive Tage, Logins, Berichte"), decision: t("Keep using the platform, or drift away", "Die Plattform weiter nutzen, oder abdriften"), complete: 88, cost: 15000 },
  { id: "quote" as SourceId, name: t("Contract data: value, term and renewal date", "Vertragsdaten: Wert, Laufzeit und Verlängerungsdatum"), decision: t("Renew, or give notice", "Verlängern, oder kündigen"), complete: 92, cost: 8000 },
  { id: "chat" as SourceId, name: t("Product configuration: modules switched on, people invited", "Produktkonfiguration: aktivierte Module, eingeladene Personen"), decision: t("Build the platform into more of the work, or stay shallow", "Die Plattform in mehr Arbeit einbauen, oder oberflächlich bleiben"), complete: 82, cost: 12000 },
  { id: "onboarding" as SourceId, name: t("Support tickets and call notes logged by account managers", "Support-Tickets und Gesprächsnotizen der Account Manager"), decision: t("Keep talking, or go quiet", "Im Gespräch bleiben, oder verstummen"), complete: 55, cost: 20000 },
  { id: "social" as SourceId, name: t("Survey answers (NPS) from the last year", "Umfrageantworten (NPS) des letzten Jahres"), decision: t("Say what they think, or stay silent", "Sagen, was sie denken, oder schweigen"), complete: 60, cost: 14000 },
  { id: "renewal" as SourceId, name: t("Competitors' prices and contract terms that sales has collected", "Preise und Vertragsbedingungen von Wettbewerbern, die der Vertrieb gesammelt hat"), decision: t("Stay, or compare again", "Bleiben, oder wieder vergleichen"), complete: 45, cost: 10000 },
  { id: "blog" as SourceId, name: t("Newsletter opens by customers", "Newsletter-Öffnungen von Kunden"), decision: null, complete: 95, cost: 5000 },
  { id: "careers" as SourceId, name: t("Job applications to DataDriven", "Bewerbungen bei DataDriven"), decision: null, complete: 99, cost: 3000 },
]);
export const SOURCE_BY_ID = Object.fromEntries(SOURCES.map((s) => [s.id, s])) as Record<SourceId, Source>;
export const QUALITY_BAR = 80;
/** The rule of Materi B2: nothing the customer decides through it → not central; something it decides and ≥ 80% of its data in the joined view → use now; something it decides but less in the view → improve the data first. */
export const useOf = (s: Source): Use => (!s.decision ? "leave" : s.complete >= QUALITY_BAR ? "core" : "later");

/* ------------------------------------------------------------------ 3.3 · a KPI system for management */

export type CompId = "conv" | "cv" | "engage" | "nps" | "churn" | "emails" | "followers" | "stories";
export const COMP_IDS: CompId[] = ["conv", "cv", "engage", "nps", "churn", "emails", "followers", "stories"];
export type Criterion = "explain" | "timely" | "reach" | "scale";
export const CRIT_IDS: Criterion[] = ["explain", "timely", "reach", "scale"];
export const CRITERIA = bi([
  { id: "explain" as Criterion, name: t("Link to staying", "Verbindung zum Bleiben"), test: t("Does it move with customers staying or leaving?", "Bewegt er sich mit Kunden, die bleiben oder gehen?"), low: t("It counts what we do or how many look.", "Er zählt, was wir tun oder wie viele hinsehen."), high: t("It is, or leads directly to, customers staying or leaving.", "Er ist Kunden, die bleiben oder gehen, oder führt direkt dazu.") },
  { id: "timely" as Criterion, name: t("Early", "Früh"), test: t("How early does it show a change, while there is still time to act?", "Wie früh zeigt er eine Veränderung, solange noch Zeit zum Handeln ist?"), low: t("After the customer has left, or twice a year.", "Nachdem der Kunde gegangen ist, oder zweimal im Jahr."), high: t("Weekly or faster.", "Wöchentlich oder schneller.") },
  { id: "reach" as Criterion, name: t("Reach", "Reichweite"), test: t("Does it cover every customer?", "Deckt er jeden Kunden ab?"), low: t("Some customers only.", "Nur einige Kunden."), high: t("Every customer.", "Jeden Kunden.") },
  { id: "scale" as Criterion, name: t("Measured automatically", "Automatisch gemessen"), test: t("Is it counted by the systems, without anyone collecting it?", "Wird er von den Systemen gezählt, ohne dass jemand ihn sammelt?"), low: t("Someone collects it by hand each time.", "Jemand sammelt ihn jedes Mal von Hand."), high: t("The systems count it by themselves.", "Die Systeme zählen ihn selbst.") },
]);
export type Cadence = "weekly" | "monthly" | "after" | "halfyear";
export type CostShape = "one-off" | "per customer" | "per analysis";
export type Comp = { id: CompId; name: string; what: string; explains: boolean; cadence: Cadence; coversAll: boolean; costShape: CostShape; model: Record<Criterion, Bucket>; note: string };
export const CADENCE_LABEL = bi({ weekly: t("weekly", "wöchentlich"), monthly: t("monthly", "monatlich"), after: t("after the customer has left", "nachdem der Kunde gegangen ist"), halfyear: t("twice a year", "zweimal im Jahr") });
export const COST_SHAPE_LABEL = bi({ "one-off": t("counted by the systems", "von den Systemen gezählt"), "per customer": t("by a survey", "über eine Befragung"), "per analysis": t("collected by hand", "von Hand gesammelt") });
export const LINK_LABEL = bi({ yes: t("linked to staying", "mit dem Bleiben verbunden"), no: t("not linked to staying", "nicht mit dem Bleiben verbunden") });
export const COMPS: Comp[] = bi([
  { id: "conv" as CompId, name: t("Renewal rate: share of customers due for renewal who renew", "Renewal Rate: Anteil der Kunden mit anstehender Verlängerung, die verlängern"), what: t("Renewed customers ÷ customers whose renewal date fell in the period, updated every week.", "Verlängerte Kunden ÷ Kunden, deren Verlängerungsdatum in den Zeitraum fiel, jede Woche aktualisiert."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The result the whole system exists for, counted from the CRM; every measure moves it.", "Das Ergebnis, für das das ganze System da ist, aus dem CRM gezählt; jede Maßnahme bewegt es.") },
  { id: "cv" as CompId, name: t("Active-use rate: share of customers with at least eight active days in the month", "Active-Use Rate: Anteil der Kunden mit mindestens acht aktiven Tagen im Monat"), what: t("Customers with eight or more active days ÷ all customers, updated every week.", "Kunden mit acht oder mehr aktiven Tagen ÷ alle Kunden, jede Woche aktualisiert."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The earliest signal that comes before a cancellation; the usage log counts it.", "Das früheste Signal vor einer Kündigung; das Nutzungslog zählt sie.") },
  { id: "engage" as CompId, name: t("Share of low-use customers who are contacted within a week", "Anteil der Kunden mit geringer Nutzung, die innerhalb einer Woche kontaktiert werden"), what: t("Low-use customers with a logged call within 7 days ÷ all low-use customers.", "Kunden mit geringer Nutzung mit einem festgehaltenen Gespräch innerhalb von 7 Tagen ÷ alle Kunden mit geringer Nutzung."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The first sign that the alerts lead to action, weeks before a renewal.", "Das erste Zeichen, dass Alarme zu Handeln führen, Wochen vor einer Verlängerung.") },
  { id: "nps" as CompId, name: t("Satisfaction score (NPS) from a survey", "Zufriedenheitswert (NPS) aus einer Umfrage"), what: t("How customers rate DataDriven; about 15% answer.", "Wie Kunden DataDriven bewerten; etwa 15 % antworten."), explains: true, cadence: "halfyear" as Cadence, coversAll: false, costShape: "per customer" as CostShape, model: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("Linked to staying, but twice a year is too slow to steer four months by, and few customers answer.", "Mit dem Bleiben verbunden, aber zweimal im Jahr ist zu langsam, um vier Monate danach zu steuern, und wenige Kunden antworten.") },
  { id: "churn" as CompId, name: t("Churn rate per quarter", "Churn Rate pro Quartal"), what: t("Customers who left in the quarter ÷ customers at the start of the quarter.", "Kunden, die im Quartal gingen, ÷ Kunden zu Beginn des Quartals."), explains: true, cadence: "after" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 1, reach: 3, scale: 3 }, note: t("Counts the loss exactly, after it is too late to act; a useful end-of-quarter check, not a steering KPI.", "Zählt den Verlust genau, wenn es zu spät zum Handeln ist; eine nützliche Prüfung zum Quartalsende, kein Steuerungs-KPI.") },
  { id: "emails" as CompId, name: t("Dashboards viewed per month", "Pro Monat angesehene Dashboards"), what: t("Times a manager opens a report in the month.", "Wie oft ein Manager im Monat einen Bericht öffnet."), explains: false, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("It can double while renewals do not move: it counts how much managers look, not what customers do.", "Sie kann sich verdoppeln, während sich die Verlängerungen nicht bewegen: Sie zählt, wie viel Manager hinsehen, nicht was Kunden tun.") },
  { id: "followers" as CompId, name: t("Calls made by account managers per month", "Von Account Managern geführte Anrufe pro Monat"), what: t("Calls logged in the month.", "Im Monat festgehaltene Anrufe."), explains: false, cadence: "weekly" as Cadence, coversAll: false, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 2, scale: 3 }, note: t("Counts effort among managers who log their calls, not how customers respond.", "Zählt Aufwand bei Managern, die ihre Anrufe festhalten, nicht wie Kunden reagieren.") },
  { id: "stories" as CompId, name: t("Account managers' monthly “saved customer” stories", "Monatliche „gehaltener Kunde“-Geschichten der Account Manager"), what: t("Each month, every account manager reports a customer who stayed after a call.", "Jeden Monat berichtet jeder Account Manager von einem Kunden, der nach einem Anruf blieb."), explains: false, cadence: "monthly" as Cadence, coversAll: false, costShape: "per analysis" as CostShape, model: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Each manager reports a favourite case, so the customers who left never appear.", "Jeder Manager berichtet einen Lieblingsfall, also tauchen die Kunden, die gingen, nie auf.") },
]);
export const COMP_BY_ID = Object.fromEntries(COMPS.map((c) => [c.id, c])) as Record<CompId, Comp>;
export const COMP_CHOOSE = 3;
export const MODEL_COMPS: CompId[] = ["conv", "cv", "engage"];
export const MODEL_GREATEST: CompId = "conv";
export function maxRating(id: CompId, c: Criterion): Bucket {
  const x = COMP_BY_ID[id];
  if (c === "explain") return x.explains ? 3 : 1;
  if (c === "timely") return x.cadence === "weekly" ? 3 : x.cadence === "monthly" ? 2 : 1;
  if (c === "reach") return x.coversAll ? 3 : 2;
  return x.costShape === "one-off" ? 3 : x.costShape === "per customer" ? 2 : 1;
}
export const isEarly = (id: CompId) => COMP_BY_ID[id].cadence === "weekly" || COMP_BY_ID[id].cadence === "monthly";

/* ------------------------------------------------------------------ 3.4 · the optimisation loop: roll out, keep testing, stop */

export type SitId = "reco" | "renewal" | "botname" | "subject" | "price" | "winback";
export const SIT_IDS: SitId[] = ["reco", "renewal", "botname", "subject", "price", "winback"];
export type Action = "intervene" | "watch" | "none";
export const ACTION_LABEL = bi({ intervene: t("Roll out", "Ausrollen"), watch: t("Keep testing", "Weiter testen"), none: t("Stop", "Stoppen") });
export type LogicOwner = "csm" | "sales" | "data" | "nobody";
export const LOGIC_OWNERS: LogicOwner[] = ["csm", "sales", "data", "nobody"];
export const LOGIC_OWNER_LABEL = bi({ csm: t("Customer success", "Customer Success"), sales: t("Sales and account management", "Vertrieb und Account Management"), data: t("Data team", "Datenteam"), nobody: t("No one (stopped)", "Niemand (gestoppt)") });
export type Situation = { id: SitId; signal: string; lift: number; cases: number; revenue: number; note: string };
export const SITUATIONS: Situation[] = bi([
  { id: "reco" as SitId, signal: t("A call by the account manager within a week of a fall in use", "Ein Anruf des Account Managers innerhalb einer Woche nach einem Nutzungsrückgang"), lift: 40, cases: 170, revenue: 150000, note: t("More called customers renewed, and the calls did not raise requests for discounts.", "Mehr angerufene Kunden verlängerten, und die Anrufe erhöhten die Rabattanfragen nicht.") },
  { id: "renewal" as SitId, signal: t("A call from a director to the customer's sponsor", "Ein Anruf einer Direktorin oder eines Direktors beim Sponsor des Kunden"), lift: 25, cases: 40, revenue: 70000, note: t("Few customers were reached in the test months.", "In den Testmonaten wurden wenige Kunden erreicht.") },
  { id: "botname" as SitId, signal: t("A “tips for you” banner on the platform login page", "Ein „Tipps für Sie“-Banner auf der Login-Seite der Plattform"), lift: 1, cases: 600, revenue: 3000, note: t("Many customers saw it, almost no difference in renewals.", "Viele Kunden sahen es, fast kein Unterschied bei den Verlängerungen.") },
  { id: "subject" as SitId, signal: t("An automatic “what is new in the product” e-mail", "Eine automatische „Was im Produkt neu ist“-E-Mail"), lift: 6, cases: 300, revenue: 30000, note: t("A small, steady rise in renewals; a few customers asked to be taken off the list.", "Ein kleiner, stabiler Anstieg der Verlängerungen; einige Kunden baten, von der Liste genommen zu werden.") },
  { id: "price" as SitId, signal: t("A 20% discount offered to every customer with low use", "Ein Rabatt von 20 % für jeden Kunden mit geringer Nutzung"), lift: -6, cases: 150, revenue: -20000, note: t("Renewals did not rise, margin fell, and six customers asked for the same discount again the year after.", "Die Verlängerungen stiegen nicht, die Marge sank, und sechs Kunden baten im Jahr darauf erneut um denselben Rabatt.") },
  { id: "winback" as SitId, signal: t("A 45-minute training on an unused module, offered once a customer shows low depth of use", "Eine 45-minütige Schulung zu einem ungenutzten Modul, angeboten, sobald ein Kunde geringe Tiefe der Nutzung zeigt"), lift: 30, cases: 120, revenue: 110000, note: t("Guardrail: no rise in discount requests.", "Guardrail: kein Anstieg bei Rabattanfragen.") },
]);
export const SIT_BY_ID = Object.fromEntries(SITUATIONS.map((s) => [s.id, s])) as Record<SitId, Situation>;
export const LIFT_ACT = 10;
export const LIFT_WATCH = 3;
export const CASES_MIN = 100;
export const actionOf = (s: Situation): Action => (s.lift >= LIFT_ACT && s.cases >= CASES_MIN ? "intervene" : s.lift >= LIFT_WATCH ? "watch" : "none");
export const OWNER_ACCEPT_LOGIC: Record<SitId, LogicOwner[]> = { reco: ["csm"], renewal: ["sales"], botname: ["nobody"], subject: ["data"], price: ["nobody"], winback: ["csm"] };
export type LogicRow = { action: Action | null; owner: LogicOwner | null };

/* ------------------------------------------------------------------ 3.5 · prioritised implementation architecture */

export type ArchId = "foundation" | "chat" | "personal" | "routing" | "training" | "tracking" | "suite" | "relaunch";
export const ARCH_IDS: ArchId[] = ["foundation", "chat", "personal", "routing", "training", "tracking", "suite", "relaunch"];
export type ArchItem = { id: ArchId; name: string; what: string; cost: number; weeks: number; blackBox: boolean };
export const ARCH: ArchItem[] = bi([
  { id: "foundation" as ArchId, name: t("One KPI system and one joined customer view", "Ein KPI-System und eine verbundene Kundenansicht"), what: t("The usage log, the CRM and the feedback joined in one page per customer, with the renewal rate, the active-use rate and the return on investment per measure on one dashboard.", "Nutzungslog, CRM und Feedback in einer Seite pro Kunde verbunden, mit Renewal Rate, Active-Use Rate und dem Return on Investment pro Maßnahme auf einem Dashboard."), cost: 50000, weeks: 8, blackBox: false },
  { id: "chat" as ArchId, name: t("Data clean-up and connection of the three sources", "Datenbereinigung und Anbindung der drei Quellen"), what: t("One customer ID and one set of codes across the usage log, the CRM and the survey tool, so every customer is recorded the same way, with its use, its contract value and its contacts.", "Eine Kunden-ID und ein Satz Codes über Nutzungslog, CRM und Umfragetool, damit jeder Kunde gleich erfasst wird, mit seiner Nutzung, seinem Vertragswert und seinen Kontakten."), cost: 15000, weeks: 4, blackBox: false },
  { id: "personal" as ArchId, name: t("Early-warning alerts: a rule for each signal and a call by the account manager", "Frühwarn-Alarme: eine Regel für jedes Signal und ein Anruf des Account Managers"), what: t("A rule reads the weekly usage of each customer and creates an alert: a call by the account manager when use falls under the customer's own average, a training offer when only one module is used, and no alert when the customer is stable.", "Eine Regel liest die wöchentliche Nutzung jedes Kunden und erzeugt einen Alarm: einen Anruf des Account Managers, wenn die Nutzung unter den eigenen Durchschnitt fällt, ein Schulungsangebot, wenn nur ein Modul genutzt wird, und keinen Alarm, wenn der Kunde stabil ist."), cost: 35000, weeks: 8, blackBox: false },
  { id: "routing" as ArchId, name: t("A health score by value: effort goes to the customers worth most first", "Ein Health Score nach Wert: Aufwand geht zuerst an die wertvollsten Kunden"), what: t("Customers are ranked by yearly contract value and by how many signals point to churn, so account managers start at the top of the list and do not spend time on stable customers.", "Kunden werden nach jährlichem Vertragswert und danach gereiht, wie viele Signale auf Churn deuten, sodass Account Manager oben in der Liste beginnen und keine Zeit für stabile Kunden aufwenden."), cost: 30000, weeks: 8, blackBox: false },
  { id: "training" as ArchId, name: t("Playbooks and training for account managers", "Playbooks und Training für Account Manager"), what: t("How to read the alerts, what to say in the first call and how to log what the customer said, so each alert leads to the same quality of action.", "Wie man die Alarme liest, was man im ersten Anruf sagt und wie man festhält, was der Kunde sagte, damit jeder Alarm zu Handeln derselben Qualität führt."), cost: 12000, weeks: 3, blackBox: false },
  { id: "tracking" as ArchId, name: t("An A/B test routine: a control group for every measure and a monthly ROI review", "Eine A/B-Test-Routine: eine Kontrollgruppe für jede Maßnahme und ein monatliches ROI-Review"), what: t("Every new measure goes to a random half of a group first. Once a month the renewal rates and the return on investment are compared and each measure is kept, changed or stopped.", "Jede neue Maßnahme geht zuerst an eine zufällige Hälfte einer Gruppe. Einmal im Monat werden Verlängerungsquoten und Return on Investment verglichen, und jede Maßnahme wird behalten, geändert oder gestoppt."), cost: 14000, weeks: 4, blackBox: false },
  { id: "suite" as ArchId, name: t("A vendor churn-prediction platform", "Eine Churn-Vorhersage-Plattform eines Anbieters"), what: t("A vendor trains a model on five years of records and scores every customer on how likely it is to cancel; its reasons and its results are not shown.", "Ein Anbieter trainiert ein Modell auf fünf Jahren Daten und bewertet jeden Kunden danach, wie wahrscheinlich er kündigt; seine Gründe und seine Ergebnisse werden nicht gezeigt."), cost: 140000, weeks: 24, blackBox: true },
  { id: "relaunch" as ArchId, name: t("A 20% discount offer to every customer with low use", "Ein Rabattangebot von 20 % an jeden Kunden mit geringer Nutzung"), what: t("Every customer with fewer than four active days a month is offered 20% off the next yearly fee if it renews early, not connected to the alerts and not tied to why use is low.", "Jedem Kunden mit weniger als vier aktiven Tagen im Monat werden 20 % Rabatt auf die nächste Jahresgebühr angeboten, wenn er früh verlängert, nicht mit den Alarmen verbunden und nicht daran geknüpft, warum die Nutzung gering ist."), cost: 60000, weeks: 8, blackBox: false },
]);
export const ARCH_BY_ID = Object.fromEntries(ARCH.map((a) => [a.id, a])) as Record<ArchId, ArchItem>;
/* ------------------------------------------------------------------ 3.6 · an investment decision under an unclear forecast */

export type DecisionId = "commit" | "stage" | "wait";
export const DECISIONS = bi([
  { id: "commit" as DecisionId, label: t("Buy the vendor's churn-prediction platform now and act on every score", "Jetzt die Churn-Vorhersage-Plattform des Anbieters kaufen und bei jedem Score handeln"), detail: t("Start the vendor project in month 1, train on all five years of records and act on the scores as soon as the model is live.", "Das Anbieterprojekt in Monat 1 starten, auf allen fünf Jahren Daten trainieren und bei den Scores handeln, sobald das Modell live ist."), why: t("Bold, and it defends only if the model works on DataDriven's incomplete data from the first run.", "Mutig, und nur vertretbar, wenn das Modell auf den unvollständigen Daten von DataDriven von Anfang an funktioniert."), rejected: t("The platform is in use only after 24 weeks, it costs most of the budget, nobody can explain a score to a customer and nothing changes within the four months.", "Die Plattform ist erst nach 24 Wochen im Einsatz, kostet den Großteil des Budgets, niemand kann einem Kunden einen Score erklären, und in den vier Monaten ändert sich nichts.") },
  { id: "stage" as DecisionId, label: t("Build the control system in stages and watch one figure", "Das Steuerungssystem in Stufen bauen und eine Zahl beobachten"), detail: t("Start in month 1 with the data clean-up, the KPI system and the A/B test routine; add the early-warning alerts once the data is clean; add the health score by value only when the contract values behind it are connected; scale only if the figure you watch moves.", "In Monat 1 mit Datenbereinigung, KPI-System und A/B-Test-Routine starten; die Frühwarn-Alarme ergänzen, sobald die Daten sauber sind; den Health Score nach Wert erst aufnehmen, wenn die Vertragswerte dahinter verbunden sind; nur skalieren, wenn sich die Zahl, die Sie beobachten, bewegt."), why: t("It uses the data that exists, tests the forecast on a small group before spending the rest, and learns from the first renewals.", "Es nutzt die Daten, die es gibt, testet die Prognose an einer kleinen Gruppe, bevor es den Rest ausgibt, und lernt aus den ersten Verlängerungen."), rejected: t("", "") },
  { id: "wait" as DecisionId, label: t("Wait until the forecast is clear before investing", "Warten, bis die Prognose klar ist, bevor investiert wird"), detail: t("Spend the four months studying the data and start the measures only when the forecast of churn is clear.", "Die vier Monate damit verbringen, die Daten zu untersuchen, und die Maßnahmen erst starten, wenn die Churn-Prognose klar ist."), why: t("", ""), rejected: t("The brief asks for an investment decision despite an unclear forecast. Waiting leaves customers whose use is falling unapproached for four more months, while the usage log and the contract data, which are already 88% and 92% complete, could start within weeks.", "Der Auftrag verlangt eine Investitionsentscheidung trotz unklarer Prognose. Warten lässt Kunden mit sinkender Nutzung vier weitere Monate unangesprochen, obwohl das Nutzungslog und die Vertragsdaten, die schon zu 88 % und 92 % vollständig sind, in Wochen starten könnten.") },
]);
export const MODEL_DECISION: DecisionId = "stage";

export type KpiId = "conv" | "engage" | "cv" | "dashboards" | "emails";
export const KPIS = bi([
  { id: "conv" as KpiId, label: t("Renewal rate: share of customers due for renewal who renew", "Renewal Rate: Anteil der Kunden mit anstehender Verlängerung, die verlängern"), unit: "%", baseline: 8, better: "up" as const, behaviour: true },
  { id: "engage" as KpiId, label: t("Share of low-use customers who have not been contacted after 30 days", "Anteil der Kunden mit geringer Nutzung, die nach 30 Tagen nicht kontaktiert wurden"), unit: "%", baseline: 70, better: "down" as const, behaviour: true },
  { id: "cv" as KpiId, label: t("Tips e-mails sent per month", "Pro Monat versendete Tipps-E-Mails"), unit: t("e-mails", "E-Mails"), baseline: 480, better: "up" as const, behaviour: false },
  { id: "dashboards" as KpiId, label: t("Reports opened by managers per month", "Von Managern geöffnete Berichte pro Monat"), unit: t("reports", "Berichte"), baseline: 320, better: "up" as const, behaviour: false },
  { id: "emails" as KpiId, label: t("Calls made by account managers per month", "Von Account Managern geführte Anrufe pro Monat"), unit: t("calls", "Gespräche"), baseline: 140, better: "up" as const, behaviour: false },
]);
export const KPI_BY_ID = Object.fromEntries(KPIS.map((k) => [k.id, k])) as Record<KpiId, (typeof KPIS)[number]>;
