import type { ArchMiniCfg, BarsCfg, CompCfg, FairCfg, LiftCfg, MapCfg, RatesCfg, SceneCfg, ScoreCfg, StagesCfg, TreeCfg } from "@/components/materi/diagrams";
import { CASES_MIN, LIFT_ACT, LIFT_WATCH } from "@/data/route2";
import { JOINS_LABEL } from "@/data/measures";
import type { Joins } from "@/data/measures";
import { MOSEL } from "@/data/forecast";
import { bi, euro, num, pct, t, tt } from "@/lib/lang";

/**
 * Everything the interactive diagrams of Materi A and B say, in one file (components/materi/diagrams.tsx draws them). Materi A uses the example
 * company Main Analytics (an Augsburg provider of a reporting platform, Case assumption), Materi B uses Spree Software (a Berlin software
 * company, Case assumption); never DataDriven Sales, so the answer to a task block is never printed. All figures here are Case assumptions.
 */

/* ------------------------------------------------------------------ A1 · three kinds of figure, and what a team does with each */

export const MECH: SceneCfg = bi({
  point: t(
    "A figure helps only when it is read as what it is. A result KPI is what the company wants to change in the end, so it is the one the board is judged by. A driver is something customers do that comes before the result and moves it, so the team can act on it early. An activity count only counts what the company did, so it can rise while the result does not move. Mixing them up steers the team by the wrong number.",
    "Eine Zahl hilft nur, wenn sie als das gelesen wird, was sie ist. Ein Ergebnis-KPI ist das, was das Unternehmen am Ende ändern will, also das, woran der Vorstand gemessen wird. Ein Treiber ist etwas, das Kunden tun und das vor dem Ergebnis kommt und es bewegt, sodass das Team früh handeln kann. Eine Aktivitätszahl zählt nur, was das Unternehmen tat, also kann sie steigen, während sich das Ergebnis nicht bewegt. Sie zu verwechseln steuert das Team nach der falschen Zahl.",
  ),
  aria: t("What a team does with each kind of figure", "Was ein Team mit jeder Art von Zahl tut"),
  groupLabel: t("Kind of figure", "Art der Zahl"),
  stateLabel: t("How it is used", "Wie sie genutzt wird"),
  groups: [
    { id: "result", label: t("Result KPI", "Ergebnis-KPI") },
    { id: "driver", label: t("Driver", "Treiber") },
    { id: "activity", label: t("Activity count", "Aktivitätszahl") },
  ],
  states: [
    { id: "right", label: t("Used the right way", "Richtig genutzt") },
    { id: "miss", label: t("Used the wrong way", "Falsch genutzt") },
    { id: "much", label: t("Everything at once", "Alles auf einmal") },
  ],
  okState: "right",
  initial: { group: "result", state: "right" },
  shown: {
    result: {
      right: t("The board asks how many customers cancelled. Main Analytics shows the churn rate on top of the page: 9% of customers cancelled last year. It is the number the company wants to change, so everything else on the page is read as a way to move it.", "Der Vorstand fragt, wie viele Kunden gekündigt haben. Main Analytics zeigt die Churn Rate oben auf der Seite: 9 % der Kunden kündigten im letzten Jahr. Es ist die Zahl, die das Unternehmen ändern will, also wird alles andere auf der Seite als Weg gelesen, sie zu bewegen."),
      miss: t("The same page shows only the number of dashboards built. The board asks about cancellations and gets no answer, because nobody put the result on the page.", "Dieselbe Seite zeigt nur die Zahl der gebauten Dashboards. Der Vorstand fragt nach Kündigungen und bekommt keine Antwort, weil niemand das Ergebnis auf die Seite gesetzt hat."),
      much: t("Forty numbers sit on one page in the same size. Nobody can tell which one the board is judged by, and each team picks the one that looks best.", "Vierzig Zahlen stehen in gleicher Größe auf einer Seite. Niemand kann sagen, woran der Vorstand gemessen wird, und jedes Team wählt die, die am besten aussieht."),
    },
    driver: {
      right: t("At one customer the active days fell from 18 to 9 a month. Main Analytics reads it as a driver: it is the customer's own behaviour, it comes before a cancellation, and an account manager can act on it. The call happens that week.", "Bei einem Kunden fielen die aktiven Tage von 18 auf 9 im Monat. Main Analytics liest es als Treiber: Es ist das eigene Verhalten des Kunden, es kommt vor einer Kündigung, und ein Account Manager kann darauf reagieren. Der Anruf passiert in derselben Woche."),
      miss: t("The same fall is filed as a result and waits for the quarterly report. By the time somebody reads it, the customer has given notice.", "Derselbe Rückgang wird als Ergebnis abgelegt und wartet auf den Quartalsbericht. Bis ihn jemand liest, hat der Kunde gekündigt."),
      much: t("Every driver on the dashboard gets its own alert. Account managers receive 300 alerts a week, cannot tell which matter, and call nobody.", "Jeder Treiber im Dashboard bekommt einen eigenen Alarm. Account Manager erhalten 300 Alarme pro Woche, können nicht sagen, welche zählen, und rufen niemanden an."),
    },
    activity: {
      right: t("The team made 140 calls last month. Main Analytics counts that as effort, not as success, and checks next to it whether the customers who were called renewed.", "Das Team führte letzten Monat 140 Anrufe. Main Analytics zählt das als Aufwand, nicht als Erfolg, und prüft daneben, ob die angerufenen Kunden verlängerten."),
      miss: t("Calls made double from 140 to 280 and the report says “retention improved”. The renewal rate did not move, because the calls went to customers who were never going to leave.", "Die geführten Anrufe verdoppeln sich von 140 auf 280, und der Bericht sagt „Retention verbessert“. Die Renewal Rate bewegte sich nicht, weil die Anrufe an Kunden gingen, die nie gehen wollten."),
      much: t("Marketing reports “newsletters sent” as its main KPI. The number doubles every year and nobody stays longer, but the report looks busy.", "Das Marketing meldet „versendete Newsletter“ als seinen wichtigsten KPI. Die Zahl verdoppelt sich jedes Jahr, und niemand bleibt länger, aber der Bericht wirkt beschäftigt."),
    },
  },
  read: {
    right: t("The figure is read as what it is. The result sits on top, the drivers explain it early enough to act, and the activity counts are checked against the result. The team spends its time where it changes something.", "Die Zahl wird als das gelesen, was sie ist. Das Ergebnis steht oben, die Treiber erklären es früh genug zum Handeln, und die Aktivitätszahlen werden am Ergebnis geprüft. Das Team verbringt seine Zeit dort, wo es etwas ändert."),
    miss: t("The figure is used the wrong way. A result that nobody shows cannot steer, a driver filed as a result comes too late, and an activity count presented as success hides that nothing changed.", "Die Zahl wird falsch genutzt. Ein Ergebnis, das niemand zeigt, kann nicht steuern, ein als Ergebnis abgelegter Treiber kommt zu spät, und eine als Erfolg präsentierte Aktivitätszahl verbirgt, dass sich nichts änderte."),
    much: t("Everything at once ignores the difference between the kinds. It costs attention, it drowns the few numbers that matter and it teaches the team to report whatever looks good.", "Alles auf einmal ignoriert den Unterschied zwischen den Arten. Es kostet Aufmerksamkeit, übertönt die wenigen Zahlen, die zählen, und bringt dem Team bei, zu berichten, was gut aussieht."),
  },
  steps: [
    { title: t("A driver, used right", "Ein Treiber, richtig genutzt"), say: t("Main Analytics is an example company, not your case. Active days fell from 18 to 9 at one customer. That is the customer's own behaviour and it comes before a cancellation, so the account manager calls this week.", "Main Analytics ist ein Beispielunternehmen, nicht Ihr Fall. Bei einem Kunden fielen die aktiven Tage von 18 auf 9. Das ist das eigene Verhalten des Kunden, und es kommt vor einer Kündigung, also ruft der Account Manager diese Woche an."), look: t("the second card, with a solid frame", "die zweite Karte, mit durchgezogenem Rahmen"), group: "driver", state: "right" },
    { title: t("An activity count, used wrong", "Eine Aktivitätszahl, falsch genutzt"), say: t("Calls made doubled and the report says retention improved. But calls only count what the team did, and the renewal rate did not move.", "Die geführten Anrufe verdoppelten sich, und der Bericht sagt, die Retention habe sich verbessert. Aber Anrufe zählen nur, was das Team tat, und die Renewal Rate bewegte sich nicht."), look: t("the dashed third card", "die gestrichelte dritte Karte"), group: "activity", state: "miss" },
    { title: t("The point", "Das Wichtigste"), say: t("Ask of every figure: is it what the board is judged by, something customers do that leads there, or only what we did? Put the result on top, act on the drivers, and check the counts against the result. Try the three kinds.", "Fragen Sie bei jeder Zahl: Ist es das, woran der Vorstand gemessen wird, etwas, das Kunden tun und das dorthin führt, oder nur, was wir taten? Setzen Sie das Ergebnis nach oben, handeln Sie bei den Treibern, und prüfen Sie die Zählungen am Ergebnis. Probieren Sie die drei Arten."), look: t("the result KPI, used right", "der Ergebnis-KPI, richtig genutzt"), group: "result", state: "right" },
  ],
  sort: {
    title: t("A worked sort: three figures from Main Analytics' reports", "Eine Beispielsortierung: drei Zahlen aus den Berichten von Main Analytics"),
    showLabel: t("Show the kind and why", "Art und Grund zeigen"),
    items: [
      { id: "a", text: t("“Share of customers who cancelled last year.”", "„Anteil der Kunden, die im letzten Jahr kündigten.“"), tag: t("Result KPI", "Ergebnis-KPI"), why: t("It is what the company wants to change in the end, and the board is judged by it.", "Es ist das, was das Unternehmen am Ende ändern will, und der Vorstand wird daran gemessen.") },
      { id: "b", text: t("“Days per month on which a customer uses the platform.”", "„Tage pro Monat, an denen ein Kunde die Plattform nutzt.“"), tag: t("Driver", "Treiber"), why: t("It counts what customers do, it comes before a cancellation and it moves it.", "Sie zählt, was Kunden tun, kommt vor einer Kündigung und bewegt sie.") },
      { id: "c", text: t("“Number of dashboards the analytics team has built.”", "„Zahl der Dashboards, die das Analytics-Team gebaut hat.“"), tag: t("Activity count", "Aktivitätszahl"), why: t("It counts what the team did. It can double while customers still leave.", "Sie zählt, was das Team tat. Sie kann sich verdoppeln, während Kunden weiter gehen.") },
    ],
  },
  footnote: t("Illustration on Main Analytics (Case assumption). A dashed frame marks a use that hides the truth.", "Illustration mit Main Analytics (Fallannahme). Ein gestrichelter Rahmen markiert eine Nutzung, die die Wahrheit verbirgt."),
});

