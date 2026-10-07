import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Blocks 2.1–2.3. Four families of behaviour pattern in the customer data (Materi A5) and twelve findings DataDriven Sales could read, each
 * with whether it moved together with churn last year; the A/B test card of Block 2.3 (Materi A6). (Identifiers keep the names of the file this was
 * built from: a "pattern" is a family of data, a "record" is one finding, and the outcome "left" means "moved with churn": in the three months before
 * renewal the figure was clearly different for the customers who cancelled than for those who stayed.)
 * Every figure is a Case assumption. `truth` is never printed outside the mentor answer key. Counts are 3/3/3/3.
 */
export type PatternId = "usage" | "depth" | "interaction" | "commercial";
export const PATTERN_IDS: PatternId[] = ["usage", "depth", "interaction", "commercial"];

export const PATTERNS = bi({
  usage: {
    id: "usage" as PatternId,
    label: t("Use of the platform", "Nutzung der Plattform"),
    means: t("How often customers use the platform: active days, logins, reports built. The system counts it by itself, per customer, so nobody has to write it down.", "Wie oft Kunden die Plattform nutzen: aktive Tage, Logins, gebaute Berichte. Das System zählt es selbst, pro Kunde, also muss es niemand aufschreiben."),
    shape: t("counted by the systems", "von den Systemen gezählt"),
    test: t("Is it how often customers use the platform, counted by the system?", "Ist es, wie oft Kunden die Plattform nutzen, gezählt vom System?"),
  },
  depth: {
    id: "depth" as PatternId,
    label: t("Depth of use", "Tiefe der Nutzung"),
    means: t("How much of the product customers use: modules, people, connected data sources. The system counts it too, but it changes slowly: it shows how deeply the platform is built into the customer's work.", "Wie viel vom Produkt Kunden nutzen: Module, Personen, angebundene Datenquellen. Auch das zählt das System, aber es ändert sich langsam: Es zeigt, wie tief die Plattform in die Arbeit des Kunden eingebaut ist."),
    shape: t("counted by the systems, changes slowly", "von den Systemen gezählt, ändert sich langsam"),
    test: t("Is it how much of the product a customer uses (modules, people, sources)?", "Ist es, wie viel vom Produkt ein Kunde nutzt (Module, Personen, Quellen)?"),
  },
  interaction: {
    id: "interaction" as PatternId,
    label: t("Contact and feedback", "Kontakt und Feedback"),
    means: t("What customers do with our people and what they say: tickets, calls kept, survey answers. It shows only if someone logs it, and often late.", "Was Kunden mit unseren Leuten tun und was sie sagen: Tickets, eingehaltene Gespräche, Umfrageantworten. Es zeigt sich nur, wenn jemand es festhält, und oft spät."),
    shape: t("noted by people", "von Menschen festgehalten"),
    test: t("Is it a ticket, a call or an answer between the customer and our people?", "Ist es ein Ticket, ein Gespräch oder eine Antwort zwischen dem Kunden und unseren Leuten?"),
  },
  commercial: {
    id: "commercial" as PatternId,
    label: t("What they buy and pay", "Was sie kaufen und zahlen"),
    means: t("Orders, extra licences, discounts and payment behaviour: seen in sales and finance. It mostly follows a decision the customer has already made instead of leading it.", "Bestellungen, zusätzliche Lizenzen, Rabatte und Zahlungsverhalten: in Vertrieb und Finanzen sichtbar. Es folgt meist einer Entscheidung, die der Kunde schon getroffen hat, statt sie anzuführen."),
    shape: t("seen in sales and finance", "in Vertrieb und Finanzen sichtbar"),
    test: t("Is it about orders, price, discounts or payment?", "Geht es um Bestellungen, Preis, Rabatte oder Zahlung?"),
  },
});

