"use client";

import { ExportBar } from "@/components/ui/ExportBar";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { Block11, Block12, Block13, Block14 } from "@/components/task1/Part1";
import { Block21, Block22, Block23, Block24 } from "@/components/task1/Part2";
import { Callout } from "@/components/ui/MaterialCard";
import { BUDGET, MONTHS } from "@/data/measures";
import { analysisBody } from "@/lib/exportDoc";
import { l1Missing } from "@/lib/missing";
import { euro, num, tt } from "@/lib/lang";
import { FORECAST, PILOT } from "@/data/forecast";
import { exportName } from "@/lib/slug";
import { usePersisted } from "@/store/usePersisted";
import { Gloss } from "@/lib/glossify";
import { BLOCK_MINUTES, CORE1_MINUTES, TASK1_MINUTES } from "@/lib/routes";

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: DataDriven Sales GmbH", "Der Fall: DataDriven Sales GmbH")}</h2>
        <span className="smallcaps">{tt("Read once · about 5 min", "Einmal lesen · ca. 5 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt("DataDriven Sales GmbH sells a reporting and analytics platform to Mittelstand companies: five modules, about 1,400 customers and a yearly fee of about €4,800 per customer. Usage sits in the platform log, contracts and calls in the CRM, and survey answers and tickets in two other tools, and nobody reads them together. Churn is found when the notice arrives, and the measures the company tries (tips mails, discounts) cannot be measured. Management wants to know which figures to steer by, which patterns in the customer data move with churn, and which measures fit the budget and the time.", "DataDriven Sales GmbH verkauft Mittelstandsunternehmen eine Reporting- und Analytics-Plattform: fünf Module, etwa 1.400 Kunden und eine Jahresgebühr von etwa 4.800 € pro Kunde. Die Nutzung liegt im Log der Plattform, Verträge und Gespräche im CRM, Umfrageantworten und Tickets in zwei weiteren Tools, und niemand liest sie zusammen. Churn wird gefunden, wenn die Kündigung eintrifft, und die Maßnahmen, die das Unternehmen versucht (Tipps-Mails, Rabatte), lassen sich nicht messen. Die Geschäftsführung will wissen, nach welchen Zahlen man steuert, welche Muster in den Kundendaten sich mit dem Churn bewegen und welche Maßnahmen in Budget und Zeit passen.")}
        </Gloss>
      </p>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            `One first hint: last year ${num(PILOT.control.sent)} customers had low use (fewer than four active days a month); ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })}% renewed. ${num(PILOT.variant.sent)} had intensive use (twelve or more active days); ${num(FORECAST.f1, { maximumFractionDigits: 1 })}% renewed, ${num(FORECAST.f2)} times as often. Intensive customers may simply be keener or bigger, so it is a correlation, not proof of a cause.`,
            `Ein erster Hinweis: Im letzten Jahr hatten ${num(PILOT.control.sent)} Kunden geringe Nutzung (weniger als vier aktive Tage im Monat); ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} % verlängerten. ${num(PILOT.variant.sent)} hatten intensive Nutzung (zwölf oder mehr aktive Tage); ${num(FORECAST.f1, { maximumFractionDigits: 1 })} % verlängerten, ${num(FORECAST.f2)}-mal so oft. Intensive Kunden sind vielleicht einfach eifriger oder größer, also ist es eine Korrelation, kein Beweis für eine Ursache.`,
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Nine figures from DataDriven's reports (Block 1.1).", "Neun Zahlen aus den Berichten von DataDriven (Block 1.1).")}</li>
            <li>{tt("Last year's renewal figures (optional Block 1.2) and eight groups of customers (optional Block 1.3).", "Die Verlängerungs-Werte des letzten Jahres (optionaler Block 1.2) und acht Kundengruppen (optionaler Block 1.3).")}</li>
            <li>{tt("Twelve behaviour patterns DataDriven could read in its data (optional Block 2.1) and six measures it could fund (Block 2.4).", "Zwölf Verhaltensmuster, die DataDriven in seinen Daten lesen könnte (optionaler Block 2.1), und sechs Maßnahmen, die es finanzieren könnte (Block 2.4).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong>
            </li>
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${MONTHS} months`, `${MONTHS} Monate`)}</strong>
            </li>
            <li>{tt("The cost, the weeks, who every measure aims at and its return on investment are printed in Block 2.4. A customer is worth about €4,800 a year.", "Kosten, Wochen, worauf jede Maßnahme zielt, und ihr Return on Investment stehen in Block 2.4. Ein Kunde ist etwa 4.800 € im Jahr wert.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE1_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: sort nine figures into result KPI, driver or activity count, and add one extra figure of your own (Level 1, material A1).", "Block 1.1: neun Zahlen in Ergebnis-KPI, Treiber oder Aktivitätszahl sortieren und eine eigene zusätzliche Zahl ergänzen (Level 1, Material A1).")}</li>
            <li>{tt("Block 2.4: choose three of six measures, score them by economic viability, effect and sustainability, read their return on investment and defend the order (Level 2, material A7).", "Block 2.4: drei von sechs Maßnahmen wählen, sie nach Wirtschaftlichkeit, Wirkung und Nachhaltigkeit bewerten, ihren Return on Investment lesen und die Reihenfolge begründen (Level 2, Material A7).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Six more blocks (about ${TASK1_MINUTES - CORE1_MINUTES} min) are optional and folded.`, `Sechs weitere Blöcke (ca. ${TASK1_MINUTES - CORE1_MINUTES} Min.) sind optional und eingeklappt.`)}</p>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")} tone="amber">
        <p>
          {tt("The brief says: data sits in three places; churn is found when the notice arrives; the measures cannot be measured; €150,000 and four months. Everything else is made up for this exercise: the figures, the renewal rates, the groups of customers, the patterns, the return on investment parts, the €4,800 a year and the costs.", "Der Auftrag sagt: Die Daten liegen an drei Orten; Churn wird gefunden, wenn die Kündigung eintrifft; die Maßnahmen sind nicht messbar; 150.000 € und vier Monate. Alles andere ist für diese Übung erfunden: die Zahlen, die Verlängerungsquoten, die Kundengruppen, die Muster, die Teile des Return on Investment, die 4.800 € im Jahr und die Kosten.")}
        </p>
      </Callout>
    </section>
  );
}

