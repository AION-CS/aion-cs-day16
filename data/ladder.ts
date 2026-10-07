import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.1 (Core, Level 1). Nine figures DataDriven Sales GmbH has in its reports. The learner tags each with what kind of figure it is
 * (Materi A1): a result KPI (what the company wants to change in the end: customers leaving, what a customer is worth, how many sign), a driver
 * (something customers do or experience that comes before a result and moves it) or an activity count (it only counts what the company's own teams
 * did, so it can rise while the result does not move). (The identifiers `LINES`, `LineId` and `LevelTag` keep the names of the sort board this file was
 * built from: a "line" is one figure, a "level tag" is the kind of figure.) `truth` is never shown outside the mentor answer key.
 */
export type LevelTag = "result" | "driver" | "activity";
export const LEVEL_TAGS = bi([
  { id: "result" as LevelTag, label: t("Result KPI", "Ergebnis-KPI"), hint: t("What the company wants to change in the end: customers leaving, what a customer is worth, how many sign. The board is judged by it.", "Was das Unternehmen am Ende ändern will: Kunden, die gehen, was ein Kunde wert ist, wie viele unterschreiben. Der Vorstand wird daran gemessen.") },
  { id: "driver" as LevelTag, label: t("Driver", "Treiber"), hint: t("Something customers do or experience that comes before a result and moves it: how often they use the platform, how much of it, how well they start.", "Etwas, das Kunden tun oder erleben und das vor einem Ergebnis kommt und es bewegt: wie oft sie die Plattform nutzen, wie viel davon, wie gut sie starten.") },
  { id: "activity" as LevelTag, label: t("Activity count", "Aktivitätszahl"), hint: t("It only counts what the company or its teams did: e-mails sent, dashboards built, calls made. It can rise while the result does not move.", "Sie zählt nur, was das Unternehmen oder seine Teams getan haben: versendete E-Mails, gebaute Dashboards, geführte Anrufe. Sie kann steigen, während sich das Ergebnis nicht bewegt.") },
]);
export const LEVEL_LABEL = bi({ result: t("Result KPI", "Ergebnis-KPI"), driver: t("Driver", "Treiber"), activity: t("Activity count", "Aktivitätszahl") });

export type LineId = "l1" | "l2" | "l3" | "l4" | "l5" | "l6" | "l7" | "l8" | "l9";
export type Line = { id: LineId; text: string; source: string; truth: LevelTag; clue: string; why: string; rejected: Partial<Record<LevelTag, string>> };

