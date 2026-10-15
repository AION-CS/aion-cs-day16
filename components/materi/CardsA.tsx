"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_16 } from "@/components/comic/scenes16";
import { COMIC_A1 } from "@/data/comics";
import { BarToggle, FairTest, KpiTree, SceneCards, ScatterMap, ScoreBars, TwoRates } from "@/components/materi/diagrams";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { BAR_RATES, FAIR, KPI_TREE, MECH, MOMENTS, PRIZE, SCORE } from "@/data/diagramData";
import { LEVEL_TESTS } from "@/data/ladder";
import { PATTERNS, PATTERN_IDS, PATTERN_PAIR_TESTS, RISK_RULE } from "@/data/patterns";
import { CUSTOMER_YEAR, EFFECT_ANCHOR, EXPLAIN_RULE, SCALE_ANCHOR } from "@/data/measures";
import { MOSEL, MOSEL_RESULT } from "@/data/forecast";
import { euro, num, pct, tt } from "@/lib/lang";

/** Materi A: the seven cards of Route 1 (Levels 1 and 2 on one case). 60 minutes in all; A1 (Level 1) and A7 (Level 2) are the two Core cards (CLAUDE.md #48). */
const p = "text-body text-ink";

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("A report is full of numbers, and not every number is the same kind. A result KPI is what the company wants to change in the end (customers leaving, what a customer is worth, how many sign). A driver is something customers do or experience that comes before a result and moves it (how often they use the platform, how much of it, how well they start). An activity count only counts what the company did (e-mails sent, dashboards built, calls made). Steer by the result, act on the drivers, and check the counts against the result.", "Ein Bericht ist voller Zahlen, und nicht jede Zahl ist von derselben Art. Ein Ergebnis-KPI ist das, was das Unternehmen am Ende ändern will (Kunden, die gehen, was ein Kunde wert ist, wie viele unterschreiben). Ein Treiber ist etwas, das Kunden tun oder erleben und das vor einem Ergebnis kommt und es bewegt (wie oft sie die Plattform nutzen, wie viel davon, wie gut sie starten). Eine Aktivitätszahl zählt nur, was das Unternehmen tat (versendete E-Mails, gebaute Dashboards, geführte Anrufe). Steuern Sie nach dem Ergebnis, handeln Sie bei den Treibern, und prüfen Sie die Zählungen am Ergebnis.")}
      reasoning={[
        tt("Sort every figure into one of three kinds before you decide what to do with it: result KPI, driver or activity count.", "Ordnen Sie jede Zahl einer von drei Arten zu, bevor Sie entscheiden, was Sie damit tun: Ergebnis-KPI, Treiber oder Aktivitätszahl."),
        ...LEVEL_TESTS.map((x) => `${x.name}: ${x.test}`),
        tt("The question that sorts most figures: whose behaviour is counted? What customers decided (stay, pay, sign): a result. What customers do or experience before that (use, depth of use, a good start): a driver. What the company or its teams did (sent, built, called): an activity count.", "Die Frage, die die meisten Zahlen sortiert: Wessen Verhalten wird gezählt? Was Kunden entschieden (bleiben, zahlen, unterschreiben): ein Ergebnis. Was Kunden vor dem tun oder erleben (Nutzung, Tiefe der Nutzung, ein guter Start): ein Treiber. Was das Unternehmen oder seine Teams taten (gesendet, gebaut, angerufen): eine Aktivitätszahl."),
        tt("The test that separates a result from a driver: would the board be pleased if only this number moved? If yes, it is a result. If the number matters because it leads to a result, it is a driver.", "Der Test, der ein Ergebnis von einem Treiber trennt: Würde sich der Vorstand freuen, wenn sich nur diese Zahl bewegte? Wenn ja, ist sie ein Ergebnis. Wenn die Zahl zählt, weil sie zu einem Ergebnis führt, ist sie ein Treiber."),
        tt("Typical result KPIs: the churn rate (customers who cancelled ÷ customers at the start), the customer lifetime value, the conversion of trial users who sign. Typical drivers: active days per month, the share of modules used, the time to the first successful report. Typical activity counts: newsletters sent, dashboards built, check-in calls made.", "Typische Ergebnis-KPIs: die Churn Rate (Kunden, die kündigten, ÷ Kunden zu Beginn), der Customer Lifetime Value, die Conversion von Testnutzern, die unterschreiben. Typische Treiber: aktive Tage pro Monat, der Anteil genutzter Module, die Zeit bis zum ersten erfolgreichen Bericht. Typische Aktivitätszahlen: versendete Newsletter, gebaute Dashboards, geführte Check-in-Gespräche."),
        tt("An activity count can rise while the result does not move: twice the calls to customers who were never going to leave changes nothing. Show it only next to the result it is meant to move.", "Eine Aktivitätszahl kann steigen, während sich das Ergebnis nicht bewegt: doppelt so viele Anrufe bei Kunden, die nie gehen wollten, ändern nichts. Zeigen Sie sie nur neben dem Ergebnis, das sie bewegen soll."),
        tt("A driver must be something the company can influence and the systems can count by themselves. A figure that waits for a person to write it down arrives late.", "Ein Treiber muss etwas sein, das das Unternehmen beeinflussen kann und das die Systeme selbst zählen können. Eine Zahl, die darauf wartet, dass eine Person sie aufschreibt, kommt spät."),
        tt("Many numbers on one page hide the few that matter. A good report has one or two result KPIs on top, a few drivers beneath them, and its counts read against the result.", "Viele Zahlen auf einer Seite verdecken die wenigen, die zählen. Ein guter Bericht hat ein oder zwei Ergebnis-KPIs oben, einige Treiber darunter, und seine Zählungen werden am Ergebnis gelesen."),
        tt("An extra figure of your own names something a system could count, says which kind it is, and finishes with “so …”: why it could warn early, before a customer gives notice. The number of different people who log in each month is a driver; the number of tips e-mails sent is an activity count.", "Eine eigene zusätzliche Zahl nennt etwas, das ein System zählen könnte, sagt, welche Art sie ist, und schließt mit „sodass …“: warum sie früh warnen könnte, bevor ein Kunde kündigt. Die Zahl der verschiedenen Personen, die sich pro Monat einloggen, ist ein Treiber; die Zahl der versendeten Tipps-E-Mails ist eine Aktivitätszahl."),
      ]}
      sources={["kaplan1992", "ries2011", "hubbard2014"]}
    >
      <ComicButton comic={COMIC_A1} art={ART_16} />
      <ShowMore id="A1" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) argued that managers should steer by a few linked measures: the results, and the drivers that lead to them. Ries (2011) calls numbers that only count activity “vanity metrics”, because they rise without telling you whether anything changed, and numbers that lead to action “actionable metrics”. Hubbard (2014) advises measuring what would change a decision, which is the test for every figure on a report.",
            "Kaplan und Norton (1992) forderten, dass Führungskräfte nach wenigen verbundenen Kennzahlen steuern: den Ergebnissen und den Treibern, die zu ihnen führen. Ries (2011) nennt Zahlen, die nur Aktivität zählen, „Vanity Metrics“, weil sie steigen, ohne zu sagen, ob sich etwas änderte, und Zahlen, die zu Handlungen führen, „Actionable Metrics“. Hubbard (2014) rät, zu messen, was eine Entscheidung ändern würde, und das ist der Test für jede Zahl in einem Bericht.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Three kinds of figure, three ways to use them · a worked example on Main Analytics", "Drei Arten von Zahlen, drei Arten, sie zu nutzen · ein Beispiel mit Main Analytics")} caption={tt("Choose a kind of figure and a way of using it and see what the team does; then try the worked sort below.", "Wählen Sie eine Art von Zahl und eine Nutzung und sehen Sie, was das Team tut; probieren Sie dann die Beispielsortierung darunter.")}>
        <SceneCards cfg={MECH} />
      </Diagram>
      <ShowMore id="A1" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Result: what the board is judged by. Driver: what customers do that leads there. Activity count: what we did.", "Ergebnis: woran der Vorstand gemessen wird. Treiber: was Kunden tun und das dorthin führt. Aktivitätszahl: was wir taten."),
            tt("A driver is not a guarantee: low use is a reason to look, and four in ten low-use customers cancel, six stay.", "Ein Treiber ist keine Garantie: Geringe Nutzung ist ein Grund hinzusehen, und vier von zehn Kunden mit geringer Nutzung kündigen, sechs bleiben."),
          ]}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("A customer leaves traces in three kinds of data. The CRM holds who the customer is, the contract and the conversations a person logged. The usage data holds what the customer does in the product, counted by the system. The feedback and interactions hold what the customer says: tickets, surveys, calls. Each source alone sees only part of the customers who cancel; joined on one customer page they catch more of them early enough to call.", "Ein Kunde hinterlässt Spuren in drei Arten von Daten. Das CRM enthält, wer der Kunde ist, den Vertrag und die Gespräche, die eine Person festgehalten hat. Die Nutzungsdaten enthalten, was der Kunde im Produkt tut, vom System gezählt. Feedback und Interaktionen enthalten, was der Kunde sagt: Tickets, Umfragen, Gespräche. Jede Quelle allein sieht nur einen Teil der Kunden, die kündigen; auf einer Kundenseite verbunden erkennen sie mehr davon früh genug zum Anrufen.")}
      reasoning={[
        tt("CRM data: who the customer is, the contract (value, term, renewal date) and the contacts and calls that people logged. It is reliable for the contract and thin for behaviour, because a person has to write it down.", "CRM-Daten: wer der Kunde ist, der Vertrag (Wert, Laufzeit, Verlängerungsdatum) und die Kontakte und Gespräche, die Menschen festgehalten haben. Sie sind verlässlich für den Vertrag und dünn für das Verhalten, weil eine Person sie aufschreiben muss."),
        tt("Usage data: what the customer does in the product (active days, logins, reports built, modules used). The platform counts it by itself, so it is complete and early, but it says nothing about why.", "Nutzungsdaten: was der Kunde im Produkt tut (aktive Tage, Logins, gebaute Berichte, genutzte Module). Die Plattform zählt sie selbst, also sind sie vollständig und früh, sagen aber nichts über das Warum."),
        tt("Feedback and interactions: what the customer says (support tickets, survey scores, notes from calls). It explains why, but only a part of the customers answer, and it often arrives late.", "Feedback und Interaktionen: was der Kunde sagt (Support-Tickets, Umfragewerte, Notizen aus Gesprächen). Sie erklären das Warum, aber nur ein Teil der Kunden antwortet, und sie kommen oft spät."),
        tt("Join the three on one customer ID. Then one page shows use, contract, contacts and tickets together, and a pattern that is weak in one source becomes clear when the others confirm it.", "Verbinden Sie die drei über eine Kunden-ID. Dann zeigt eine Seite Nutzung, Vertrag, Kontakte und Tickets zusammen, und ein Muster, das in einer Quelle schwach ist, wird klar, wenn die anderen es bestätigen."),
        tt("An insight has three parts: the pattern you expect, the data source it is read from, and what you would do about it. Write it as “[the pattern we expect] in [the data source], so [what we would do about it]”.", "Eine Erkenntnis hat drei Teile: das erwartete Muster, die Datenquelle, aus der es gelesen wird, und was Sie dagegen tun würden. Schreiben Sie sie als „[das Muster, das wir erwarten] in [der Datenquelle], sodass [was wir dagegen tun würden]“."),
        tt("Use a different data source for each of three insights: one from the CRM, one from the usage data and one from feedback and interactions. Three insights from the same source add little.", "Nutzen Sie für drei Erkenntnisse jeweils eine andere Datenquelle: eine aus dem CRM, eine aus den Nutzungsdaten und eine aus Feedback und Interaktionen. Drei Erkenntnisse aus derselben Quelle bringen wenig."),
        tt("An insight leads to an action: a call, a training, a flag in the CRM. A number on a dashboard that nobody acts on is not an insight.", "Eine Erkenntnis führt zu einer Handlung: einem Anruf, einer Schulung, einer Markierung im CRM. Eine Zahl im Dashboard, nach der niemand handelt, ist keine Erkenntnis."),
        tt("Using and joining data about customers is processing personal data where people are named: it needs a lawful basis (GDPR Art. 6). Check with the data protection officer before a new join.", "Daten über Kunden zu nutzen und zu verbinden ist Verarbeitung personenbezogener Daten, wo Personen benannt sind: Sie braucht eine Rechtsgrundlage (DSGVO Art. 6). Klären Sie das mit dem Datenschutzbeauftragten, bevor eine neue Verbindung entsteht."),
      ]}
      sources={["mehta2016", "lemon2016", "gdpr2016"]}
    >
      <ShowMore id="A2" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Mehta, Steinman and Murphy (2016) describe how customer success teams combine usage, relationship and feedback signals into a view of account health. Lemon and Verhoef (2016) treat customer experience as a journey across many touchpoints, which is why one source sees only part of it. The GDPR (2016) adds the legal condition for joining data about customers.",
            "Mehta, Steinman und Murphy (2016) beschreiben, wie Customer-Success-Teams Nutzungs-, Beziehungs- und Feedback-Signale zu einem Bild der Account-Gesundheit verbinden. Lemon und Verhoef (2016) behandeln Customer Experience als Reise über viele Touchpoints, weshalb eine Quelle nur einen Teil sieht. Die DSGVO (2016) ergänzt die rechtliche Bedingung für das Verbinden von Kundendaten.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Three data sources, read alone and joined · a worked example on Main Analytics", "Drei Datenquellen, allein und verbunden gelesen · ein Beispiel mit Main Analytics")} caption={tt("Switch between the sources joined and one source alone, and choose a kind of trouble.", "Wechseln Sie zwischen verbundenen Quellen und einer Quelle allein, und wählen Sie eine Art von Ärger.")}>
        <BarToggle cfg={PRIZE} />
      </Diagram>
      <ShowMore id="A2" part="table" label={tt("Show the table: three data sources and what each holds", "Tabelle zeigen: Drei Datenquellen und was jede enthält")}>
        <DataTable
          head={[tt("Source", "Quelle"), tt("What it holds", "Was sie enthält"), tt("Example at Main Analytics", "Beispiel bei Main Analytics"), tt("Its weakness", "Ihre Schwäche")]}
          rows={[
            [tt("CRM data", "CRM-Daten"), tt("Customer, contract, logged contacts", "Kunde, Vertrag, festgehaltene Kontakte"), tt("Renewal date, value, last call", "Verlängerungsdatum, Wert, letztes Gespräch"), tt("A person has to write it down", "Eine Person muss es aufschreiben")],
            [tt("Usage data", "Nutzungsdaten"), tt("What the customer does in the product", "Was der Kunde im Produkt tut"), tt("Active days, reports, modules", "Aktive Tage, Berichte, Module"), tt("Says nothing about why", "Sagt nichts über das Warum")],
            [tt("Feedback and interactions", "Feedback und Interaktionen"), tt("What the customer says", "Was der Kunde sagt"), tt("Tickets, survey score, call notes", "Tickets, Umfragewert, Gesprächsnotizen"), tt("Few answer, and late", "Wenige antworten, und spät")],
          ]}
          caption={tt("Three data sources and what each holds", "Drei Datenquellen und was jede enthält")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Not every group of customers is worth an analysis. A measure helps most where the cause is one the company can act on and a quarter or more of the group cancel. An analysis can run on data you already have only where part or all of the data of the group is already joined to the CRM. Where neither is true, other work comes first.", "Nicht jede Kundengruppe ist eine Analyse wert. Eine Maßnahme hilft am meisten dort, wo die Ursache eine ist, auf die das Unternehmen einwirken kann, und ein Viertel oder mehr der Gruppe kündigt. Eine Analyse kann nur dort auf Daten laufen, die Sie schon haben, wo ein Teil oder alle Daten der Gruppe schon mit dem CRM verbunden sind. Wo beides nicht zutrifft, kommt andere Arbeit zuerst.")}
      reasoning={[
        tt("A measure helps most where two things hold: the cause is one the company can act on itself (little use, a bad start), and 25% or more of the group cancel. Work those groups first.", "Eine Maßnahme hilft am meisten, wo zwei Dinge gelten: Die Ursache ist eine, auf die das Unternehmen selbst einwirken kann (wenig Nutzung, ein schlechter Start), und 25 % oder mehr der Gruppe kündigen. Bearbeiten Sie diese Gruppen zuerst."),
        tt("High churn is not enough: where the cause is outside the company's reach (customers who moved to a competitor's all-in-one suite, a closure, a group decision), the step is to stay in touch, not to run a measure. That is the rule of Materi A1 for what cannot be influenced.", "Hoher Churn reicht nicht: Wo die Ursache außerhalb des Einflusses des Unternehmens liegt (Kunden, die zur Komplettlösung eines Wettbewerbers wechselten, eine Schließung, eine Konzernentscheidung), ist der Schritt, in Kontakt zu bleiben, nicht eine Maßnahme zu fahren. Das ist die Regel aus Materi A1 für das, was sich nicht beeinflussen lässt."),
        tt("A group with an actionable cause but few cancelling (under 25%) is a second wave, not the first place to spend.", "Eine Gruppe mit beeinflussbarer Ursache, aber wenigen Kündigungen (unter 25 %), ist eine zweite Welle, nicht der erste Ort zum Ausgeben."),
        tt("An analysis can run on data we have only where part or all of the data that would show the group (use, contract, feedback) is already joined to the CRM. Where nothing is joined, the data must be joined first.", "Eine Analyse kann nur dort auf vorhandenen Daten laufen, wo ein Teil oder alle Daten, die die Gruppe zeigen würden (Nutzung, Vertrag, Feedback), schon mit dem CRM verbunden sind. Wo nichts verbunden ist, müssen die Daten erst verbunden werden."),
        tt("Groups where a measure helps most and groups where an analysis can use data we have are two different lists. The group that helps most often has no joined data yet; the best-joined group is often not the one that helps most.", "Gruppen, in denen eine Maßnahme am meisten hilft, und Gruppen, in denen eine Analyse vorhandene Daten nutzen kann, sind zwei verschiedene Listen. Die Gruppe, in der es am meisten hilft, hat oft noch keine verbundenen Daten; die am besten verbundene Gruppe ist oft nicht die, in der es am meisten hilft."),
        tt("Think in money: a customer is worth its yearly value; a measure costs time and money for every customer it reaches. Aim at the groups where enough customers stay to cover that cost, and leave the others.", "Denken Sie in Geld: Ein Kunde ist seinen Jahreswert wert; eine Maßnahme kostet für jeden Kunden, den sie erreicht, Zeit und Geld. Zielen Sie auf die Gruppen, in denen genug Kunden bleiben, um diese Kosten zu decken, und lassen Sie die anderen."),
        tt("The wrong customers: groups outside reach waste effort, and customers who would have renewed anyway take a discount they did not need.", "Die falschen Kunden: Gruppen außerhalb des Einflusses verschwenden Aufwand, und Kunden, die ohnehin verlängert hätten, nehmen einen Rabatt, den sie nicht brauchten."),
        tt("Three insights each use a different data source, and each says what you would do about the pattern you expect.", "Drei Erkenntnisse nutzen je eine andere Datenquelle, und jede sagt, was Sie gegen das erwartete Muster tun würden."),
      ]}
      sources={["neslin2006", "reinartz2000", "gupta2004"]}
    >
      <ShowMore id="A3" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Neslin and colleagues (2006) compared churn models and found that the value of a model lies in who it points to, not in its overall accuracy. Reinartz and Kumar (2000) showed that long-standing customers are not automatically the most profitable ones, which is why an analysis looks at value and not only at who used to be a customer. Gupta, Lehmann and Stuart (2004) value a customer by the money it brings over its lifetime, which is what a kept customer is worth.",
            "Neslin und Kollegen (2006) verglichen Churn-Modelle und fanden, dass der Wert eines Modells darin liegt, auf wen es zeigt, nicht in seiner Gesamtgenauigkeit. Reinartz und Kumar (2000) zeigten, dass langjährige Kunden nicht automatisch die profitabelsten sind, weshalb eine Analyse auf den Wert schaut und nicht nur darauf, wer früher Kunde war. Gupta, Lehmann und Stuart (2004) bewerten einen Kunden nach dem Geld, das er über seine Lebenszeit bringt, und genau das ist ein gehaltener Kunde wert.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Where an analysis pays, and where it can use data that exists · a worked example on Main Analytics", "Wo sich eine Analyse lohnt, und wo sie vorhandene Daten nutzen kann · ein Beispiel mit Main Analytics")} caption={tt("Choose a group on the map or in the list and read where it falls and why.", "Wählen Sie eine Gruppe auf der Karte oder in der Liste und lesen Sie, wo sie liegt und warum.")}>
        <ScatterMap cfg={MOMENTS} />
      </Diagram>
      <ShowMore id="A3" part="table" label={tt("Show the table: three kinds of data an analysis needs", "Tabelle zeigen: Drei Arten von Daten, die eine Analyse braucht")}>
        <DataTable
          head={[tt("Data", "Daten"), tt("What it holds", "Was sie enthalten"), tt("What an analysis needs from it", "Was eine Analyse davon braucht")]}
          rows={[
            [tt("Usage log", "Nutzungslog"), tt("Active days, logins, modules used", "Aktive Tage, Logins, genutzte Module"), tt("The earliest signal that a customer is drifting", "Das früheste Signal, dass ein Kunde abdriftet")],
            [tt("Contract data", "Vertragsdaten"), tt("Yearly value, term and renewal date", "Jahreswert, Laufzeit und Verlängerungsdatum"), tt("What a kept customer is worth, and when it decides", "Was ein gehaltener Kunde wert ist, und wann er entscheidet")],
            [tt("Contact log (CRM)", "Kontaktprotokoll (CRM)"), tt("Who owned the account and who the contact was", "Wer das Konto betreute und wer der Ansprechpartner war"), tt("Who calls, and whom", "Wer anruft, und wen")],
          ]}
          caption={tt("Three kinds of data an analysis needs", "Drei Arten von Daten, die eine Analyse braucht")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA4() {
  const r = MOSEL_RESULT;
  return (
    <MaterialCard
      id="A4"
      scan={tt("To put a euro figure on a gap in the data, compare how often customers with intensive use and customers with low use renewed. Three figures read it: the renewal rate of each group, the lift, and the revenue at stake a year. The revenue at stake is the most the gap could be worth if low-use customers behaved like intensive ones, never the amount a measure would earn.", "Um einer Lücke in den Daten einen Euro-Wert zu geben, vergleichen Sie, wie oft Kunden mit intensiver Nutzung und Kunden mit geringer Nutzung verlängerten. Drei Werte lesen es: die Verlängerungsquote jeder Gruppe, der Lift und der Umsatz auf dem Spiel pro Jahr. Der Umsatz auf dem Spiel ist das Höchste, was die Lücke wert sein könnte, wenn sich Kunden mit geringer Nutzung wie intensive verhielten, nie der Betrag, den eine Maßnahme einbringen würde.")}
      reasoning={[
        tt("Renewal rate = renewed customers ÷ customers in the group × 100. Take both numbers from the same group's row.", "Verlängerungsquote = verlängerte Kunden ÷ Kunden der Gruppe × 100. Nehmen Sie beide Zahlen aus der Zeile derselben Gruppe."),
        tt("Lift = renewal rate of intensive customers ÷ renewal rate of low-use customers. Work out the second rate from its own row first; the groups are not the same size, so compare rates, never counts.", "Lift = Verlängerungsquote intensiver Kunden ÷ Verlängerungsquote von Kunden mit geringer Nutzung. Berechnen Sie die zweite Quote zuerst aus ihrer eigenen Zeile; die Gruppen sind nicht gleich groß, also vergleichen Sie Quoten, nie Zahlen."),
        tt("Revenue at stake a year = low-use customers a year × (rate of intensive customers − rate of low-use customers, as a share of one) × the yearly value of one customer. Only the gap counts: low-use customers renew their share anyway. One point is 0.01.", "Umsatz auf dem Spiel pro Jahr = Kunden mit geringer Nutzung pro Jahr × (Quote intensiver Kunden − Quote von Kunden mit geringer Nutzung, als Anteil von eins) × der Jahreswert eines Kunden. Nur die Lücke zählt: Kunden mit geringer Nutzung verlängern ihren Anteil ohnehin. Ein Punkt ist 0,01."),
        tt("Use the low-use customers of a whole year, not the customers of one group.", "Nehmen Sie die Kunden mit geringer Nutzung eines ganzen Jahres, nicht die Kunden einer Gruppe."),
        tt("These figures compare customers who happened to use the platform a lot or a little, so they are a correlation, not a fair test: intensive customers may simply be keener or bigger. Say the amount as the most the gap could be worth, and test a measure fairly before you promise it.", "Diese Werte vergleichen Kunden, die die Plattform zufällig viel oder wenig nutzten, sind also eine Korrelation, kein fairer Test: Intensive Kunden sind vielleicht einfach eifriger oder größer. Sagen Sie den Betrag als das Höchste, was die Lücke wert sein könnte, und testen Sie eine Maßnahme fair, bevor Sie sie versprechen."),
        tt("A sentence about the renewal figures quotes at least one figure, says what to do first, and how sure it can be.", "Ein Satz über die Verlängerungs-Werte nennt mindestens einen Wert, sagt, was zuerst zu tun ist, und wie sicher man sein kann."),
      ]}
      sources={["provost2013", "gupta2004"]}
    >
      <ShowMore id="A4" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Provost and Fawcett (2013) name rates, lift and expected value as the basic tools for reading any comparison: compare two groups, and put a value on the difference. Gupta, Lehmann and Stuart (2004) value a customer by what it brings over time, which is the yearly value used here. The worked example uses Main Analytics' numbers; the steps are the same for any company.",
            "Provost und Fawcett (2013) nennen Raten, Lift und Erwartungswert als Grundwerkzeuge, um jeden Vergleich zu lesen: zwei Gruppen vergleichen und dem Unterschied einen Wert geben. Gupta, Lehmann und Stuart (2004) bewerten einen Kunden nach dem, was er über die Zeit bringt, und das ist der hier genutzte Jahreswert. Das Beispiel nutzt die Zahlen von Main Analytics; die Schritte sind für jedes Unternehmen gleich.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("What a gap in the data is worth · worked example on Main Analytics (Case assumption)", "Was eine Lücke in den Daten wert ist · Beispiel mit Main Analytics (Fallannahme)")} caption={tt("Move the slider to change how many low-use customers Main Analytics has in a year.", "Bewegen Sie den Regler, um zu ändern, wie viele Kunden mit geringer Nutzung Main Analytics pro Jahr hat.")}>
        <TwoRates cfg={BAR_RATES} />
      </Diagram>
      <ShowMore id="A4" part="calc" label={tt("Show the table: the four steps, on other numbers than the task", "Tabelle zeigen: Die vier Schritte, mit anderen Zahlen als in der Aufgabe")}>
        <DataTable
          head={[tt("Step", "Schritt"), tt("Calculation · Main Analytics", "Rechnung · Main Analytics"), tt("Result", "Ergebnis")]}
          rows={[
            [tt("1 · Renewal rate, intensive use", "1 · Verlängerungsquote, intensive Nutzung"), `${MOSEL.variant.orders} ÷ ${num(MOSEL.variant.sent)} × 100`, pct(r.rate)],
            [tt("2 · Renewal rate, low use", "2 · Verlängerungsquote, geringe Nutzung"), `${MOSEL.control.orders} ÷ ${num(MOSEL.control.sent)} × 100`, pct(r.other)],
            [tt("3 · Lift", "3 · Lift"), `${num(r.rate)} ÷ ${num(r.other)}`, tt(`${num(r.lift)} times`, `${num(r.lift)}-mal`)],
            [tt("4 · Revenue at stake a year", "4 · Umsatz auf dem Spiel pro Jahr"), `${num(MOSEL.yearly)} × ${num((r.rate - r.other) / 100)} × ${euro(MOSEL.order)}`, euro(r.extra)],
          ]}
          caption={tt("The four steps, on other numbers than the task", "Die vier Schritte, mit anderen Zahlen als in der Aufgabe")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("What customers do in the data says whether they might leave. Behaviour patterns come in four families: use of the platform, depth of use, contact and feedback, and what customers buy and pay. The first two are counted by the systems; contact and feedback need a person to log them; and what customers buy and pay mostly follows a decision the customer has already made. The ones the systems count by themselves moved with churn most.", "Was Kunden in den Daten tun, sagt, ob sie gehen könnten. Verhaltensmuster gibt es in vier Familien: Nutzung der Plattform, Tiefe der Nutzung, Kontakt und Feedback, und was Kunden kaufen und zahlen. Die ersten beiden zählen die Systeme; Kontakt und Feedback muss eine Person festhalten; und was Kunden kaufen und zahlen, folgt meist einer Entscheidung, die der Kunde schon getroffen hat. Die, die die Systeme selbst zählen, bewegten sich am stärksten mit dem Churn.")}
      reasoning={[
        ...PATTERN_IDS.map((x) => `${PATTERNS[x].label}: ${PATTERNS[x].test}`),
        ...PATTERN_PAIR_TESTS.map((x) => `${x.pair} ${x.test}`),
        tt("Tag what a finding measures, not how it behaved last year: a count of exports is depth of use although it did not move with churn.", "Ordnen Sie zu, was ein Befund misst, nicht wie er sich letztes Jahr verhielt: Eine Zahl der Exporte ist Tiefe der Nutzung, obwohl sie sich nicht mit dem Churn bewegte."),
        RISK_RULE.v,
        tt("When each family shows and what to do with it: use of the platform is counted by the systems, so build an automatic list and let the account manager decide each Monday whether to call; depth of use is also counted by the systems but changes slowly, so offer a training on the modules a customer does not use before it compares other tools; contact and feedback show only if a person notices and logs them, so ask every account manager to log each ticket, cancelled call and survey answer; what customers buy and pay shows late, so give it to sales and finance as context for a contract talk and never act on it alone. A bonus on a number rewards reporting it, not moving it.", "Wann sich jede Familie zeigt und was damit zu tun ist: Die Nutzung der Plattform zählen die Systeme, also bauen Sie eine automatische Liste und lassen den Account Manager jeden Montag entscheiden, ob er anruft; die Tiefe der Nutzung zählen die Systeme auch, aber sie ändert sich langsam, also bieten Sie eine Schulung zu den Modulen an, die ein Kunde nicht nutzt, bevor er andere Tools vergleicht; Kontakt und Feedback zeigen sich nur, wenn eine Person sie bemerkt und festhält, also bitten Sie jeden Account Manager, jedes Ticket, jedes abgesagte Gespräch und jede Umfrageantwort festzuhalten; was Kunden kaufen und zahlen zeigt sich spät, also geben Sie es Vertrieb und Finanzen als Kontext für ein Vertragsgespräch und handeln nie allein danach. Ein Bonus auf eine Zahl belohnt, dass sie berichtet wird, nicht dass sie bewegt wird."),
        tt("A good set of three signals has at least one from use of the platform and one from contact and feedback or depth of use, each with where the number comes from, what you would aim for and why it is a signal and not noise.", "Ein gutes Set aus drei Signalen hat mindestens eines aus der Nutzung der Plattform und eines aus Kontakt und Feedback oder der Tiefe der Nutzung, jedes mit der Quelle der Zahl, dem, was Sie anstreben würden, und warum es ein Signal ist und kein Rauschen."),
        tt("A signal is easier to trust when it is compared with the customer's own average and not with other customers: a customer who always uses the platform twice a week is not drifting.", "Einem Signal ist leichter zu trauen, wenn es mit dem eigenen Durchschnitt des Kunden verglichen wird und nicht mit anderen Kunden: Ein Kunde, der die Plattform immer zweimal pro Woche nutzt, driftet nicht ab."),
      ]}
      sources={["kaplan1992", "dawes1979", "neslin2006"]}
    >
      <ShowMore id="A5" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) argued that managers should steer by a few linked measures: the results, and the drivers that lead to them. Dawes (1979) found that a simple score of a few well-chosen signs often predicts as well as a complicated one. Neslin and colleagues (2006) compared churn models and found that the choice of signals mattered more than the choice of the technique.",
            "Kaplan und Norton (1992) forderten, dass Führungskräfte nach wenigen verbundenen Kennzahlen steuern: den Ergebnissen und den Treibern, die zu ihnen führen. Dawes (1979) fand, dass ein einfacher Score aus wenigen gut gewählten Zeichen oft so gut voraussagt wie ein komplizierter. Neslin und Kollegen (2006) verglichen Churn-Modelle und fanden, dass die Wahl der Signale mehr zählte als die Wahl der Technik.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Four families of behaviour pattern · a worked example on Main Analytics", "Vier Familien von Verhaltensmustern · ein Beispiel mit Main Analytics")} caption={tt("Choose a signal to read its family, then show whether each moved with churn last year.", "Wählen Sie ein Signal, um seine Familie zu lesen, und zeigen Sie dann, ob jedes letztes Jahr mit dem Churn einherging.")}>
        <KpiTree cfg={KPI_TREE} />
      </Diagram>
      <ShowMore id="A5" part="table" label={tt("Show the table: the four families of behaviour pattern", "Tabelle zeigen: Die vier Familien von Verhaltensmustern")}>
        <DataTable
          head={[tt("Family", "Familie"), tt("What it is", "Was es ist"), tt("Where it comes from", "Woher es kommt")]}
          rows={PATTERN_IDS.map((x) => [PATTERNS[x].label, PATTERNS[x].means, PATTERNS[x].shape])}
          caption={tt("The four families of behaviour pattern", "Die vier Familien von Verhaltensmustern")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA6() {
  return (
    <MaterialCard
      id="A6"
      scan={tt("A correlation says that two things move together; a cause says that one changes the other. Intensive customers renew more often, but they may simply be keener. Only a fair A/B test shows what a measure adds: one change, a random split in the same weeks, judged by the result, with a size fixed before the start. Reading trends shows the direction. Then the best measure is kept, changed or stopped, and tested again.", "Eine Korrelation sagt, dass sich zwei Dinge gemeinsam bewegen; eine Ursache sagt, dass das eine das andere verändert. Intensive Kunden verlängern häufiger, aber sie sind vielleicht einfach eifriger. Nur ein fairer A/B-Test zeigt, was eine Maßnahme bringt: eine Änderung, eine zufällige Aufteilung in denselben Wochen, am Ergebnis gemessen, mit einer vor dem Start festgelegten Größe. Trends zu lesen zeigt die Richtung. Dann wird die beste Maßnahme behalten, geändert oder gestoppt und wieder getestet.")}
      reasoning={[
        tt("A correlation is not a cause: customers with intensive use renew more often, but if keen customers both use more and stay, activating a low-use customer may not make it stay. Only a test shows what a measure adds.", "Eine Korrelation ist keine Ursache: Kunden mit intensiver Nutzung verlängern häufiger, aber wenn eifrige Kunden sowohl mehr nutzen als auch bleiben, lässt sich ein Kunde mit geringer Nutzung durch Aktivierung vielleicht nicht zum Bleiben bringen. Nur ein Test zeigt, was eine Maßnahme bringt."),
        tt("One change: if the variant differs in two things and wins, nobody knows which one did it.", "Eine Änderung: Unterscheidet sich die Variante in zwei Dingen und gewinnt, weiß niemand, welches es war."),
        tt("A random split in the same weeks: comparing with last year, one region with another, or customers whose account manager chose not to call lets something other than the change explain the difference.", "Eine zufällige Aufteilung in denselben Wochen: Der Vergleich mit dem letzten Jahr, einer Region mit einer anderen oder mit Kunden, bei denen der Account Manager sich gegen einen Anruf entschied, lässt etwas anderes als die Änderung den Unterschied erklären."),
        tt("The KPI that decides is the result the problem is about (for churn: the share of low-use customers who renew and are still active after 90 days), not dashboards viewed and not calls made.", "Der KPI, der entscheidet, ist das Ergebnis, um das es beim Problem geht (beim Churn: der Anteil der Kunden mit geringer Nutzung, die verlängern und nach 90 Tagen noch aktiv sind), nicht angesehene Dashboards und nicht geführte Anrufe."),
        tt("Fix the size before you start: about 100 low-use customers per group, and long enough for them to reach their renewal date. Stopping when the variant is ahead picks a lucky moment.", "Legen Sie die Größe vor dem Start fest: etwa 100 Kunden mit geringer Nutzung pro Gruppe, und lange genug, dass sie ihr Verlängerungsdatum erreichen. Zu stoppen, wenn die Variante vorn liegt, wählt einen glücklichen Moment."),
        tt("Write the hypothesis (“if we …, then … rises, because …”) and the decision rule (roll out, keep testing, stop, and which guardrail must hold) before the test starts. A decision rule needs a number to decide by.", "Schreiben Sie die Hypothese („wenn wir …, dann steigt …, weil …“) und die Entscheidungsregel (ausrollen, weiter testen, stoppen, und welche Guardrail halten muss) vor dem Teststart auf. Eine Entscheidungsregel braucht eine Zahl, nach der entschieden wird."),
        tt("Optimising is a loop, not a project: roll out what a fair test supports, keep testing what is promising but small, stop what does not move the result, and test the next small change. What worked last year may not work this year.", "Optimieren ist eine Schleife, kein Projekt: Rollen Sie aus, was ein fairer Test stützt, testen Sie weiter, was vielversprechend, aber klein ist, stoppen Sie, was das Ergebnis nicht bewegt, und testen Sie die nächste kleine Änderung. Was letztes Jahr wirkte, wirkt vielleicht dieses Jahr nicht."),
        tt("A trend is a change that holds for several periods in a row; one good month is noise. Compare the same periods and look at the groups: a rise in one group and a fall in another may be one shift, not two trends.", "Ein Trend ist eine Veränderung, die mehrere Zeiträume in Folge hält; ein guter Monat ist Rauschen. Vergleichen Sie gleiche Zeiträume und schauen Sie auf die Gruppen: Ein Anstieg in einer Gruppe und ein Rückgang in einer anderen können eine Verschiebung sein, nicht zwei Trends."),
        tt("Real uncertainties in customer data: a small base (90 renewals out of 100), intensive customers who may simply be keener (not a cause), use that is not logged for every channel, and a new release that changes what customers use. “Every customer with low use will cancel”, “a pattern found last year stays true for years” and “the more metrics on the dashboard, the better the decisions” are mistakes, not uncertainties.", "Echte Unsicherheiten bei Kundendaten: eine kleine Basis (90 Verlängerungen bei 100), intensive Kunden, die vielleicht einfach eifriger sind (keine Ursache), Nutzung, die nicht für jeden Kanal protokolliert wird, und ein neues Release, das ändert, was Kunden nutzen. „Jeder Kunde mit geringer Nutzung kündigt“, „ein Muster, das im letzten Jahr gefunden wurde, bleibt über Jahre wahr“ und „je mehr Kennzahlen im Dashboard, desto besser die Entscheidungen“ sind Fehler, keine Unsicherheiten."),
      ]}
      sources={["kohavi2020", "hubbard2014", "ries2011"]}
    >
      <ShowMore id="A6" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kohavi, Tang and Xu (2020) collected what makes controlled experiments trustworthy: a random split, one change at a time, a size fixed in advance, guardrail metrics, and no peeking to stop early. Hubbard (2014) reminds us that most business measurement is about reducing uncertainty enough to decide, which is what reading a trend over several periods does. Ries (2011) calls the loop of building a small change, measuring it and learning from it the heart of continuous improvement.",
            "Kohavi, Tang und Xu (2020) haben gesammelt, was kontrollierte Experimente vertrauenswürdig macht: eine zufällige Aufteilung, eine Änderung auf einmal, eine vorab festgelegte Größe, Guardrail-Kennzahlen und kein vorzeitiges Hinschauen, um früh zu stoppen. Hubbard (2014) erinnert daran, dass die meiste Messung im Unternehmen Unsicherheit so weit verringern soll, dass man entscheiden kann; genau das tut ein Trend über mehrere Zeiträume. Ries (2011) nennt die Schleife aus einer kleinen Änderung, ihrer Messung und dem Lernen daraus das Herz der fortlaufenden Verbesserung.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("A fair test of a call after a fall in use, and how sure it is · a worked example on Main Analytics", "Ein fairer Test eines Anrufs nach einem Nutzungsrückgang, und wie sicher er ist · ein Beispiel mit Main Analytics")} caption={tt("Switch between the four ways of running the test, then move the slider to change how many renewed customers each group has.", "Wechseln Sie zwischen den vier Arten, den Test durchzuführen, und bewegen Sie dann den Regler, um zu ändern, wie viele verlängerte Kunden jede Gruppe hat.")}>
        <FairTest cfg={FAIR} />
      </Diagram>
      <ShowMore id="A6" part="table" label={tt("Show the table: reading a trend: Main Analytics' figures by quarter (Case assumption)", "Tabelle zeigen: Einen Trend lesen: Zahlen von Main Analytics nach Quartal (Fallannahme)")}>
        <DataTable
          head={[tt("Figure at Main Analytics", "Zahl bei Main Analytics"), "Q1", "Q2", "Q3", "Q4", tt("Reading", "Lesart")]}
          rows={[
            [tt("Low-use customers called within a week who renew", "Kunden mit geringer Nutzung, innerhalb einer Woche angerufen, die verlängern"), pct(60), pct(62), pct(74), pct(77), tt("A trend: it rose after the call within a week started in Q3 and held in Q4.", "Ein Trend: Sie stieg, nachdem der Anruf innerhalb einer Woche in Q3 startete, und hielt in Q4.")],
            [tt("Customers who open the monthly product e-mail", "Kunden, die die monatliche Produkt-E-Mail öffnen"), pct(34), pct(35), pct(35), pct(34), tt("Flat: small moves are noise, not a trend.", "Flach: Kleine Bewegungen sind Rauschen, kein Trend.")],
            [tt("Customers still active after 90 days among those who took the 20% discount", "Kunden, die nach 90 Tagen noch aktiv sind, unter denen, die den Rabatt von 20 % nahmen"), pct(80), pct(70), pct(55), pct(40), tt("A shift: it fell after the discount started in Q2; customers who took the discount leave again.", "Eine Verschiebung: Er fiel, nachdem der Rabatt in Q2 startete; Kunden, die den Rabatt nahmen, gehen wieder.")],
          ]}
          caption={tt("Reading a trend: Main Analytics' figures by quarter (Case assumption)", "Einen Trend lesen: Zahlen von Main Analytics nach Quartal (Fallannahme)")}
        />
      </ShowMore>
      <ShowMore id="A6" part="table" label={tt("Show the table: the test card, part by part", "Tabelle zeigen: Die Testkarte, Teil für Teil")}>
        <DataTable
          head={[tt("Part of the test card", "Teil der Testkarte"), tt("Fair", "Fair"), tt("What goes wrong otherwise", "Was sonst schiefgeht")]}
          rows={[
            [tt("What changes", "Was sich ändert"), tt("One thing only", "Nur eine Sache"), tt("A win cannot be put down to anything", "Ein Gewinn lässt sich nichts zuschreiben")],
            [tt("Control group", "Kontrollgruppe"), tt("Random half, same weeks", "Zufällige Hälfte, dieselben Wochen"), tt("Another year, another region or self-chosen cases explain the difference", "Ein anderes Jahr, eine andere Region oder selbst gewählte Fälle erklären den Unterschied")],
            [tt("Success KPI", "Erfolgs-KPI"), tt("The result: share of low-use customers who renew and stay active 90 days", "Das Ergebnis: Anteil der Kunden mit geringer Nutzung, die verlängern und 90 Tage aktiv bleiben"), tt("Dashboards are viewed and calls made and nobody stays", "Dashboards werden angesehen und Anrufe geführt, und niemand bleibt")],
            [tt("Size and duration", "Größe und Dauer"), tt("Fixed: about 100 low-use customers per group, until they reach their renewal date", "Fest: etwa 100 Kunden mit geringer Nutzung pro Gruppe, bis sie ihr Verlängerungsdatum erreichen"), tt("A lucky moment on the dashboard is taken for a result", "Ein glücklicher Moment im Dashboard wird für ein Ergebnis gehalten")],
          ]}
          caption={tt("The test card, part by part", "Die Testkarte, Teil für Teil")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA7() {
  return (
    <MaterialCard
      id="A7"
      scan={tt("Choose measures by the plan's three tests, each Low (1) to High (3), multiplied: economic viability (who the measure aims at), effect (does it deal with a signal that comes before the cancellation) and sustainability (does it keep working after the four months). Then read the return on investment the app computes next to the score, and check the budget, the weeks and which problems you answer.", "Wählen Sie Maßnahmen nach den drei Tests des Plans, jeweils Niedrig (1) bis Hoch (3), multipliziert: Wirtschaftlichkeit (worauf die Maßnahme zielt), Wirkung (geht sie auf ein Signal ein, das vor der Kündigung kommt) und Nachhaltigkeit (wirkt sie nach den vier Monaten weiter). Lesen Sie dann den Return on Investment, den die App berechnet, neben dem Wert, und prüfen Sie das Budget, die Wochen und welche Probleme Sie beantworten.")}
      reasoning={[
        tt("The plan's evaluation is Economic Viability × Effect × Sustainability. Score each from 1 to 3 and multiply: one weak answer lowers the whole.", "Die Bewertung des Plans ist Wirtschaftlichkeit × Wirkung × Nachhaltigkeit. Bewerten Sie jede von 1 bis 3 und multiplizieren Sie: Eine schwache Antwort senkt das Ganze."),
        EXPLAIN_RULE.v,
        tt(`Effect. ${EFFECT_ANCHOR.v}`, `Wirkung. ${EFFECT_ANCHOR.v}`),
        tt(`Sustainability. ${SCALE_ANCHOR.v}`, `Nachhaltigkeit. ${SCALE_ANCHOR.v}`),
        tt(`Return on investment = (customers kept a year × the yearly value of a customer − the cost) ÷ the cost. A customer is worth about ${euro(CUSTOMER_YEAR)} a year (Case assumption). The app prints this on every measure; you read it, you do not calculate it. A high return on investment never rescues a low score: a discount for everyone can look like it keeps customers who would have renewed anyway.`, `Return on Investment = (pro Jahr gehaltene Kunden × der Jahreswert eines Kunden − die Kosten) ÷ die Kosten. Ein Kunde ist etwa ${euro(CUSTOMER_YEAR)} im Jahr wert (Fallannahme). Die App druckt das bei jeder Maßnahme; Sie lesen es, Sie rechnen es nicht. Ein hoher Return on Investment rettet nie einen niedrigen Wert: Ein Rabatt für alle kann aussehen, als hielte er Kunden, die ohnehin verlängert hätten.`),
        tt("Think in money: a kept customer is worth about €4,800 a year; a measure costs time and money for every customer it reaches. A cheap message to everyone is still expensive if it watches no signal, and a discount for everyone with low use gives margin away to customers who would have renewed.", "Denken Sie in Geld: Ein gehaltener Kunde ist etwa 4.800 € im Jahr wert; eine Maßnahme kostet für jeden Kunden, den sie erreicht, Zeit und Geld. Eine billige Nachricht an alle ist trotzdem teuer, wenn sie kein Signal beobachtet, und ein Rabatt für alle mit geringer Nutzung verschenkt Marge an Kunden, die ohnehin verlängert hätten."),
        tt("Apply the sorting question of Materi A1 to the measure: does it answer a signal that comes before the cancellation? A discount for everyone, or the same tips e-mail for everyone, answers none, aims at everyone and buys a renewal without changing why use is low: do not rank it above a measure that reads a signal first.", "Wenden Sie die Sortierfrage aus Materi A1 auf die Maßnahme an: Beantwortet sie ein Signal, das vor der Kündigung kommt? Ein Rabatt für alle oder dieselbe Tipps-E-Mail für alle beantwortet keines, zielt auf alle und erkauft eine Verlängerung, ohne zu ändern, warum die Nutzung gering ist: Setzen Sie sie nicht über eine Maßnahme, die zuerst ein Signal liest."),
        tt("Match each measure to the problems it really answers: “the data is not used” is answered by what joins the data and puts it in front of a person; “churn is found too late” by what reads a signal early; “no control over what works” by what lets the company read the result (a control group, a logged call). A tips mail or a discount for all answers none of them well.", "Ordnen Sie jede Maßnahme den Problemen zu, die sie wirklich beantwortet: „Die Daten werden nicht genutzt“ beantwortet, was die Daten verbindet und einem Menschen vorlegt; „Churn wird zu spät erkannt“, was ein Signal früh liest; „keine Kontrolle, was wirkt“, was das Unternehmen das Ergebnis ablesen lässt (eine Kontrollgruppe, ein festgehaltener Anruf). Eine Tipps-Mail oder ein Rabatt für alle beantwortet keines davon gut."),
        tt("The label after the weeks says which lever the measure uses: watch the signal, build depth of use, run a fair test or give a discount. It is a fact, not a score: a call can be strong (a named signal, a person who noticed) or weak (the same call for every customer). Judge it by the three scores.", "Das Etikett hinter den Wochen sagt, welchen Hebel die Maßnahme nutzt: das Signal beobachten, Tiefe der Nutzung aufbauen, einen fairen Test fahren oder einen Rabatt geben. Es ist eine Tatsache, keine Note: Ein Anruf kann stark sein (ein benanntes Signal, eine Person, die es bemerkt hat) oder schwach (derselbe Anruf für jeden Kunden). Beurteilen Sie ihn an den drei Werten."),
        tt("A price is built from parts: set-up, a licence for the months, and days or hours of work × the day or hour rate. Add the parts to check a price, and ask which part recurs: people and discounts grow with volume, a list built once does not.", "Ein Preis besteht aus Teilen: Einrichtung, eine Lizenz für die Monate und Arbeitstage oder -stunden × Tages- oder Stundensatz. Addieren Sie die Teile, um einen Preis zu prüfen, und fragen Sie, welcher Teil wiederkehrt: Personal und Rabatte wachsen mit der Menge, eine einmal gebaute Liste nicht."),
        tt("Weeks decide whether a measure has time to work. Four months are 16 weeks: a measure in use after 8 weeks works for the other 8; one in use only after 24 weeks answers its problem too late, however good it sounds.", "Die Wochen entscheiden, ob eine Maßnahme Zeit hat zu wirken. Vier Monate sind 16 Wochen: Eine Maßnahme, die nach 8 Wochen in Betrieb ist, wirkt in den übrigen 8; eine, die erst nach 24 Wochen in Betrieb ist, beantwortet ihr Problem zu spät, so gut sie auch klingt."),
        tt("A score nobody can explain lowers effect and sustainability: an account manager who sees a churn score and no signal has nothing to say to the customer, and the work cannot be kept going by a small team.", "Ein Score, den niemand erklären kann, senkt Wirkung und Nachhaltigkeit: Ein Account Manager, der einen Churn-Score und kein Signal sieht, hat dem Kunden nichts zu sagen, und ein kleines Team kann die Arbeit nicht am Laufen halten."),
        tt("Give a reason for the two judged scores, in your own words and with a fact from the card: for effect, which signal it answers and whether the customer notices it before deciding; for sustainability, what it takes (time, tools, people) and whether it lasts after the four months, and the weeks it needs.", "Geben Sie für die zwei beurteilten Werte einen Grund, in eigenen Worten und mit einer Tatsache von der Karte: bei der Wirkung, welches Signal sie beantwortet und ob der Kunde es vor der Entscheidung bemerkt; bei der Nachhaltigkeit, was es braucht (Zeit, Werkzeuge, Personal) und ob es nach den vier Monaten hält, und die Wochen, die es braucht."),
        tt("The budget is a limit to weigh, not a lock. If the plan is over, the rule is to leave out the lowest score rather than trim every measure a little; if you keep it anyway, say why.", "Das Budget ist eine Grenze zum Abwägen, keine Sperre. Liegt der Plan darüber, ist die Regel, den niedrigsten Wert wegzulassen, statt jede Maßnahme ein bisschen zu kürzen; behalten Sie ihn trotzdem, sagen Sie warum."),
        tt("Order by score and by dependency: what others read from goes first; a measure that needs the data of another comes after it. Name what you left out and why.", "Ordnen Sie nach Wert und nach Abhängigkeit: Woraus andere lesen, kommt zuerst; eine Maßnahme, die die Daten einer anderen braucht, kommt danach. Nennen Sie, was Sie weggelassen haben und warum."),
      ]}
      sources={["gupta2004", "davenport2018", "hubbard2014"]}
    >
      <ShowMore id="A7" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Gupta, Lehmann and Stuart (2004) value a customer by the money it brings over time, which is why a measure is judged by the customers it can keep and what they are worth. Davenport and Ronanki (2018) found that technology projects succeed when they start from a business problem and fit into existing processes, and fail when they are bought as stand-alone tools. Hubbard (2014) advises measuring what would change a decision. The plan names the evaluation for this day: economic viability × effect × sustainability, with the return on investment of each measure.",
            "Gupta, Lehmann und Stuart (2004) bewerten einen Kunden nach dem Geld, das er über die Zeit bringt, weshalb eine Maßnahme an den Kunden gemessen wird, die sie halten kann, und was sie wert sind. Davenport und Ronanki (2018) fanden, dass Technologieprojekte gelingen, wenn sie von einem Geschäftsproblem ausgehen und in bestehende Prozesse passen, und scheitern, wenn sie als allein stehende Werkzeuge gekauft werden. Hubbard (2014) rät, zu messen, was eine Entscheidung ändern würde. Der Plan nennt die Bewertung für diesen Tag: Wirtschaftlichkeit × Wirkung × Nachhaltigkeit, mit dem Return on Investment jeder Maßnahme.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Three measures of Main Analytics, scored", "Drei Maßnahmen von Main Analytics, bewertet")} caption={tt("Choose a measure to read its three scores and why each one is what it is.", "Wählen Sie eine Maßnahme, um ihre drei Werte zu lesen und warum jeder so ist.")}>
        <ScoreBars cfg={SCORE} />
      </Diagram>
      <ShowMore id="A7" part="calc" label={tt("Show the table: the return on investment of two measures, on other numbers than the task", "Tabelle zeigen: Der Return on Investment von zwei Maßnahmen, mit anderen Zahlen als in der Aufgabe")}>
        <DataTable
          head={[tt("Step", "Schritt"), tt("Main Analytics · a call within a week", "Main Analytics · ein Anruf innerhalb einer Woche"), tt("Main Analytics · a tips mail to everyone", "Main Analytics · eine Tipps-Mail an alle")]}
          rows={[
            [tt("Customers kept a year (Case assumption)", "Pro Jahr gehaltene Kunden (Fallannahme)"), "20", "4"],
            [tt("× yearly value of a customer", "× Jahreswert eines Kunden"), `20 × ${euro(5000)} = ${euro(100000)}`, `4 × ${euro(5000)} = ${euro(20000)}`],
            [tt("− cost", "− Kosten"), `${euro(100000)} − ${euro(40000)} = ${euro(60000)}`, `${euro(20000)} − ${euro(20000)} = ${euro(0)}`],
            [tt("÷ cost = return on investment", "÷ Kosten = Return on Investment"), `${euro(60000)} ÷ ${euro(40000)} = 150%`, `${euro(0)} ÷ ${euro(20000)} = 0%`],
          ]}
          caption={tt("Two measures of Main Analytics (Case assumption). The task prints the return on investment for you.", "Zwei Maßnahmen von Main Analytics (Fallannahme). Die Aufgabe druckt den Return on Investment für Sie.")}
        />
      </ShowMore>
      <ShowMore id="A7" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Economic viability is read from who the measure is printed to aim at, never guessed.", "Die Wirtschaftlichkeit wird aus dem gelesen, worauf die Maßnahme laut Beschreibung zielt, nie geschätzt."),
            tt("A cheap, friendly measure that aims at everyone scores low: it spends effort where a signal was never read.", "Eine billige, freundliche Maßnahme, die auf alle zielt, punktet niedrig: Sie gibt Aufwand dort aus, wo nie ein Signal gelesen wurde."),
          ]}
        />
      </ShowMore>
      <ShowMore id="A7" part="extra" label={tt("Show: A discount is not an answer", "Zeigen: Ein Rabatt ist keine Antwort")}>
        <Callout label={tt("A discount is not an answer", "Ein Rabatt ist keine Antwort")} tone="signal">
          <p>{tt("A discount for every customer with low use turns retention into a price cut: customers who would have renewed anyway take it, customers who use the platform less keep using it less, and the margin is given away every year. Read the signal, build the use, and keep money off for the case where a comparison on price is the whole reason.", "Ein Rabatt für jeden Kunden mit geringer Nutzung macht aus Retention eine Preissenkung: Kunden, die ohnehin verlängert hätten, nehmen ihn, Kunden, die die Plattform weniger nutzen, nutzen sie weiter weniger, und die Marge wird jedes Jahr verschenkt. Lesen Sie das Signal, bauen Sie die Nutzung auf, und heben Sie Preisnachlass für den Fall auf, dass ein Vergleich beim Preis der ganze Grund ist.")}</p>
        </Callout>
      </ShowMore>
    </MaterialCard>
  );
}

export const CARDS_A = [CardA1, CardA2, CardA3, CardA4, CardA5, CardA6, CardA7];
