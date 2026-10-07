import { bi, t } from "@/lib/lang";
import { TASK1_MINUTES, TASK2_MINUTES } from "@/lib/routes";

/** One registry for every material card: the rail, the cards and the task chips all read it. */
export type MaterialId = "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "B1" | "B2" | "B3" | "B4" | "B5";
export type Block = "A" | "B";
export type MaterialMeta = { id: MaterialId; block: Block; title: string; minutes: number; optional?: boolean };

/**
 * `optional: true` marks a card that no Core task block draws on (lib/progress.ts OPTIONAL_BLOCKS): collapsed by default via OptionalSection,
 * never removed (CLAUDE.md #35). From Day 13 each level has ONE Core card (CLAUDE.md #48): Route 1 Core cards are A1 (Level 1, the Core block 1.1)
 * and A7 (Level 2, the Core block 2.4); Route 2 Core card is B5. A Core block cites only its own Core card, and that card carries every rule the block needs
 * (CLAUDE.md #40), so A2 to A6 and B1 to B4 are Optional.
 *
 * Day 16: Materi A (Route 1, Levels 1 and 2) seven cards, 60 minutes (the two Core cards take 17); Materi B (Route 2, Level 3) five cards, 60 minutes
 * (the Core card takes 12). */
export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("What to steer by: result KPIs, drivers and activity counts", "Woran man steuert: Ergebnis-KPIs, Treiber und Aktivitätszahlen"), minutes: 9 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Three data sources: CRM, usage and feedback", "Drei Datenquellen: CRM, Nutzung und Feedback"), minutes: 9, optional: true },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Where an analysis pays, and where it can use data that exists", "Wo sich eine Analyse lohnt, und wo sie vorhandene Daten nutzen kann"), minutes: 8, optional: true },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("What a gap in the data is worth: renewal rate, lift and revenue at stake", "Was eine Lücke in den Daten wert ist: Verlängerungsquote, Lift und Umsatz auf dem Spiel"), minutes: 9, optional: true },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("Behaviour patterns in the data: four families and what each one says", "Verhaltensmuster in den Daten: vier Familien und was jede sagt"), minutes: 8, optional: true },
  { id: "A6" as MaterialId, block: "A" as Block, title: t("A correlation is not a cause: testing fairly with an A/B test, and optimising as a continuous process", "Eine Korrelation ist keine Ursache: fair testen mit einem A/B-Test, und Optimieren als fortlaufender Prozess"), minutes: 9, optional: true },
  { id: "A7" as MaterialId, block: "A" as Block, title: t("Choosing measures: economic viability, effect, sustainability and the return on investment", "Maßnahmen wählen: Wirtschaftlichkeit, Wirkung, Nachhaltigkeit und der Return on Investment"), minutes: 8 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("A data-driven control system: the target vision", "Ein datengetriebenes Steuerungssystem: das Zielbild"), minutes: 12, optional: true },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Data sources of the control system: what the customer decides first, then the tool", "Datenquellen des Steuerungssystems: zuerst, was der Kunde entscheidet, dann das Werkzeug"), minutes: 12, optional: true },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("A KPI system for control: renewal rate, active-use rate and four tests", "Ein KPI-System für die Steuerung: Renewal Rate, Active-Use Rate und vier Tests"), minutes: 12, optional: true },
  { id: "B4" as MaterialId, block: "B" as Block, title: t("Optimising with data: roll out, keep testing or stop", "Mit Daten optimieren: ausrollen, weiter testen oder stoppen"), minutes: 12, optional: true },
  { id: "B5" as MaterialId, block: "B" as Block, title: t("An investment decision under an unclear forecast, and the system", "Eine Investitionsentscheidung bei unklarer Prognose, und das System"), minutes: 12 },
]);

export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;

export type RailSection = { id: string; label: string; sub: string; minutes: number };
export const SECTIONS: Record<1 | 2, RailSection[]> = bi({
  1: [
    { id: "materi-a", label: t("Materi A", "Materi A"), sub: t("Levels 1 + 2 · understand, analyse, choose", "Level 1 + 2 · verstehen, analysieren, wählen"), minutes: 60 },
    { id: "task-1", label: t("Task 1", "Task 1"), sub: t("Data Control File · one case", "Data Control File · ein Fall"), minutes: TASK1_MINUTES },
  ],
  2: [
    { id: "materi-b", label: t("Materi B", "Materi B"), sub: t("Level 3 · data-driven control system", "Level 3 · datengetriebenes Steuerungssystem"), minutes: 60 },
    { id: "task-2", label: t("Task 2", "Task 2"), sub: t("Control System Memo · CCO", "Control System Memo · CCO"), minutes: TASK2_MINUTES },
  ],
});