export const PATTERN_PAIR_TESTS = bi([
  { pair: t("Use or depth?", "Nutzung oder Tiefe?"), test: t("Use is how often (active days, logins, reports). Depth is how much (modules, people, sources). Ask: how often, or how much?", "Nutzung ist, wie oft (aktive Tage, Logins, Berichte). Tiefe ist, wie viel (Module, Personen, Quellen). Fragen Sie: wie oft, oder wie viel?") },
  { pair: t("Use or contact?", "Nutzung oder Kontakt?"), test: t("Use is what customers do in the platform and the system counts it. Contact is what they do with our people: a ticket, a call, an answer.", "Nutzung ist das, was Kunden in der Plattform tun und das System zählt. Kontakt ist das, was sie mit unseren Leuten tun: ein Ticket, ein Gespräch, eine Antwort.") },
  { pair: t("Contact or what they buy and pay?", "Kontakt oder was sie kaufen und zahlen?"), test: t("A ticket or a survey answer is contact and feedback: someone talked or answered. An order, a discount or a late invoice is what they buy and pay: an action about money.", "Ein Ticket oder eine Umfrageantwort ist Kontakt und Feedback: Jemand sprach oder antwortete. Eine Bestellung, ein Rabatt oder eine späte Rechnung ist, was sie kaufen und zahlen: eine Handlung rund ums Geld.") },
]);

export type RecId = "p01" | "p02" | "p03" | "p04" | "p05" | "p06" | "p07" | "p08" | "p09" | "p10" | "p11" | "p12";
/** outcome "left" = moved with churn last year; "stayed" = did not move with it. */
export type Record_ = { id: RecId; code: string; text: string; outcome: "stayed" | "left"; truth: PatternId; clue: string; why: string; rejected: Partial<Record<PatternId, string>> };
export const OUTCOME_LABEL = bi({ stayed: t("Did not move with churn", "Bewegte sich nicht mit dem Churn"), left: t("Moved with churn", "Bewegte sich mit dem Churn") });