/* ------------------------------------------------------------------ A2 · three data sources, read together */

const ROW_REASON = { usage: "use fell for weeks", contact: "contact dried up", unhappy: "unhappy: low score and tickets" } as const;
const ROW_REASON_DE = { usage: "die Nutzung sank wochenlang", contact: "der Kontakt ließ nach", unhappy: "unzufrieden: niedriger Wert und Tickets" } as const;
export const PRIZE: BarsCfg = bi({
  point: t(
    "Customers show trouble in different places: in the usage log, in the CRM contact log, in feedback and tickets. Each source alone sees only part of the customers who cancel. Joined on one customer page, they catch more of them early enough to call.",
    "Kunden zeigen Ärger an verschiedenen Orten: im Nutzungslog, im Kontaktprotokoll des CRM, in Feedback und Tickets. Jede Quelle allein sieht nur einen Teil der Kunden, die kündigen. Auf einer Kundenseite verbunden, erkennen sie mehr davon früh genug zum Anrufen.",
  ),
  aria: t("Share of cancelling customers caught at least four weeks before the notice, by the kind of trouble and by how the sources are read", "Anteil der kündigenden Kunden, die mindestens vier Wochen vor der Kündigung erkannt werden, nach Art des Ärgers und danach, wie die Quellen gelesen werden"),
  states: [
    { id: "joined", label: t("Three sources joined on one customer page", "Drei Quellen auf einer Kundenseite verbunden") },
    { id: "alone", label: t("One source read alone", "Eine Quelle allein gelesen") },
  ],
  initial: { state: "joined", row: "usage" },
  max: 100,
  unit: "%",
  stateToggleLabel: t("Reading", "Lesart"),
  rowToggleLabel: t("Kind of trouble", "Art des Ärgers"),
  rows: [
    { id: "usage", label: t("Use fell for weeks before the notice", "Die Nutzung sank wochenlang vor der Kündigung"), values: { joined: 62, alone: 55 }, good: { joined: true, alone: false } },
    { id: "contact", label: t("Contact dried up: no call kept in 60 days", "Der Kontakt ließ nach: 60 Tage kein Gespräch eingehalten"), values: { joined: 41, alone: 33 }, good: { joined: true, alone: false } },
    { id: "unhappy", label: t("Unhappy: a low survey score and several tickets", "Unzufrieden: ein niedriger Umfragewert und mehrere Tickets"), values: { joined: 35, alone: 14 }, good: { joined: true, alone: false } },
    { id: "none", label: t("Gave notice with no earlier sign in any source", "Kündigte ohne früheres Zeichen in irgendeiner Quelle"), values: { joined: 4, alone: 3 }, good: { joined: false, alone: false } },
  ],
  steps: [
    { title: t("Use fell, sources joined", "Nutzung sank, Quellen verbunden"), say: t("Main Analytics is an example company, not your case. Its usage log, CRM and ticket tool are joined on one customer page. 62% of customers whose use fell were caught four weeks before the notice.", "Main Analytics ist ein Beispielunternehmen, nicht Ihr Fall. Nutzungslog, CRM und Ticket-Tool sind auf einer Kundenseite verbunden. 62 % der Kunden mit sinkender Nutzung wurden vier Wochen vor der Kündigung erkannt."), look: t("the first bar, joined", "der erste Balken, verbunden"), state: "joined", row: "usage" },
    { title: t("Unhappy, one source alone", "Unzufrieden, eine Quelle allein"), say: t("Read the survey alone and only 14% of the unhappy customers are caught early: most never answered. The tickets sit in another tool and nobody sees them next to the score.", "Liest man nur die Umfrage, werden nur 14 % der unzufriedenen Kunden früh erkannt: Die meisten antworteten nie. Die Tickets liegen in einem anderen Tool, und niemand sieht sie neben dem Wert."), look: t("the third bar, one source alone", "der dritte Balken, eine Quelle allein"), state: "alone", row: "unhappy" },
    { title: t("The point", "Das Wichtigste"), say: t("Join usage, CRM and feedback on one page per customer. The joined view catches more, and some customers still leave without warning. Switch the kind of trouble and the reading.", "Verbinden Sie Nutzung, CRM und Feedback auf einer Seite pro Kunde. Die verbundene Ansicht erkennt mehr, und manche Kunden gehen trotzdem ohne Warnung. Wechseln Sie Art des Ärgers und Lesart."), look: t("the last bar, which stays low", "der letzte Balken, der niedrig bleibt"), state: "joined", row: "none" },
  ],
  read: (row: string, state: string, v: number) =>
    row === "none"
      ? tt(`${v}% are caught early ${state === "joined" ? "even with the sources joined" : "reading one source"}: a customer who gives notice with no earlier sign in any source cannot be caught by data. Keep a person in touch with the account; the data is a help, not a guarantee.`, `${v} % werden früh erkannt${state === "joined" ? " selbst mit verbundenen Quellen" : ", wenn man eine Quelle liest"}: Ein Kunde, der ohne früheres Zeichen in irgendeiner Quelle kündigt, lässt sich durch Daten nicht erkennen. Halten Sie eine Person mit dem Konto in Kontakt; die Daten sind eine Hilfe, keine Garantie.`)
      : state === "joined"
        ? tt(`${v}% are caught early with the sources joined: the trouble (${ROW_REASON[row as keyof typeof ROW_REASON]}) shows in more than one place, and the page puts the signs together.`, `${v} % werden mit verbundenen Quellen früh erkannt: Der Ärger (${ROW_REASON_DE[row as keyof typeof ROW_REASON_DE]}) zeigt sich an mehr als einem Ort, und die Seite fügt die Zeichen zusammen.`)
        : tt(`${v}% are caught early reading one source alone: the sign is there, but the other sources that would confirm it are not read.`, `${v} % werden früh erkannt, wenn man eine Quelle allein liest: Das Zeichen ist da, aber die anderen Quellen, die es bestätigen würden, werden nicht gelesen.`),
  footnote: t("Illustration on Main Analytics (Case assumption). Share of cancelling customers caught at least four weeks before the notice.", "Illustration mit Main Analytics (Fallannahme). Anteil der kündigenden Kunden, die mindestens vier Wochen vor der Kündigung erkannt werden."),
});

/* ------------------------------------------------------------------ A3 · where an analysis pays, and where it can use data that exists */

