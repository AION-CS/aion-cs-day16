import { MATERIALS, materialAnchorId } from "@/data/materialIndex";
import type { RouteNo } from "@/lib/routes";
import { isOptionalBlock } from "@/lib/progress";
import type { TaskBlockId } from "@/lib/progress";
import { tt } from "@/lib/lang";

/** The page map on the right of every route (CLAUDE.md #28). Built on call, so it follows the language. */
export type NavItem = {
  id: string;
  short: string;
  title: string;
  done?: { card: string } | { block: TaskBlockId };
  /** Collapsed by default (OptionalSection), and outside the dossier ring's count and total (CLAUDE.md #35). */
  optional?: boolean;
};
export type NavGroup = { label: string; items: NavItem[] };

const cards = (block: "A" | "B"): NavItem[] => MATERIALS.filter((m) => m.block === block).map((m) => ({ id: materialAnchorId(m.id), short: m.id, title: m.title, done: { card: m.id }, optional: m.optional }));
const blk = (n: string, title: string, block: TaskBlockId, short?: string): NavItem => ({ id: `block-${n.replace(".", "-")}`, short: short ?? n, title, done: { block }, optional: isOptionalBlock(block) });

export function pageNav(route: RouteNo): NavGroup[] {
  if (route === 1)
    return [
      { label: "Materi A", items: cards("A") },
      {
        label: "Task 1",
        items: [
          { id: "case-brief", short: tt("Case", "Fall"), title: tt("The case: DataDriven Sales", "Der Fall: DataDriven Sales") },
          blk("1.1", tt("Result KPI, driver or activity count?", "Ergebnis-KPI, Treiber oder Aktivitätszahl?"), "b11"),
          blk("1.2", tt("Read the renewal figures: two renewal rates", "Die Verlängerungs-Werte lesen: zwei Verlängerungsquoten"), "b12"),
          blk("1.3", tt("Where a measure helps most, three insights", "Wo eine Maßnahme am meisten hilft, drei Erkenntnisse"), "b13"),
          blk("1.4", tt("Coaching reflection", "Coaching-Reflexion"), "b14"),
          blk("2.1", tt("Tag the twelve patterns, name your three", "Die zwölf Muster zuordnen, Ihre drei nennen"), "b21"),
          blk("2.2", tt("What each family is worth, the uncertainties", "Was jede Familie wert ist, die Unsicherheiten"), "b22"),
          blk("2.3", tt("A fair A/B test", "Ein fairer A/B-Test"), "b23"),
          blk("2.4", tt("Three measures, scored and ordered", "Drei Maßnahmen, bewertet und geordnet"), "b24"),
          { id: "export-l1l2", short: "Export", title: tt("Export the Data Control File", "Data Control File exportieren") },
        ],
      },
    ];
  return [
    { label: "Materi B", items: cards("B") },
    {
      label: "Task 2",
      items: [
        { id: "task-2", short: tt("Case", "Fall"), title: tt("The situation and the numbers today", "Die Lage und die Zahlen heute") },
        { id: "r2-panel", short: tt("Panel", "Panel"), title: tt("The live control panel", "Das Live-Steuerungspanel") },
        blk("3.5", tt("Step A · Build the system (the core frame)", "Schritt A · Das System bauen (der Kernrahmen)"), "b35", "A"),
        blk("3.6", tt("Step B · Decide (the core frame)", "Schritt B · Entscheiden (der Kernrahmen)"), "b36", "B"),
        blk("3.1", tt("Go deeper · the target vision", "Vertiefen · das Zielbild"), "b31"),
        blk("3.2", tt("Go deeper · the data sources", "Vertiefen · die Datenquellen"), "b32"),
        blk("3.3", tt("Go deeper · the KPI system for control", "Vertiefen · das KPI-System für die Steuerung"), "b33"),
        blk("3.4", tt("Go deeper · measures, tested", "Vertiefen · Maßnahmen, getestet"), "b34"),
        { id: "export-l3", short: "Export", title: tt("Export the Control System Memo", "Control System Memo exportieren") },
      ],
    },
  ];
}