export const RECORDS: Record_[] = bi([
  { id: "p01" as RecId, code: "D-01", outcome: "left" as const, text: t("Active days per customer per month compared with the customer's own average of the last 90 days.", "Aktive Tage pro Kunde und Monat im Vergleich zum eigenen Durchschnitt des Kunden der letzten 90 Tage."), truth: "usage" as PatternId, clue: t("Who counts it, the system or a person?", "Wer zählt es, das System oder eine Person?"), why: t("The platform counts it by itself: use of the platform. A fall against the customer's own average showed before most cancellations.", "Die Plattform zählt es selbst: Nutzung der Plattform. Ein Rückgang gegenüber dem eigenen Durchschnitt des Kunden zeigte sich vor den meisten Kündigungen."), rejected: { interaction: t("Nobody has to notice or write anything down; the system counts it.", "Niemand muss etwas bemerken oder aufschreiben; das System zählt es.") } },
  { id: "p02" as RecId, code: "D-02", outcome: "left" as const, text: t("Number of reports a customer builds per month.", "Zahl der Berichte, die ein Kunde pro Monat baut."), truth: "usage" as PatternId, clue: t("Is it how often, or how much of the product?", "Ist es, wie oft, oder wie viel vom Produkt?"), why: t("Reports built are counted by the platform: use of the platform. Customers who stopped building reports often cancelled.", "Gebaute Berichte zählt die Plattform: Nutzung der Plattform. Kunden, die aufhörten, Berichte zu bauen, kündigten oft."), rejected: { depth: t("It counts how often something is done, not how many modules or people are involved.", "Sie zählt, wie oft etwas getan wird, nicht wie viele Module oder Personen beteiligt sind.") } },
  { id: "p03" as RecId, code: "D-03", outcome: "left" as const, text: t("Days since the main admin last logged in.", "Tage seit dem letzten Login des Haupt-Admins."), truth: "usage" as PatternId, clue: t("A login is something the platform records. Is it a conversation?", "Einen Login hält die Plattform fest. Ist es ein Gespräch?"), why: t("A login is counted by the platform: use of the platform. An admin who stops logging in is often the first sign.", "Einen Login zählt die Plattform: Nutzung der Plattform. Ein Admin, der sich nicht mehr einloggt, ist oft das erste Zeichen."), rejected: { interaction: t("It is not a call or a ticket; it is a login the system records.", "Es ist weder ein Gespräch noch ein Ticket; es ist ein Login, den das System festhält.") } },
  { id: "p04" as RecId, code: "D-04", outcome: "left" as const, text: t("Share of the five modules a customer uses.", "Anteil der fünf Module, die ein Kunde nutzt."), truth: "depth" as PatternId, clue: t("Is it how often, or how much of the product?", "Ist es, wie oft, oder wie viel vom Produkt?"), why: t("It counts how much of the product the customer uses: depth of use. Customers who used more modules cancelled less.", "Sie zählt, wie viel vom Produkt der Kunde nutzt: Tiefe der Nutzung. Kunden, die mehr Module nutzten, kündigten seltener."), rejected: { usage: t("It does not count how often the customer logs in, but how many modules it uses.", "Sie zählt nicht, wie oft sich der Kunde einloggt, sondern wie viele Module er nutzt.") } },
  { id: "p05" as RecId, code: "D-05", outcome: "left" as const, text: t("Number of different people at a customer who log in each month.", "Zahl der verschiedenen Personen eines Kunden, die sich pro Monat einloggen."), truth: "depth" as PatternId, clue: t("Is it about days, or about how many people?", "Geht es um Tage, oder um wie viele Personen?"), why: t("More people means the platform is built into more of the customer's work: depth of use.", "Mehr Personen heißt, dass die Plattform in mehr von der Arbeit des Kunden eingebaut ist: Tiefe der Nutzung."), rejected: { usage: t("It counts people, not days: how much of the organisation uses the platform.", "Sie zählt Personen, nicht Tage: wie viel der Organisation die Plattform nutzt.") } },
  { id: "p06" as RecId, code: "D-06", outcome: "stayed" as const, text: t("Number of exports to Excel per month.", "Zahl der Exporte nach Excel pro Monat."), truth: "depth" as PatternId, clue: t("Tag what it measures, not whether it moved. Who counts it?", "Ordnen Sie zu, was es misst, nicht ob es sich bewegte. Wer zählt es?"), why: t("Exports are counted by the platform and show how much is taken out of it: depth of use. They did not move with churn last year: customers who stay and customers who leave both export, so it is a finding about this figure, not another family.", "Exporte zählt die Plattform, und sie zeigen, wie viel herausgenommen wird: Tiefe der Nutzung. Sie bewegten sich letztes Jahr nicht mit dem Churn: Kunden, die bleiben, und Kunden, die gehen, exportieren beide, das ist also ein Befund zu dieser Zahl, keine andere Familie."), rejected: { commercial: t("Nothing is ordered or paid; the platform counted it.", "Nichts wird bestellt oder bezahlt; die Plattform hat es gezählt.") } },
  { id: "p07" as RecId, code: "D-07", outcome: "left" as const, text: t("Share of check-in calls the customer keeps.", "Anteil der Check-in-Gespräche, die der Kunde einhält."), truth: "interaction" as PatternId, clue: t("Is a call kept something the customer does with our people?", "Ist ein eingehaltenes Gespräch etwas, das der Kunde mit unseren Leuten tut?"), why: t("A call that is kept or cancelled is the customer's people dealing with ours: contact and feedback. It shows only if the calls are logged.", "Ein Gespräch, das stattfindet oder abgesagt wird, ist der Umgang der Leute des Kunden mit unseren: Kontakt und Feedback. Es zeigt sich nur, wenn die Gespräche festgehalten werden."), rejected: { usage: t("Nothing is counted in the platform; it comes from the CRM.", "In der Plattform wird nichts gezählt; es kommt aus dem CRM.") } },
  { id: "p08" as RecId, code: "D-08", outcome: "stayed" as const, text: t("Number of support tickets in the last quarter.", "Zahl der Support-Tickets im letzten Quartal."), truth: "interaction" as PatternId, clue: t("More tickets: more trouble, or more users?", "Mehr Tickets: mehr Ärger, oder mehr Nutzer?"), why: t("A ticket is a customer talking to our people: contact and feedback. It did not move with churn last year: tickets also rise with growth, so a rise alone says little.", "Ein Ticket ist ein Kunde, der mit unseren Leuten spricht: Kontakt und Feedback. Es bewegte sich letztes Jahr nicht mit dem Churn: Tickets steigen auch mit Wachstum, ein Anstieg allein sagt also wenig."), rejected: { usage: t("A ticket is a person writing to us, not the platform counting use.", "Ein Ticket ist eine Person, die uns schreibt, nicht die Plattform, die Nutzung zählt.") } },
  { id: "p09" as RecId, code: "D-09", outcome: "stayed" as const, text: t("Survey score (NPS) of the customer's last survey.", "Umfragewert (NPS) der letzten Umfrage des Kunden."), truth: "interaction" as PatternId, clue: t("Did the customer do something, or say something?", "Hat der Kunde etwas getan, oder etwas gesagt?"), why: t("A score is what the customer says when asked: contact and feedback. Only 15% answered and most who left did not, so it did not move with churn.", "Ein Wert ist, was der Kunde sagt, wenn er gefragt wird: Kontakt und Feedback. Nur 15 % antworteten, und die meisten, die gingen, nicht, also bewegte er sich nicht mit dem Churn."), rejected: { commercial: t("A score is an opinion; nothing is bought or paid.", "Ein Wert ist eine Meinung; nichts wird gekauft oder bezahlt.") } },
  { id: "p10" as RecId, code: "D-10", outcome: "stayed" as const, text: t("Orders for extra user licences in the last year.", "Bestellungen zusätzlicher Nutzerlizenzen im letzten Jahr."), truth: "commercial" as PatternId, clue: t("Is it counted in the platform, or seen in sales?", "Wird es in der Plattform gezählt, oder im Vertrieb gesehen?"), why: t("An order is about what a customer buys: what they buy and pay. Customers who left had often ordered licences earlier, so it did not move with churn.", "Eine Bestellung betrifft, was ein Kunde kauft: was sie kaufen und zahlen. Kunden, die gingen, hatten oft früher Lizenzen bestellt, also bewegte es sich nicht mit dem Churn."), rejected: { depth: t("More licences can mean more people, but the figure is an order seen in sales, not the platform's own count of people using it.", "Mehr Lizenzen können mehr Personen heißen, aber die Zahl ist eine Bestellung, die der Vertrieb sieht, nicht die eigene Zählung der Plattform, wer sie nutzt.") } },
  { id: "p11" as RecId, code: "D-11", outcome: "stayed" as const, text: t("Invoices paid more than 30 days late.", "Rechnungen, die mehr als 30 Tage zu spät bezahlt werden."), truth: "commercial" as PatternId, clue: t("Which department sees it first?", "Welche Abteilung sieht es zuerst?"), why: t("A late invoice is seen in finance and is about money: what they buy and pay. It did not move with churn last year: late payment mostly reflected slow accounts payable, not leaving.", "Eine späte Rechnung sieht die Finanzabteilung zuerst, und sie betrifft Geld: was sie kaufen und zahlen. Sie bewegte sich letztes Jahr nicht mit dem Churn: Späte Zahlung zeigte meist langsame Kreditorenbuchhaltung, keinen Abschied."), rejected: { interaction: t("Nobody talks or answers; an invoice is paid or not.", "Niemand spricht oder antwortet; eine Rechnung wird bezahlt oder nicht.") } },
  { id: "p12" as RecId, code: "D-12", outcome: "stayed" as const, text: t("Discount percentage a customer got at its last renewal.", "Rabatt in Prozent, den ein Kunde bei seiner letzten Verlängerung bekam."), truth: "commercial" as PatternId, clue: t("Is it a conversation, or a price agreed in sales?", "Ist es ein Gespräch, oder ein im Vertrieb vereinbarter Preis?"), why: t("A discount is about price: what they buy and pay. Customers with larger discounts left about as often as others, so it did not move with churn.", "Ein Rabatt betrifft den Preis: was sie kaufen und zahlen. Kunden mit größeren Rabatten gingen etwa so oft wie andere, also bewegte er sich nicht mit dem Churn."), rejected: { interaction: t("It is a price agreed in sales, not a conversation or an opinion.", "Es ist ein im Vertrieb vereinbarter Preis, kein Gespräch und keine Meinung.") } },
]);
export const REC_IDS: RecId[] = ["p01", "p02", "p03", "p04", "p05", "p06", "p07", "p08", "p09", "p10", "p11", "p12"];
export const REC_BY_ID = Object.fromEntries(RECORDS.map((r) => [r.id, r])) as Record<RecId, Record_>;

