"use client";

import { useState } from "react";
import { Block31, Block32, Block33, Block34 } from "@/components/task2/Blocks";
import { MemoPanel } from "@/components/task2/MemoPanel";
import { Panel } from "@/components/task2/Panel";
import { StepA } from "@/components/task2/StepA";
import { StepB } from "@/components/task2/StepB";
import { TodayTable } from "@/components/task2/Kits";
import { ExportBar } from "@/components/ui/ExportBar";
import { Callout } from "@/components/ui/MaterialCard";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { MEASURE_BY_ID } from "@/data/measures";
import { R2_BUDGET, R2_MONTHS } from "@/data/route2";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { memoBody } from "@/lib/exportDoc";
import { r2Missing } from "@/lib/missing";
import { BLOCK_MINUTES, CORE2_MINUTES } from "@/lib/routes";
import { exportName } from "@/lib/slug";
import type { Scn } from "@/lib/r2Panel";
import { useJumpTo } from "@/lib/useJumpTo";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

/** The situation of Route 2, stated once, directly above the task, with a soft pointer to the learner's own Route 1 answers. */
function CaseBrief() {
  const hydrated = useHydrated();
  const p = usePersisted();
  const jump = useJumpTo();
  const chosen = p.l1.chosen.map((id) => MEASURE_BY_ID[id].name);
  const has = hydrated && chosen.length > 0;
  return (
    <section id="task-2" aria-labelledby="task2-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="task2-h">{tt("The situation: you are the Chief Customer Officer", "Die Lage: Sie sind Chief Customer Officer")}</h2>
        <span className="smallcaps">{tt("Read once · about 4 min", "Einmal lesen · ca. 4 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt("DataDriven Sales has seen that customers with intensive use renew about one and a half times as often as customers with low use, and that a call within a week of a fall in use can change the picture. You now answer for how the whole company steers customer success with data. Data sits in three places, churn is found late and nobody can say which measure kept a customer. The budget is limited, the data is incomplete and two goals conflict: costs against customer value. The board wants a data-driven control system, and an investment decision now, although nobody knows the forecast.", "DataDriven Sales hat gesehen, dass Kunden mit intensiver Nutzung etwa anderthalbmal so oft verlängern wie Kunden mit geringer Nutzung und dass ein Anruf innerhalb einer Woche nach einem Nutzungsrückgang das Bild ändern kann. Sie verantworten jetzt, wie das ganze Unternehmen Customer Success mit Daten steuert. Die Daten liegen an drei Orten, Churn wird spät erkannt, und niemand kann sagen, welche Maßnahme einen Kunden hielt. Das Budget ist begrenzt, die Daten sind unvollständig, und zwei Ziele stehen im Konflikt: Kosten gegen Kundenwert. Der Vorstand will ein datengetriebenes Steuerungssystem und jetzt eine Investitionsentscheidung, obwohl niemand die Prognose kennt.")}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(R2_BUDGET)}</strong> {tt("(Case assumption)", "(Fallannahme)")}
            </li>
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${R2_MONTHS} months`, `${R2_MONTHS} Monate`)}</strong>
            </li>
            <li>{tt("The items and their costs are in Step A; the numbers today are in the table below.", "Die Punkte und ihre Kosten stehen in Schritt A; die Zahlen heute stehen in der Tabelle darunter.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption md:col-span-2">
          <p className="smallcaps">{tt(`What you build · one core task, about ${CORE2_MINUTES} min`, `Was Sie bauen · eine Kernaufgabe, ca. ${CORE2_MINUTES} Min.`)}</p>
          <ol className="mt-1 grid list-decimal gap-x-6 pl-4 text-ink sm:grid-cols-2">
            <li>{tt("The target vision of a data-driven control system", "Das Zielbild eines datengetriebenen Steuerungssystems")}</li>
            <li>{tt("The central KPIs (churn rate, renewal rate, active-use rate)", "Die zentralen KPIs (Churn Rate, Renewal Rate, Active-Use Rate)")}</li>
            <li>{tt("The retention strategy: which alert for which signal", "Die Retention-Strategie: welcher Alarm für welches Signal")}</li>
            <li>{tt("A continuous optimisation process (test, read, adjust)", "Ein fortlaufender Optimierungsprozess (testen, lesen, anpassen)")}</li>
            <li>{tt("The prioritised decision architecture for implementation", "Die priorisierte Entscheidungsarchitektur für die Umsetzung")}</li>
            <li>{tt("An investment decision despite an unclear forecast", "Eine Investitionsentscheidung trotz unklarer Prognose")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt("Step A (the system) and Step B (the decision) are one frame: together they are the one core task of this route. Four optional blocks below go deeper.", "Schritt A (das System) und Schritt B (die Entscheidung) sind ein Rahmen: Zusammen sind sie die eine Kernaufgabe dieser Route. Vier optionale Blöcke unten vertiefen.")}</p>
        </div>
      </div>
      <TodayTable />
      <div role="note" className="rounded-lg border border-gold bg-accentSoft p-3 text-caption text-ink" id="task1-quote">
        <p className="smallcaps text-accent">{tt("Where Route 1 left off · your own answers", "Wo Route 1 aufgehört hat · Ihre eigenen Antworten")}</p>
        {has ? (
          <p className="mt-1">
            {tt("Measures you chose in Route 1: ", "Von Ihnen in Route 1 gewählte Maßnahmen: ")}
            <strong>{chosen.join(", ")}</strong>.
          </p>
        ) : (
          <p className="mt-1">{tt("You have not answered Route 1 yet. That is fine: nothing here is blocked, and this box fills in when you do.", "Sie haben Route 1 noch nicht beantwortet. Das ist in Ordnung: Hier ist nichts gesperrt, und dieses Feld füllt sich, sobald Sie es tun.")}</p>
        )}
        <button type="button" onClick={() => jump("block-2-4", "/route-1/")} className="btn-ghost btn-sm mt-2">
          {tt("Go to Block 2.4 in Route 1", "Zu Block 2.4 in Route 1")}
        </button>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")} tone="amber">
        <p>
          {tt("The brief gives the role (Chief Customer Officer or head of customer success) and the situation: data in three places, churn found late, no control over what works; a limited budget, an incomplete data situation, conflicting goals (costs against customer value); and an investment decision under uncertainty. The budget, the items, the lifts, the costs and the baselines are made up for this exercise.", "Der Auftrag nennt die Rolle (Chief Customer Officer oder Leitung Customer Success) und die Lage: Daten an drei Orten, Churn spät erkannt, keine Kontrolle, was wirkt; ein begrenztes Budget, eine unvollständige Datenlage, widersprüchliche Ziele (Kosten gegen Kundenwert); und eine Investitionsentscheidung unter Unsicherheit. Budget, Punkte, Lifts, Kosten und Baselines sind für diese Übung erfunden.")}
        </p>
      </Callout>
    </section>
  );
}

export function Task2() {
  const p = usePersisted();
  const [scn, setScn] = useState<Scn>(0);
  const missing = r2Missing(p);
  const filename = exportName(p.participant.name, "l3-control-system-memo");
  return (
    <div className="space-y-6">
      <CaseBrief />
      <div id="r2-frame" className="space-y-4">
        <Panel scn={scn} setScn={setScn} />
        <StepA scn={scn} />
        <StepB scn={scn} />
      </div>
      <section id="go-deeper" aria-labelledby="go-deeper-h" className="space-y-3">
        <div className="space-y-1">
          <h2 id="go-deeper-h">{tt("Go deeper · optional", "Vertiefen · optional")}</h2>
          <p className="max-w-prose text-caption text-ash">
            {tt(
              "Four blocks that each practise one part of the plan: the principles of the vision, the data sources of the control system, the KPI system, and roll out, keep testing or stop for measures. They are folded: nothing in the frame needs them, and they are not counted in the progress ring or the missing list. Open one any time.", "Vier Blöcke, die je einen Teil des Plans üben: die Prinzipien des Zielbilds, die Datenquellen des Steuerungssystems, das KPI-System, und ausrollen, weiter testen oder stoppen bei Maßnahmen. Sie sind eingeklappt: Nichts im Rahmen braucht sie, und sie zählen nicht im Fortschrittsring oder in der Liste des Offenen. Öffnen Sie einen jederzeit.",
            )}
          </p>
        </div>
        <OptionalSection
          id="block-3-1"
          title={tt("Block 3.1 · The target vision of a data-driven control system", "Block 3.1 · Das Zielbild eines datengetriebenen Steuerungssystems")}
          minutes={BLOCK_MINUTES["3.1"]}
          reason={tt("Names the principles behind a control system; Step A asks for your vision without them.", "Benennt die Prinzipien hinter einem Steuerungssystem; Schritt A fragt Ihr Zielbild auch ohne sie ab.")}
        >
          <Block31 />
        </OptionalSection>
        <OptionalSection
          id="block-3-2"
          title={tt("Block 3.2 · The data sources of the control system", "Block 3.2 · Die Datenquellen des Steuerungssystems")}
          minutes={BLOCK_MINUTES["3.2"]}
          reason={tt("Sorts eight data sources into use now, improve the data first or not central; Step A prints the figures it needs itself.", "Sortiert acht Datenquellen in jetzt nutzen, zuerst die Daten verbessern oder nicht zentral; Schritt A druckt die Zahlen, die er braucht, selbst.")}
        >
          <Block32 />
        </OptionalSection>
        <OptionalSection
          id="block-3-3"
          title={tt("Block 3.3 · A KPI system for control", "Block 3.3 · Ein KPI-System für die Steuerung")}
          minutes={BLOCK_MINUTES["3.3"]}
          reason={tt("Rates KPI candidates on four tests; Step B prints the customer figures it uses, so the decision does not need the ratings.", "Bewertet KPI-Kandidaten nach vier Tests; Schritt B druckt die Kundenzahlen, die er nutzt, die Entscheidung braucht die Bewertungen also nicht.")}
        >
          <Block33 />
        </OptionalSection>
        <OptionalSection
          id="block-3-4"
          title={tt("Block 3.4 · Measures tested: roll out, keep testing or stop", "Block 3.4 · Maßnahmen getestet: ausrollen, weiter testen oder stoppen")}
          minutes={BLOCK_MINUTES["3.4"]}
          reason={tt("Decides roll out, keep testing or stop for six measure tests; Step B asks only when you would stop.", "Entscheidet für sechs Tests von Maßnahmen über Ausrollen, Weitertesten oder Stoppen; Schritt B fragt nur, wann Sie aufhören würden.")}
        >
          <Block34 />
        </OptionalSection>
      </section>
      <MemoPanel />
      <ExportBar
        id="export-l3"
        previewTitle={tt("Preview of your memo", "Vorschau Ihres Memos")}
        exportLabel={tt("Export the Control System Memo", "Control System Memo exportieren")}
        docTitle="Control System Memo"
        filename={filename}
        missing={missing}
        buildBody={() => memoBody(p)}
        showPreview={false}
      />
    </div>
  );
}