export const MOMENTS: MapCfg = bi({
  point: t(
    "An analysis pays most where the cause is one the company can act on and a quarter or more of the group cancel. It can run on data you already have only where part or all of the data of the group is already joined to the CRM. Where neither is true, other work comes first.",
    "Eine Analyse lohnt sich am meisten dort, wo die Ursache eine ist, auf die das Unternehmen einwirken kann, und ein Viertel oder mehr der Gruppe kündigt. Sie kann nur dort auf Daten laufen, die Sie schon haben, wo ein Teil oder alle Daten der Gruppe schon mit dem CRM verbunden sind. Wo beides nicht zutrifft, kommt andere Arbeit zuerst.",
  ),
  aria: t("Main Analytics' groups of customers by the share who cancelled and by the data already joined to the CRM", "Gruppen von Kunden von Main Analytics nach dem Anteil, der kündigte, und den Daten, die schon mit dem CRM verbunden sind"),
  xTicks: [0, 25, 50, 75, 100],
  xUnit: "%",
  xAxisLabel: t("share who cancelled last year →", "Anteil, der im letzten Jahr kündigte →"),
  rows: [t("all of the data joined to the CRM", "alle Daten mit dem CRM verbunden"), t("part of the data joined to the CRM", "ein Teil der Daten mit dem CRM verbunden"), t("none of the data joined to the CRM", "keine Daten mit dem CRM verbunden")],
  zones: [
    { x1: 0, x2: 100, r1: 0, r2: 1, kind: "teal", label: t("joined: an analysis can run on data we have", "verbunden: Eine Analyse kann auf vorhandenen Daten laufen"), lx: 50, lr: 0, color: "teal" },
    { x1: 25, x2: 100, r1: 0, r2: 2, kind: "hatch", label: t("cause can be acted on + 25% cancel: pays most", "Ursache beeinflussbar + 25 % kündigen: lohnt sich am meisten"), lx: 62, lr: 2, color: "amber" },
  ],
  items: [
    { id: "g1", name: t("Customers with fewer than three active days a month", "Kunden mit weniger als drei aktiven Tagen im Monat"), x: 36, row: 2, square: true, glyph: "●", verdict: t("pays most", "lohnt sich am meisten"), fact: t("36% cancel · the cause (little use) can be acted on · none of the data joined to the CRM", "36 % kündigen · die Ursache (wenig Nutzung) ist beeinflussbar · keine Daten mit dem CRM verbunden"), why: t("Low use is something Main Analytics can act on, and 36% cancel: a measure has something to change. The usage data is not joined to the CRM, so nobody sees these customers together.", "Geringe Nutzung kann Main Analytics beeinflussen, und 36 % kündigen: Eine Maßnahme hat etwas zu ändern. Die Nutzungsdaten sind nicht mit dem CRM verbunden, also sieht niemand diese Kunden zusammen.") },
    { id: "g2", name: t("New customers with no first report in 60 days", "Neukunden ohne ersten Bericht in 60 Tagen"), x: 30, row: 2, square: true, glyph: "●", verdict: t("pays most", "lohnt sich am meisten"), fact: t("30% cancel · a bad start can be acted on · none of the data joined to the CRM", "30 % kündigen · ein schlechter Start ist beeinflussbar · keine Daten mit dem CRM verbunden"), why: t("A bad start can be repaired with a guided first report, and 30% cancel. Nothing joins the first-report data to the CRM today.", "Ein schlechter Start lässt sich mit einem geführten ersten Bericht reparieren, und 30 % kündigen. Heute verbindet nichts die Daten zum ersten Bericht mit dem CRM.") },
    { id: "g3", name: t("Customers who moved to a competitor's all-in-one suite", "Kunden, die zur Komplettlösung eines Wettbewerbers wechselten"), x: 55, row: 2, square: false, glyph: "○", verdict: t("stay in touch and wait", "in Kontakt bleiben und warten"), fact: t("55% cancel · Main Analytics cannot change the cause · none of the data joined to the CRM", "55 % kündigen · Main Analytics kann die Ursache nicht ändern · keine Daten mit dem CRM verbunden"), why: t("55% cancel, but the customers chose a suite that does everything. That is a decision a measure of Main Analytics cannot change. High churn alone is not enough.", "55 % kündigen, aber die Kunden wählten eine Suite, die alles kann. Das ist eine Entscheidung, die eine Maßnahme von Main Analytics nicht ändern kann. Hoher Churn allein reicht nicht.") },
    { id: "g4", name: t("Customers with a history of late payment", "Kunden mit Zahlungsverzug in der Vergangenheit"), x: 9, row: 0, square: false, glyph: "◐", verdict: t("can use data we have", "kann vorhandene Daten nutzen"), fact: t("9% cancel · not a cause to act on · all of the data joined to the CRM", "9 % kündigen · keine Ursache, auf die man einwirkt · alle Daten mit dem CRM verbunden"), why: t("The finance data is already joined, so an analysis could run on it. Only 9% cancel, so it is not where a measure helps most.", "Die Finanzdaten sind schon verbunden, also könnte eine Analyse darauf laufen. Nur 9 % kündigen, also hilft hier eine Maßnahme nicht am meisten.") },
    { id: "g5", name: t("Customers with many tickets after adding users", "Kunden mit vielen Tickets nach dem Hinzufügen von Nutzern"), x: 14, row: 1, square: true, glyph: "◐", verdict: t("can use data we have", "kann vorhandene Daten nutzen"), fact: t("14% cancel · the cause can be acted on · part of the data joined to the CRM", "14 % kündigen · die Ursache ist beeinflussbar · ein Teil der Daten mit dem CRM verbunden"), why: t("Part of the ticket data is joined, so an analysis can build on it. Only 14% cancel, so it is not the most valuable group.", "Ein Teil der Ticketdaten ist verbunden, also kann eine Analyse darauf aufbauen. Nur 14 % kündigen, also ist es nicht die wertvollste Gruppe.") },
    { id: "g6", name: t("Closed down, or taken over by a group with its own tools", "Geschlossen oder von einem Konzern mit eigenen Tools übernommen"), x: 5, row: 2, square: false, glyph: "○", verdict: t("not worth the effort", "den Aufwand nicht wert"), fact: t("5% cancel · no cause to act on · none of the data joined to the CRM", "5 % kündigen · keine Ursache, auf die man einwirkt · keine Daten mit dem CRM verbunden"), why: t("Almost nobody can stay, and no measure changes a closure or a group decision. Not worth any effort.", "Fast niemand kann bleiben, und keine Maßnahme ändert eine Schließung oder eine Konzernentscheidung. Keinen Aufwand wert.") },
  ],
  steps: [
    { title: t("Pays most here first", "Hier lohnt es sich zuerst"), say: t("Main Analytics is an example company, not your case. Customers with little use cancel at 36%, and little use is something it can act on. A measure here has something to change.", "Main Analytics ist ein Beispielunternehmen, nicht Ihr Fall. Kunden mit wenig Nutzung kündigen zu 36 %, und wenig Nutzung kann es beeinflussen. Eine Maßnahme hat hier etwas zu ändern."), look: t("square 1, in the hatched area at the bottom", "Quadrat 1, im schraffierten Bereich unten"), item: "g1" },
    { title: t("An analysis can use existing data here", "Hier kann eine Analyse vorhandene Daten nutzen"), say: t("Customers with late payment are already joined to the CRM, so an analysis could start at once, but only 9% cancel. Not the biggest prize.", "Kunden mit Zahlungsverzug sind schon mit dem CRM verbunden, also könnte eine Analyse sofort starten, aber nur 9 % kündigen. Nicht der größte Gewinn."), look: t("circle 4, in the teal row at the top", "Kreis 4, in der teal Zeile oben"), item: "g4" },
    { title: t("The point", "Das Wichtigste"), say: t("Customers who moved to a competitor's suite cancel at 55%, but Main Analytics cannot change that choice: stay in touch and wait. Act where the cause can be acted on. Try the dots.", "Kunden, die zur Suite eines Wettbewerbers wechselten, kündigen zu 55 %, aber Main Analytics kann diese Wahl nicht ändern: in Kontakt bleiben und warten. Handeln Sie dort, wo die Ursache beeinflussbar ist. Probieren Sie die Punkte."), look: t("circle 3, in the bottom row", "Kreis 3, in der unteren Zeile"), item: "g3" },
  ],
  initial: "g1",
  toggleLabel: t("Groups", "Gruppen"),
  legend: t("Illustration on Main Analytics (Case assumption). Squares are groups whose cause it can act on, circles are not. Hatched = 25% or more cancel and the cause can be acted on; teal = part or all of the data is joined to the CRM; the rest comes after.", "Illustration mit Main Analytics (Fallannahme). Quadrate sind Gruppen, auf deren Ursache es einwirken kann, Kreise nicht. Schraffiert = 25 % oder mehr kündigen und die Ursache ist beeinflussbar; teal = ein Teil oder alle Daten sind mit dem CRM verbunden; der Rest kommt danach."),
});

/* ------------------------------------------------------------------ A4 · what a gap in the data is worth */

export const BAR_RATES: RatesCfg = bi({
  point: t(
    "Comparing two groups gives two renewal rates, one per level of use. Their ratio says how many times as often intensive customers renewed, and the difference, over a year of low-use customers, says the most the gap could be worth. It is the most, not the amount a measure would earn: a correlation is not a cause.",
    "Der Vergleich zweier Gruppen gibt zwei Verlängerungsquoten, eine pro Nutzungsniveau. Ihr Verhältnis sagt, wie viel Mal so oft intensive Kunden verlängerten, und der Unterschied, über ein Jahr Kunden mit geringer Nutzung, sagt, was die Lücke höchstens wert sein könnte. Es ist das Höchste, nicht der Betrag, den eine Maßnahme einbringt: Eine Korrelation ist keine Ursache.",
  ),
  aria: t("Main Analytics: renewal rate of intensive customers against low-use customers", "Main Analytics: Verlängerungsquote intensiver Kunden gegenüber Kunden mit geringer Nutzung"),
  data: { control: { sent: MOSEL.control.sent, orders: MOSEL.control.orders }, variant: { sent: MOSEL.variant.sent, orders: MOSEL.variant.orders }, yearly: MOSEL.yearly, order: MOSEL.order, min: 50, max: 500, step: 50 },
  rateScale: 100,
  labels: {
    variant: t("Intensive customers", "Intensive Kunden"),
    control: t("Low-use customers", "Kunden mit geringer Nutzung"),
    ofWord: t("of", "von"),
    slider: (n: number) => tt(`Main Analytics' low-use customers a year: ${num(n)}`, `Kunden von Main Analytics mit geringer Nutzung pro Jahr: ${num(n)}`),
    lift: (rate: number, other: number, lift: number) => tt(`Lift = ${rate} ÷ ${other} = ${num(lift)} times as often`, `Lift = ${num(rate)} ÷ ${num(other)} = ${num(lift)}-mal so oft`),
  },
  steps: [
    { title: t("Two groups, two rates", "Zwei Gruppen, zwei Quoten"), yearlyMult: 1, look: t("the two bars and the amber line under them", "die zwei Balken und die bernsteinfarbene Zeile darunter"), say: (r: { rate: number; other: number; lift: number }) => tt(`Main Analytics is an example company, not your case. Intensive customers renewed at ${pct(r.rate, 1)}, against ${pct(r.other, 1)} for low-use customers: ${num(r.lift)} times as often.`, `Main Analytics ist ein Beispielunternehmen, nicht Ihr Fall. Intensive Kunden verlängerten zu ${pct(r.rate, 1)}, gegenüber ${pct(r.other, 1)} bei Kunden mit geringer Nutzung: ${num(r.lift)}-mal so oft.`) },
    { title: t("Only the gap is at stake", "Nur die Lücke steht auf dem Spiel"), yearlyMult: 2, look: t("the slider at double the low-use customers, and the sum in “What this shows”", "der Regler bei doppelt so vielen Kunden mit geringer Nutzung und die Rechnung in „Was das zeigt“"), say: (r: { other: number; extraAt: (y: number) => number }) => tt(`Low-use customers renew at ${pct(r.other, 1)} anyway. On ${num(500)} low-use customers a year, the gap is worth at most ${euro(r.extraAt(500))}. The app does the arithmetic.`, `Kunden mit geringer Nutzung verlängern ohnehin zu ${pct(r.other, 1)}. Bei ${num(500)} Kunden mit geringer Nutzung pro Jahr ist die Lücke höchstens ${euro(r.extraAt(500))} wert. Die Rechnung übernimmt die App.`) },
    { title: t("The point", "Das Wichtigste"), yearlyMult: 1, look: t("the renewed customers printed behind each bar", "die verlängerten Kunden, die hinter jedem Balken stehen"), say: () => tt("Two renewal rates side by side turn “keen customers stay” into a figure. But intensive customers may simply be keener or bigger: the gap is the most a measure could win, not what it will win.", "Zwei Verlängerungsquoten nebeneinander machen aus „eifrige Kunden bleiben“ eine Zahl. Aber intensive Kunden sind vielleicht einfach eifriger oder größer: Die Lücke ist das Höchste, was eine Maßnahme gewinnen könnte, nicht was sie gewinnen wird.") },
  ],
  insight: (v: { yearly: number; rate: number; other: number; extra: number; order: number; base: number }) =>
    tt(
      `${num(v.yearly)} low-use customers × (${pct(v.rate)} − ${pct(v.other)}) × ${euro(v.order)} = ${euro(v.extra)} a year at most, if every one of them behaved like an intensive customer. Only the gap counts: low-use customers renew ${pct(v.other)} anyway. ${v.yearly === v.base ? `At ${num(v.base)} low-use customers the example gives ${euro(v.extra)}.` : `More low-use customers put the same gap to work more often: ${v.yearly > v.base ? "more" : "less"} revenue at stake.`}`,
      `${num(v.yearly)} Kunden mit geringer Nutzung × (${pct(v.rate)} − ${pct(v.other)}) × ${euro(v.order)} = höchstens ${euro(v.extra)} pro Jahr, wenn sich jeder von ihnen wie ein intensiver Kunde verhielte. Nur die Lücke zählt: Kunden mit geringer Nutzung verlängern ohnehin zu ${pct(v.other)}. ${v.yearly === v.base ? `Bei ${num(v.base)} Kunden mit geringer Nutzung ergibt das Beispiel ${euro(v.extra)}.` : `Mehr Kunden mit geringer Nutzung setzen dieselbe Lücke öfter ein: ${v.yearly > v.base ? "mehr" : "weniger"} Umsatz auf dem Spiel.`}`,
    ),
  footnote: t("Illustration on Main Analytics (Case assumption). The revenue at stake is the yearly value of a customer, times how many more would renew if low use behaved like intensive use.", "Illustration mit Main Analytics (Fallannahme). Der Umsatz auf dem Spiel ist der Jahreswert eines Kunden, mal wie viele mehr verlängern würden, wenn sich geringe Nutzung wie intensive Nutzung verhielte."),
});