const zero = () => ({ usage: 0, depth: 0, interaction: 0, commercial: 0 }) as Record<PatternId, number>;
export const TRUTH_COUNTS: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + 1 }), zero());
export const TRUTH_LEFT: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + (x.outcome === "left" ? 1 : 0) }), zero());

/* ------------------------------------------------------------------ Block 2.2 · link to churn, when each family shows, how to use it */

export type Risk = "high" | "mid" | "low";
export const RISK_LABEL = bi({ high: t("Strong", "Stark"), mid: t("Partial", "Teilweise"), low: t("None", "Keine") });
export const RISK_GLYPH: Record<Risk, string> = { high: "●", mid: "◐", low: "○" };
export const riskOf = (moved: number, count: number): Risk | null => (count === 0 ? null : moved / count >= 0.5 ? "high" : moved > 0 ? "mid" : "low");
export const RISK_RULE = bi({ v: t("Link to churn from last year: half or more of the family's findings moved with churn = Strong; some did = Partial; none did = None.", "Verbindung zum Churn aus dem letzten Jahr: Die Hälfte oder mehr der Befunde dieser Familie bewegte sich mit dem Churn = Stark; einige = Teilweise; keiner = Keine.") });

export type MeaningId = "first" | "soft" | "compare" | "late";
export const MEANINGS = bi([
  { id: "first" as MeaningId, label: t("It shows first, and the systems count it: nobody has to write it down", "Es zeigt sich zuerst, und die Systeme zählen es: Niemand muss es aufschreiben") },
  { id: "soft" as MeaningId, label: t("It shows only if a person notices it and logs it, and often late", "Es zeigt sich nur, wenn eine Person es bemerkt und festhält, und oft spät") },
  { id: "compare" as MeaningId, label: t("The systems count it too, but it moves slowly: it shows how deeply the platform is built into the customer's work", "Die Systeme zählen es auch, aber es bewegt sich langsam: Es zeigt, wie tief die Plattform in die Arbeit des Kunden eingebaut ist") },
  { id: "late" as MeaningId, label: t("It shows late: orders and payments mostly follow a decision the customer has already made", "Es zeigt sich spät: Bestellungen und Zahlungen folgen meist einer Entscheidung, die der Kunde schon getroffen hat") },
]);
export const MEANING_TRUTH: Record<PatternId, MeaningId> = { usage: "first", depth: "compare", interaction: "soft", commercial: "late" };

