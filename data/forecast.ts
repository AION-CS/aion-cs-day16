import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.2 (Optional, read-only: the rates are PRINTED, no figure is asked for, CLAUDE.md #44) and the worked example of Materi A4: what a gap
 * in the data is worth. DataDriven Sales' customers last year, split by how much they used the platform (Case assumption). The method is
 *
 *   renewal rate                 = renewed customers ÷ customers in the group × 100
 *   lift (how many times)        = renewal rate of intensive users ÷ renewal rate of low users
 *   revenue at stake a year      = low-use customers a year × (rate of intensive users − rate of low users, as a share of one) × yearly value of one customer
 *
 * The last line is the most the gap could be worth if low-use customers behaved like intensive ones; a correlation is not a cause, so it is never the
 * amount a measure would earn. (Identifiers keep the names of the file this was built from: `control` = low-use customers, `variant` = intensive
 * customers, `sent` = customers in the group, `orders` = renewed customers, `order` = yearly revenue of one customer.) Results are rounded to two decimals.
 */
export const PILOT = {
  control: { sent: 200, orders: 120 },
  variant: { sent: 100, orders: 90 },
  yearly: 400,
  order: 4800,
};

const r2 = (x: number) => Math.round(x * 100) / 100;
export const rateOf = (orders: number, sent: number) => r2((orders / sent) * 100);
export const liftOf = (a: number, b: number) => r2(a / b);
export const extraOf = (yearly: number, variantRate: number, controlRate: number, order: number) => r2(yearly * ((variantRate - controlRate) / 100) * order);

export const FORECAST = {
  f1: rateOf(PILOT.variant.orders, PILOT.variant.sent),
  controlRate: rateOf(PILOT.control.orders, PILOT.control.sent),
  get f2() {
    return liftOf(this.f1, this.controlRate);
  },
  get f3() {
    return extraOf(PILOT.yearly, this.f1, this.controlRate, PILOT.order);
  },
};

/** The worked example of Materi A4: a different company (Main Analytics), the same method on other numbers. Case assumption. */
export const MOSEL = { control: { sent: 150, orders: 102 }, variant: { sent: 50, orders: 40 }, yearly: 250, order: 7000 };
export const MOSEL_RESULT = (() => {
  const rate = rateOf(MOSEL.variant.orders, MOSEL.variant.sent);
  const other = rateOf(MOSEL.control.orders, MOSEL.control.sent);
  return { rate, other, lift: liftOf(rate, other), extra: extraOf(MOSEL.yearly, rate, other, MOSEL.order) };
})();

/* ------------------------------------------------------------------ Block 1.3a · eight customer segments */

/**
 * Eight segments of DataDriven's customers. (The type keeps the name "customer" of the file it was built from: `volume` = customers in the segment,
 * `leave` = share of them who cancelled last year (the churn rate of the segment), `decision` = the cause is one DataDriven can act on, so a measure
 * has something to change, `known` = how much of the data that would show the segment is already joined to the CRM (usage data, billing, feedback).)
 * The rule of Materi A1 and A3: a measure helps most where the cause is one the company can act on and 25% or more cancel; an analysis can run on data
 * DataDriven already has only where part or all of the data of the segment is joined.
 */
export type CustId = "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8";
export type Known = "none" | "part" | "all";
export const KNOWN_LABEL = bi({ none: t("Nothing: the usage data of this segment is not joined to the CRM", "Nichts: Die Nutzungsdaten dieses Segments sind nicht mit dem CRM verbunden"), part: t("Part of it: some of the data is joined, the rest is not", "Ein Teil: ein Teil der Daten ist verbunden, der Rest nicht"), all: t("All of it: all of the data is joined", "Alles: alle Daten sind verbunden") });
export const DECISION_LABEL = bi({ yes: t("Yes", "Ja"), no: t("No", "Nein") });
export type Customer = { id: CustId; name: string; volume: number; leave: number; decision: boolean; known: Known };
export const LEAVE_MIN = 25;
export const CUSTOMERS: Customer[] = bi([
  { id: "c1" as CustId, name: t("Low use: fewer than four active days a month", "Geringe Nutzung: weniger als vier aktive Tage im Monat"), volume: 420, leave: 38, decision: true, known: "none" as Known },
  { id: "c2" as CustId, name: t("New customers with no first report in their first 60 days", "Neukunden ohne ersten Bericht in den ersten 60 Tagen"), volume: 180, leave: 31, decision: true, known: "none" as Known },
  { id: "c3" as CustId, name: t("Large customers who moved to a competitor's all-in-one suite", "Große Kunden, die zur Komplettlösung eines Wettbewerbers wechselten"), volume: 60, leave: 62, decision: false, known: "none" as Known },
  { id: "c4" as CustId, name: t("Customers with a history of late payment", "Kunden mit Zahlungsverzug in der Vergangenheit"), volume: 150, leave: 8, decision: false, known: "all" as Known },
  { id: "c5" as CustId, name: t("Customers with many support tickets after adding users", "Kunden mit vielen Support-Tickets nach dem Hinzufügen von Nutzern"), volume: 220, leave: 12, decision: true, known: "part" as Known },
  { id: "c6" as CustId, name: t("Customers who joined through a reseller", "Kunden, die über einen Reseller kamen"), volume: 700, leave: 22, decision: false, known: "none" as Known },
  { id: "c7" as CustId, name: t("Intensive users: twelve or more active days a month", "Intensive Nutzer: zwölf oder mehr aktive Tage im Monat"), volume: 800, leave: 3, decision: false, known: "none" as Known },
  { id: "c8" as CustId, name: t("Customers whose finance team asks for the contract end date “for the lawyers”", "Kunden, deren Finanzabteilung das Vertragsende „für die Juristen“ anfragt"), volume: 80, leave: 40, decision: false, known: "none" as Known },
]);
export const CUST_BY_ID = Object.fromEntries(CUSTOMERS.map((c) => [c.id, c])) as Record<CustId, Customer>;
export const PICK = 2;
export const AUTO_MIN_VOLUME = LEAVE_MIN;
/** A measure helps most: the cause is one the company can act on and 25% or more cancel (Materi A1, A3). */
export const VALUABLE_TRUTH: CustId[] = ["c1", "c2"];
/** An analysis can run on data DataDriven already has: part or all of the data of the segment is joined (Materi A1, A3). */
export const CHURN_TRUTH: CustId[] = ["c4", "c5"];
export const PICK_WHY = bi({
  c1: t("The cause (little use) is one DataDriven can act on, and 38% of these customers cancel: a measure here has something to change. The usage data is not joined to the CRM yet, so nobody sees these customers together today. A segment where a measure helps most.", "Die Ursache (wenig Nutzung) ist eine, auf die DataDriven einwirken kann, und 38 % dieser Kunden kündigen: Eine Maßnahme hat hier etwas zu ändern. Die Nutzungsdaten sind noch nicht mit dem CRM verbunden, also sieht heute niemand diese Kunden zusammen. Ein Segment, in dem eine Maßnahme am meisten hilft."),
  c2: t("A bad start is something DataDriven can fix, and 31% cancel. Nothing joins the first-report data to the CRM today. A segment where a measure helps most.", "Ein schlechter Start lässt sich beheben, und 31 % kündigen. Heute verbindet nichts die Daten zum ersten Bericht mit dem CRM. Ein Segment, in dem eine Maßnahme am meisten hilft."),
  c3: t("62% cancel, but the customers have moved to a competitor's suite: the cause is a decision DataDriven cannot change with a measure of its own. High churn alone is not enough.", "62 % kündigen, aber die Kunden sind zur Komplettlösung eines Wettbewerbers gewechselt: Die Ursache ist eine Entscheidung, die DataDriven mit einer eigenen Maßnahme nicht ändern kann. Hoher Churn allein reicht nicht."),
  c4: t("The finance system is already joined to the CRM, so an analysis could run on data DataDriven has. Only 8% cancel and late payment is not a cause DataDriven can act on, so it is not where a measure helps most.", "Das Finanzsystem ist schon mit dem CRM verbunden, also könnte eine Analyse auf Daten laufen, die DataDriven hat. Nur 8 % kündigen, und Zahlungsverzug ist keine Ursache, auf die DataDriven einwirken kann, also hilft hier eine Maßnahme nicht am meisten."),
  c5: t("The ticket data is partly joined, so an analysis can build on it. The cause can be acted on, but only 12% cancel, so it is not the most critical segment.", "Die Ticketdaten sind teilweise verbunden, also kann eine Analyse darauf aufbauen. Die Ursache lässt sich beeinflussen, aber nur 12 % kündigen, also ist es nicht das kritischste Segment."),
  c6: t("22% cancel, below the 25% line, and the reseller owns the relationship: a measure of DataDriven's own would reach these customers only through someone else.", "22 % kündigen, unter der 25-%-Linie, und der Reseller besitzt die Beziehung: Eine eigene Maßnahme von DataDriven würde diese Kunden nur über jemand anderen erreichen."),
  c7: t("Almost nobody cancels (3%); the segment works and needs no measure.", "Fast niemand kündigt (3 %); das Segment funktioniert und braucht keine Maßnahme."),
  c8: t("40% cancel, but a customer whose finance team asks for the contract end date “for the lawyers” has most likely decided already: nothing DataDriven does changes that now.", "40 % kündigen, aber ein Kunde, dessen Finanzabteilung das Vertragsende „für die Juristen“ anfragt, hat höchstwahrscheinlich schon entschieden: Nichts, was DataDriven tut, ändert das jetzt."),
});

/* ------------------------------------------------------------------ Block 1.3b · three concrete insights */

/** The three data sources an insight can read (Materi A2); each insight the learner writes reads a different one. (The type keeps its earlier name, "basis".) */
export type Basis = "crm" | "usage" | "feedback";
export const BASES = bi([
  { id: "crm" as Basis, label: t("CRM data", "CRM-Daten"), short: t("CRM", "CRM") },
  { id: "usage" as Basis, label: t("Usage data", "Nutzungsdaten"), short: t("Usage", "Nutzung") },
  { id: "feedback" as Basis, label: t("Feedback and interactions", "Feedback und Interaktionen"), short: t("Feedback", "Feedback") },
]);
export const BASIS_LABEL = bi({ crm: t("CRM data", "CRM-Daten"), usage: t("Usage data", "Nutzungsdaten"), feedback: t("Feedback and interactions", "Feedback und Interaktionen") });
export const INSIGHT_COUNT = 3;
export const INSIGHT_MIN = 45;
export const INSIGHT_FRAME = bi({ v: t("[The pattern we expect] in [the data source], so [what we would do about it].", "[Das Muster, das wir erwarten] in [der Datenquelle], sodass [was wir dagegen tun würden].") });
/** True when the sentence says what the insight leads to. A floor, not a judge of quality; English and German forms. */
export const hasSoWhat = (s: string) => /\b(so|therefore|which means|because|means|so that|thus|hence|daher|deshalb|weil|das heißt|bedeutet|sodass|damit|also)\b/i.test(s);