/* ------------------------------------------------------------------ A5 · four families of behaviour pattern */

const KIND_DE = { usage: "ein Signal zur Nutzung der Plattform", depth: "ein Signal zur Tiefe der Nutzung", interaction: "ein Signal aus Kontakt und Feedback", commercial: "ein Signal aus dem, was sie kaufen und zahlen" } as const;
export const KPI_TREE: TreeCfg = bi({
  point: t(
    "Behaviour patterns come in four families: use of the platform, depth of use, contact and feedback, and what customers buy and pay. The ones the systems count by themselves went with churn most; the ones that need a person to notice came late, and those about money mostly followed a decision already made.",
    "Verhaltensmuster gibt es in vier Familien: Nutzung der Plattform, Tiefe der Nutzung, Kontakt und Feedback, und was Kunden kaufen und zahlen. Die, die die Systeme selbst zählen, gingen am stärksten mit dem Churn einher; die, die ein Mensch bemerken muss, kamen spät, und die zum Geld folgten meist einer schon getroffenen Entscheidung.",
  ),
  aria: t("Main Analytics' signals in four families of behaviour pattern", "Die Signale von Main Analytics in vier Familien von Verhaltensmustern"),
  kinds: [
    { id: "usage", label: t("Use of the platform", "Nutzung der Plattform") },
    { id: "depth", label: t("Depth of use", "Tiefe der Nutzung") },
    { id: "interaction", label: t("Contact and feedback", "Kontakt und Feedback") },
    { id: "commercial", label: t("What they buy and pay", "Was sie kaufen und zahlen") },
  ],
  kindLabel: { usage: t("Use of the platform", "Nutzung der Plattform"), depth: t("Depth of use", "Tiefe der Nutzung"), interaction: t("Contact and feedback", "Kontakt und Feedback"), commercial: t("What they buy and pay", "Was sie kaufen und zahlen") },
  initial: "active",
  metrics: [
    { id: "active", name: t("Active days per month against the customer's own average", "Aktive Tage pro Monat im Vergleich zum eigenen Durchschnitt des Kunden"), kind: "usage", moved: true, why: t("The platform counts it by itself, so nobody has to write it down, and it showed before most cancellations.", "Die Plattform zählt es selbst, also muss es niemand aufschreiben, und es zeigte sich vor den meisten Kündigungen.") },
    { id: "admin", name: t("Days since the main admin last logged in", "Tage seit dem letzten Login des Haupt-Admins"), kind: "usage", moved: true, why: t("A login is something the platform records. An admin who stops logging in is often the first sign.", "Einen Login hält die Plattform fest. Ein Admin, der sich nicht mehr einloggt, ist oft das erste Zeichen.") },
    { id: "modules", name: t("Share of the five modules a customer uses", "Anteil der fünf Module, die ein Kunde nutzt"), kind: "depth", moved: true, why: t("It shows how deeply the platform is built into the customer's work; it changes slowly but predicts staying.", "Sie zeigt, wie tief die Plattform in die Arbeit des Kunden eingebaut ist; sie ändert sich langsam, sagt aber das Bleiben voraus.") },
    { id: "exports", name: t("Exports to Excel per month", "Exporte nach Excel pro Monat"), kind: "depth", moved: false, why: t("The platform counts it, but customers who stay and customers who leave both export, so it did not go with churn.", "Die Plattform zählt es, aber Kunden, die bleiben, und Kunden, die gehen, exportieren beide, also ging es nicht mit dem Churn einher.") },
    { id: "calls", name: t("Share of check-in calls the customer keeps", "Anteil der Check-in-Gespräche, die der Kunde einhält"), kind: "interaction", moved: true, why: t("A kept or cancelled call is the customer's people dealing with ours; it shows only if the call is logged.", "Ein eingehaltenes oder abgesagtes Gespräch ist der Umgang der Leute des Kunden mit unseren; es zeigt sich nur, wenn das Gespräch festgehalten wird.") },
    { id: "score", name: t("Survey score (NPS) of the last survey", "Umfragewert (NPS) der letzten Umfrage"), kind: "interaction", moved: false, why: t("What the customer says when asked: only 15% answer, and most who left did not, so it did not go with churn.", "Was der Kunde sagt, wenn er gefragt wird: Nur 15 % antworten, und die meisten, die gingen, nicht, also ging es nicht mit dem Churn einher.") },
    { id: "discount", name: t("Discount a customer got at its last renewal", "Rabatt, den ein Kunde bei seiner letzten Verlängerung bekam"), kind: "commercial", moved: false, why: t("A price agreed in sales: customers with larger discounts left about as often as others.", "Ein im Vertrieb vereinbarter Preis: Kunden mit größeren Rabatten gingen etwa so oft wie andere.") },
  ],
  steps: [
    { title: t("A sign the system counts", "Ein Zeichen, das das System zählt"), say: t("Main Analytics is an example company, not your case. Active days against the customer's own average are counted by the platform, and they went with churn last year: the strongest thing to watch.", "Main Analytics ist ein Beispielunternehmen, nicht Ihr Fall. Aktive Tage im Vergleich zum eigenen Durchschnitt zählt die Plattform, und sie gingen letztes Jahr mit dem Churn einher: das Stärkste, worauf man schaut."), look: t("the first box, top left, and “went with churn”", "der erste Kasten oben links und „mit dem Churn einhergegangen“"), sel: "active" },
    { title: t("A sign that waits for the customer", "Ein Zeichen, das auf den Kunden wartet"), say: t("The survey score is what the customer says when asked. Only 15% answer, and most who left did not: it did not go with churn. It is a conversation, not a signal to act on.", "Der Umfragewert ist, was der Kunde sagt, wenn er gefragt wird. Nur 15 % antworten, und die meisten, die gingen, nicht: Er ging nicht mit dem Churn einher. Er ist ein Gespräch, kein Signal, auf das man handelt."), look: t("the box in the contact and feedback family", "der Kasten in der Familie Kontakt und Feedback"), sel: "score" },
    { title: t("The point", "Das Wichtigste"), say: t("Watch first what the systems count about use, add depth of use, log the contact, and treat money signals as context. Even a counted sign can mislead. Choose any signal.", "Beobachten Sie zuerst, was die Systeme zur Nutzung zählen, nehmen Sie die Tiefe der Nutzung dazu, halten Sie den Kontakt fest, und behandeln Sie Geld-Signale als Kontext. Auch ein gezähltes Zeichen kann täuschen. Wählen Sie ein beliebiges Signal."), look: t("the depth family: one went with churn, one did not", "die Tiefe-Familie: eines ging mit dem Churn einher, eines nicht"), sel: "exports" },
  ],
  labels: {
    moved: t("● went with churn", "● ging mit dem Churn einher"),
    notMoved: t("○ did not go with it", "○ ging nicht damit einher"),
    toggleMetric: t("Signal", "Signal"),
    toggleYear: t("Last year", "Letztes Jahr"),
    yearOn: t("Show whether it went with churn last year", "Zeigen, ob es letztes Jahr mit dem Churn einherging"),
    yearOff: t("Hide last year", "Letztes Jahr verbergen"),
  },
  insightPast: (m: { name: string; kind: string; moved: boolean; why: string }) =>
    tt(
      `${m.name} → ${KPI_TREE.kindLabel[m.kind]}. ${m.why} Last year it ${m.moved ? "went" : "did not go"} with churn. The platform's own counts of use and the module share went with it; exports, the survey score and the discount did not: the closer a sign is to what the customer does in the product, the stronger the link.`,
      `${m.name} ist ${KIND_DE[m.kind as keyof typeof KIND_DE]}: ${m.why} Letztes Jahr ${m.moved ? "ging es" : "ging es nicht"} mit dem Churn einher. Die eigenen Zählungen der Plattform zur Nutzung und der Modulanteil gingen damit einher; Exporte, der Umfragewert und der Rabatt nicht: Je näher ein Zeichen an dem ist, was der Kunde im Produkt tut, desto stärker die Verbindung.`,
    ),
  insightNow: (m: { name: string; kind: string; why: string }) =>
    tt(`${m.name} → ${KPI_TREE.kindLabel[m.kind]}. ${m.why} Switch on “last year” to see which signals go with churn.`, `${m.name} ist ${KIND_DE[m.kind as keyof typeof KIND_DE]}. ${m.why} Schalten Sie „letztes Jahr“ ein, um zu sehen, welche Signale mit dem Churn einhergehen.`),
});

/* ------------------------------------------------------------------ A6 · a fair test of a call after a fall in use */

