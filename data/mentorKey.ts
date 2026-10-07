import { LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { CHURN_TRUTH, FORECAST, VALUABLE_TRUTH } from "@/data/forecast";
import type { Basis } from "@/data/forecast";
import { AB_MODEL, MEANING_TRUTH, MEASURE_TRUTH, PATTERN_IDS, RECORDS, TRUTH_COUNTS, TRUTH_LEFT, riskOf } from "@/data/patterns";
import type { PatternId, PatternRow, RecId, UncId } from "@/data/patterns";
import { MEASURE_BY_ID, MODEL_MEASURES, explainBucket } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { ARCH_BY_ID, COMP_BY_ID, MODEL_COMPS, MODEL_GREATEST, OWNER_ACCEPT_LOGIC, R2_BUDGET, SITUATIONS, SOURCES, actionOf, useOf } from "@/data/route2";
import { MODEL_ARCH, MODEL_TIER } from "@/data/route2Panel";
import type { Criterion, LogicRow, Use } from "@/data/route2";
import { euro, num, tt } from "@/lib/lang";
import type { L1State, R2State, Score } from "@/store/useStore";

/**
 * Every model answer of the day, in one file. "Fill all model answers" in the mentor bar enters these, so that after one fill every
 * route's missing list is empty and every export downloads at once. Free text follows the site's language. A convenience for
 * facilitators, not security.
 */
export const MENTOR_PASSCODE = "muchson123";
/** The model order: by score, highest first (18, 18, 12). */
export const MODEL_ORDER: MeasureId[] = ["unified", "predictive", "handover"];

/** The model reason for the two judged scores of each model measure (CLAUDE.md #45): effect, sustainability, and a printed fact. */
const MEASURE_REASON: Record<string, () => string> = {
  unified: () =>
    tt(
      "Effect 3: it deals with a signal that comes weeks before the cancellation (a fall against the customer's own average), and the customer hears from a person who noticed, before deciding anything. Sustainability 2: it needs account-manager time, 380 hours are planned, and that time grows with the number of customers called; the card says 6 weeks.",
      "Wirkung 3: Es geht auf ein Signal ein, das Wochen vor der Kündigung kommt (ein Rückgang gegenüber dem eigenen Durchschnitt), und der Kunde hört von einer Person, die es bemerkt hat, bevor er etwas entscheidet. Nachhaltigkeit 2: Es braucht Zeit der Account Manager, 380 Stunden sind eingeplant, und diese Zeit wächst mit der Zahl der angerufenen Kunden; die Karte nennt 6 Wochen.",
    ),
  handover: () =>
    tt(
      "Effect 3: a customer that uses more modules is built more deeply into its work and leaves less often, so showing an unused module on its own data builds exactly that. Sustainability 2: a trainer is needed for each session, so it needs more sessions as more customers qualify; the card says 8 weeks.",
      "Wirkung 3: Ein Kunde, der mehr Module nutzt, ist tiefer in seine Arbeit eingebaut und geht seltener, also baut das Zeigen eines ungenutzten Moduls an seinen eigenen Daten genau das auf. Nachhaltigkeit 2: Für jede Sitzung wird ein Trainer gebraucht, also braucht es mehr Sitzungen, wenn mehr Kunden infrage kommen; die Karte nennt 8 Wochen.",
    ),
  predictive: () =>
    tt(
      "Effect 2: it shows the signals and tests one offer, but it does not itself change a customer's use, so it helps part of the customers. Sustainability 3: the usage log and the CRM already exist, the offer repeats no discount every year, and the card says 6 weeks.",
      "Wirkung 2: Es zeigt die Signale und testet ein Angebot, ändert aber die Nutzung eines Kunden nicht selbst, also hilft es einem Teil der Kunden. Nachhaltigkeit 3: Das Nutzungslog und das CRM gibt es schon, das Angebot wiederholt keinen Rabatt jedes Jahr, und die Karte nennt 6 Wochen.",
    ),
};

export function KEY_L1(): Partial<L1State> {
  return {
    sort: Object.fromEntries(LINES.map((r) => [r.id, r.truth])) as Record<LineId, LevelTag>,
    extraInsight: tt(
      "A useful extra figure is the number of different people who log in each month. A customer where more people use the platform has it built into more of its work. It is a figure about depth of use, so it answers a different question from the main admin's logins, and the system counts it by itself.",
      "Eine nützliche zusätzliche Zahl ist die Zahl der verschiedenen Personen, die sich pro Monat einloggen. Bei einem Kunden, bei dem mehr Personen die Plattform nutzen, ist sie in mehr von seiner Arbeit eingebaut. Es ist eine Zahl zur Tiefe der Nutzung, also beantwortet sie eine andere Frage als die Logins des Haupt-Admins, und das System zählt sie selbst.",
    ),
    meaning: tt(
      `Customers who used the platform intensively renewed at ${FORECAST.f1}% against ${FORECAST.controlRate}% for customers with low use, ${FORECAST.f2} times as often, so DataDriven should watch use as a signal, and test fairly whether a measure raises it, because intensive customers may simply be keener from the start.`,
      `Kunden, die die Plattform intensiv nutzten, verlängerten zu ${num(FORECAST.f1)} % gegenüber ${num(FORECAST.controlRate)} % bei Kunden mit geringer Nutzung, ${num(FORECAST.f2)}-mal so oft, also sollte DataDriven die Nutzung als Signal beobachten und fair testen, ob eine Maßnahme sie erhöht, weil intensive Kunden vielleicht einfach von Anfang an eifriger sind.`,
    ),
    valuable: [...VALUABLE_TRUTH],
    churners: [...CHURN_TRUTH],
    insights: [
      { basis: "usage" as Basis, text: tt("Customers whose active days fall under their own 90-day average cancel more often, so the platform should list them every Monday and the account manager should call within a week.", "Kunden, deren aktive Tage unter ihren eigenen 90-Tage-Durchschnitt fallen, kündigen häufiger, sodass die Plattform sie jeden Montag auflisten und der Account Manager innerhalb einer Woche anrufen sollte.") },
      { basis: "crm" as Basis, text: tt("Customers with few contacts and no logged call in the last quarter renew less often, so the CRM should flag them and the account manager should add a second contact in their company.", "Kunden mit wenigen Kontakten und ohne festgehaltenes Gespräch im letzten Quartal verlängern seltener, sodass das CRM sie markieren und der Account Manager einen zweiten Kontakt in ihrer Firma aufnehmen sollte.") },
      { basis: "feedback" as Basis, text: tt("Customers who give a low survey score or open several tickets in a row are often unhappy with one module, so the survey and the ticket tool should be joined to the customer page and the module owner should be asked to review the cases.", "Kunden, die einen niedrigen Umfragewert geben oder mehrere Tickets hintereinander öffnen, sind oft mit einem Modul unzufrieden, sodass Umfrage und Ticket-Tool mit der Kundenseite verbunden werden und der Modul-Owner die Fälle prüfen sollte.") },
    ],
    reflect: {
      interpret: tt("A signal is worth watching when it comes before the cancellation and the customer's own data shows it, such as active days that fell under the customer's own average (customers with low use renew at 60% against 90%). It is not worth building a measure on when it only follows a decision already made, such as a late invoice or a discount: by then the customer has decided.", "Ein Signal lohnt die Beobachtung, wenn es vor der Kündigung kommt und die eigenen Daten des Kunden es zeigen, etwa aktive Tage, die unter den eigenen Durchschnitt fielen (Kunden mit geringer Nutzung verlängern zu 60 % gegenüber 90 %). Auf ein Signal lohnt es sich nicht, eine Maßnahme aufzubauen, das nur einer schon getroffenen Entscheidung folgt, etwa eine späte Rechnung oder ein Rabatt: Dann hat der Kunde schon entschieden."),
      causation: tt("A correlation says that two things move together; a cause says that one changes the other. Intensive customers renew more often, but they may simply be keener or bigger from the start. Only a fair test shows what a measure adds: a random half of the low-use customers gets the measure, the other half is left alone, and the two renewal rates are compared. Use is a good signal, but raising use is only worth the cost if the test shows it keeps customers.", "Eine Korrelation sagt, dass sich zwei Dinge gemeinsam bewegen; eine Ursache sagt, dass das eine das andere verändert. Intensive Kunden verlängern häufiger, aber sie sind vielleicht einfach von Anfang an eifriger oder größer. Nur ein fairer Test zeigt, was eine Maßnahme bringt: Eine zufällige Hälfte der Kunden mit geringer Nutzung bekommt die Maßnahme, die andere Hälfte bleibt unberührt, und die beiden Verlängerungsquoten werden verglichen. Nutzung ist ein gutes Signal, aber die Nutzung zu erhöhen lohnt sich nur, wenn der Test zeigt, dass es Kunden hält."),
      decider: tt("Acting on the wrong signal means calling customers who were never going to leave, or giving a 20% discount to customers who would have renewed anyway. Unnecessary costs arise from a dashboard of many metrics nobody acts on and from a discount that repeats every year. A strategic decision-maker starts with the few signals that come early and that the systems count, tests each measure on a random half and compares the return on investment before scaling.", "Auf das falsche Signal zu handeln heißt, Kunden anzurufen, die nie gehen wollten, oder Kunden 20 % Rabatt zu geben, die ohnehin verlängert hätten. Unnötige Kosten entstehen durch ein Dashboard mit vielen Kennzahlen, nach denen niemand handelt, und durch einen Rabatt, der sich jedes Jahr wiederholt. Eine strategische Entscheiderin beginnt mit den wenigen Signalen, die früh kommen und die die Systeme zählen, testet jede Maßnahme an einer zufälligen Hälfte und vergleicht den Return on Investment, bevor sie skaliert."),
    },
    tags: Object.fromEntries(RECORDS.map((r) => [r.id, r.truth])) as Record<RecId, PatternId>,
    unc: ["sample", "cause", "missing", "shift"] as UncId[],
    rows: Object.fromEntries(PATTERN_IDS.map((x) => [x, { risk: riskOf(TRUTH_LEFT[x], TRUTH_COUNTS[x]), meaning: MEANING_TRUTH[x], measure: MEASURE_TRUTH[x] }])) as Record<PatternId, PatternRow>,
    misread: tt(
      "1) Active days per customer per month compared with the customer's own average (use of the platform), from the usage log, aim: a fall of a third triggers a call within a week. 2) Share of the five modules a customer uses (depth of use), from the product configuration, aim: one or two modules triggers a training offer. 3) Share of check-in calls the customer keeps (contact and feedback), from the CRM contact log, aim: two cancelled calls in a row trigger a second contact.",
      "1) Aktive Tage pro Kunde und Monat im Vergleich zum eigenen Durchschnitt des Kunden (Nutzung der Plattform), aus dem Nutzungslog, Ziel: Ein Rückgang um ein Drittel löst einen Anruf innerhalb einer Woche aus. 2) Anteil der fünf Module, die ein Kunde nutzt (Tiefe der Nutzung), aus der Produktkonfiguration, Ziel: Ein oder zwei Module lösen ein Schulungsangebot aus. 3) Anteil der Check-in-Gespräche, die der Kunde einhält (Kontakt und Feedback), aus dem CRM-Kontaktprotokoll, Ziel: Zwei abgesagte Gespräche hintereinander lösen einen zweiten Kontakt aus.",
    ),
    ab: {
      ...AB_MODEL,
      hyp: tt("If the account manager calls a low-use customer within a week of the fall instead of leaving it alone, then the share who renew and are still active after 90 days rises, because the customer hears from a person that someone noticed.", "Wenn der Account Manager einen Kunden mit geringer Nutzung innerhalb einer Woche nach dem Rückgang anruft, statt ihn in Ruhe zu lassen, dann steigt der Anteil, der verlängert und nach 90 Tagen noch aktiv ist, weil der Kunde von einer Person hört, dass jemand es bemerkt hat."),
      rule: tt("Roll out if the renewal rate of called customers is at least 10 points higher than the control group, with 100 low-use customers per group and no rise in discount requests; keep testing if 3 to 10 points higher; stop if less than 3 points higher.", "Ausrollen, wenn die Verlängerungsquote der angerufenen Kunden bei 100 Kunden mit geringer Nutzung pro Gruppe mindestens 10 Punkte über der Kontrollgruppe liegt und die Rabattanfragen nicht steigen; weiter testen bei 3 bis 10 Punkten darüber; stoppen bei weniger als 3 Punkten darüber."),
    },
    chosen: [...MODEL_MEASURES],
    exp: Object.fromEntries(MODEL_MEASURES.map((id) => [id, explainBucket(MEASURE_BY_ID[id].evidence)])) as Record<string, Score>,
    fea: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.feasibility])) as Record<string, Score>,
    eff: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.effect])) as Record<string, Score>,
    reasons: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_REASON[id]()])) as Record<string, string>,
    order: [...MODEL_ORDER],
    why: tt(
      "The usage alert and call goes first with 18: it goes only to customers whose use has fallen, and it reads the earliest signal. Its return on investment is 122%. The joined health view comes second, also with 18: it runs on the log and the CRM DataDriven already has and its first offer can be measured on a random half. The module training comes third with 12: it builds depth of use, but it aims at everyone with few modules and needs a trainer per session. The three cost €133,200 of the €150,000; the monthly tips mail is left out because it sends the same message to everyone and watches no signal, the 20% discount for low use buys the renewal without changing the use and repeats every year, and the vendor platform costs more than the whole budget and would not be in use within four months.",
      "Der Nutzungs-Alarm mit Anruf kommt zuerst mit 18: Er geht nur an Kunden, deren Nutzung gefallen ist, und liest das früheste Signal. Sein Return on Investment beträgt 122 %. Die verbundene Health-Ansicht kommt als Zweites, ebenfalls mit 18: Sie läuft auf dem Log und dem CRM, die DataDriven schon hat, und ihr erstes Angebot lässt sich an einer zufälligen Hälfte messen. Die Modul-Schulung kommt als Drittes mit 12: Sie baut Tiefe der Nutzung auf, zielt aber auf alle mit wenigen Modulen und braucht einen Trainer pro Sitzung. Die drei kosten 133.200 € von 150.000 €; die monatliche Tipps-Mail bleibt draußen, weil sie allen dieselbe Botschaft schickt und kein Signal beobachtet, der Rabatt von 20 % bei geringer Nutzung die Verlängerung erkauft, ohne die Nutzung zu ändern, und sich jedes Jahr wiederholt, und die Anbieter-Plattform mehr als das ganze Budget kostet und in vier Monaten nicht im Einsatz wäre.",
    ),
  };
}