export const LINES: Line[] = bi([
  {
    id: "l1" as LineId,
    source: t("Finance", "Finanzen"),
    text: t("Share of customers who cancelled in the last twelve months, out of all customers at the start of the year (churn rate).", "Anteil der Kunden, die in den letzten zwölf Monaten kündigten, an allen Kunden zu Jahresbeginn (Churn Rate)."),
    truth: "result" as LevelTag,
    clue: t("Would the board be pleased if only this number fell, whatever else stayed the same?", "Würde sich der Vorstand freuen, wenn nur diese Zahl fiele, egal was sonst gleich bliebe?"),
    why: t("Customers leaving is what the company wants to change in the end, and the board is judged by it. A result KPI.", "Kunden, die gehen, ist das, was das Unternehmen am Ende ändern will, und der Vorstand wird daran gemessen. Ein Ergebnis-KPI."),
    rejected: { driver: t("A driver comes before the result and moves it. Cancelling is the result itself.", "Ein Treiber kommt vor dem Ergebnis und bewegt es. Die Kündigung ist das Ergebnis selbst.") },
  },
  {
    id: "l2" as LineId,
    source: t("Finance", "Finanzen"),
    text: t("The profit a customer brings over its whole relationship with DataDriven, worked out per segment (customer lifetime value, CLV).", "Der Gewinn, den ein Kunde über seine ganze Beziehung zu DataDriven bringt, pro Segment berechnet (Customer Lifetime Value, CLV)."),
    truth: "result" as LevelTag,
    clue: t("Is it what a customer is worth in the end, or something that leads to it?", "Ist es das, was ein Kunde am Ende wert ist, oder etwas, das dahin führt?"),
    why: t("What a customer is worth is a result the company wants to raise. A result KPI.", "Was ein Kunde wert ist, ist ein Ergebnis, das das Unternehmen steigern will. Ein Ergebnis-KPI."),
    rejected: { driver: t("Use and a good start lead to a higher CLV, but the CLV itself is the worth, not what leads to it.", "Nutzung und ein guter Start führen zu einem höheren CLV, aber der CLV selbst ist der Wert, nicht das, was dahin führt.") },
  },
  {
    id: "l3" as LineId,
    source: t("CRM", "CRM"),
    text: t("Share of trial users who sign a paid contract within 30 days (conversion rate).", "Anteil der Testnutzer, die innerhalb von 30 Tagen einen kostenpflichtigen Vertrag unterschreiben (Conversion Rate)."),
    truth: "result" as LevelTag,
    clue: t("Did the customer decide something here, and is it what the company wants more of?", "Hat der Kunde hier etwas entschieden, und will das Unternehmen davon mehr?"),
    why: t("Signing is a decision the customer makes and the company wants more of. A result KPI.", "Unterschreiben ist eine Entscheidung des Kunden, von der das Unternehmen mehr will. Ein Ergebnis-KPI."),
    rejected: { activity: t("It does not count what DataDriven did, but what trial users decided.", "Sie zählt nicht, was DataDriven tat, sondern was Testnutzer entschieden.") },
  },
  {
    id: "l4" as LineId,
    source: t("Usage data", "Nutzungsdaten"),
    text: t("Number of days per month on which at least one person at the customer uses the platform (active days).", "Zahl der Tage pro Monat, an denen mindestens eine Person beim Kunden die Plattform nutzt (aktive Tage)."),
    truth: "driver" as LevelTag,
    clue: t("Whose behaviour is counted, the customer's or ours? And does it come before the result?", "Wessen Verhalten wird gezählt, das des Kunden oder unseres? Und kommt es vor dem Ergebnis?"),
    why: t("It counts what the customer does, comes before cancelling and moves it. A driver.", "Sie zählt, was der Kunde tut, kommt vor der Kündigung und bewegt sie. Ein Treiber."),
    rejected: { result: t("The board does not judge success by active days alone; they matter because they lead to renewal.", "Der Vorstand misst Erfolg nicht allein an aktiven Tagen; sie zählen, weil sie zur Verlängerung führen.") },
  },
  {
    id: "l5" as LineId,
    source: t("Usage data", "Nutzungsdaten"),
    text: t("Share of customers who use three or more of the five modules.", "Anteil der Kunden, die drei oder mehr der fünf Module nutzen."),
    truth: "driver" as LevelTag,
    clue: t("Is it something customers do, and does it come before renewal?", "Ist es etwas, das Kunden tun, und kommt es vor der Verlängerung?"),
    why: t("How much of the product customers use shows how deeply it is built into their work and comes before renewal. A driver.", "Wie viel vom Produkt Kunden nutzen, zeigt, wie tief es in ihre Arbeit eingebaut ist, und kommt vor der Verlängerung. Ein Treiber."),
    rejected: { activity: t("It counts customers' behaviour, not something DataDriven's teams did.", "Sie zählt das Verhalten der Kunden, nicht etwas, das die Teams von DataDriven taten.") },
  },
  {
    id: "l6" as LineId,
    source: t("CRM", "CRM"),
    text: t("Time between signing and the first successful report a customer builds (time to first use).", "Zeit zwischen Unterschrift und dem ersten erfolgreichen Bericht, den ein Kunde baut (Zeit bis zur ersten Nutzung)."),
    truth: "driver" as LevelTag,
    clue: t("Does a good start come before the result and move it?", "Kommt ein guter Start vor dem Ergebnis und bewegt es?"),
    why: t("A customer who starts well tends to stay, so how fast it gets to its first report leads to the result. A driver.", "Ein Kunde, der gut startet, bleibt eher, also führt die Zeit bis zum ersten Bericht zum Ergebnis. Ein Treiber."),
    rejected: { result: t("It is not what the company wants to change in the end; it leads to renewal and sales.", "Es ist nicht das, was das Unternehmen am Ende ändern will; es führt zu Verlängerung und Umsatz.") },
  },
  {
    id: "l7" as LineId,
    source: t("Marketing", "Marketing"),
    text: t("Number of newsletters and e-mails sent to customers each month.", "Zahl der Newsletter und E-Mails, die jeden Monat an Kunden gesendet werden."),
    truth: "activity" as LevelTag,
    clue: t("Whose behaviour is counted: what the customer did, or what we sent?", "Wessen Verhalten wird gezählt: was der Kunde tat, oder was wir sandten?"),
    why: t("It counts what the company sent. It can double while nobody stays longer. An activity count.", "Sie zählt, was das Unternehmen sandte. Sie kann sich verdoppeln, ohne dass jemand länger bleibt. Eine Aktivitätszahl."),
    rejected: { driver: t("A driver counts what customers do. Sending says nothing about whether anyone reads or acts.", "Ein Treiber zählt, was Kunden tun. Das Senden sagt nichts darüber, ob jemand liest oder handelt.") },
  },
  {
    id: "l8" as LineId,
    source: t("Analytics team", "Analytics-Team"),
    text: t("Number of dashboards the analytics team has built for managers.", "Zahl der Dashboards, die das Analytics-Team für Manager gebaut hat."),
    truth: "activity" as LevelTag,
    clue: t("Does it say anything about customers, or only about the team's output?", "Sagt sie etwas über Kunden, oder nur über den Output des Teams?"),
    why: t("It counts the team's output. More dashboards do not mean more control. An activity count.", "Sie zählt den Output des Teams. Mehr Dashboards heißen nicht mehr Steuerung. Eine Aktivitätszahl."),
    rejected: { result: t("Nothing here is something customers decided or the company earns; it is output.", "Nichts hier ist etwas, das Kunden entschieden haben oder das das Unternehmen verdient; es ist Output.") },
  },
  {
    id: "l9" as LineId,
    source: t("Customer success", "Customer Success"),
    text: t("Number of check-in calls the account managers made last quarter.", "Zahl der Check-in-Gespräche, die die Account Manager im letzten Quartal führten."),
    truth: "activity" as LevelTag,
    clue: t("Does it count what customers did, or what the account managers did?", "Zählt sie, was Kunden taten, oder was die Account Manager taten?"),
    why: t("Calls made count the team's effort. Whether customers stayed because of them is another number. An activity count.", "Geführte Anrufe zählen den Einsatz des Teams. Ob Kunden deswegen blieben, ist eine andere Zahl. Eine Aktivitätszahl."),
    rejected: { driver: t("A driver counts customer behaviour; calls made count ours.", "Ein Treiber zählt Kundenverhalten; geführte Anrufe zählen unseres.") },
  },
]);
export const LINE_IDS: LineId[] = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9"];