export const FAIR: FairCfg = bi({
  point: t(
    "A test is fair when only one thing differs, chance decides who is in which group, both groups run in the same weeks, and the size is fixed in advance. Even then, a small test tells you less than it seems. And a good test is not the end: the best measure is tested again, kept, changed or stopped, month after month.",
    "Ein Test ist fair, wenn sich nur eine Sache unterscheidet, der Zufall entscheidet, wer in welcher Gruppe ist, beide Gruppen in denselben Wochen laufen und die Größe vorab feststeht. Selbst dann sagt ein kleiner Test weniger, als es scheint. Und ein guter Test ist nicht das Ende: Die beste Maßnahme wird wieder getestet, behalten, geändert oder gestoppt, Monat für Monat.",
  ),
  aria: t("How sure the test is: the range of lifts the result is compatible with", "Wie sicher der Test ist: die Spanne der Lifts, mit denen das Ergebnis vereinbar ist"),
  rangeAria: t("How sure the test is: the range of lifts the result is compatible with", "Wie sicher der Test ist: die Spanne der Lifts, mit denen das Ergebnis vereinbar ist"),
  ratio: 1.5,
  groupA: t("Group A", "Gruppe A"),
  groupB: t("Group B", "Gruppe B"),
  runLabel: t("How Main Analytics runs the test", "Wie Main Analytics den Test durchführt"),
  flaws: [
    { id: "none", label: t("Fair test", "Fairer Test"), a: t("Low-use customers left alone · random half · weeks 1–12", "Kunden mit geringer Nutzung in Ruhe gelassen · zufällige Hälfte · Wochen 1–12"), b: t("Low-use customers called within a week · other half · weeks 1–12", "Kunden mit geringer Nutzung innerhalb einer Woche angerufen · andere Hälfte · Wochen 1–12"), reading: t("One change, a random split, the same weeks, a size fixed in advance: a difference between the groups can be put down to the call.", "Eine Änderung, eine zufällige Aufteilung, dieselben Wochen, eine vorab festgelegte Größe: Ein Unterschied zwischen den Gruppen lässt sich dem Anruf zuschreiben.") },
    { id: "two", label: t("Three changes at once", "Drei Änderungen auf einmal"), a: t("Left alone · random half", "In Ruhe gelassen · zufällige Hälfte"), b: t("A call, a 20% discount and a free training together · other half", "Ein Anruf, 20 % Rabatt und eine kostenlose Schulung zusammen · andere Hälfte"), reading: t("The variant differs in three things. If it wins, nobody can say whether the call, the discount or the training did it.", "Die Variante unterscheidet sich in drei Dingen. Gewinnt sie, kann niemand sagen, ob Anruf, Rabatt oder Schulung es waren.") },
    { id: "time", label: t("Compared with last year", "Mit dem Vorjahr verglichen"), a: t("Last year's low-use customers, left alone · first year", "Die Kunden mit geringer Nutzung des Vorjahres, in Ruhe gelassen · erstes Jahr"), b: t("This year's low-use customers, called · second year", "Die Kunden mit geringer Nutzung dieses Jahres, angerufen · zweites Jahr"), reading: t("The groups are different years. A competitor's new release, the economy or a different mix of customers can explain the difference. Comparing years is reading a trend, not testing a cause.", "Die Gruppen sind verschiedene Jahre. Ein neues Release eines Wettbewerbers, die Konjunktur oder eine andere Kundenmischung können den Unterschied erklären. Jahre zu vergleichen heißt einen Trend lesen, nicht eine Ursache testen.") },
    { id: "peek", label: t("Stopped when ahead on the dashboard", "Gestoppt, sobald im Dashboard vorn"), a: t("Left alone · random half · stopped after week 2", "In Ruhe gelassen · zufällige Hälfte · nach Woche 2 gestoppt"), b: t("Called · other half · stopped after week 2", "Angerufen · andere Hälfte · nach Woche 2 gestoppt"), reading: t("A renewal rate swings with every customer. Stopping at the first lead picks a lucky moment, and customers who decide in week 8 are left out.", "Eine Verlängerungsquote schwankt mit jedem Kunden. Beim ersten Vorsprung zu stoppen, wählt einen glücklichen Moment, und Kunden, die sich in Woche 8 entscheiden, fehlen.") },
  ],
  steps: [
    { title: t("A fair test", "Ein fairer Test"), say: () => tt("Main Analytics is an example company, not your case. A fair test is like a race: same track, same start, one runner changed. It calls a random half of its low-use customers, in the same weeks.", "Main Analytics ist ein Beispielunternehmen, nicht Ihr Fall. Ein fairer Test ist wie ein Rennen: dieselbe Bahn, derselbe Start, ein Läufer ausgetauscht. Es ruft eine zufällige Hälfte seiner Kunden mit geringer Nutzung an, in denselben Wochen."), look: t("Group A and Group B: only the call differs", "Gruppe A und Gruppe B: Nur der Anruf unterscheidet sich"), flaw: "none", conv: 30, spot: null },
    { title: t("An unfair test", "Ein unfairer Test"), say: () => tt("Now the variant gets a call, a 20% discount and a free training together. If it wins, nobody knows which of the three did it.", "Jetzt bekommt die Variante einen Anruf, 20 % Rabatt und eine kostenlose Schulung zusammen. Gewinnt sie, weiß niemand, was von den dreien es war."), look: t("the dashed amber Group B box", "der gestrichelte bernsteinfarbene Kasten von Gruppe B"), flaw: "two", conv: 30, spot: "b" },
    { title: t("The point", "Das Wichtigste"), say: (lo: number) => tt(`Even a fair test says less than it seems on few results: with 30 renewed customers per group, the same 1.5× could be ${num(lo)}×, which is no gain. Move the slider to 100.`, `Selbst ein fairer Test sagt bei wenigen Ergebnissen weniger, als es scheint: Mit 30 verlängerten Kunden pro Gruppe könnte dasselbe 1,5× ${num(lo)}× sein, also kein Gewinn. Bewegen Sie den Regler auf 100.`), look: t("the hatched bar crossing the dashed 1× line", "der schraffierte Balken, der die gestrichelte 1×-Linie kreuzt"), flaw: "none", conv: 30, spot: "range" },
  ],
  noDiff: t("1× = no difference", "1× = kein Unterschied"),
  slider: (conv: number) => tt(`Renewed customers in the group left alone: ${conv} (the called group has 1.5 times as many)`, `Verlängerte Kunden in der Gruppe, die in Ruhe gelassen wurde: ${conv} (die angerufene Gruppe hat 1,5-mal so viele)`),
  measured: (lo: number, hi: number) => tt(`measured: 1.5× · plausible range ${num(lo)}× to ${num(hi)}×`, `gemessen: 1,5× · plausible Spanne ${num(lo)}× bis ${num(hi)}×`),
  proven: (conv: number, lo: number, hi: number) =>
    tt(`With ${conv} renewed customers per group, even the low end of the range (${num(lo)}×) is above “no difference”: the lift is real, though its size is still uncertain (up to ${num(hi)}×). Around 100 per group is where a 1.5× result becomes solid.`, `Mit ${conv} verlängerten Kunden pro Gruppe liegt selbst das untere Ende der Spanne (${num(lo)}×) über „kein Unterschied“: Der Lift ist echt, auch wenn seine Größe noch unsicher ist (bis ${num(hi)}×). Um 100 pro Gruppe wird ein Ergebnis von 1,5× belastbar.`),
  open: (conv: number, lo: number, hi: number) =>
    tt(`With ${conv} renewed customers per group, the same 1.5× could be anything from ${num(lo)}× to ${num(hi)}×, and the range still includes “no difference” (hatched). Promising, not proven: keep the test running, however good the dashboard looks.`, `Mit ${conv} verlängerten Kunden pro Gruppe könnte dasselbe 1,5× alles zwischen ${num(lo)}× und ${num(hi)}× sein, und die Spanne schließt „kein Unterschied“ noch ein (schraffiert). Vielversprechend, nicht bewiesen: Lassen Sie den Test weiterlaufen, egal wie gut das Dashboard aussieht.`),
  footnote: t("Illustration on Main Analytics (Case assumption). The range is a standard approximation, shown so the effect of the sample size is visible; the task never asks you to compute it.", "Illustration mit Main Analytics (Fallannahme). Die Spanne ist eine übliche Näherung, gezeigt, damit die Wirkung der Stichprobengröße sichtbar wird; die Aufgabe verlangt nie, sie zu berechnen."),
});

/* ------------------------------------------------------------------ A7 · scoring: Main Analytics' three measures, with the return on investment */

export const SCORE: ScoreCfg = bi({
  point: t(
    "Score a measure on three questions: does it aim at customers whose use has fallen, does it really change why they use less, and does it keep working after the budget is spent? The three scores are multiplied, so one weak answer lowers the whole. The return on investment is read next to it, never instead of it.",
    "Bewerten Sie eine Maßnahme nach drei Fragen: Zielt sie auf Kunden, deren Nutzung gefallen ist, ändert sie wirklich, warum sie weniger nutzen, und wirkt sie weiter, wenn das Budget ausgegeben ist? Die drei Werte werden multipliziert, also senkt eine schwache Antwort das Ganze. Der Return on Investment wird daneben gelesen, nie stattdessen.",
  ),
  aria: t("Main Analytics' three measures scored: economic viability × effect × sustainability", "Die drei Maßnahmen von Main Analytics bewertet: Wirtschaftlichkeit × Wirkung × Nachhaltigkeit"),
  toggleLabel: t("Measure", "Maßnahme"),
  initial: "call",
  measures: [
    { id: "call", name: t("A call by the account manager within a week of a fall in use", "Ein Anruf des Account Managers innerhalb einer Woche nach einem Nutzungsrückgang"), cost: 40000, joins: "all", i: 3 as const, eff: 3 as const, fea: 3 as const, note: t("It goes only to customers whose use has fallen, answers the signal itself and runs on the account managers Main Analytics already has.", "Er geht nur an Kunden, deren Nutzung gefallen ist, beantwortet das Signal selbst und läuft mit den Account Managern, die Main Analytics schon hat.") },
    { id: "mailing", name: t("A monthly “tips” e-mail to every customer", "Eine monatliche „Tipps“-E-Mail an jeden Kunden"), cost: 20000, joins: "none", i: 1 as const, eff: 1 as const, fea: 3 as const, note: t("It is cheap and runs by itself, but it aims at every customer and repeats a friendly message that watches no signal.", "Sie ist billig und läuft von selbst, zielt aber auf jeden Kunden und wiederholt eine freundliche Botschaft, die kein Signal beobachtet.") },
    { id: "discount", name: t("A 20% discount for every customer with low use", "Ein Rabatt von 20 % für jeden Kunden mit geringer Nutzung"), cost: 60000, joins: "none", i: 1 as const, eff: 1 as const, fea: 1 as const, note: t("It aims at everyone with low use, buys the renewal without changing why use is low, and the discount is given away again every year.", "Er zielt auf alle mit geringer Nutzung, erkauft die Verlängerung, ohne zu ändern, warum die Nutzung gering ist, und der Rabatt wird jedes Jahr wieder verschenkt.") },
  ],
  steps: [
    { title: t("Strong on all three", "Stark in allen dreien"), say: (s: Record<string, number>) => tt(`Main Analytics is an example company, not your case. The call scores ${s.call}: it goes only to customers whose use has fallen, answers the signal itself and is easy to keep going.`, `Main Analytics ist ein Beispielunternehmen, nicht Ihr Fall. Der Anruf erzielt ${s.call}: Er geht nur an Kunden, deren Nutzung gefallen ist, beantwortet das Signal selbst und lässt sich leicht am Laufen halten.`), look: t("the longest bar", "der längste Balken"), sel: "call" },
    { title: t("One weak factor", "Ein schwacher Faktor"), say: (s: Record<string, number>) => tt(`The discount for everyone with low use scores only ${s.discount}: it aims at all of them and does not change why use is low. One weak factor pulls the product down.`, `Der Rabatt für alle mit geringer Nutzung erzielt nur ${s.discount}: Er zielt auf alle und ändert nicht, warum die Nutzung gering ist. Ein schwacher Faktor zieht das Produkt herunter.`), look: t("the short bar, and its three parts in “What this shows”", "der kurze Balken und seine drei Teile in „Was das zeigt“"), sel: "discount" },
    { title: t("The point", "Das Wichtigste"), say: () => tt("Multiply economic viability, effect and sustainability. Economic viability is read from who the measure aims at, never guessed. Choose a measure to read its three parts.", "Multiplizieren Sie Wirtschaftlichkeit, Wirkung und Nachhaltigkeit. Die Wirtschaftlichkeit wird daraus gelesen, worauf die Maßnahme zielt, nie geschätzt. Wählen Sie eine Maßnahme, um ihre drei Teile zu lesen."), look: t("the mailing: cheap and easy, but aimed at everyone", "das Mailing: billig und leicht, aber auf alle gerichtet"), sel: "mailing" },
  ],
  insight: (m: { name: string; cost: number; joins: string; i: number; eff: number; fea: number; note: string }, score: number) =>
    tt(
      `${m.name} (${euro(m.cost)}, aims at ${JOINS_LABEL[m.joins as Joins]}): economic viability ${m.i} × effect ${m.eff} × sustainability ${m.fea} = ${score}. ${m.note}`,
      `${m.name} (${euro(m.cost)}, zielt auf ${JOINS_LABEL[m.joins as Joins]}): Wirtschaftlichkeit ${m.i} × Wirkung ${m.eff} × Nachhaltigkeit ${m.fea} = ${score}. ${m.note}`,
    ),
});

