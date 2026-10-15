import { bi, t } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";

/**
 * The story comics of Day 16 (CLAUDE.md #49). One comic per Core card, here Materi A1: Rina, a Customer Success Manager at DataDriven Sales,
 * and one example customer, Kessler Maschinenbau GmbH. The people, the company name and the login days are made up to teach the three kinds
 * of figure (Case assumption, not data of the day's case); the card says so on screen. Speech and captions stay in HTML (ComicModal), the
 * drawings are in components/comic/scenes16.tsx and carry only numerals.
 */
export const COMIC_A1 = bi({
  id: "a1",
  title: t("Rina's month: three kinds of figure", "Rinas Monat: drei Arten von Zahlen"),
  teaser: t("One example customer, one report, and the figure nobody was reading.", "Ein Beispielkunde, ein Bericht und die Zahl, die niemand las."),
  note: t(
    "Rina, her boss and Kessler Maschinenbau GmbH are made up for this lesson, and so are the login days: a Case assumption, not data of DataDriven's case.",
    "Rina, ihr Chef und die Kessler Maschinenbau GmbH sind für diese Lektion erfunden, ebenso die Login-Tage: eine Case Assumption, keine Daten aus dem Fall von DataDriven.",
  ),
  names: {
    rina: t("Rina", "Rina"),
    boss: t("Her boss", "Ihr Chef"),
    customer: t("Kessler", "Kessler"),
  },
  panels: [
    {
      art: "report",
      scene: t(
        "Monday morning at DataDriven Sales. Rina is a Customer Success Manager with 140 accounts, and she is writing her monthly report.",
        "Montagmorgen bei DataDriven Sales. Rina ist Customer Success Managerin mit 140 Accounts und schreibt ihren Monatsbericht.",
      ),
      speech: [{ by: "rina", text: t("This month: 8 e-mails sent, 4 dashboards built, 12 calls made. A good month!", "Diesen Monat: 8 E-Mails verschickt, 4 Dashboards gebaut, 12 Anrufe geführt. Ein guter Monat!") }],
      tag: { tone: "plain", text: t("Activity count: it counts our own work", "Aktivitätszahl: sie zählt unsere eigene Arbeit") },
      means: t(
        "Everything in Rina's report counts what her team did: e-mails sent, dashboards built, calls made. None of it counts what a customer did. That is what makes it an activity count. The numbers are true, and they can still say nothing about whether customers will stay.",
        "Alles in Rinas Bericht zählt, was ihr Team getan hat: versendete E-Mails, gebaute Dashboards, geführte Anrufe. Nichts davon zählt, was ein Kunde getan hat. Das macht es zu einer Aktivitätszahl. Die Zahlen stimmen, und sie können trotzdem nichts darüber sagen, ob Kunden bleiben.",
      ),
      look: t("the three numbers on the card, each one is a thing Rina or her team did", "die drei Zahlen auf der Karte, jede ist etwas, das Rina oder ihr Team getan hat"),
    },
    {
      art: "praise",
      scene: t("The monthly review with her boss.", "Das Monatsgespräch mit ihrem Chef."),
      speech: [{ by: "boss", text: t("Great work, Rina! Every number is up on last month.", "Gute Arbeit, Rina! Jede Zahl liegt über dem Vormonat.") }],
      tag: { tone: "plain", text: t("Looks great. But is it working?", "Sieht gut aus. Aber wirkt es?") },
      means: t(
        "Her boss judges the month by the same activity count, because it is the only thing in the report. The numbers rose, so the month looks good. Nobody has asked yet whether any customer behaved differently because of it. An activity count can rise while the result does not move.",
        "Ihr Chef beurteilt den Monat nach derselben Aktivitätszahl, weil sie das Einzige im Bericht ist. Die Zahlen stiegen, also sieht der Monat gut aus. Niemand hat bisher gefragt, ob sich ein Kunde deswegen anders verhalten hat. Eine Aktivitätszahl kann steigen, während sich das Ergebnis nicht bewegt.",
      ),
      look: t("the grey bars on the card rise every month", "die grauen Balken auf der Karte steigen jeden Monat"),
    },
    {
      art: "kessler",
      scene: t("Meanwhile at Kessler Maschinenbau GmbH, one of Rina's customers.", "Währenddessen bei der Kessler Maschinenbau GmbH, einem von Rinas Kunden."),
      speech: [{ by: "customer", think: true, text: t("We hardly open the platform now. Nobody has time to learn the rest.", "Wir öffnen die Plattform kaum noch. Niemand hat Zeit, den Rest zu lernen.") }],
      tag: { tone: "teal", text: t("Driver: the login days keep falling", "Treiber: die Login-Tage sinken weiter") },
      means: t(
        "Active days per month is something the customer does, and it comes before the decision to renew. At Kessler it went from 18 days in January to 13 in March, 6 in June and 2 in August. This is a driver: the early signal that nobody in Rina's report was looking at.",
        "Aktive Tage pro Monat ist etwas, das der Kunde tut, und es kommt vor der Entscheidung zu verlängern. Bei Kessler sank es von 18 Tagen im Januar auf 13 im März, 6 im Juni und 2 im August. Das ist ein Treiber: das frühe Signal, das niemand in Rinas Bericht ansah.",
      ),
      look: t("the bars in the thought bubble: the days Kessler logged in each month", "die Balken in der Gedankenblase: die Tage, an denen Kessler sich jeden Monat einloggte"),
    },
    {
      art: "notice",
      scene: t("August. A letter arrives.", "August. Ein Brief kommt an."),
      speech: [{ by: "rina", text: t("A cancellation? Nothing in my report showed this!", "Eine Kündigung? Nichts in meinem Bericht hat das gezeigt!") }],
      tag: { tone: "ink", text: t("Result KPI: counted too late", "Ergebnis-KPI: zu spät gezählt") },
      means: t(
        "Churn is a result KPI: the outcome the board is judged by. It is exact, but it is counted only when the notice arrives, when nothing can be done any more. The warning was in the driver, five months earlier, from March.",
        "Churn ist ein Ergebnis-KPI: das, woran der Vorstand gemessen wird. Er ist exakt, wird aber erst gezählt, wenn die Kündigung eintrifft, wenn sich nichts mehr tun lässt. Die Warnung lag im Treiber, fünf Monate früher, ab März.",
      ),
      look: t("the envelope: the cancellation notice from Kessler", "der Umschlag: die Kündigung von Kessler"),
    },
    {
      art: "list",
      scene: t(
        "The next year. Rina has a new routine: a weekly list of customers whose login days have fallen.",
        "Das Jahr darauf. Rina hat eine neue Routine: eine wöchentliche Liste der Kunden, deren Login-Tage gesunken sind.",
      ),
      speech: [{ by: "rina", text: t("Kessler dropped to 13 days this month. I will call them today.", "Kessler ist diesen Monat auf 13 Tage gefallen. Ich rufe heute an.") }],
      tag: { tone: "teal", text: t("Driver: seen in March, not in August", "Treiber: im März gesehen, nicht im August") },
      means: t(
        "Rina now reads a driver, not only her own activity. The system counts the login days by itself, so the list is ready every Monday without anyone writing it down. It is the same idea as the first measure of Block 2.4: a weekly list of customers whose use has fallen, and a call within a week.",
        "Rina liest jetzt einen Treiber, nicht nur ihre eigene Aktivität. Das System zählt die Login-Tage selbst, die Liste liegt also jeden Montag bereit, ohne dass jemand sie aufschreibt. Es ist dieselbe Idee wie die erste Maßnahme in Block 2.4: eine wöchentliche Liste der Kunden, deren Nutzung gesunken ist, und ein Anruf innerhalb einer Woche.",
      ),
      look: t("the amber frame on the list: the customer she calls first", "der bernsteinfarbene Rahmen in der Liste: der Kunde, den sie zuerst anruft"),
    },
    {
      art: "call",
      scene: t("The call to Kessler.", "Der Anruf bei Kessler."),
      speech: [
        { by: "rina", text: t("Your login days have fallen. What is getting in the way?", "Ihre Login-Tage sind gesunken. Was steht im Weg?") },
        { by: "customer", text: t("We cannot find the export module.", "Wir finden das Export-Modul nicht.") },
        { by: "rina", text: t("Let me book a 45-minute training for your team.", "Ich buche eine 45-minütige Schulung für Ihr Team.") },
      ],
      tag: { tone: "ink", text: t("Result KPI: Kessler stays", "Ergebnis-KPI: Kessler bleibt") },
      means: t(
        "Because Rina acted on the driver while there was still time, the result changed: the customer stayed. Same customer, same product. What differed was the kind of figure she steered by. The question to ask of any number: whose behaviour is counted, the customer's or ours? And does it come before the result?",
        "Weil Rina auf den Treiber reagierte, solange noch Zeit war, änderte sich das Ergebnis: Der Kunde blieb. Derselbe Kunde, dasselbe Produkt. Anders war die Art von Zahl, nach der sie steuerte. Die Frage an jede Zahl: Wessen Verhalten wird gezählt, das des Kunden oder unseres? Und kommt es vor dem Ergebnis?",
      ),
    },
  ],
}) as Comic;