export type PMeasureId = "alert" | "log" | "talk" | "close" | "bonus";
export const PMEASURES = bi([
  { id: "alert" as PMeasureId, label: t("Build an automatic list of customers whose use falls under their own average, and let the account manager decide every Monday whether to call", "Eine automatische Liste der Kunden bauen, deren Nutzung unter ihren eigenen Durchschnitt fällt, und den Account Manager jeden Montag entscheiden lassen, ob er anruft") },
  { id: "log" as PMeasureId, label: t("Ask every account manager to log each ticket, cancelled call and survey answer in the CRM, because only people notice it", "Jeden Account Manager bitten, jedes Ticket, jedes abgesagte Gespräch und jede Umfrageantwort im CRM festzuhalten, weil nur Menschen es bemerken") },
  { id: "talk" as PMeasureId, label: t("Offer a short training on the modules the customer does not use, before it compares other tools", "Eine kurze Schulung zu den Modulen anbieten, die der Kunde nicht nutzt, bevor er andere Tools vergleicht") },
  { id: "close" as PMeasureId, label: t("Give it to sales and finance as context for a talk about the contract, and never act on it alone", "Es Vertrieb und Finanzen als Kontext für ein Gespräch über den Vertrag geben und nie allein darauf handeln") },
  { id: "bonus" as PMeasureId, label: t("Pay a bonus on it to the team that reports it", "Dem Team, das es berichtet, einen Bonus darauf zahlen") },
]);
export const MEASURE_TRUTH: Record<PatternId, PMeasureId> = { usage: "alert", depth: "talk", interaction: "log", commercial: "close" };
export type PatternRow = { risk: Risk | null; meaning: MeaningId | null; measure: PMeasureId | null };

