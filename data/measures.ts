import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 2.4 (Core, Level 2). Six measures DataDriven Sales could fund inside €150,000 and four months (the plan's framework). Costs, weeks, who
 * each aims at and the customers each one keeps are Case assumptions; every price is built from parts (set-up, a licence for the months, days or hours of
 * work) so a learner sees why it is that number. The score is the plan's own evaluation: Economic Viability × Effect × Sustainability. The plan also asks
 * for a return on investment per measure: the app computes it from two printed parts (customers kept a year × yearly value of one customer, and the cost);
 * the learner reads it and never calculates it (CLAUDE.md #44, #45). Economic Viability follows from the printed "aims at", so it is checkable; effect and
 * sustainability are the learner's judgement. (Field names keep the earlier ones: `exp` = Economic Viability, `eff` = Effect, `fea` = Sustainability;
 * `evidence` is the economic band, derived from `joins`; `targets` are the problems a measure answers. The problem ids use/retain/integrate are the three
 * problems of the brief: use = the data is not used, retain = churn is found too late, integrate = no control: nobody can tell which measure worked.)
 *
 * Three are strong, three are traps of different kinds: a monthly tips mail to every customer repeats a message and watches no change in use, a 20% discount
 * for every customer with low use buys a month of calm without changing why they use less, and the vendor's churn-score platform is over budget, in use only
 * after the four months, and gives scores nobody can explain.
 */
export type MeasureId = "unified" | "handover" | "predictive" | "chatbot" | "app" | "suite";
export const BUDGET = 150000;
export const MONTHS = 4;
/** The four months in weeks: the frame in which a measure has to start working. */
export const FRAME_WEEKS = MONTHS * 4;
export type Bucket = 1 | 2 | 3;

/** The yearly value of one customer (Case assumption, same as the order value of Materi A4): used for the return on investment. */
export const CUSTOMER_YEAR = 4800;

/**
 * The category printed after the weeks (CLAUDE.md #45): which of the levers taught in Materi A1 a measure uses (watch the signal, build depth of use, run
 * a fair test, give a discount). A fact about the measure taken from that card's own text, never a score and never the problem it answers.
 */
export type MeasureArea = "trust" | "switch" | "value" | "price";
export const MEASURE_AREA_LABEL = bi({
  trust: t("Watch the signal", "Das Signal beobachten"),
  switch: t("Build depth of use", "Tiefe der Nutzung aufbauen"),
  value: t("Run a fair test", "Einen fairen Test fahren"),
  price: t("Give a discount", "Einen Rabatt geben"),
});
export const AREA_NOTE = bi({
  v: t(
    "The brief names three problems. Each card carries a small label with the lever it uses (taught in Materi A1): watching the signal, building depth of use, running a fair test, or giving a discount.",
    "Der Auftrag nennt drei Probleme. Jede Karte trägt ein kleines Etikett mit dem Hebel, den sie nutzt (gelehrt in Materi A1): das Signal beobachten, Tiefe der Nutzung aufbauen, einen fairen Test fahren oder einen Rabatt geben.",
  ),
});

export type ProblemId = "use" | "retain" | "integrate";
export const PROBLEM_IDS: ProblemId[] = ["use", "retain", "integrate"];
export const PROBLEM_LABEL = bi({
  use: t("The data is not used", "Die Daten werden nicht genutzt"),
  retain: t("Churn is found too late", "Churn wird zu spät erkannt"),
  integrate: t("No control over what works", "Keine Kontrolle, was wirkt"),
});
/** The three problems in everyday words, for the picture under the cards. */
export const PROBLEM_PLAIN = bi({
  use: t("Usage, CRM and feedback data sit in three places and nobody reads them together", "Nutzungs-, CRM- und Feedback-Daten liegen an drei Orten, und niemand liest sie zusammen"),
  retain: t("A customer shows it is leaving weeks before, and nobody looks until the cancellation arrives", "Ein Kunde zeigt Wochen vorher, dass er geht, und niemand schaut hin, bis die Kündigung kommt"),
  integrate: t("Nobody can say which measure kept a customer", "Niemand kann sagen, welche Maßnahme einen Kunden gehalten hat"),
});

export type Joins = "all" | "one" | "none";
export type Evidence = "fast" | "mid" | "slow";
export const bandOf = (j: Joins): Evidence => (j === "all" ? "fast" : j === "one" ? "mid" : "slow");
export const JOINS_LABEL = bi({
  all: t("only the customers whose use has fallen and a signal can be read", "nur die Kunden, deren Nutzung gefallen ist und bei denen ein Signal lesbar ist"),
  one: t("those customers, with other customers mixed in", "diese Kunden, mit anderen Kunden dazwischen"),
  none: t("every customer, whatever the signal", "jeden Kunden, egal welches Signal"),
});
export const EVIDENCE_LABEL = bi({
  fast: t("aims at the customers where a signal can be read", "zielt auf die Kunden, bei denen ein Signal lesbar ist"),
  mid: t("aims at a mix", "zielt auf eine Mischung"),
  slow: t("aims at every customer", "zielt auf jeden Kunden"),
});
export const explainBucket = (e: Evidence): Bucket => (e === "fast" ? 3 : e === "mid" ? 2 : 1);
export const EXPLAIN_RULE = bi({
  v: t(
    "Economic Viability follows from who the measure is printed to aim at: only the customers whose use has fallen and a signal can be read scores 3, those customers with others mixed in scores 2, every customer whatever the signal scores 1. A measure that spends on customers who show no sign of leaving loses money, however good it sounds.",
    "Die Wirtschaftlichkeit folgt daraus, auf wen die Maßnahme laut Beschreibung zielt: nur die Kunden, deren Nutzung gefallen ist und bei denen ein Signal lesbar ist, ergibt 3, diese Kunden mit anderen dazwischen ergibt 2, jeden Kunden egal welches Signal ergibt 1. Eine Maßnahme, die Geld für Kunden ausgibt, die kein Zeichen des Gehens zeigen, verliert Geld, so gut sie auch klingt.",
  ),
});

/** The plain-word anchors for the two judged scores, printed under the score buttons and taught in Materi A7. */
export const EFFECT_ANCHOR = bi({
  v: t(
    "3 = it deals with a signal that comes before the cancellation, in a way the customer notices before deciding. 2 = it deals with the signal for only part of the customers, or the customer notices it only weakly. 1 = it repeats the same message or buys a month of calm without changing why the customer uses less.",
    "3 = Es geht auf ein Signal ein, das vor der Kündigung kommt, auf eine Weise, die der Kunde vor der Entscheidung bemerkt. 2 = Es geht nur für einen Teil der Kunden auf das Signal ein, oder der Kunde bemerkt es nur schwach. 1 = Es wiederholt dieselbe Botschaft oder erkauft einen Monat Ruhe, ohne zu ändern, warum der Kunde weniger nutzt.",
  ),
});
export const SCALE_ANCHOR = bi({
  v: t(
    "3 = it keeps working after the four months with people and tools DataDriven already has, and without a discount that repeats every year. 2 = it needs something new (a person, a tool, a training day per customer) but can be kept up. 1 = it works only while the budget keeps paying, or needs people or data DataDriven does not have.",
    "3 = Es wirkt nach den vier Monaten weiter, mit Leuten und Werkzeugen, die DataDriven schon hat, und ohne einen Rabatt, der sich jedes Jahr wiederholt. 2 = Es braucht etwas Neues (eine Person, ein Werkzeug, einen Schulungstag pro Kunde), lässt sich aber durchhalten. 1 = Es wirkt nur, solange das Budget weiter zahlt, oder braucht Leute oder Daten, die DataDriven nicht hat.",
  ),
});

export type CostPart = { label: string; amount: number };

export type Measure = {
  id: MeasureId;
  name: string;
  /** A short name for bars and rows. */
  short: string;
  /** In everyday words: what it is. */
  what: string;
  /** One concrete scene from DataDriven's day (CLAUDE.md #46). */
  scene: string;
  /** Who does what, and what the customer notices. */
  who: string;
  area: MeasureArea;
  basis: string;
  joins: Joins;
  evidence: Evidence;
  /** What the price is made of; `cost` is their sum. */
  costParts: CostPart[];
  cost: number;
  /** Customers this measure keeps a year (Case assumption); the return on investment is computed from it. */
  kept: number;
  weeks: number;
  targets: ProblemId[];
  model: { feasibility: Bucket; effect: Bucket; note: string };
  verdict: string;
};

/**
 * Identifiers keep the names of the file this was built from: `unified` is the weekly list of customers whose use fell, with a call by the account manager,
 * `handover` the short training on the modules a customer does not use, `predictive` the joined health view of usage and CRM data whose first offer is tested
 * on a random half, `chatbot` the monthly tips mail to every customer, `app` the 20% discount for every customer with low use and `suite` the vendor's
 * churn-score platform.
 */
export const MEASURES: Measure[] = [];
const RAW = bi([
  {
    id: "unified" as MeasureId,
    short: t("Usage alert and call", "Nutzungs-Alarm und Anruf"),
    name: t("A weekly list of customers whose use has fallen, and a call by the account manager within a week", "Eine wöchentliche Liste der Kunden, deren Nutzung gefallen ist, und ein Anruf des Account Managers innerhalb einer Woche"),
    what: t(
      "Every Monday the platform lists the customers whose active days fell under their own average of the last 90 days. The account manager decides who to call, asks what changed and agrees one next step. Every call and its result is logged in the CRM.",
      "Jeden Montag listet die Plattform die Kunden auf, deren aktive Tage unter ihren eigenen Durchschnitt der letzten 90 Tage fielen. Der Account Manager entscheidet, wen er anruft, fragt, was sich geändert hat, und vereinbart einen nächsten Schritt. Jeder Anruf und sein Ergebnis wird im CRM festgehalten.",
    ),
    scene: t(
      "On a Monday the list shows a customer whose admin has not logged in for 19 days. The account manager calls, learns that the admin left the company and a new person has no access, and fixes it that day. Without the list nobody would have looked until the renewal.",
      "An einem Montag zeigt die Liste einen Kunden, dessen Admin sich seit 19 Tagen nicht eingeloggt hat. Der Account Manager ruft an, erfährt, dass der Admin die Firma verlassen hat und eine neue Person keinen Zugang hat, und behebt es am selben Tag. Ohne die Liste hätte bis zur Verlängerung niemand hingesehen.",
    ),
    who: t(
      "IT builds the list once, and each account manager reads it on Monday and calls. The customer hears from a person who noticed, weeks before a cancellation would arrive.",
      "Die IT baut die Liste einmal, und jeder Account Manager liest sie montags und ruft an. Der Kunde hört von einer Person, die es bemerkt hat, Wochen bevor eine Kündigung käme.",
    ),
    area: "trust" as MeasureArea,
    basis: t("Aims at the customers whose use has fallen under their own average, where a signal can be read.", "Zielt auf die Kunden, deren Nutzung unter ihren eigenen Durchschnitt gefallen ist, bei denen ein Signal lesbar ist."),
    joins: "all" as Joins,
    costParts: [
      { label: t("IT builds the weekly list from the usage log, 15 days × €800", "IT baut die wöchentliche Liste aus dem Nutzungslog, 15 Tage × 800 €"), amount: 12000 },
      { label: t("account managers' time for the calls, 380 h × €80", "Zeit der Account Manager für die Anrufe, 380 Std. × 80 €"), amount: 30400 },
      { label: t("training for eight account managers, 8 × €1,200", "Training für acht Account Manager, 8 × 1.200 €"), amount: 9600 },
    ],
    cost: 0,
    kept: 24,
    weeks: 6,
    targets: ["use", "retain"] as ProblemId[],
    model: { feasibility: 2, effect: 3, note: t("It goes only to customers whose use has fallen, so economic 3; a call weeks before the renewal is what changes the outcome, so effect 3; it needs account-manager time that grows with the number of customers called, so sustainability 2.", "Es geht nur an Kunden, deren Nutzung gefallen ist, also Wirtschaftlichkeit 3; ein Anruf Wochen vor der Verlängerung ändert das Ergebnis, also Wirkung 3; es braucht Zeit der Account Manager, die mit der Zahl der angerufenen Kunden wächst, daher Nachhaltigkeit 2.") },
    verdict: t("A model measure: it reads the earliest signal and puts a person on it.", "Eine Modellmaßnahme: Sie liest das früheste Signal und setzt einen Menschen darauf an."),
  },
  {
    id: "handover" as MeasureId,
    short: t("Module training", "Modul-Schulung"),
    name: t("A short training on the modules a customer does not use, before it compares other tools", "Eine kurze Schulung zu den Modulen, die ein Kunde nicht nutzt, bevor er andere Tools vergleicht"),
    what: t(
      "Customers who use one or two of the five modules get a 45-minute session on a module that fits their work, with their own data. A customer who uses more modules is built more deeply into its work and leaves less often.",
      "Kunden, die ein oder zwei der fünf Module nutzen, bekommen eine 45-minütige Sitzung zu einem Modul, das zu ihrer Arbeit passt, mit ihren eigenen Daten. Ein Kunde, der mehr Module nutzt, ist tiefer in seine Arbeit eingebaut und geht seltener.",
    ),
    scene: t(
      "A customer uses only the reports module. In a 45-minute session a trainer shows it the alerts module on its own sales data. Two weeks later three more people from its team log in.",
      "Ein Kunde nutzt nur das Berichte-Modul. In einer 45-minütigen Sitzung zeigt ihm ein Trainer das Alarm-Modul an seinen eigenen Verkaufsdaten. Zwei Wochen später loggen sich drei weitere Personen seines Teams ein.",
    ),
    who: t(
      "A trainer runs the session and an account manager invites the customer. The customer gets something useful for its own work and sees no sales pitch.",
      "Ein Trainer hält die Sitzung, und ein Account Manager lädt den Kunden ein. Der Kunde bekommt etwas Nützliches für seine eigene Arbeit und sieht keinen Verkaufsgespräch.",
    ),
    area: "switch" as MeasureArea,
    basis: t("Aims at customers who use only one or two modules, whatever their activity.", "Zielt auf Kunden, die nur ein oder zwei Module nutzen, egal wie aktiv sie sind."),
    joins: "one" as Joins,
    costParts: [
      { label: t("trainer for 60 sessions, 60 × €400", "Trainer für 60 Sitzungen, 60 × 400 €"), amount: 24000 },
      { label: t("session material and sample data, 10 days × €800", "Sitzungsmaterial und Beispieldaten, 10 Tage × 800 €"), amount: 8000 },
      { label: t("account managers invite and follow up, 140 h × €80", "Account Manager laden ein und fassen nach, 140 Std. × 80 €"), amount: 11200 },
    ],
    cost: 0,
    kept: 18,
    weeks: 8,
    targets: ["retain"] as ProblemId[],
    model: { feasibility: 2, effect: 3, note: t("Depth of use is a slow but strong sign of staying, so effect 3; but it aims at every customer with few modules, not only those whose use fell, so economic 2; and a trainer per session does not shrink with volume, so sustainability 2.", "Tiefe der Nutzung ist ein langsames, aber starkes Zeichen fürs Bleiben, also Wirkung 3; aber es zielt auf alle Kunden mit wenigen Modulen, nicht nur auf die mit gefallener Nutzung, also Wirtschaftlichkeit 2; und ein Trainer pro Sitzung sinkt nicht mit dem Volumen, daher Nachhaltigkeit 2.") },
    verdict: t("A model measure: it builds depth of use, the slow sign that predicts staying.", "Eine Modellmaßnahme: Sie baut Tiefe der Nutzung auf, das langsame Zeichen, das das Bleiben vorhersagt."),
  },
  {
    id: "predictive" as MeasureId,
    short: t("Joined health view, tested", "Verbundene Health-Ansicht, getestet"),
    name: t("A health view that joins usage and CRM data, whose first offer is tested on a random half", "Eine Health-Ansicht, die Nutzungs- und CRM-Daten verbindet, deren erstes Angebot an einer zufälligen Hälfte getestet wird"),
    what: t(
      "IT joins the usage log with the CRM, so each account shows use, modules, contacts and tickets on one page. The first offer built on it (a guided restart) goes to a random half of the low-use customers; the other half is left alone, so the two renewal rates can be compared.",
      "Die IT verbindet das Nutzungslog mit dem CRM, sodass jeder Account Nutzung, Module, Kontakte und Tickets auf einer Seite zeigt. Das erste darauf gebaute Angebot (ein geführter Neustart) geht an eine zufällige Hälfte der Kunden mit geringer Nutzung; die andere Hälfte bleibt unberührt, sodass die beiden Verlängerungsquoten verglichen werden können.",
    ),
    scene: t(
      "The account page of a customer shows a fall in use, an open ticket and a missed call on one screen. Half of the customers like it get a guided restart now; the other half later. After 90 days the two renewal rates are compared.",
      "Die Account-Seite eines Kunden zeigt einen Rückgang der Nutzung, ein offenes Ticket und ein abgesagtes Gespräch auf einem Bildschirm. Die Hälfte der Kunden wie er bekommt jetzt einen geführten Neustart; die andere Hälfte später. Nach 90 Tagen werden die beiden Verlängerungsquoten verglichen.",
    ),
    who: t(
      "IT builds the joined page, the account manager uses it and runs the restart, and a CS analyst reads the test. The customer sees a relevant offer, and DataDriven can read whether it worked.",
      "Die IT baut die verbundene Seite, der Account Manager nutzt sie und führt den Neustart durch, und ein CS-Analyst liest den Test. Der Kunde sieht ein passendes Angebot, und DataDriven kann ablesen, ob es wirkte.",
    ),
    area: "value" as MeasureArea,
    basis: t("Aims at the customers whose use has fallen and the signals on the account page, where a signal can be read.", "Zielt auf die Kunden, deren Nutzung gefallen ist, und die Signale auf der Account-Seite, bei denen ein Signal lesbar ist."),
    joins: "all" as Joins,
    costParts: [
      { label: t("IT joins usage log and CRM, 25 days × €800", "IT verbindet Nutzungslog und CRM, 25 Tage × 800 €"), amount: 20000 },
      { label: t("CS analyst reads the test, 80 h × €100", "CS-Analyst liest den Test, 80 Std. × 100 €"), amount: 8000 },
      { label: t("guided restarts for 20 customers, 20 × €500", "Geführte Neustarts für 20 Kunden, 20 × 500 €"), amount: 10000 },
    ],
    cost: 0,
    kept: 15,
    weeks: 6,
    targets: ["use", "integrate"] as ProblemId[],
    model: { feasibility: 3, effect: 2, note: t("It goes only to customers whose use has fallen, so economic 3; it shows the signals and tests one offer but does not itself change the customer's use, so effect 2; and it runs on the log and the CRM DataDriven already has, with no discount that repeats, so sustainability 3.", "Es geht nur an Kunden, deren Nutzung gefallen ist, also Wirtschaftlichkeit 3; es zeigt die Signale und testet ein Angebot, ändert aber die Nutzung des Kunden nicht selbst, also Wirkung 2; und es läuft auf dem Log und dem CRM, die DataDriven schon hat, ohne einen Rabatt, der sich wiederholt, daher Nachhaltigkeit 3.") },
    verdict: t("A model measure: it joins the data and tells you whether the offer worked.", "Eine Modellmaßnahme: Sie verbindet die Daten und sagt Ihnen, ob das Angebot wirkte."),
  },
  {
    id: "chatbot" as MeasureId,
    short: t("Monthly tips mail", "Monatliche Tipps-Mail"),
    name: t("A monthly “tips and tricks” e-mail to all 1,400 customers", "Eine monatliche „Tipps und Tricks“-E-Mail an alle 1.400 Kunden"),
    what: t(
      "Every month for six months a friendly e-mail with product tips goes to every customer, whatever its activity.",
      "Sechs Monate lang geht jeden Monat eine freundliche E-Mail mit Produkttipps an jeden Kunden, egal wie aktiv er ist.",
    ),
    scene: t(
      "A customer who logs in every day gets the fourth tips mail. A customer whose admin left the company gets the same mail, and nobody reads it.",
      "Ein Kunde, der sich täglich einloggt, bekommt die vierte Tipps-Mail. Ein Kunde, dessen Admin die Firma verließ, bekommt dieselbe Mail, und niemand liest sie.",
    ),
    who: t(
      "Marketing writes and sends the series. Nobody checks who opens it or whether use changes. Customers see a friendly message that changes nothing.",
      "Das Marketing schreibt und versendet die Serie. Niemand prüft, wer sie öffnet oder ob sich die Nutzung ändert. Kunden sehen eine freundliche Nachricht, die nichts ändert.",
    ),
    area: "trust" as MeasureArea,
    basis: t("Aims at every customer, whatever the signal.", "Zielt auf jeden Kunden, egal welches Signal."),
    joins: "none" as Joins,
    costParts: [
      { label: t("writing and design, 18 days × €800", "Texten und Gestalten, 18 Tage × 800 €"), amount: 14400 },
      { label: t("sending tool, 6 months × €1,500", "Versandtool, 6 Monate × 1.500 €"), amount: 9000 },
      { label: t("list clean-up, 7 days × €800", "Listenbereinigung, 7 Tage × 800 €"), amount: 5600 },
    ],
    cost: 0,
    kept: 3,
    weeks: 3,
    targets: ["retain"] as ProblemId[],
    model: { feasibility: 3, effect: 1, note: t("It aims at every customer, whatever the signal, so economic 1; it repeats a friendly message and watches no change in use, so effect 1; but it is cheap and runs on its own, so sustainability 3.", "Es zielt auf jeden Kunden, egal welches Signal, also Wirtschaftlichkeit 1; es wiederholt eine freundliche Botschaft und beobachtet keine Änderung der Nutzung, also Wirkung 1; aber es ist billig und läuft von selbst, daher Nachhaltigkeit 3.") },
    verdict: t("Not in the model three: 3 points. It sends the same friendly message to everyone and watches no signal.", "Nicht unter den drei Modellmaßnahmen: 3 Punkte. Es schickt allen dieselbe freundliche Botschaft und beobachtet kein Signal."),
  },
  {
    id: "app" as MeasureId,
    short: t("20% discount for low use", "20 % Rabatt bei geringer Nutzung"),
    name: t("A 20% discount on the next renewal for every customer with low use", "Ein Rabatt von 20 % auf die nächste Verlängerung für jeden Kunden mit geringer Nutzung"),
    what: t(
      "Any customer with fewer than four active days a month is offered 20% off its next yearly fee if it renews early.",
      "Jedem Kunden mit weniger als vier aktiven Tagen im Monat wird 20 % Rabatt auf seine nächste Jahresgebühr angeboten, wenn er früh verlängert.",
    ),
    scene: t(
      "A customer with low use takes the discount and renews, but still logs in twice a month. A year later it cancels, because nothing about its use changed.",
      "Ein Kunde mit geringer Nutzung nimmt den Rabatt und verlängert, loggt sich aber weiter nur zweimal im Monat ein. Ein Jahr später kündigt er, weil sich an seiner Nutzung nichts änderte.",
    ),
    who: t(
      "Finance sets the discount and sales sends the offer. Nobody asks why use is low. Customers learn that low use is rewarded.",
      "Finance legt den Rabatt fest, der Vertrieb verschickt das Angebot. Niemand fragt, warum die Nutzung gering ist. Kunden lernen, dass geringe Nutzung belohnt wird.",
    ),
    area: "price" as MeasureArea,
    basis: t("Aims at every customer with low use, whatever the reason for it.", "Zielt auf jeden Kunden mit geringer Nutzung, egal aus welchem Grund."),
    joins: "none" as Joins,
    costParts: [
      { label: t("discount for about 60 customers, 60 × €4,800 × 20%", "Rabatt für etwa 60 Kunden, 60 × 4.800 € × 20 %"), amount: 57600 },
      { label: t("set-up in the contract tool", "Einrichtung im Vertragstool"), amount: 6000 },
      { label: t("approval process, 40 h × €100", "Genehmigungsprozess, 40 Std. × 100 €"), amount: 4000 },
    ],
    cost: 0,
    kept: 6,
    weeks: 2,
    targets: [] as ProblemId[],
    model: { feasibility: 1, effect: 1, note: t("It aims at every customer with low use, including those who would renew anyway, so economic 1; it buys a renewal without changing why use is low, so effect 1; and the discount is given away again every year, so sustainability 1.", "Es zielt auf jeden Kunden mit geringer Nutzung, auch auf die, die ohnehin verlängern würden, also Wirtschaftlichkeit 1; es erkauft eine Verlängerung, ohne zu ändern, warum die Nutzung gering ist, also Wirkung 1; und der Rabatt wird jedes Jahr wieder verschenkt, daher Nachhaltigkeit 1.") },
    verdict: t("Rejected: 1 point. It aims at everyone with low use, buys the renewal without changing the use, and the discount repeats every year.", "Verworfen: 1 Punkt. Es zielt auf alle mit geringer Nutzung, erkauft die Verlängerung, ohne die Nutzung zu ändern, und der Rabatt wiederholt sich jedes Jahr."),
  },
  {
    id: "suite" as MeasureId,
    short: t("Vendor churn score", "Anbieter-Churn-Score"),
    name: t("A churn-score platform from a vendor, with automatic alerts chosen by a prediction model", "Eine Churn-Score-Plattform eines Anbieters, mit automatischen Alarmen, die ein Vorhersagemodell wählt"),
    what: t(
      "A vendor cleans five years of customer records, trains a model that scores every customer on how likely it is to cancel, and sends alerts to account managers. The model's reasons are not shown.",
      "Ein Anbieter bereinigt fünf Jahre Kundendaten, trainiert ein Modell, das jeden Kunden danach bewertet, wie wahrscheinlich er kündigt, und sendet Alarme an die Account Manager. Die Gründe des Modells werden nicht gezeigt.",
    ),
    scene: t(
      "For twenty-four weeks the vendor cleans records and trains the model. Then an account manager gets an alert for a customer, but nobody at DataDriven can say which signal the score rests on.",
      "Vierundzwanzig Wochen lang bereinigt der Anbieter Daten und trainiert das Modell. Dann bekommt ein Account Manager einen Alarm zu einem Kunden, aber niemand bei DataDriven kann sagen, auf welchem Signal der Score beruht.",
    ),
    who: t(
      "A vendor builds and trains the model, IT cleans the data and account managers read scores nobody can explain. Customers notice nothing until the model is live, after the four months.",
      "Ein Anbieter baut und trainiert das Modell, die IT bereinigt die Daten und Account Manager lesen Scores, die niemand erklären kann. Kunden bemerken nichts, bis das Modell live ist, nach den vier Monaten.",
    ),
    area: "value" as MeasureArea,
    basis: t("On paper aims at the customers the model scores highest, the ones most likely to cancel.", "Zielt auf dem Papier auf die Kunden, die das Modell am höchsten bewertet, also die mit der größten Kündigungswahrscheinlichkeit."),
    joins: "all" as Joins,
    costParts: [
      { label: t("platform licences, 6 months × €8,000", "Plattform-Lizenzen, 6 Monate × 8.000 €"), amount: 48000 },
      { label: t("vendor builds and trains the model", "Anbieter baut und trainiert das Modell"), amount: 75000 },
      { label: t("data clean-up, 40 days × €800", "Datenbereinigung, 40 Tage × 800 €"), amount: 32000 },
    ],
    cost: 0,
    kept: 20,
    weeks: 24,
    targets: ["use", "retain", "integrate"] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("On paper it aims at the likeliest to cancel, so economic 3, and it acts on part of the signals, so effect 2; but it costs more than the whole budget, is in use only after 24 weeks, beyond the four months, and gives scores nobody can explain: sustainability 1.", "Auf dem Papier zielt es auf die Wahrscheinlichsten, die kündigen, also Wirtschaftlichkeit 3, und es geht auf einen Teil der Signale ein, also Wirkung 2; aber es kostet mehr als das ganze Budget, ist erst nach 24 Wochen im Einsatz, nach den vier Monaten, und liefert Scores, die niemand erklären kann: Nachhaltigkeit 1.") },
    verdict: t("Rejected: 6 points. Nothing changes for customers within the four months, it takes more than the whole budget and nobody can explain its scores.", "Verworfen: 6 Punkte. In den vier Monaten ändert sich für Kunden nichts, es nimmt mehr als das ganze Budget, und niemand kann seine Scores erklären."),
  },
]);
for (const m of RAW) {
  MEASURES.push(Object.assign(m, { evidence: bandOf(m.joins), cost: m.costParts.reduce((s, p) => s + p.amount, 0) }) as Measure);
}

export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, Measure>;
export const MEASURE_IDS = MEASURES.map((m) => m.id);
export const CHOOSE = 3;
export const modelScore = (id: MeasureId) => {
  const m = MEASURE_BY_ID[id];
  return explainBucket(m.evidence) * m.model.feasibility * m.model.effect;
};
export const MODEL_MEASURES: MeasureId[] = ["unified", "handover", "predictive"];
export const MODEL_COST = MODEL_MEASURES.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);

/** Return on investment of a measure, computed by the app (never by the learner): (customers kept × yearly value − cost) ÷ cost, in whole percent. */
export const revenueOf = (id: MeasureId) => MEASURE_BY_ID[id].kept * CUSTOMER_YEAR;
export const roiOf = (id: MeasureId) => {
  const m = MEASURE_BY_ID[id];
  return Math.round(((m.kept * CUSTOMER_YEAR - m.cost) / m.cost) * 100);
};

/** Weeks a measure is actually working inside the four months (0 when it only starts after them). */
export const workingWeeks = (id: MeasureId) => Math.max(0, FRAME_WEEKS - MEASURE_BY_ID[id].weeks);