/* ------------------------------------------------------------------ B1 · four stages towards a data-driven control system */

export const STAGES: StagesCfg = bi({
  point: t(
    "A data-driven control system is not a pile of dashboards. It is one customer page every team reads, one rulebook with owners, and measures that are tested every month against the customers who actually stayed.",
    "Ein datengetriebenes Steuerungssystem ist keine Ansammlung von Dashboards. Es ist eine Kundenseite, die jedes Team liest, ein Regelwerk mit Ownern, und Maßnahmen, die jeden Monat gegen die Kunden geprüft werden, die wirklich blieben.",
  ),
  aria: t("Four stages towards a data-driven control system", "Vier Stufen zu einem datengetriebenen Steuerungssystem"),
  caption: t("from reports for everyone → to one customer page → to one rulebook → to measures that learn", "von Berichten für alle → zu einer Kundenseite → zu einem Regelwerk → zu Maßnahmen, die lernen"),
  company: "Spree Software",
  toggleLabel: t("Stage", "Stufe"),
  initial: "profile",
  stages: [
    { id: "side", name: t("Reports for everyone", "Berichte für alle"), spree: t("Use sits in the platform log, contracts in the CRM and survey answers in a mailbox. Every team gets its own report, and nobody sees a customer's trouble in one place.", "Nutzung liegt im Log der Plattform, Verträge im CRM und Umfrageantworten in einem Postfach. Jedes Team bekommt seinen eigenen Bericht, und niemand sieht den Ärger eines Kunden an einem Ort."), reading: t("A customer's trouble is found by chance, and each team has a reason why it was not theirs to see.", "Der Ärger eines Kunden wird durch Zufall gefunden, und jedes Team hat einen Grund, warum er nicht seine Sache war.") },
    { id: "profile", name: t("One customer page", "Eine Kundenseite"), spree: t("Every customer has one page with use, modules, contacts, tickets and contract, and the renewal rate and the active-use rate sit on one dashboard.", "Jeder Kunde hat eine Seite mit Nutzung, Modulen, Kontakten, Tickets und Vertrag, und Renewal Rate und Active-Use Rate stehen auf einem Dashboard."), reading: t("Every team now sees the same customer; what to do about the trouble is still left to chance.", "Jedes Team sieht jetzt denselben Kunden; was gegen den Ärger zu tun ist, bleibt noch dem Zufall überlassen.") },
    { id: "rules", name: t("One rulebook with owners", "Ein Regelwerk mit Ownern"), spree: t("One page says which signal triggers which alert, who owns it, who calls within five working days and what is logged afterwards.", "Eine Seite sagt, welches Signal welchen Alarm auslöst, wer ihn besitzt, wer innerhalb von fünf Arbeitstagen anruft und was danach festgehalten wird."), reading: t("An alert is acted on, not noticed and forgotten. This is where separate reports become one system.", "Nach einem Alarm wird gehandelt, er wird nicht bemerkt und vergessen. Hier werden aus getrennten Berichten ein System.") },
    { id: "game", name: t("Measures that learn", "Maßnahmen, die lernen"), spree: t("Every new measure goes to a random half first; every month the same few numbers show how many called customers renewed and how many of the control group did, and each measure is kept, changed or stopped.", "Jede neue Maßnahme geht zuerst an eine zufällige Hälfte; jeden Monat zeigen dieselben wenigen Zahlen, wie viele angerufene Kunden verlängerten und wie viele aus der Kontrollgruppe, und jede Maßnahme wird behalten, geändert oder gestoppt."), reading: t("The system improves month by month, and each measure has to earn its place.", "Das System wird Monat für Monat besser, und jede Maßnahme muss sich ihren Platz verdienen.") },
  ],
  steps: [
    { title: t("Measures that learn", "Maßnahmen, die lernen"), say: t("Spree Software is an example company, not your case. Every new measure goes to a random half first, and every month the same numbers decide which measure is kept.", "Spree Software ist ein Beispielunternehmen, nicht Ihr Fall. Jede neue Maßnahme geht zuerst an eine zufällige Hälfte, und jeden Monat entscheiden dieselben Zahlen, welche Maßnahme bleibt."), look: t("the last, tallest bar", "der letzte, höchste Balken"), stage: "game" },
    { title: t("Reports for everyone", "Berichte für alle"), say: t("Before that, use, contracts and survey answers each lived in their own place. Every team had its own report, and nobody knew which measure kept a customer.", "Davor lagen Nutzung, Verträge und Umfrageantworten je an ihrem eigenen Ort. Jedes Team hatte seinen eigenen Bericht, und niemand wusste, welche Maßnahme einen Kunden hielt."), look: t("the first, shortest bar", "der erste, niedrigste Balken"), stage: "side" },
    { title: t("The point", "Das Wichtigste"), say: t("The jump from separate reports to a system is one customer page that every team reads and writes. Try the four stages.", "Der Sprung von getrennten Berichten zu einem System ist eine Kundenseite, die jedes Team liest und schreibt. Probieren Sie die vier Stufen."), look: t("the second bar", "der zweite Balken"), stage: "profile" },
  ],
});

/* ------------------------------------------------------------------ B2 · the data source first, then the tool */