export type UncId = "sample" | "cause" | "missing" | "shift" | "objective" | "highsafe" | "moredata";
export const UNCERTAINTIES = bi([
  { id: "sample" as UncId, label: t("90 renewals out of 100 intensive customers is a small base; a second year of data would confirm the gap", "90 Verlängerungen bei 100 intensiven Kunden sind eine kleine Basis; ein zweites Jahr an Daten würde den Abstand bestätigen"), real: true, why: t("With fewer than about 100 cases per group, a few more or less move the rate a lot (Materi A6).", "Bei weniger als etwa 100 Fällen pro Gruppe verschieben ein paar mehr oder weniger die Quote stark (Materi A6).") },
  { id: "cause" as UncId, label: t("Intensive customers may simply be bigger and keener from the start, so use may not be the whole cause of staying", "Intensive Kunden sind vielleicht einfach von Anfang an größer und eifriger, also ist Nutzung vielleicht nicht die ganze Ursache fürs Bleiben"), real: true, why: t("A correlation is not a cause: if keen customers use more and also stay, activating a low-use customer may not make it stay. Only a fair test shows how much a measure adds.", "Eine Korrelation ist keine Ursache: Wenn eifrige Kunden mehr nutzen und auch bleiben, lässt sich ein Kunde mit geringer Nutzung durch Aktivierung vielleicht nicht zum Bleiben bringen. Nur ein fairer Test zeigt, wie viel eine Maßnahme bringt.") },
  { id: "missing" as UncId, label: t("Use of the mobile app and of exports is not logged, so some customers look less active than they are", "Die Nutzung der Mobile-App und von Exporten wird nicht protokolliert, also wirken manche Kunden weniger aktiv, als sie sind"), real: true, why: t("What is not recorded cannot be counted; a customer can look inactive where the log does not see it.", "Was nicht erfasst wird, kann nicht gezählt werden; ein Kunde kann inaktiv wirken, wo das Log nicht hinsieht.") },
  { id: "shift" as UncId, label: t("A new release can change what customers use, so next year's pattern may mean something different", "Ein neues Release kann ändern, was Kunden nutzen, also kann das Muster im nächsten Jahr etwas anderes bedeuten"), real: true, why: t("A rule built on last year assumes the past repeats; a new feature brings different use.", "Eine Regel, die auf dem letzten Jahr beruht, nimmt an, dass sich die Vergangenheit wiederholt; eine neue Funktion bringt andere Nutzung.") },
  { id: "objective" as UncId, label: t("Every customer with low use will cancel", "Jeder Kunde mit geringer Nutzung kündigt"), real: false, why: t("Four in ten low-use customers cancel, six stay. Low use is a reason to look, not proof (Materi A1).", "Vier von zehn Kunden mit geringer Nutzung kündigen, sechs bleiben. Geringe Nutzung ist ein Grund hinzusehen, kein Beweis (Materi A1).") },
  { id: "highsafe" as UncId, label: t("A pattern found last year stays true for years", "Ein Muster, das im letzten Jahr gefunden wurde, bleibt über Jahre wahr"), real: false, why: t("Customers and products change. A pattern needs a regular check against who actually cancelled (Materi A5 and A6).", "Kunden und Produkte ändern sich. Ein Muster braucht eine regelmäßige Prüfung dagegen, wer wirklich kündigte (Materi A5 und A6).") },
  { id: "moredata" as UncId, label: t("The more metrics we put on the dashboard, the better the decisions", "Je mehr Kennzahlen wir ins Dashboard nehmen, desto besser die Entscheidungen"), real: false, why: t("More metrics can add noise and hide the few that matter. A few that explain churn work better than many that do not (Materi A5).", "Mehr Kennzahlen können Rauschen hinzufügen und die wenigen verdecken, die zählen. Wenige, die den Churn erklären, wirken besser als viele, die es nicht tun (Materi A5).") },
]);
export const UNC_BY_ID = Object.fromEntries(UNCERTAINTIES.map((w) => [w.id, w])) as Record<UncId, (typeof UNCERTAINTIES)[number]>;

