"use client";

import { SectionRail } from "@/components/chrome/SectionRail";
import { PageNav } from "@/components/chrome/PageNav";
import { HashFlash } from "@/components/chrome/HashFlash";
import { SuggestedOrderBanner } from "@/components/ui/Banner";
import { MateriB } from "@/components/materi/Materi";
import { Task2 } from "@/components/task2/Task2";
import { ResetRoute } from "@/components/ui/ResetRoute";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

export function Route2Page() {
  return (
    <div className="space-y-8 pt-4">
      <HashFlash />
      <header className="space-y-3">
        <div className="space-y-1">
          <p className="smallcaps text-accent">{tt("Route 2 · Level 3 · Management decision", "Route 2 · Level 3 · Managemententscheidung")}</p>
          <h1>{tt("Build a data-driven control system instead of reporting on everything and acting on nothing", "Ein datengetriebenes Steuerungssystem aufbauen, statt über alles zu berichten und nach nichts zu handeln")}</h1>
        </div>
        <blockquote className="max-w-prose space-y-2 border-l-4 border-gold bg-accentSoft px-4 py-3 text-body text-ink">
          <p>
            <Gloss>
              {tt("Route 1 looked at which figures DataDriven's reports hold, which patterns in the customer data move with churn, and which measures to choose. Level 3 asks a different question: what does a data-driven control system look like, which data sources are central, which items come in and when, and what do you invest in today although nobody knows the forecast?", "Route 1 hat betrachtet, welche Zahlen die Berichte von DataDriven enthalten, welche Muster in den Kundendaten sich mit dem Churn bewegen und welche Maßnahmen zu wählen sind. Level 3 stellt eine andere Frage: Wie sieht ein datengetriebenes Steuerungssystem aus, welche Datenquellen sind zentral, welche Punkte kommen wann dazu, und worin investieren Sie heute, obwohl niemand die Prognose kennt?")}
            </Gloss>
          </p>
        </blockquote>
      </header>
      <SuggestedOrderBanner
        routeKey="r2"
        text={tt(
          "Route 1 first is recommended, because the situation quotes the measures you chose there. Every section stays open, so you can work through this route regardless.",
          "Route 1 zuerst wird empfohlen, weil die Lage die Maßnahmen zitiert, die Sie dort gewählt haben. Jeder Abschnitt bleibt offen, Sie können diese Route trotzdem bearbeiten.",
        )}
      />
      <SectionRail route={2} />
      <PageNav route={2} />
      <MateriB />
      <Task2 />
      <ResetRoute route={2} />
    </div>
  );
}