export const SOURCE_MAP: MapCfg = bi({
  point: t(
    "Start from what the customer decides through a source, not from the tool. A source through which the customer decides and whose data is complete is used now; with data not complete it waits; where the customer decides nothing it is not central, however complete.",
    "Gehen Sie von dem aus, was der Kunde über eine Quelle entscheidet, nicht vom Werkzeug. Eine Quelle, über die der Kunde etwas entscheidet und deren Daten vollständig sind, wird jetzt genutzt; mit nicht vollständigen Daten wartet sie; wo der Kunde nichts entscheidet, ist sie nicht zentral, egal wie vollständig.",
  ),
  aria: t("Spree Software's data sources by what the customer decides and complete data", "Datenquellen von Spree Software nach dem, was der Kunde entscheidet, und vollständigen Daten"),
  xTicks: [0, 20, 40, 60, 80, 100],
  xUnit: "%",
  xAxisLabel: t("share of its data that reaches the joined customer view →", "Anteil seiner Daten, der die verbundene Kundenansicht erreicht →"),
  rows: [t("the customer decides something through it", "der Kunde entscheidet etwas darüber"), t("the customer decides nothing through it", "der Kunde entscheidet nichts darüber")],
  zones: [
    { x1: 0, x2: 80, r1: 0, r2: 0, kind: "soft", label: t("Central: improve the data first", "Zentral: zuerst die Daten verbessern"), lx: 40, lr: 0, color: "amber" },
    { x1: 80, x2: 100, r1: 0, r2: 0, kind: "teal", label: t("use now", "jetzt nutzen"), lx: 90, lr: 0, color: "teal" },
    { x1: 0, x2: 100, r1: 1, r2: 1, kind: "mist", label: t("Not central: the customer decides nothing here", "Nicht zentral: Der Kunde entscheidet hier nichts"), lx: 50, lr: 1, color: "ash" },
  ],
  items: [
    { id: "s1", name: t("The platform's usage log", "Das Nutzungslog der Plattform"), x: 88, row: 0, square: false, glyph: "●", verdict: t("use now", "jetzt nutzen"), fact: t("88% complete · the customer decides to keep using the platform or drift away", "88 % vollständig · der Kunde entscheidet, die Plattform weiter zu nutzen oder abzudriften"), why: t("The customer decides every day whether to open the platform, and 88% of the log reaches the joined view. Central: use it now.", "Der Kunde entscheidet jeden Tag, ob er die Plattform öffnet, und 88 % des Logs erreichen die verbundene Ansicht. Zentral: jetzt nutzen.") },
    { id: "s2", name: t("Contract data: value, term, renewal date", "Vertragsdaten: Wert, Laufzeit, Verlängerungsdatum"), x: 92, row: 0, square: false, glyph: "●", verdict: t("use now", "jetzt nutzen"), fact: t("92% complete · the customer decides to renew or give notice", "92 % vollständig · der Kunde entscheidet, zu verlängern oder zu kündigen"), why: t("The renewal date is when the customer decides, and the data is complete: use now.", "Das Verlängerungsdatum ist, wann der Kunde entscheidet, und die Daten sind vollständig: jetzt nutzen.") },
    { id: "s3", name: t("Support tickets and call notes", "Support-Tickets und Gesprächsnotizen"), x: 50, row: 0, square: false, glyph: "◐", verdict: t("improve the data first", "zuerst die Daten verbessern"), fact: t("50% complete · the customer decides to keep talking or go quiet", "50 % vollständig · der Kunde entscheidet, im Gespräch zu bleiben oder zu verstummen"), why: t("Tickets and notes matter, but only 50% of them are logged in the CRM. Built on now, a measure would learn the gaps. Improve the data first.", "Tickets und Notizen sind wichtig, aber nur 50 % werden im CRM festgehalten. Jetzt darauf gebaut, würde eine Maßnahme die Lücken lernen. Erst die Daten verbessern.") },
    { id: "s4", name: t("Newsletter opens by customers", "Newsletter-Öffnungen von Kunden"), x: 75, row: 1, square: false, glyph: "○", verdict: t("not central", "nicht zentral"), fact: t("75% complete · the customer decides nothing through it", "75 % vollständig · der Kunde entscheidet nichts darüber"), why: t("75% complete, but nobody decides to renew by opening a newsletter. A control system built on it would watch many who never meant to leave.", "75 % vollständig, aber niemand entscheidet über die Verlängerung, indem er einen Newsletter öffnet. Ein darauf gebautes Steuerungssystem würde viele beobachten, die nie gehen wollten.") },
    { id: "s5", name: t("Supplier invoices", "Lieferantenrechnungen"), x: 98, row: 1, square: false, glyph: "○", verdict: t("not central", "nicht zentral"), fact: t("98% complete · the customer decides nothing through it", "98 % vollständig · der Kunde entscheidet nichts darüber"), why: t("The most complete data of all, but it has nothing to do with the customer's decision. Not central, however complete.", "Die vollständigsten Daten von allen, aber sie haben mit der Entscheidung des Kunden nichts zu tun. Nicht zentral, egal wie vollständig.") },
  ],
  steps: [
    { title: t("Use now", "Jetzt nutzen"), say: t("Spree Software is an example company, not your case. The customer decides every day whether to open the platform and 88% of the log is in the joined view: use now, and check it against who really cancels.", "Spree Software ist ein Beispielunternehmen, nicht Ihr Fall. Der Kunde entscheidet jeden Tag, ob er die Plattform öffnet, und 88 % des Logs stehen in der verbundenen Ansicht: jetzt nutzen und gegen die prüfen, die wirklich kündigen."), look: t("the dot in the teal area", "der Punkt im türkisen Feld"), item: "s1" },
    { title: t("Data first", "Erst die Daten"), say: t("Tickets and call notes would help too, but only 50% of them are logged. Built on now, a measure would learn the gaps. Fix the logging first.", "Tickets und Gesprächsnotizen würden auch helfen, aber nur 50 % werden festgehalten. Jetzt darauf gebaut, würde eine Maßnahme die Lücken lernen. Erst das Festhalten verbessern."), look: t("the dot in the amber area", "der Punkt im bernsteinfarbenen Feld"), item: "s3" },
    { title: t("The point", "Das Wichtigste"), say: t("Supplier invoices have 98% of the data complete, but the customer decides nothing there. However complete, not central. Try the other sources.", "Lieferantenrechnungen haben 98 % der Daten vollständig, aber der Kunde entscheidet dort nichts. Egal wie vollständig: nicht zentral. Probieren Sie die anderen Quellen."), look: t("the dot in the grey area", "der Punkt im grauen Feld"), item: "s5" },
  ],
  initial: "s3",
  toggleLabel: t("Sources", "Quellen"),
  legend: t("Illustration on Spree Software (Case assumption). Top row: the customer decides something through the source; bottom row: nothing. Left to right: how much of its data reaches the joined customer view.", "Illustration mit Spree Software (Fallannahme). Obere Zeile: Der Kunde entscheidet etwas über die Quelle; untere Zeile: nichts. Von links nach rechts: wie viel seiner Daten die verbundene Kundenansicht erreicht."),
});

/* ------------------------------------------------------------------ B3 · four tests for a management KPI */