export function KEY_R2(): Partial<R2State> {
  const rate: Record<string, Score> = {};
  for (const id of MODEL_COMPS) for (const c of ["explain", "timely", "reach", "scale"] as Criterion[]) rate[`${id}.${c}`] = COMP_BY_ID[id].model[c];
  const logic: Record<string, LogicRow> = {};
  for (const s of SITUATIONS) logic[s.id] = { action: actionOf(s), owner: OWNER_ACCEPT_LOGIC[s.id][0] };
  const spent = MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  return {
    principles: ["defs", "rules", "review"],
    principleText: {
      defs: tt("Customer success, sales and product read one page per customer, with use, modules, contacts, tickets and contract, so every action starts from the same facts; this answers “no control over what works”.", "Customer Success, Vertrieb und Produkt lesen eine Seite pro Kunde, mit Nutzung, Modulen, Kontakten, Tickets und Vertrag, sodass jede Maßnahme bei denselben Fakten beginnt; das beantwortet „keine Kontrolle, was wirkt“."),
      rules: tt("Each alert has a written rule: which signal triggers it, who acts within five working days and what is logged, so nobody waits for somebody else, which answers the risk that a good alert is never acted on.", "Jeder Alarm hat eine schriftliche Regel: welches Signal ihn auslöst, wer innerhalb von fünf Arbeitstagen handelt und was festgehalten wird, sodass niemand auf jemand anderen wartet, was das Risiko beantwortet, dass nach einem guten Alarm nie gehandelt wird."),
      review: tt("Every month the same few numbers decide which measure is kept, changed or stopped: how many called customers renewed and how many of the control group did, and the return on investment, so DataDriven improves by measured steps instead of one big bet.", "Jeden Monat entscheiden dieselben wenigen Zahlen, welche Maßnahme bleibt, sich ändert oder gestoppt wird: wie viele angerufene Kunden verlängerten und wie viele aus der Kontrollgruppe, und der Return on Investment, sodass DataDriven in gemessenen Schritten besser wird statt mit einer großen Wette."),
    },
    sources: Object.fromEntries(SOURCES.map((s) => [s.id, useOf(s)])) as Record<string, Use>,
    comps: [...MODEL_COMPS],
    rate,
    greatest: MODEL_GREATEST,
    greatestWhy: tt(
      "The renewal rate is the result everything else exists for. It moves with every measure, covers every customer due for renewal and is counted from the CRM every week, so each measure can be steered by it within weeks, and together with the cost it shows quickly whether a measure is worth what it costs.",
      "Die Renewal Rate ist das Ergebnis, für das alles andere da ist. Sie bewegt sich mit jeder Maßnahme, deckt jeden Kunden mit anstehender Verlängerung ab und wird jede Woche aus dem CRM gezählt, sodass sich jede Maßnahme innerhalb von Wochen daran steuern lässt, und zusammen mit den Kosten zeigt sie schnell, ob eine Maßnahme ihr Geld wert ist.",
    ),
    logic,
    tier: { ...MODEL_TIER },
    vision: tt(
      "DataDriven sees a customer's trouble weeks before the cancellation: one page per customer shows use, modules, contacts and tickets, every alert has a written rule and an owner, and effort goes first to the customers whose use has fallen and who are worth most. Every measure is tested on a random half before it grows, and a monthly review keeps, changes or stops it by renewal rate and return on investment. The company steers by three KPIs, so acting on a signal replaces waiting for the cancellation.",
      "DataDriven sieht den Ärger eines Kunden Wochen vor der Kündigung: Eine Seite pro Kunde zeigt Nutzung, Module, Kontakte und Tickets, jeder Alarm hat eine schriftliche Regel und einen Owner, und der Aufwand geht zuerst an die Kunden, deren Nutzung gefallen ist und die am meisten wert sind. Jede Maßnahme wird an einer zufälligen Hälfte getestet, bevor sie wächst, und ein monatliches Review behält, ändert oder stoppt sie nach Renewal Rate und Return on Investment. Das Unternehmen steuert über drei KPIs, sodass das Handeln nach einem Signal das Warten auf die Kündigung ersetzt.",
    ),
    giveUp: tt(
      `The plan gives me one KPI system and one joined customer view, clean data, early-warning alerts (a call for a fall in use, a training offer for few modules), an A/B test routine and trained account managers. The health score by value starts once the data is clean. It costs me the vendor churn platform and the 20% discount for low use, which name no KPI (the platform is in use only in month 7). ${euro(R2_BUDGET - spent)} stay unspent. If the data is weaker, the early-warning alerts rest on data below 80% complete, so I watch them first.`,
      `Der Plan gibt mir ein KPI-System und eine verbundene Kundenansicht, saubere Daten, Frühwarn-Alarme (einen Anruf bei sinkender Nutzung, ein Schulungsangebot bei wenigen Modulen), eine A/B-Test-Routine und geschulte Account Manager. Der Health Score nach Wert startet, sobald die Daten sauber sind. Er kostet mich die Churn-Plattform des Anbieters und den Rabatt von 20 % bei geringer Nutzung, die keinen KPI nennen (die Plattform ist erst in Monat 7 im Einsatz). ${euro(R2_BUDGET - spent)} bleiben ungenutzt. Sind die Daten schwächer, beruhen die Frühwarn-Alarme auf Daten unter 80 % Vollständigkeit, also beobachte ich sie zuerst.`,
    ),
    decision: "stage",
    decisionWhy: tt(
      "It is the investment decision the brief asks for despite an unclear forecast: start with the data that is already complete (the usage log and the contract data), fix the gaps with the clean-up, test every measure on a random half, measure from the first week and spend the rest as the evidence arrives. The health score by value waits for clean data, and the vendor platform and the discount stay out because neither names a KPI and the platform arrives only in month 7.",
      "Es ist die Investitionsentscheidung, die der Auftrag trotz unklarer Prognose verlangt: mit den Daten beginnen, die schon vollständig sind (das Nutzungslog und die Vertragsdaten), die Lücken mit der Bereinigung schließen, jede Maßnahme an einer zufälligen Hälfte testen, ab der ersten Woche messen und den Rest ausgeben, wie die Evidenz kommt. Der Health Score nach Wert wartet auf saubere Daten, und die Anbieter-Plattform und der Rabatt bleiben draußen, weil keiner einen KPI nennt und die Plattform erst in Monat 7 ankommt.",
    ),
    watch: tt(
      "I watch the renewal rate: today it is 8%, and if it has not clearly risen, towards 15%, by month 3 on at least 100 customers due for renewal, I stop adding measures and rewrite the call guide with the account managers. I also watch the share of low-use customers who have not been contacted after 30 days: today 70%, and if it is not below that by month 4, I pause the alert that creates the most cases with no call.",
      "Ich beobachte die Renewal Rate: Heute liegt sie bei 8 %, und ist sie bis Monat 3 bei mindestens 100 Kunden mit anstehender Verlängerung nicht deutlich gestiegen, Richtung 15 %, höre ich auf, Maßnahmen hinzuzufügen, und schreibe den Gesprächsleitfaden mit den Account Managern neu. Ich beobachte auch den Anteil der Kunden mit geringer Nutzung, die nach 30 Tagen nicht kontaktiert wurden: heute 70 %, und liegt er bis Monat 4 nicht darunter, pausiere ich den Alarm, der die meisten Fälle ohne Anruf erzeugt.",
    ),
  };
}
