import type { ArchId, KpiId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Step A item cards of Route 2 print besides the panel's own facts (CLAUDE.md #47, #46): one line of a normal day at DataDriven Sales with
 * the item in use, who does what and what changes for the customer. Case assumptions, like every other figure of Route 2.
 */
export type ArchExtra = { scene: string };

export const ARCH_EXTRA: Record<ArchId, ArchExtra> = bi({
  foundation: {
    scene: t(
      "On Monday an account manager opens one page per customer: use in the last 90 days, modules switched on, the open tickets and the renewal date. Next to it are the renewal rate and the return on investment of each measure on one dashboard. Before, use sat in the log, contracts in the CRM and survey answers in a mailbox, and nobody saw them together.",
      "Am Montag öffnet ein Account Manager eine Seite pro Kunde: Nutzung der letzten 90 Tage, aktivierte Module, die offenen Tickets und das Verlängerungsdatum. Daneben stehen Renewal Rate und Return on Investment jeder Maßnahme auf einem Dashboard. Vorher lag die Nutzung im Log, die Verträge im CRM und Umfrageantworten in einem Postfach, und niemand sah sie zusammen.",
    ),
  },
  chat: {
    scene: t(
      "The usage log, the CRM and the survey tool now call a customer by the same ID and use the same codes. A customer who gave a low survey score and whose admin has not logged in for three weeks is one customer with both signals, not two unrelated entries.",
      "Nutzungslog, CRM und Umfragetool nennen einen Kunden jetzt mit derselben ID und nutzen dieselben Codes. Ein Kunde, der einen niedrigen Umfragewert gab und dessen Admin sich seit drei Wochen nicht eingeloggt hat, ist ein Kunde mit beiden Signalen, nicht zwei unverbundene Einträge.",
    ),
  },
  personal: {
    scene: t(
      "A rule reads that one customer's active days fell to a third of its own average. It creates a task for the account manager: “Call this week and ask what changed.” A customer who uses only one module gets an offer for a training instead. A customer with steady use gets nothing.",
      "Eine Regel liest, dass die aktiven Tage eines Kunden auf ein Drittel seines eigenen Durchschnitts fielen. Sie legt eine Aufgabe für den Account Manager an: „Diese Woche anrufen und fragen, was sich geändert hat.“ Ein Kunde, der nur ein Modul nutzt, bekommt stattdessen ein Schulungsangebot. Ein Kunde mit stabiler Nutzung bekommt nichts.",
    ),
  },
  routing: {
    scene: t(
      "Two customers show falling use this week. One pays €30,000 a year and has an open ticket; the other pays €4,000 and logs in as usual. The list puts the first at the top, so the account manager's week goes where the loss of a customer would cost most.",
      "Zwei Kunden zeigen diese Woche sinkende Nutzung. Einer zahlt 30.000 € im Jahr und hat ein offenes Ticket; der andere zahlt 4.000 € und loggt sich wie gewohnt ein. Die Liste setzt den ersten nach oben, sodass die Woche des Account Managers dorthin geht, wo der Verlust eines Kunden am meisten kosten würde.",
    ),
  },
  training: {
    scene: t(
      "In a half-day session an account manager and a CS analyst each role-play a first call that starts with “We noticed your team has logged in less since March” and practise logging the answer in the CRM. Both then talk about the same alerts in the same words.",
      "In einer halbtägigen Einheit spielen ein Account Manager und ein CS-Analyst jeweils einen ersten Anruf durch, der mit „Uns ist aufgefallen, dass Ihr Team sich seit März weniger eingeloggt hat“ beginnt, und üben, die Antwort im CRM festzuhalten. Beide sprechen danach über dieselben Alarme in denselben Worten.",
    ),
  },
  tracking: {
    scene: t(
      "Before a new measure goes to a whole group, half of the group gets it and the other half is left alone. Once a month a one-page review lists the renewal rates and the return on investment of both halves, and the team decides to keep, change or stop the measure.",
      "Bevor eine neue Maßnahme an eine ganze Gruppe geht, bekommt sie die Hälfte der Gruppe, und die andere Hälfte bleibt unberührt. Einmal im Monat listet ein einseitiges Review die Verlängerungsquoten und den Return on Investment beider Hälften auf, und das Team entscheidet, die Maßnahme zu behalten, zu ändern oder zu stoppen.",
    ),
  },
  suite: {
    scene: t(
      "A vendor builds a model on five years of records and gives every customer a churn score. A manager sees that a customer scores 84 and cannot tell which signal the number rests on, or what to say to the customer.",
      "Ein Anbieter baut ein Modell auf fünf Jahren Daten und gibt jedem Kunden einen Churn-Score. Ein Manager sieht, dass ein Kunde 84 erreicht, und kann nicht sagen, auf welchem Signal die Zahl beruht oder was er dem Kunden sagen soll.",
    ),
  },
  relaunch: {
    scene: t(
      "Every customer with low use receives an offer of 20% off the next yearly fee if it renews early. A customer who uses the platform twice a month accepts and cancels a year later; a customer who would have renewed anyway gets the discount too. Nobody checks why use is low.",
      "Jeder Kunde mit geringer Nutzung erhält das Angebot von 20 % Rabatt auf die nächste Jahresgebühr, wenn er früh verlängert. Ein Kunde, der die Plattform zweimal im Monat nutzt, nimmt an und kündigt ein Jahr später; ein Kunde, der ohnehin verlängert hätte, bekommt den Rabatt auch. Niemand prüft, warum die Nutzung gering ist.",
    ),
  },
});

/** The aim printed beside each customer KPI in "the numbers today" (the figure Step B's "what I watch" sentence can quote). */
export const KPI_AIM: Partial<Record<KpiId, number>> = { conv: 15, engage: 55 };
