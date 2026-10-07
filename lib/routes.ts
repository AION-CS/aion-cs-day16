import { bi, t } from "@/lib/lang";

/**
 * Day 16 route registry: Customer Retention & Buying Behaviour in B2B IT Sales, Module 8 (data-driven customer success: analysing customer data and
 * controlling churn with it). From Day 3 on, a day has TWO routes (CLAUDE.md #30): Route 1 merges Level 1 and Level 2 on one case, Route 2 is Level 3. From
 * Day 13 each level has ONE Core block and ONE Core card (CLAUDE.md #48): Route 1 Core is Block 1.1 (Level 1) and Block 2.4 (Level 2); Route 2
 * Core is one frame (Step A and Step B together).
 */
export const COURSE = bi({
  title: t("Data-Driven Customer Success: Analysing Customer Data and Controlling Churn with It", "Datengetriebener Customer Success: Kundendaten analysieren und Churn damit steuern"),
  site: t("Retention Lab · Day 16", "Retention Lab · Tag 16"),
  module: t("Module 8, Day 3 of 3", "Modul 8, Tag 3 von 3"),
  course: t("Customer Retention & Buying Behaviour in B2B IT Sales", "Customer Retention & Kaufverhalten im B2B-IT-Vertrieb"),
  day: 16,
  company: "DataDriven Sales GmbH",
});

export type RouteNo = 1 | 2;

export const BLOCK_MINUTES = { "1.1": 6, "1.2": 5, "1.3": 9, "1.4": 5, "2.1": 11, "2.2": 6, "2.3": 8, "2.4": 14, "3.1": 5, "3.2": 8, "3.3": 10, "3.4": 8, "3.5": 10, "3.6": 9 } as const;
const sum = (keys: (keyof typeof BLOCK_MINUTES)[]) => keys.reduce((s, k) => s + BLOCK_MINUTES[k], 0);
export const TASK1_MINUTES = sum(["1.1", "1.2", "1.3", "1.4", "2.1", "2.2", "2.3", "2.4"]);
export const TASK2_MINUTES = sum(["3.1", "3.2", "3.3", "3.4", "3.5", "3.6"]);
/** The Core part of each task: one block per level in Route 1, one frame in Route 2 (CLAUDE.md #48). */
export const CORE1_MINUTES = sum(["1.1", "2.4"]);
export const CORE2_MINUTES = sum(["3.5", "3.6"]);
/** Minutes of the Core cards (A1 and A7, B5), as printed in the material index. */
export const CORE_CARD_MINUTES = { 1: 17, 2: 12 } as const;

export type RouteInfo = { n: RouteNo; href: string; short: string; title: string; level: string; blurb: string; plan: { label: string; minutes: number }[]; built: boolean };

export const ROUTES: RouteInfo[] = bi([
  {
    n: 1 as RouteNo,
    href: "/route-1/",
    short: t("Analyse", "Analysieren"),
    title: t("Route 1 · Understand, analyse, choose", "Route 1 · Verstehen, analysieren, wählen"),
    level: t("Levels 1 + 2 · Knowledge and application", "Level 1 + 2 · Wissen und Anwendung"),
    blurb: t(
      "One case, two levels: DataDriven Sales keeps its usage, contract and feedback data in three places, finds churn when the notice arrives and cannot say which measure kept a customer. You learn which figures to steer by (result KPIs, drivers, activity counts), how to read the behaviour patterns in the customer data, how a correlation differs from a cause and how to test a measure fairly, and how to weigh measures by economic viability, effect, sustainability and return on investment. The core is two blocks, one per level: you sort nine figures from the reports (Level 1), then choose three of six measures inside €150,000 and four months, score them and defend the order (Level 2). Six more blocks are optional and folded. Material first, then one task that ends in a Data Control File.",
      "Ein Fall, zwei Level: DataDriven Sales hält Nutzungs-, Vertrags- und Feedback-Daten an drei Orten, findet Churn, wenn die Kündigung eintrifft, und kann nicht sagen, welche Maßnahme einen Kunden hielt. Sie lernen, nach welchen Zahlen man steuert (Ergebnis-KPIs, Treiber, Aktivitätszahlen), wie man die Verhaltensmuster in den Kundendaten liest, wie sich Korrelation und Ursache unterscheiden und wie man eine Maßnahme fair testet, und wie man Maßnahmen nach Wirtschaftlichkeit, Wirkung, Nachhaltigkeit und Return on Investment bewertet. Der Kern sind zwei Blöcke, einer pro Level: Sie ordnen neun Zahlen aus den Berichten (Level 1), und wählen dann drei von sechs Maßnahmen innerhalb von 150.000 € und vier Monaten, bewerten sie und begründen die Reihenfolge (Level 2). Sechs weitere Blöcke sind optional und eingeklappt. Erst das Material, dann eine Aufgabe, die in einer Data Control File endet.",
    ),
    plan: [
      { label: t("Materi A · seven cards, two of them core (A1, A7)", "Materi A · sieben Karten, zwei davon Kern (A1, A7)"), minutes: 60 },
      { label: t("Task 1 · Data Control File, two core blocks", "Task 1 · Data Control File, zwei Kernblöcke"), minutes: TASK1_MINUTES },
    ],
    built: true,
  },
  {
    n: 2 as RouteNo,
    href: "/route-2/",
    short: t("Decide", "Entscheiden"),
    title: t("Route 2 · Management decision", "Route 2 · Managemententscheidung"),
    level: t("Level 3 · Management decision", "Level 3 · Managemententscheidung"),
    blurb: t(
      "You are now DataDriven's Chief Customer Officer. Data sits in three places, churn is found late and the measures are not managed. You build a data-driven control system on a live panel that shows what your choices do: each of eight items is set to Now, After the data is ready or Not now, and the diagram, three bars and four tests redraw at once. Then you make an investment decision despite an unclear forecast and say what you will watch and when you would stop. That is the one core task of this route; four optional blocks go deeper. Material first (one core card), then one task that ends in a Control System Memo that assembles below your answers.",
      "Sie sind jetzt Chief Customer Officer von DataDriven. Die Daten liegen an drei Orten, Churn wird spät gefunden, und die Maßnahmen werden nicht gesteuert. Sie bauen ein datengetriebenes Steuerungssystem an einem Live-Panel, das zeigt, was Ihre Entscheidungen bewirken: Jeder von acht Punkten steht auf Jetzt, Wenn die Daten bereit sind oder Jetzt nicht, und Diagramm, drei Balken und vier Tests zeichnen sich sofort neu. Dann treffen Sie eine Investitionsentscheidung trotz unklarer Prognose und sagen, was Sie beobachten und wann Sie aufhören würden. Das ist die eine Kernaufgabe dieser Route; vier optionale Blöcke vertiefen. Erst das Material (eine Kernkarte), dann eine Aufgabe, die in einem Control System Memo endet, das sich unter Ihren Antworten zusammensetzt.",
    ),
    plan: [
      { label: t("Materi B · five cards, one of them core (B5)", "Materi B · fünf Karten, eine davon Kern (B5)"), minutes: 60 },
      { label: t("Task 2 · Control System Memo, one core task", "Task 2 · Control System Memo, eine Kernaufgabe"), minutes: TASK2_MINUTES },
    ],
    built: true,
  },
]);