export const COMP_TESTS: CompCfg = bi({
  point: t(
    "A KPI worth steering by is linked to staying, shows a change early, covers every customer and is counted by the systems. The printed facts cap each rating.",
    "Ein KPI, nach dem es sich zu steuern lohnt, ist mit dem Bleiben verbunden, zeigt früh eine Veränderung, deckt jeden Kunden ab und wird von den Systemen gezählt. Die gedruckten Fakten deckeln jede Bewertung.",
  ),
  aria: t("One KPI candidate of Spree Software on four tests", "Ein KPI-Kandidat von Spree Software nach vier Tests"),
  crits: [
    { id: "explain", name: t("Link to staying", "Verbindung zum Bleiben") },
    { id: "timely", name: t("Early", "Früh") },
    { id: "reach", name: t("Reach", "Reichweite") },
    { id: "scale", name: t("Measured automatically", "Automatisch gemessen") },
  ],
  levels: [t("Low", "Niedrig"), t("Mid", "Mittel"), t("High", "Hoch")],
  initial: "emails",
  toggleLabel: t("KPI candidate", "KPI-Kandidat"),
  factsLabel: t("Printed facts: ", "Gedruckte Fakten: "),
  comps: [
    { id: "winback", name: t("Renewal rate", "Renewal Rate"), facts: t("linked to staying · weekly · every customer due for renewal · counted by the systems", "mit dem Bleiben verbunden · wöchentlich · jeder Kunde mit anstehender Verlängerung · von den Systemen gezählt"), r: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("High on all four: it is the result the whole system exists for, it updates every week, it covers every customer due for renewal and nobody has to collect it.", "Hoch auf allen vier: Es ist das Ergebnis, für das das ganze System da ist, es wird jede Woche aktualisiert, deckt jeden Kunden mit anstehender Verlängerung ab, und niemand muss es sammeln.") },
    { id: "survey", name: t("Yearly satisfaction survey", "Jährliche Zufriedenheitsumfrage"), facts: t("linked to staying · yearly · those who answer · by a survey", "mit dem Bleiben verbunden · jährlich · wer antwortet · über eine Befragung"), r: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("Linked to staying, but once a year is too late to steer a four-month plan, and few customers answer.", "Mit dem Bleiben verbunden, aber einmal im Jahr ist zu spät, um einen Viermonatsplan zu steuern, und wenige Kunden antworten.") },
    { id: "emails", name: t("Dashboards viewed per month", "Pro Monat angesehene Dashboards"), facts: t("not linked to staying · weekly · every manager · counted by the systems", "nicht mit dem Bleiben verbunden · wöchentlich · jede Führungskraft · von den Systemen gezählt"), r: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("Easy to count, and it can double while renewals do not move: it counts how much managers look, not what customers did.", "Leicht zu zählen, und er kann sich verdoppeln, während sich die Verlängerungen nicht bewegen: Er zählt, wie viel Führungskräfte hinsehen, nicht was Kunden taten.") },
    { id: "stories", name: t("Account managers' monthly “saved customer” stories", "Monatliche „gehaltener Kunde“-Geschichten der Account Manager"), facts: t("not linked to staying · monthly · cases someone picks · collected by hand", "nicht mit dem Bleiben verbunden · monatlich · von jemandem ausgewählte Fälle · von Hand gesammelt"), r: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Each manager reports a favourite case, so the customers who left never appear.", "Jeder Manager berichtet einen Lieblingsfall, also tauchen die Kunden, die gingen, nie auf.") },
  ],
  steps: [
    { title: t("A KPI that passes", "Ein KPI, der besteht"), say: t("Spree Software is an example company, not your case. The renewal rate is linked to staying and counted every week for every customer due for renewal by the systems: High on all four, 12 of 12.", "Spree Software ist ein Beispielunternehmen, nicht Ihr Fall. Die Renewal Rate ist mit dem Bleiben verbunden und wird jede Woche für jeden Kunden mit anstehender Verlängerung von den Systemen gezählt: Hoch auf allen vier, 12 von 12."), look: t("all four rows filled to High", "alle vier Zeilen bis Hoch gefüllt"), sel: "winback", spot: null },
    { title: t("A number that does not", "Eine Zahl, die nicht besteht"), say: t("Dashboards viewed are easy to count, but they can double while renewals do not move: looking more is not a better result. The link to staying stays Low, whatever the rest.", "Angesehene Dashboards sind leicht zu zählen, können sich aber verdoppeln, während sich die Verlängerungen nicht bewegen: Mehr hinzusehen ist kein besseres Ergebnis. Die Verbindung zum Bleiben bleibt Niedrig, egal wie der Rest ist."), look: t("the first row, Link to staying", "die erste Zeile, Verbindung zum Bleiben"), sel: "emails", spot: "explain" },
    { title: t("The point", "Das Wichtigste"), say: t("The yearly survey is linked to staying but arrives once a year, so it is Low on early: a number for learning, not for steering. Try the other candidates.", "Die jährliche Umfrage ist mit dem Bleiben verbunden, kommt aber einmal im Jahr und ist daher bei „früh“ Niedrig: eine Zahl zum Lernen, nicht zum Steuern. Probieren Sie die anderen Kandidaten."), look: t("the second row, Early", "die zweite Zeile, Früh"), sel: "survey", spot: "timely" },
  ],
  insight: (c: { name: string; note: string }, total: number) =>
    tt(
      `${c.name}: ${total} of 12. ${c.note} Each rating is capped by a printed fact: “not linked to staying” caps the link at Low; “after the customer has left” or “yearly” caps early at Low; “some customers” caps reach at Mid; “collected by hand” caps measured automatically at Low.`,
      `${c.name}: ${total} von 12. ${c.note} Jede Bewertung ist durch einen gedruckten Fakt gedeckelt: „nicht mit dem Bleiben verbunden“ deckelt die Verbindung bei Niedrig; „nachdem der Kunde gegangen ist“ oder „jährlich“ deckeln früh bei Niedrig; „einige Kunden“ deckelt die Reichweite bei Mittel; „von Hand gesammelt“ deckelt automatisch gemessen bei Niedrig.`,
    ),
});

/* ------------------------------------------------------------------ B4 · roll out, keep testing or stop */

export const LIFT: LiftCfg = bi({
  point: t(
    "Every test ends in a decision. A clear lift on enough customers: roll out. A strong lift on too few, or a small one: keep testing. No real lift: stop.",
    "Jeder Test endet in einer Entscheidung. Ein klarer Lift bei genug Kunden: ausrollen. Ein starker Lift bei zu wenigen oder ein kleiner: weiter testen. Kein echter Lift: stoppen.",
  ),
  aria: t("Roll out, keep testing or stop, by lift and customers per group", "Ausrollen, weiter testen oder stoppen, nach Lift und Kunden pro Gruppe"),
  actAt: LIFT_ACT,
  watchAt: LIFT_WATCH,
  casesMin: CASES_MIN,
  initial: { lift: 20, cases: 40 },
  steps: [
    { title: t("Roll out", "Ausrollen"), say: t("Spree Software is an example company, not your case. A test of a call within a week of a fall in use shows +30% on 200 customers per group: clear and proven. Roll out.", "Spree Software ist ein Beispielunternehmen, nicht Ihr Fall. Ein Test eines Anrufs innerhalb einer Woche nach einem Nutzungsrückgang zeigt +30 % bei 200 Kunden pro Gruppe: klar und belegt. Ausrollen."), look: t("the dot in the teal area", "der Punkt im türkisen Feld"), lift: 30, cases: 200 },
    { title: t("Keep testing", "Weiter testen"), say: t(`Another test, a training on an unused module, also shows +30%, but on only 40 customers per group, fewer than ${CASES_MIN}. Too few to trust it: keep testing.`, `Ein anderer Test, eine Schulung zu einem ungenutzten Modul, zeigt auch +30 %, aber nur bei 40 Kunden pro Gruppe, weniger als ${CASES_MIN}. Zu wenig, um ihm zu trauen: weiter testen.`), look: t("the dot in the left amber strip", "der Punkt im linken bernsteinfarbenen Streifen"), lift: 30, cases: 40 },
    { title: t("The point", "Das Wichtigste"), say: t("A third test, a “tips” banner on the platform login page, shows +2% on 300 customers. Many customers do not rescue a tiny lift: they prove it is tiny. Stop. Move the two sliders to try your own.", "Ein dritter Test, ein „Tipps“-Banner auf der Login-Seite der Plattform, zeigt +2 % bei 300 Kunden. Viele Kunden retten keinen winzigen Lift: Sie beweisen, dass er winzig ist. Stoppen. Bewegen Sie die beiden Regler, um eigene Werte zu probieren."), look: t("the dot in the grey area", "der Punkt im grauen Feld"), lift: 2, cases: 300 },
  ],
  labels: {
    roll: t("roll out", "ausrollen"),
    keep: t("keep testing", "weiter testen"),
    stop: t("stop", "stoppen"),
    x: t("customers in the smaller group →", "Kunden in der kleineren Gruppe →"),
    y: t("lift % →", "Lift % →"),
    lift: (l: number) => tt(`Lift over the control group: ${l > 0 ? "+" : ""}${l}%`, `Lift gegenüber der Kontrollgruppe: ${l > 0 ? "+" : ""}${l} %`),
    cases: (c: number) => tt(`Customers per group: ${c}`, `Kunden pro Gruppe: ${c}`),
  },
  read: {
    act: (l: number, c: number) => tt(`A lift of ${l}% on ${c} customers per group: clear and proven. Roll out, and hand it to the team that owns it.`, `Ein Lift von ${l} % bei ${c} Kunden pro Gruppe: klar und belegt. Ausrollen, und dem Team übergeben, dem es gehört.`),
    watchHigh: (l: number, c: number) => tt(`A lift of ${l}% looks strong, but ${c} customers are too few to trust it (fewer than ${CASES_MIN}). Keep testing; the data team runs it until the size is reached.`, `Ein Lift von ${l} % sieht stark aus, aber ${c} Kunden sind zu wenig, um ihm zu trauen (weniger als ${CASES_MIN}). Weiter testen; das Datenteam lässt ihn laufen, bis die Größe erreicht ist.`),
    watchLow: (l: number) => tt(`A lift of ${l}%: a small difference. Not worth a rollout yet; keep testing a stronger variant.`, `Ein Lift von ${l} %: ein kleiner Unterschied. Noch keinen Rollout wert; eine stärkere Variante weiter testen.`),
    none: (l: number) => tt(`A lift of ${l}%: the variant does about as well as the control, or worse. Stop; running it on costs money and attention for nothing.`, `Ein Lift von ${l} %: Die Variante schneidet etwa so gut ab wie die Kontrolle, oder schlechter. Stoppen; sie weiterlaufen zu lassen kostet Geld und Aufmerksamkeit für nichts.`),
  },
});

/* ------------------------------------------------------------------ B5 · how a data-driven control system is built */

export const ARCH_MINI: ArchMiniCfg = bi({
  point: t(
    "A control system is built in order: the base first (one customer page and the KPIs), then the data, then the alerts. Where a link in that chain is missing, the alert above it cannot be trusted.",
    "Ein Steuerungssystem wird der Reihe nach gebaut: zuerst die Basis (eine Kundenseite und die KPIs), dann die Daten, dann die Alarme. Wo ein Glied dieser Kette fehlt, lässt sich dem Alarm darüber nicht trauen.",
  ),
  aria: t("Spree's early-warning alerts and their base", "Die Frühwarn-Alarme von Spree und ihre Basis"),
  company: "Spree Software",
  meet: t("What customers meet: a call from their account manager when use falls", "Was Kunden erleben: ein Anruf ihres Account Managers, wenn die Nutzung sinkt"),
  tool: {
    name: t("Early-warning alerts reading the joined customer view", "Frühwarn-Alarme, die die verbundene Kundenansicht lesen"),
    startsFirst: t("Starts in month 1", "Startet in Monat 1"),
    startsAfter: t("Starts in month 1, before the base", "Startet in Monat 1, vor der Basis"),
    noBase: t("no joined customer view to read and nothing measures it yet", "noch keine verbundene Kundenansicht zum Lesen, und nichts misst ihn"),
    weak: (p: number) => tt(`its data is ${p}% complete, below 80%, when it starts`, `seine Daten sind zu ${p} % vollständig, unter 80 %, wenn er startet`),
  },
  base: { name: t("KPI system and joined customer view", "KPI-System und verbundene Kundenansicht"), first: t("Starts in month 1", "Startet in Monat 1"), after: t("Starts in month 3, after the alerts", "Startet in Monat 3, nach den Alarmen") },
  link: { ok: t("reads the joined customer view", "liest die verbundene Kundenansicht"), no: t("no joined customer view to read", "keine verbundene Kundenansicht zum Lesen") },
  data: {
    flow: t("raw data from every system flows up", "Rohdaten aus jedem System fließen nach oben"),
    lives: (p: number) => tt(`Where the data lives: usage log, CRM and survey tool, ${p}% of what the alerts read is complete`, `Wo die Daten liegen: Nutzungslog, CRM und Umfragetool, ${p} % dessen, was die Alarme lesen, sind vollständig`),
  },
  levels: { ready: 90, weak: 75, bar: 80 },
  toggles: {
    heading: t("Two things to change", "Zwei Dinge zum Ändern"),
    baseLabel: t("The customer view starts", "Die Kundenansicht startet"),
    baseFirst: t("Before the alerts", "Vor den Alarmen"),
    baseAfter: t("After the alerts", "Nach den Alarmen"),
    dataLabel: t("Data behind the alerts", "Daten hinter den Alarmen"),
    dataReady: t("90% complete", "90 % vollständig"),
    dataWeak: t("75% complete", "75 % vollständig"),
  },
  steps: [
    { title: t("The base first", "Die Basis zuerst"), say: t("Spree Software is an example company, not your case. It builds its joined customer view and its KPI system first, so its alerts read one customer and are measured from the first week.", "Spree Software ist ein Beispielunternehmen, nicht Ihr Fall. Es baut zuerst seine verbundene Kundenansicht und sein KPI-System, damit seine Alarme einen Kunden lesen und ab der ersten Woche gemessen werden."), look: t("the solid teal link between the alerts and the base", "die durchgezogene teal Verbindung zwischen Alarmen und Basis"), measFirst: true, ready: true },
    { title: t("The alerts before the base", "Die Alarme vor der Basis"), say: t("Now the alerts start first. They have no joined view to read and nothing measures them, so nobody can say whether they help. Their link is dashed.", "Jetzt starten die Alarme zuerst. Sie haben keine verbundene Ansicht zum Lesen, und nichts misst sie, also kann niemand sagen, ob sie helfen. Ihre Verbindung ist gestrichelt."), look: t("the dashed amber link and the note on the alerts", "die gestrichelte amberfarbene Verbindung und der Vermerk an den Alarmen"), measFirst: false, ready: true },
    { title: t("The point", "Das Wichtigste"), say: t("With the base first but data only 75% complete, the alerts would learn the gaps. Base first, then alerts on complete data. Try the two buttons.", "Mit der Basis zuerst, aber Daten nur zu 75 % vollständig, würden die Alarme die Lücken lernen. Zuerst die Basis, dann Alarme auf vollständigen Daten. Probieren Sie die beiden Schaltflächen."), look: t("the data note under the alerts", "den Datenvermerk unter den Alarmen"), measFirst: true, ready: false },
  ],
  read: {
    good: t("The base exists before the alerts and the alerts run on data that is complete. Spree can say whether the alerts help, and its data does not teach them gaps. This is what a plan that holds looks like.", "Die Basis steht vor den Alarmen, und die Alarme laufen auf vollständigen Daten. Spree kann sagen, ob die Alarme helfen, und seine Daten lehren sie keine Lücken. So sieht ein Plan aus, der hält."),
    noBase: t("The alerts start before the view they read exists. Their link to the base is dashed: Spree would pay for alerts and never know whether they work. The fix is the order: the joined customer view and the KPI system first.", "Die Alarme starten, bevor die Ansicht existiert, die sie lesen. Ihre Verbindung zur Basis ist gestrichelt: Spree würde für Alarme zahlen und nie wissen, ob sie wirken. Die Lösung ist die Reihenfolge: zuerst verbundene Kundenansicht und KPI-System."),
    weakData: t("They read the joined view, but their data is only 75% complete, below the 80% alerts should start on. They would learn the gaps. The fix is to complete the data first, or to hold the alerts back until it is ready.", "Sie lesen die verbundene Ansicht, aber ihre Daten sind nur zu 75 % vollständig, unter den 80 %, auf denen Alarme starten sollten. Sie würden die Lücken lernen. Die Lösung ist, zuerst die Daten zu vervollständigen oder die Alarme zurückzuhalten, bis sie bereit sind."),
  },
});