function PartHeading({ id, n, title, level }: { id: string; n: number; title: string; level: string }) {
  return (
    <div id={id} className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-ink pb-1 pt-2">
      <span className="smallcaps text-accent">{tt(`Part ${n}`, `Teil ${n}`)}</span>
      <h2>{title}</h2>
      <span className="smallcaps ml-auto">{level}</span>
    </div>
  );
}

export function Task1() {
  const p = usePersisted();
  const missing = l1Missing(p);
  const filename = exportName(p.participant.name, "l1l2-data-control-file");
  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt(`Task 1 · two core blocks, one per level; optional blocks folded`, `Task 1 · zwei Kernblöcke, einer pro Level; optionale Blöcke eingeklappt`)}</p>
        <h2 id="task1-h">{tt("Data Control File: understand, analyse, choose", "Data Control File: verstehen, analysieren, wählen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Understand the data", "Die Daten verstehen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 />
      <OptionalSection
        id="block-1-2"
        title={tt("Block 1.2 · Read the renewal figures: two renewal rates side by side", "Block 1.2 · Die Verlängerungs-Werte lesen: zwei Verlängerungsquoten nebeneinander")}
        minutes={BLOCK_MINUTES["1.2"]}
        reason={tt("Practises reading one comparison without being fooled by it (intensive customers may simply be keener); the choices of Block 2.4 do not need it.", "Übt, einen Vergleich zu lesen, ohne sich täuschen zu lassen (intensive Kunden sind vielleicht einfach eifriger); die Entscheidungen in Block 2.4 brauchen es nicht.")}
      >
        <Block12 />
      </OptionalSection>
      <OptionalSection
        id="block-1-3"
        title={tt("Block 1.3 · Where a measure helps most, where an analysis can use data we have, and three insights", "Block 1.3 · Wo eine Maßnahme am meisten hilft, wo eine Analyse vorhandene Daten nutzen kann, und drei Erkenntnisse")}
        minutes={BLOCK_MINUTES["1.3"]}
        reason={tt("Develops three insights from the data and finds the groups where a measure helps most; Block 1.1 and the measures of Block 2.4 are answered without it.", "Entwickelt drei Erkenntnisse aus den Daten und findet die Gruppen, in denen eine Maßnahme am meisten hilft; Block 1.1 und die Maßnahmen in Block 2.4 werden auch ohne ihn beantwortet.")}
      >
        <Block13 />
      </OptionalSection>
      <OptionalSection
        id="block-1-4"
        title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
        minutes={BLOCK_MINUTES["1.4"]}
        reason={tt("A reflective bridge between Level 1 and Level 2, not content the Data Control File itself needs.", "Eine reflektierende Brücke zwischen Level 1 und Level 2, kein Inhalt, den die Data Control File selbst braucht.")}
      >
        <Block14 />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Analyse and choose", "Analysieren und auswählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <OptionalSection
        id="block-2-1"
        title={tt("Block 2.1 · Tag DataDriven's twelve behaviour patterns by family, and name your three", "Block 2.1 · Die zwölf Verhaltensmuster von DataDriven nach Familie zuordnen, und Ihre drei nennen")}
        minutes={BLOCK_MINUTES["2.1"]}
        reason={tt("Practises telling the four families of behaviour pattern apart; the choices of Block 2.4 are made and scored without it.", "Übt, die vier Familien von Verhaltensmustern zu unterscheiden; die Entscheidungen in Block 2.4 werden auch ohne ihn getroffen und bewertet.")}
      >
        <Block21 />
      </OptionalSection>
      <OptionalSection
        id="block-2-2"
        title={tt("Block 2.2 · What each family of pattern is worth, and the uncertainties", "Block 2.2 · Was jede Familie von Mustern wert ist, und die Unsicherheiten")}
        minutes={BLOCK_MINUTES["2.2"]}
        reason={tt("Reads when each family of pattern shows, from your tags in Block 2.1, and what can mislead customer data; Block 2.4 can be answered without it.", "Liest, wann sich jede Familie von Mustern zeigt, aus Ihren Zuordnungen in Block 2.1, und was Kundendaten in die Irre führen kann; Block 2.4 lässt sich auch ohne es beantworten.")}
      >
        <Block22 />
      </OptionalSection>
      <OptionalSection
        id="block-2-3"
        title={tt("Block 2.3 · Design a fair A/B test", "Block 2.3 · Einen fairen A/B-Test entwerfen")}
        minutes={BLOCK_MINUTES["2.3"]}
        reason={tt("Applies the fair-test rules of Materi A6 to a call within a week of a fall in use; the measures of Block 2.4 are chosen and scored without it.", "Wendet die Regeln eines fairen Tests aus Materi A6 auf einen Anruf innerhalb einer Woche nach einem Nutzungsrückgang an; die Maßnahmen in Block 2.4 werden auch ohne ihn gewählt und bewertet.")}
      >
        <Block23 />
      </OptionalSection>
      <Block24 />
      <ExportBar
        id="export-l1l2"
        previewTitle={tt("Preview of your Data Control File", "Vorschau Ihrer Data Control File")}
        exportLabel={tt("Export the Data Control File", "Data Control File exportieren")}
        docTitle="Data Control File"
        filename={filename}
        missing={missing}
        buildBody={() => analysisBody(p)}
      />
    </section>
  );
}