/** The tests taught in Materi A1 for each kind of figure, and the pair tests. */
export const LEVEL_TESTS = bi([
  { name: t("Result KPI", "Ergebnis-KPI"), test: t("Is it what the company wants to change in the end (customers leaving, what a customer is worth, how many sign), the number the board is judged by?", "Ist es das, was das Unternehmen am Ende ändern will (Kunden, die gehen, was ein Kunde wert ist, wie viele unterschreiben), die Zahl, an der der Vorstand gemessen wird?") },
  { name: t("Driver", "Treiber"), test: t("Does it count what customers do or experience (use, depth of use, a good start), does it come before a result and move it, and can the company influence it?", "Zählt sie, was Kunden tun oder erleben (Nutzung, Tiefe der Nutzung, ein guter Start), kommt sie vor einem Ergebnis, bewegt es, und kann das Unternehmen sie beeinflussen?") },
  { name: t("Activity count", "Aktivitätszahl"), test: t("Does it only count what the company or its teams did (e-mails sent, dashboards built, calls made)? Then it can rise while the result does not move.", "Zählt sie nur, was das Unternehmen oder seine Teams getan haben (versendete E-Mails, gebaute Dashboards, geführte Anrufe)? Dann kann sie steigen, während sich das Ergebnis nicht bewegt.") },
  { name: t("Result or driver?", "Ergebnis oder Treiber?"), test: t("Ask: would the board be pleased if only this number moved? If yes, it is a result. If the number matters because it leads to a result, it is a driver.", "Fragen Sie: Würde sich der Vorstand freuen, wenn sich nur diese Zahl bewegte? Wenn ja, ist sie ein Ergebnis. Wenn die Zahl zählt, weil sie zu einem Ergebnis führt, ist sie ein Treiber.") },
  { name: t("Driver or activity count?", "Treiber oder Aktivitätszahl?"), test: t("A driver counts what customers do; an activity count counts what we do. Ask: whose behaviour is counted?", "Ein Treiber zählt, was Kunden tun; eine Aktivitätszahl zählt, was wir tun. Fragen Sie: Wessen Verhalten wird gezählt?") },
  { name: t("Result or activity count?", "Ergebnis oder Aktivitätszahl?"), test: t("A result is something a customer decided (stay, pay, sign). An activity count is something we did, however busy.", "Ein Ergebnis ist etwas, das ein Kunde entschied (bleiben, zahlen, unterschreiben). Eine Aktivitätszahl ist etwas, das wir taten, so beschäftigt wir auch sind.") },
]);

/** The decisive phrase inside each figure's own text, for "Highlight the key words" (never which kind it points to). */
export const LINE_KEY: Record<string, string> = bi({
  l1: t("cancelled in the last twelve months", "in den letzten zwölf Monaten kündigten"),
  l2: t("profit a customer brings over its whole relationship", "Gewinn, den ein Kunde über seine ganze Beziehung"),
  l3: t("trial users who sign a paid contract within 30 days", "Testnutzer, die innerhalb von 30 Tagen einen kostenpflichtigen Vertrag unterschreiben"),
  l4: t("at least one person at the customer uses the platform", "mindestens eine Person beim Kunden die Plattform nutzt"),
  l5: t("customers who use three or more of the five modules", "Kunden, die drei oder mehr der fünf Module nutzen"),
  l6: t("first successful report a customer builds", "ersten erfolgreichen Bericht, den ein Kunde baut"),
  l7: t("newsletters and e-mails sent to customers", "Newsletter und E-Mails, die jeden Monat an Kunden gesendet werden"),
  l8: t("dashboards the analytics team has built", "Dashboards, die das Analytics-Team für Manager gebaut hat"),
  l9: t("check-in calls the account managers made", "Check-in-Gespräche, die die Account Manager im letzten Quartal führten"),
});
