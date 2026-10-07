"use client";

import clsx from "clsx";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { CheckBar, OptionList, Reading, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { LEVEL_TAGS, LEVEL_TESTS, LINES, LINE_KEY } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { BASES, BASIS_LABEL, CUSTOMERS, DECISION_LABEL, INSIGHT_COUNT, INSIGHT_FRAME, INSIGHT_MIN, KNOWN_LABEL, LEAVE_MIN, PICK, PILOT, FORECAST } from "@/data/forecast";
import type { Basis, CustId, } from "@/data/forecast";
import { citesForecastFigure, insightFlags, pickHolds, sortHolds } from "@/lib/checks";
import { scrollToAndFlash } from "@/lib/flash";
import { Gloss } from "@/lib/glossify";
import { IDS } from "@/lib/missing";
import { num, pct, tt } from "@/lib/lang";
import { extraInsightGuide, insightGuide, meaningGuide, reflectGuide } from "@/lib/mentorGuide";
import { pickKey, sortKey } from "@/lib/answerKey";
import { MIN_LINE, MIN_SENTENCE } from "@/lib/progress";
import { BLOCK_MINUTES } from "@/lib/routes";
import { useStore } from "@/store/useStore";

/* ------------------------------------------------------------------ Block 1.1 (Core, Level 1) */

export function Block11() {
  const l1 = useStore((s) => s.l1);
  const place = useStore((s) => s.placeLine);
  const undo = useStore((s) => s.undoSort);
  const redo = useStore((s) => s.redoSort);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Result KPI, driver or activity count?", "Block 1.1 · Ergebnis-KPI, Treiber oder Aktivitätszahl?")}
      kind="OBJECTIVE"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the nine figures on the sort board below, taken from DataDriven Sales' reports. Answer on the sort board.", "Route 1 → Task 1 → die neun Zahlen auf der Sortiertafel unten, aus den Berichten von DataDriven Sales. Antworten Sie auf der Sortiertafel.")}
    >
      <MaterialRefs refs={["A1"]} />
      <PlacementBoard<LevelTag>
        items={LINES.map((r) => ({ id: r.id, meta: r.source, text: r.text }))}
        bins={LEVEL_TAGS.map((t) => ({ id: t.id, label: t.label, hint: t.hint }))}
        value={l1.sort}
        onPlace={(id, tag) => place(id as LineId, tag)}
        onUndo={undo}
        onRedo={redo}
        undoCount={l1.sortHistory.length}
        redoCount={l1.sortFuture.length}
        domId={IDS.line}
        keyPhrases={LINE_KEY}
        clues={Object.fromEntries(LINES.map((r) => [r.id, r.clue]))}
        reasons={Object.fromEntries(LINES.map((r) => [r.id, r.why]))}
        result={l1.sortResult}
        checks={l1.sortChecks}
        onCheck={() => patch((s) => ({ checks: s.checks + 1, sortChecks: s.sortChecks + 1, sortResult: sortHolds(s.sort) }))}
        onClue={() => patch({ sortClue: true })}
        clueShown={l1.sortClue}
        reasoningOpened={l1.sortReasoning}
        onOpenReasoning={() => patch({ sortReasoning: true })}
        noun={tt("figure", "Zahl")}
        intro={tt("Drag a figure onto the kind of figure it is, or select it and then select a kind. Select a placed one to move it again. One kind per figure.", "Ziehen Sie eine Zahl auf die Art von Zahl, die sie ist, oder wählen Sie sie aus und dann eine Art. Wählen Sie eine platzierte, um sie zu verschieben. Eine Art pro Zahl.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A1", "Testfragen · aus Materi A1")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every figure. They repeat the tests from Materi A1; they never say which figure goes where.", "Stellen Sie diese Fragen zu jeder Zahl. Sie wiederholen die Tests aus Materi A1; sie sagen nie, welche Zahl wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {LEVEL_TESTS.map((c) => (
                  <li key={c.name}>
                    <span className="font-semibold">{c.name}. </span>
                    <Gloss>{c.test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A1"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <TextBox
        id={IDS.extraInsight}
        label={tt("One extra figure DataDriven should watch, of your own", "Eine eigene zusätzliche Zahl, die DataDriven beobachten sollte")}
        help={tt("Name a figure the systems could count, say which kind it is (result KPI, driver or activity count) and why it could warn early (“so …”). At least 30 characters.", "Nennen Sie eine Zahl, die die Systeme zählen könnten, sagen Sie, welche Art sie ist (Ergebnis-KPI, Treiber oder Aktivitätszahl) und warum sie früh warnen könnte („sodass …“). Mindestens 30 Zeichen.")}
        value={l1.extraInsight}
        onChange={(v) => patch({ extraInsight: v })}
        min={MIN_LINE}
        rows={2}
      >
        <WritingHelp
          id="extra-insight-kit"
          refs={[
            { label: tt("What goes wrong today (the case)", "Was heute schiefgeht (der Fall)"), value: tt("data in three places, churn found late, no control over what works", "Daten an drei Orten, Churn zu spät erkannt, keine Kontrolle, was wirkt"), target: "case-brief" },
            { label: tt("The three kinds of figure and the question that sorts them (Materi A1)", "Die drei Arten von Zahlen und die Frage, die sie sortiert (Materi A1)"), value: tt("result KPI · driver · activity count", "Ergebnis-KPI · Treiber · Aktivitätszahl"), target: "mat-A1" },
            { label: tt("The nine figures above", "Die neun Zahlen oben"), value: tt("see what DataDriven already counts", "sehen Sie, was DataDriven schon zählt"), target: IDS.line(LINES[0].id) },
          ]}
          steps={[
            tt("Name one figure a system could count by itself (for example the number of different people who log in each month), not “better data”.", "Nennen Sie eine Zahl, die ein System selbst zählen könnte (zum Beispiel die Zahl der verschiedenen Personen, die sich pro Monat einloggen), nicht „bessere Daten“."),
            tt("Say which kind it is: a result, a driver of the result, or only what the team did.", "Sagen Sie, welche Art sie ist: ein Ergebnis, ein Treiber des Ergebnisses oder nur das, was das Team tat."),
            tt("Finish with “so …”: why it could warn early, before a customer gives notice.", "Schließen Sie mit „sodass …“: warum sie früh warnen könnte, bevor ein Kunde kündigt."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="extra-insight-example" guide={extraInsightGuide()} />
      {mentor && <MentorGuide guide={extraInsightGuide()} />}
      <AnswerKey block={sortKey()} />
      <BlockMissing block="1.1" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 (Optional, read-only) */

const row = (id: string, cells: string[]) => (
  <tr id={id} className="border-t border-line">
    <td className="px-3 py-2 font-semibold">{cells[0]}</td>
    {cells.slice(1).map((c, i) => (
      <td key={i} className="tnum px-3 py-2 text-right">
        {c}
      </td>
    ))}
  </tr>
);

export function Block12() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const check = () =>
    patch((s) => {
      const w = s.meaning.trim();
      return { checks: s.checks + 1, meaningFlagged: w !== "" && (w.length < MIN_SENTENCE || !citesForecastFigure(w)), meaningClue: false };
    });
  const pct1 = (v: number) => `${num(v, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · Read the renewal figures: two renewal rates side by side", "Block 1.2 · Die Verlängerungs-Werte lesen: zwei Verlängerungsquoten nebeneinander")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the table “Last year” directly below, with the two renewal rates the app prints. Answer in the field under the table.", "Route 1 → Task 1 → die Tabelle „Letztes Jahr“ direkt darunter, mit den zwei Verlängerungsquoten, die die App druckt. Antworten Sie im Feld unter der Tabelle.")}
    >
      <MaterialRefs refs={["A4"]} />
      <p className="text-body text-ink">
        <Gloss>
          {tt("DataDriven Sales' records show how customers with low use and customers with intensive use renewed last year. The app divides renewed customers by customers in the group and prints both renewal rates for you; nothing is left to calculate. Your job is to read them side by side and say what they do and do not tell DataDriven. How such a rate is worked out is shown in", "Die Unterlagen von DataDriven Sales zeigen, wie Kunden mit geringer Nutzung und Kunden mit intensiver Nutzung im letzten Jahr verlängerten. Die App teilt verlängerte Kunden durch Kunden der Gruppe und druckt beide Verlängerungsquoten für Sie; es bleibt nichts zu rechnen. Ihre Aufgabe ist, sie nebeneinander zu lesen und zu sagen, was sie DataDriven sagen und was nicht. Wie eine solche Quote entsteht, zeigt")}
        </Gloss>{" "}
        <button type="button" onClick={() => scrollToAndFlash("mat-A4", "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          Materi A4
        </button>
        .
      </p>
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[30rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Last year · customers by level of use, and how many renewed (Case assumption)", "Letztes Jahr · Kunden nach Nutzungsniveau und wie viele verlängerten (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Group", "Gruppe")}</th>
              <th className="px-3 py-2 text-right">{tt("Customers", "Kunden")}</th>
              <th className="px-3 py-2 text-right">{tt("Renewed", "Verlängert")}</th>
              <th className="px-3 py-2 text-right">{tt("Renewal rate (printed)", "Verlängerungsquote (gedruckt)")}</th>
            </tr>
          </thead>
          <tbody>
            {row("fc-ctl", [tt("Low use: fewer than four active days a month", "Geringe Nutzung: weniger als vier aktive Tage im Monat"), num(PILOT.control.sent), num(PILOT.control.orders), pct1(FORECAST.controlRate)])}
            {row("fc-var", [tt("Intensive use: twelve or more active days a month", "Intensive Nutzung: zwölf oder mehr aktive Tage im Monat"), num(PILOT.variant.sent), num(PILOT.variant.orders), pct1(FORECAST.f1)])}
          </tbody>
        </table>
      </div>
      <p className="text-caption text-ash">
        {tt(`Read it like this: of every 100 customers, ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} renewed with low use and ${num(FORECAST.f1, { maximumFractionDigits: 1 })} with intensive use, so intensive customers renewed ${num(FORECAST.f2)} times as often. But intensive customers may simply be keener or bigger from the start, so the gap is not what a measure would win.`, `So lesen Sie es: Von je 100 Kunden verlängerten ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} bei geringer Nutzung und ${num(FORECAST.f1, { maximumFractionDigits: 1 })} bei intensiver Nutzung; intensive Kunden verlängerten also ${num(FORECAST.f2)}-mal so oft. Aber intensive Kunden sind vielleicht einfach von Anfang an eifriger oder größer, also ist die Lücke nicht das, was eine Maßnahme gewinnen würde.`)}
      </p>
      <TextBox
        id={IDS.meaning}
        label={tt("What do the renewal figures mean for DataDriven?", "Was bedeuten die Verlängerungs-Werte für DataDriven?")}
        help={tt("One or two sentences. Quote at least one printed figure, say what DataDriven should do first, and why it cannot be sure yet that use alone made the difference.", "Ein oder zwei Sätze. Zitieren Sie mindestens einen gedruckten Wert, sagen Sie, was DataDriven zuerst tun sollte, und warum es noch nicht sicher sein kann, dass allein die Nutzung den Unterschied machte.")}
        value={l1.meaning}
        onChange={(v) => patch({ meaning: v, meaningFlagged: false })}
        min={MIN_SENTENCE}
        rows={4}
        flagged={l1.meaningFlagged}
        clue={tt("Which printed figure says how much more often intensive customers renewed, and could the two groups differ in other ways? Quote one figure and say what follows.", "Welcher gedruckte Wert sagt, wie viel öfter intensive Kunden verlängerten, und könnten sich die zwei Gruppen auch in anderem unterscheiden? Zitieren Sie einen Wert und sagen Sie, was folgt.")}
        clueShown={l1.meaningClue}
        onShowClue={() => patch({ meaningClue: true })}
      >
        <WritingHelp
          id="meaning-help"
          refs={[
            { label: tt("Renewal rates, with low use and with intensive use", "Verlängerungsquoten, bei geringer und bei intensiver Nutzung"), value: `${pct1(FORECAST.controlRate)} · ${pct1(FORECAST.f1)}`, target: "fc-var" },
            { label: tt("Renewed customers behind each group", "Verlängerte Kunden hinter jeder Gruppe"), value: `${PILOT.control.orders} · ${PILOT.variant.orders}`, target: "fc-ctl" },
            { label: tt("Why a comparison like this is not yet proof (Materi A6)", "Warum ein solcher Vergleich noch kein Beweis ist (Materi A6)"), value: tt("the two groups may differ in other ways", "die zwei Gruppen unterscheiden sich vielleicht auch in anderem"), target: "mat-A6" },
          ]}
          steps={[
            tt("Say how much more often intensive customers renewed (the two rates, or “one and a half times”).", "Sagen Sie, wie viel öfter intensive Kunden verlängerten (die zwei Quoten, oder „anderthalbmal“)."),
            tt("Say what DataDriven should do first, for example watch use as an early signal and call customers whose use falls.", "Sagen Sie, was DataDriven zuerst tun sollte, zum Beispiel die Nutzung als frühes Signal beobachten und Kunden anrufen, deren Nutzung fällt."),
            tt("Say it as an estimate: intensive customers may simply be keener, so the gap is not proof of a cause.", "Sagen Sie es als Schätzung: Intensive Kunden sind vielleicht einfach eifriger, also ist die Lücke kein Beweis für eine Ursache."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="meaning-example" guide={meaningGuide()} />
      {mentor && <MentorGuide guide={meaningGuide()} />}
      <CheckBar onCheck={check} checkLabel={tt("Check my sentence", "Meinen Satz prüfen")} checks={l1.checks} />
      {l1.checks > 0 && (
        <Reading>
          {!l1.meaningFlagged
            ? tt("Nothing is outlined by the last check.", "Die letzte Prüfung hat nichts markiert.")
            : tt("The sentence is outlined: it needs at least one printed figure and a few words more.", "Der Satz ist markiert: Er braucht mindestens einen gedruckten Wert und ein paar Worte mehr.")}
        </Reading>
      )}
      <BlockMissing block="1.2" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.3 (Optional) */

export function Block13() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const toggle = (k: "valuable" | "churners", id: CustId) => patch((s) => ({ [k]: s[k].includes(id) ? s[k].filter((x) => x !== id) : [...s[k], id], pickResult: null }) as Partial<typeof s>);
  const setRow = (i: number, p: Partial<{ basis: Basis | null; text: string }>) => patch((s) => ({ insights: s.insights.map((h, j) => (j === i ? { ...h, ...p } : h)), insFlagged: s.insFlagged.filter((x) => x !== i) }));
  const check = () => patch((s) => ({ checks: s.checks + 1, insChecked: true, insClue: false, insFlagged: insightFlags(s), pickResult: pickHolds(s), pickClue: false }));
  const opts = CUSTOMERS.map((c) => ({ id: c.id, label: c.name }));
  return (
    <AnswerBlock
      id="block-1-3"
      title={tt("Block 1.3 · Where a measure helps most, where an analysis can use data we have, and three insights", "Block 1.3 · Wo eine Maßnahme am meisten hilft, wo eine Analyse vorhandene Daten nutzen kann, und drei Erkenntnisse")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the table “Eight groups of customers” below: customers in the group, the share who cancelled, whether DataDriven can act on the cause, and how much of the data is joined to the CRM. Answer in the two lists and the three fields under it.", "Route 1 → Task 1 → die Tabelle „Acht Kundengruppen“ unten: Kunden der Gruppe, der Anteil, der kündigte, ob DataDriven auf die Ursache einwirken kann, und wie viele Daten mit dem CRM verbunden sind. Antworten Sie in den zwei Listen und den drei Feldern darunter.")}
    >
      <MaterialRefs refs={["A2", "A3"]} />
      <p className="rounded-md border border-line bg-mist/40 px-3 py-2 text-caption text-ink">
        <Gloss>
          {tt("How to read the table. Each row is one group of DataDriven's customers, for example customers with fewer than four active days a month. “Customers” says how many are in the group. “Cancelled last year” says what share of them gave notice (bold means 25% or more). “Can DataDriven act on the cause? · Data joined to the CRM” says whether the cause is one DataDriven can change itself (yes) or not (no), and how much of the data that would show the group (use, contract, feedback) is already joined to the CRM.", "So lesen Sie die Tabelle. Jede Zeile ist eine Gruppe von Kunden von DataDriven, zum Beispiel Kunden mit weniger als vier aktiven Tagen im Monat. „Kunden“ sagt, wie viele in der Gruppe sind. „Im letzten Jahr gekündigt“ sagt, welcher Anteil von ihnen gekündigt hat (fett heißt 25 % oder mehr). „Kann DataDriven auf die Ursache einwirken? · Mit dem CRM verbundene Daten“ sagt, ob die Ursache eine ist, die DataDriven selbst ändern kann (Ja) oder nicht (Nein), und wie viel von den Daten, die die Gruppe zeigen würden (Nutzung, Vertrag, Feedback), schon mit dem CRM verbunden ist.")}
        </Gloss>
      </p>
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[36rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Eight groups of customers · DataDriven Sales' records (Case assumption)", "Acht Kundengruppen · Unterlagen von DataDriven Sales (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Group", "Gruppe")}</th>
              <th className="px-3 py-2 text-right">{tt("Customers", "Kunden")}</th>
              <th className="px-3 py-2">{tt("Cancelled last year", "Im letzten Jahr gekündigt")}</th>
              <th className="px-3 py-2">{tt("Can DataDriven act on the cause? · Data joined to the CRM", "Kann DataDriven auf die Ursache einwirken? · Mit dem CRM verbundene Daten")}</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id} id={`cust-${c.id}`} className="border-t border-line">
                <td className="px-3 py-2 font-semibold">{c.name}</td>
                <td className="tnum px-3 py-2 text-right">{num(c.volume)}</td>
                <td className={clsx("tnum px-3 py-2", c.leave >= LEAVE_MIN && "font-semibold")}>{pct(c.leave)}</td>
                <td className="px-3 py-2">{`${DECISION_LABEL[c.decision ? "yes" : "no"]} · ${KNOWN_LABEL[c.known]}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div id={IDS.valuable} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`a · The ${PICK} groups where a measure helps most`, `a · Die ${PICK} Gruppen, in denen eine Maßnahme am meisten hilft`)}</p>
          <OptionList<CustId> multi label={tt("Helps most", "Hilft am meisten")} value={l1.valuable} onChange={(id) => toggle("valuable", id)} disabledIds={l1.valuable.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.valuable, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.valuable.length} of ${PICK} chosen.`, `${l1.valuable.length} von ${PICK} gewählt.`)}</p>
        </div>
        <div id={IDS.churners} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`b · The ${PICK} groups where an analysis can run on data we have`, `b · Die ${PICK} Gruppen, in denen eine Analyse auf vorhandenen Daten laufen kann`)}</p>
          <OptionList<CustId> multi label={tt("Can use data we have", "Kann vorhandene Daten nutzen")} value={l1.churners} onChange={(id) => toggle("churners", id)} disabledIds={l1.churners.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.churners, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.churners.length} of ${PICK} chosen.`, `${l1.churners.length} von ${PICK} gewählt.`)}</p>
        </div>
      </div>
      {l1.pickResult && (
        <Reading>
          {tt(`${l1.pickResult.holds} of ${l1.pickResult.total} picks hold. A check never says which. `, `${l1.pickResult.holds} von ${l1.pickResult.total} Wahlen stimmen. Eine Prüfung sagt nie, welche. `)}
          {l1.pickClue ? (
            tt("Clue: a measure helps most where DataDriven can act on the cause and a quarter or more cancel. An analysis can run on data we have only where part or all of the data of the group is already joined to the CRM. Which groups have a cause DataDriven can change and 25% or more cancelling? Where is part or all of the data already joined?", "Hinweis: Eine Maßnahme hilft am meisten dort, wo DataDriven auf die Ursache einwirken kann und ein Viertel oder mehr kündigt. Eine Analyse kann nur dort auf vorhandenen Daten laufen, wo ein Teil oder alle Daten der Gruppe schon mit dem CRM verbunden sind. Welche Gruppen haben eine Ursache, die DataDriven ändern kann, und 25 % oder mehr, die kündigen? Wo sind ein Teil oder alle Daten schon verbunden?")
          ) : l1.pickResult.holds < l1.pickResult.total ? (
            <button type="button" onClick={() => patch({ pickClue: true })} className="btn-ghost btn-sm border-gold">
              {tt("Show clue", "Hinweis zeigen")}
            </button>
          ) : null}
        </Reading>
      )}
      <AnswerKey block={pickKey()} />
      <div className="space-y-3 border-t border-line pt-3">
        <p className="font-semibold text-ink">{tt("c · Three insights from the data", "c · Drei Erkenntnisse aus den Daten")}</p>
        <p className="text-body text-ink">
          <Gloss>{tt("Write three insights DataDriven could read from its data, each from a different data source: the CRM, the usage data or the feedback and interactions. Say what you expect to see and what DataDriven would do about it: an insight leads to an action, so it is not only a number on a dashboard.", "Schreiben Sie drei Erkenntnisse, die DataDriven aus seinen Daten lesen könnte, jede aus einer anderen Datenquelle: dem CRM, den Nutzungsdaten oder dem Feedback und den Interaktionen. Sagen Sie, was Sie zu sehen erwarten und was DataDriven dagegen tun würde: Eine Erkenntnis führt zu einer Handlung, sie ist also nicht nur eine Zahl im Dashboard.")}</Gloss>
        </p>
        <p className="text-caption text-ash">
          {tt("The frame: ", "Der Rahmen: ")}
          {INSIGHT_FRAME.v}
        </p>
        {l1.insights.map((a, i) => (
          <div key={i} className="space-y-1.5">
            <TextBox
              id={IDS.insight(i)}
              label={tt(`Insight ${i + 1}`, `Erkenntnis ${i + 1}`)}
              help={tt(`Choose the data source, then write the pattern you expect, and what DataDriven would do about it in one or two sentences (“…, so …”), at least ${INSIGHT_MIN} characters.`, `Wählen Sie die Datenquelle und schreiben Sie dann das erwartete Muster und was DataDriven dagegen tun würde in ein oder zwei Sätzen („…, sodass …“), mindestens ${INSIGHT_MIN} Zeichen.`)}
              value={a.text}
              onChange={(v) => setRow(i, { text: v })}
              min={INSIGHT_MIN}
              flagged={l1.insFlagged.includes(i)}
              clue={tt(`Use the frame: ${INSIGHT_FRAME.v} Choose a data source no other row uses, and finish with “so” and what DataDriven would do.`, `Nutzen Sie den Rahmen: ${INSIGHT_FRAME.v} Wählen Sie eine Datenquelle, die keine andere Zeile nutzt, und schließen Sie mit „sodass“ und was DataDriven tun würde.`)}
              clueShown={l1.insClue}
              onShowClue={() => patch({ insClue: true })}
            >
              <div>
                <label htmlFor={`insight-${i}-basis`} className="smallcaps block">
                  {tt("Data source", "Datenquelle")}
                </label>
                <select id={`insight-${i}-basis`} className="field mt-1 max-w-md" value={a.basis ?? ""} onChange={(e) => setRow(i, { basis: (e.target.value || null) as Basis | null })}>
                  <option value="">{tt("Choose the data source…", "Datenquelle wählen…")}</option>
                  {BASES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
                {a.basis && <p className="mt-1 text-micro normal-case tracking-normal text-ash">{tt("Chosen: ", "Gewählt: ")}{BASIS_LABEL[a.basis]}</p>}
              </div>
            </TextBox>
            {i === 0 && (
              <WritingHelp
                id="insight-kit"
                refs={[
                  { label: tt("The three data sources (Materi A2)", "Die drei Datenquellen (Materi A2)"), value: tt("CRM, usage data, feedback and interactions", "CRM, Nutzungsdaten, Feedback und Interaktionen"), target: "mat-A2" },
                  { label: tt("The groups of customers (table above)", "Die Kundengruppen (Tabelle oben)"), value: tt("who cancels and what is joined", "wer kündigt und was verbunden ist"), target: "cust-c1" },
                ]}
                steps={[
                  tt("Choose the data source and name the group you would look at.", "Wählen Sie die Datenquelle und nennen Sie die Gruppe, die Sie betrachten würden."),
                  tt("Say the pattern you expect in one sentence, concretely (a fall in active days, a missed call, a low score).", "Sagen Sie das erwartete Muster in einem Satz, konkret (ein Rückgang der aktiven Tage, ein abgesagtes Gespräch, ein niedriger Wert)."),
                  tt("Finish with what DataDriven would do about it.", "Schließen Sie damit, was DataDriven dagegen tun würde."),
                ]}
              />
            )}
            <ExampleAnswer id={`insight-${i}-example`} guide={insightGuide(i)} />
            {mentor && <MentorGuide guide={insightGuide(i)} />}
          </div>
        ))}
      </div>
      <CheckBar onCheck={check} checkLabel={tt("Check my picks and insights", "Meine Wahl und Erkenntnisse prüfen")} checks={l1.checks} />
      {l1.insChecked && (
        <Reading>
          {l1.insFlagged.length === 0
            ? tt(`Nothing is outlined among the insights. All ${INSIGHT_COUNT} use different data sources and say what DataDriven would do; whether they are good is for you and your facilitator to judge.`, `Bei den Erkenntnissen ist nichts markiert. Alle ${INSIGHT_COUNT} nutzen verschiedene Datenquellen und sagen, was DataDriven tun würde; ob sie gut sind, beurteilen Sie und Ihre Moderation.`)
            : tt(`${l1.insFlagged.length} insight${l1.insFlagged.length === 1 ? " is" : "s are"} outlined: the data source is missing or repeated, the text is short, or it does not say what DataDriven would do.`, `${l1.insFlagged.length} ${l1.insFlagged.length === 1 ? "Erkenntnis ist" : "Erkenntnisse sind"} markiert: Die Datenquelle fehlt oder wiederholt sich, der Text ist kurz, oder er sagt nicht, was DataDriven tun würde.`)}
        </Reading>
      )}
      <BlockMissing block="1.3" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.4 (Optional) */

export function Block14() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const fields: { k: "interpret" | "causation" | "decider"; label: string; help: string }[] = [
    { k: "interpret", label: tt("When is a signal worth watching, and when not?", "Wann lohnt es sich, ein Signal zu beobachten, und wann nicht?"), help: tt("One or two sentences, using one of the nine figures in Block 1.1: say what makes a signal worth watching and what makes it not.", "Ein oder zwei Sätze, mit einer der neun Zahlen aus Block 1.1: Sagen Sie, was ein Signal beobachtenswert macht und was nicht.") },
    { k: "causation", label: tt("What is the difference between a correlation and a cause?", "Was ist der Unterschied zwischen einer Korrelation und einer Ursache?"), help: tt("Name one example at DataDriven, and say how a fair test would show whether use is a cause.", "Nennen Sie ein Beispiel bei DataDriven, und sagen Sie, wie ein fairer Test zeigen würde, ob Nutzung eine Ursache ist.") },
    { k: "decider", label: tt("Which signals are the wrong ones to act on, and where do unnecessary costs arise?", "Auf welche Signale sollte man nicht handeln, und wo entstehen unnötige Kosten?"), help: tt("Name a signal that is not worth acting on, one place where money is wasted, and what comes first for a strategic decision-maker. Be concrete.", "Nennen Sie ein Signal, nach dem es sich nicht zu handeln lohnt, eine Stelle, an der Geld verschwendet wird, und was für eine strategische Entscheiderin zuerst kommt. Seien Sie konkret.") },
  ];
  return (
    <AnswerBlock
      id="block-1-4"
      title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.4"]}
      findIt={tt("Route 1 → Task 1 → your own answers in Block 1.1, and the rules in Materi A1 and A2. Answer in the three fields below.", "Route 1 → Task 1 → Ihre eigenen Antworten in Block 1.1 und die Regeln in Materi A1 und A2. Antworten Sie in den drei Feldern unten.")}
    >
      <MaterialRefs refs={["A1", "A2"]} />
      <p className="text-body text-ink">
        <Gloss>{tt("Before you weigh measures: when is a signal worth watching, how do a correlation and a cause differ, and which signals are the wrong ones to act on?", "Bevor Sie Maßnahmen abwägen: Wann lohnt es sich, ein Signal zu beobachten, wie unterscheiden sich Korrelation und Ursache, und nach welchen Signalen sollte man nicht handeln?")}</Gloss>
      </p>
      {fields.map((f) => (
        <div key={f.k} className="space-y-1.5">
          <TextBox id={IDS.reflect(f.k)} label={f.label} help={f.help} value={l1.reflect[f.k]} onChange={(v) => patch((s) => ({ reflect: { ...s.reflect, [f.k]: v } }))} min={MIN_LINE} rows={3} />
          <ExampleAnswer id={`reflect-${f.k}-example`} guide={reflectGuide(f.k)} />
          {mentor && <MentorGuide guide={reflectGuide(f.k)} />}
        </div>
      ))}
      <BlockMissing block="1.4" route={1} />
    </AnswerBlock>
  );
}