/* ------------------------------------------------------------------ Block 2.3 · an A/B test design */

export type AbPart = "change" | "control" | "kpi" | "size";
export const AB_PARTS: AbPart[] = ["change", "control", "kpi", "size"];
export type AbOption = { id: string; label: string; right: boolean; clue: string };
export const AB = bi({
  change: {
    label: t("What changes in the variant", "Was sich in der Variante ändert"),
    help: t("The one thing the test compares.", "Das eine, was der Test vergleicht."),
    options: [
      { id: "one", label: t("Only a guided-restart call from the account manager within a week of a use drop, with the same plan for every customer", "Nur ein Anruf des Account Managers mit geführtem Neustart innerhalb einer Woche nach einem Nutzungsrückgang, mit demselben Plan für jeden Kunden"), right: true, clue: t("", "") },
      { id: "three", label: t("A call, a discount and a free training together, all at once", "Ein Anruf, ein Rabatt und eine kostenlose Schulung zusammen, alles auf einmal"), right: false, clue: t("If the variant wins, which of the changes made it win?", "Wenn die Variante gewinnt: Welche der Änderungen hat sie gewinnen lassen?") },
      { id: "channel", label: t("A call for customers in the north region, none for customers in the south", "Ein Anruf für Kunden im Norden, keiner für Kunden im Süden"), right: false, clue: t("Are customers in the north and in the south the same people in the same situation?", "Sind Kunden im Norden und im Süden dieselben Menschen in derselben Lage?") },
    ],
  },
  control: {
    label: t("The control group", "Die Kontrollgruppe"),
    help: t("Which low-use customers are left alone, to compare against.", "Welche Kunden mit geringer Nutzung in Ruhe gelassen werden, als Vergleich."),
    options: [
      { id: "random", label: t("A random half of the low-use customers, in the same weeks", "Eine zufällige Hälfte der Kunden mit geringer Nutzung, in denselben Wochen"), right: true, clue: t("", "") },
      { id: "lastyear", label: t("Last year's low-use customers, before the measure existed", "Die Kunden mit geringer Nutzung des letzten Jahres, bevor es die Maßnahme gab"), right: false, clue: t("Are these the same customers, at the same time, under the same conditions?", "Sind das dieselben Kunden, zur selben Zeit, unter denselben Bedingungen?") },
      { id: "nonopen", label: t("Low-use customers whose account manager chose not to call", "Kunden mit geringer Nutzung, bei denen der Account Manager sich entschied, nicht anzurufen"), right: false, clue: t("Who chose to be in this group: chance, or the managers themselves?", "Wer hat entschieden, in dieser Gruppe zu sein: der Zufall oder die Manager selbst?") },
    ],
  },
  kpi: {
    label: t("The success KPI", "Der Erfolgs-KPI"),
    help: t("The number that decides whether the variant won.", "Die Zahl, die entscheidet, ob die Variante gewonnen hat."),
    options: [
      { id: "conv", label: t("Share of low-use customers who renew and are still active after 90 days", "Anteil der Kunden mit geringer Nutzung, die verlängern und nach 90 Tagen noch aktiv sind"), right: true, clue: t("", "") },
      { id: "opens", label: t("Number of dashboards viewed", "Zahl der angesehenen Dashboards"), right: false, clue: t("The goal is customers who stay. Does the number of dashboards viewed tell you whether more of them did?", "Das Ziel sind Kunden, die bleiben. Sagt die Zahl der angesehenen Dashboards, ob mehr von ihnen blieben?") },
      { id: "sent", label: t("Number of calls made", "Zahl der geführten Anrufe"), right: false, clue: t("Which kind of number counts what we did rather than whether customers stayed?", "Welche Art von Zahl zählt, was wir getan haben, statt ob Kunden blieben?") },
    ],
  },
  size: {
    label: t("Size and duration", "Größe und Dauer"),
    help: t("When the test has enough cases to read.", "Wann der Test genug Fälle hat, um ihn zu lesen."),
    options: [
      { id: "fixed", label: t("Fixed in advance: until each group has about 100 low-use customers, and long enough for them to reach their renewal date", "Vorab festgelegt: bis jede Gruppe etwa 100 Kunden mit geringer Nutzung hat, und lange genug, dass sie ihr Verlängerungsdatum erreichen"), right: true, clue: t("", "") },
      { id: "peek", label: t("Stop as soon as the variant is ahead on the dashboard", "Stoppen, sobald die Variante im Dashboard vorn liegt"), right: false, clue: t("A renewal rate swings with every customer. What happens if you stop at a lucky moment?", "Eine Verlängerungsquote schwankt mit jedem Kunden. Was passiert, wenn Sie in einem glücklichen Moment stoppen?") },
      { id: "day", label: t("One week, for a fast answer", "Eine Woche, für eine schnelle Antwort"), right: false, clue: t("How many low-use customers reach their renewal date in one week?", "Wie viele Kunden mit geringer Nutzung erreichen in einer Woche ihr Verlängerungsdatum?") },
    ],
  },
});
export type AbState = { change: string | null; control: string | null; kpi: string | null; size: string | null; hyp: string; rule: string };
export const emptyAb = (): AbState => ({ change: null, control: null, kpi: null, size: null, hyp: "", rule: "" });
export const AB_MODEL = { change: "one", control: "random", kpi: "conv", size: "fixed" };
/** A hypothesis states a change, an expected effect and a reason. A floor, not a judge: it needs "if … because". */
export const hasHypothesis = (s: string) => /\b(if|wenn|falls)\b/i.test(s) && /\b(because|since|as|weil|da|denn)\b/i.test(s);
/** A decision rule names a number to decide by. */
export const hasRuleNumber = (s: string) => /\d/.test(s);

