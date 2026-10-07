"use client";

import { CARDS_A } from "@/components/materi/CardsA";
import { CARDS_B } from "@/components/materi/CardsB";
import { useCardMore } from "@/store/useCardMore";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import { MATERIALS, SECTIONS, materialAnchorId } from "@/data/materialIndex";
import type { RefKey } from "@/data/references";
import { tt } from "@/lib/lang";

const REFS_A: RefKey[] = ["kaplan1992", "ries2011", "hubbard2014", "mehta2016", "lemon2016", "gdpr2016", "neslin2006", "reinartz2000", "gupta2004", "provost2013", "dawes1979", "kohavi2020", "davenport2018"];
const REFS_B: RefKey[] = ["kaplan1992", "gdpr2016", "hubbard2014", "kohavi2020", "thomas2004", "davenport2018", "courtney1997", "klein2007"];

const CARDS_A_META = MATERIALS.filter((m) => m.block === "A");
const CARDS_B_META = MATERIALS.filter((m) => m.block === "B");

function Block({ id, title, intro, children }: { id: string; title: string; intro: string; children: React.ReactNode }) {
  const all = useCardMore((s) => s.all);
  const setAll = useCardMore((s) => s.setAll);
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="space-y-4">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{title}</p>
        <h2 id={`${id}-h`}>{intro}</h2>
        <button type="button" aria-pressed={all} onClick={() => setAll(!all)} className="btn-ghost btn-sm">
          {all ? tt("Hide the extra explanations", "Zusatzerklärungen ausblenden") : tt("Show every extra explanation, video and rule", "Alle Zusatzerklärungen, Videos und Regeln zeigen")}
        </button>
      </header>
      {children}
    </section>
  );
}
const NOTE = () => tt("Check every source before you teach from it: page numbers and editions differ between printings.", "Prüfen Sie jede Quelle, bevor Sie damit unterrichten: Seitenzahlen und Auflagen unterscheiden sich.");

export function MateriA() {
  const s = SECTIONS[1][0];
  return (
    <Block id={s.id} title={tt(`Materi A · ${s.minutes} minutes, facilitator-led`, `Materi A · ${s.minutes} Minuten, moderiert`)} intro={tt("Data-driven customer success: which figures to steer by, which data to join, where an analysis pays, which patterns to watch, and how to weigh measures", "Datengetriebener Customer Success: nach welchen Zahlen man steuert, welche Daten man verbindet, wo sich eine Analyse lohnt, welche Muster man beobachtet, und wie man Maßnahmen abwägt")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Seven cards, Level 1 and Level 2 in one run. Two are core, one per level: A1 (what to steer by: result KPIs, drivers and activity counts, for Block 1.1) and A7 (how to weigh measures with the return on investment, for Block 2.4), together about 17 minutes. The other five go deeper and are folded. Every diagram uses Main Analytics, another company, so the task is never answered for you.", "Sieben Karten, Level 1 und Level 2 in einem Durchgang. Zwei sind Kern, eine pro Level: A1 (woran man steuert: Ergebnis-KPIs, Treiber und Aktivitätszahlen, für Block 1.1) und A7 (wie man Maßnahmen mit dem Return on Investment abwägt, für Block 2.4), zusammen etwa 17 Minuten. Die anderen fünf vertiefen und sind eingeklappt. Jedes Diagramm nutzt Main Analytics, ein anderes Unternehmen, damit die Aufgabe nie für Sie gelöst wird.")}
      </p>
      {CARDS_A.map((C, i) => {
        const m = CARDS_A_META[i];
        return m.optional ? (
          <OptionalSection
            key={i}
            id={materialAnchorId(m.id)}
            title={`${m.id} · ${m.title}`}
            minutes={m.minutes}
            reason={tt("Deepens a card a Core task block already covers. Not needed to complete the Data Control File.", "Vertieft eine Karte, die ein Kern-Block schon abdeckt. Für die Win-Back Analysis File nicht nötig.")}
          >
            <C />
          </OptionalSection>
        ) : (
          <C key={i} />
        );
      })}
      <ReferencesAccordion block="A" keys={REFS_A} note={NOTE()} />
    </Block>
  );
}

export function MateriB() {
  const s = SECTIONS[2][0];
  return (
    <Block id={s.id} title={tt(`Materi B · ${s.minutes} minutes, facilitator-led`, `Materi B · ${s.minutes} Minuten, moderiert`)} intro={tt("A data-driven control system: the vision, the data sources, the KPI system, optimising with data, and an investment decision under an unclear forecast", "Ein datengetriebenes Steuerungssystem: das Zielbild, die Datenquellen, das KPI-System, die Optimierung mit Daten, und eine Investitionsentscheidung bei unklarer Prognose")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Five cards for Level 3. One is core: B5, how a data-driven control system is built and how to decide under an unclear forecast (about 12 minutes). The other four go deeper and are folded. You stop weighing single measures and start designing how the whole control system is joined around the customer. Each diagram uses Spree Software, another company.", "Fünf Karten für Level 3. Eine ist Kern: B5, wie ein datengetriebenes Steuerungssystem gebaut wird und wie man bei unklarer Prognose entscheidet (etwa 12 Minuten). Die anderen vier vertiefen und sind eingeklappt. Sie wägen keine einzelnen Maßnahmen mehr ab, sondern gestalten, wie das ganze Steuerungssystem um den Kunden verbunden wird. Jedes Diagramm nutzt Spree Software, ein anderes Unternehmen.")}
      </p>
      {CARDS_B.map((C, i) => {
        const m = CARDS_B_META[i];
        return m.optional ? (
          <OptionalSection
            key={i}
            id={materialAnchorId(m.id)}
            title={`${m.id} · ${m.title}`}
            minutes={m.minutes}
            reason={tt("Deepens a card a Core task block already covers. Not needed to complete the Control System Memo.", "Vertieft eine Karte, die ein Kern-Block schon abdeckt. Für das Win-Back System Memo nicht nötig.")}
          >
            <C />
          </OptionalSection>
        ) : (
          <C key={i} />
        );
      })}
      <ReferencesAccordion block="B" keys={REFS_B} note={NOTE()} />
    </Block>
  );
}