/** The decisive phrase inside each finding's own text, for "Highlight the key words" (never which family it points to). */
export const REC_KEY: Record<string, string> = bi({
  p01: t("Active days per customer per month", "Aktive Tage pro Kunde und Monat"),
  p02: t("reports a customer builds per month", "Berichte, die ein Kunde pro Monat baut"),
  p03: t("Days since the main admin last logged in", "Tage seit dem letzten Login des Haupt-Admins"),
  p04: t("Share of the five modules a customer uses", "Anteil der fünf Module, die ein Kunde nutzt"),
  p05: t("different people at a customer who log in", "verschiedenen Personen eines Kunden, die sich"),
  p06: t("exports to Excel per month", "Exporte nach Excel pro Monat"),
  p07: t("check-in calls the customer keeps", "Check-in-Gespräche, die der Kunde einhält"),
  p08: t("support tickets in the last quarter", "Support-Tickets im letzten Quartal"),
  p09: t("Survey score (NPS)", "Umfragewert (NPS)"),
  p10: t("extra user licences", "zusätzlicher Nutzerlizenzen"),
  p11: t("paid more than 30 days late", "mehr als 30 Tage zu spät bezahlt"),
  p12: t("Discount percentage a customer got", "Rabatt in Prozent, den ein Kunde"),
});
