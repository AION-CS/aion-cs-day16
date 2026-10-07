import { LEVEL_LABEL, LINES } from "@/data/ladder";
import { BASIS_LABEL, CUST_BY_ID, PILOT, FORECAST } from "@/data/forecast";
import { AB, AB_PARTS, MEANINGS, OUTCOME_LABEL, PATTERNS, PATTERN_IDS, PMEASURES, RECORDS, RISK_LABEL, UNC_BY_ID } from "@/data/patterns";
import { BUDGET, MEASURE_BY_ID, MONTHS, PROBLEM_LABEL, MEASURE_AREA_LABEL, roiOf } from "@/data/measures";
import { ACTION_LABEL, ARCH, ARCH_BY_ID, COMP_BY_ID, CRITERIA, CRIT_IDS, DECISIONS, LOGIC_OWNER_LABEL, PRINCIPLES, R2_BUDGET, R2_MONTHS, SITUATIONS, SOURCES, USE_LABEL } from "@/data/route2";
import { PANEL, TIER_LABEL, WEAK_POINTS } from "@/data/route2Panel";
import { coverage, measureScore, tallyOf, totalCost } from "@/lib/checks";
import { planOf, rangeOf } from "@/lib/r2Panel";
import { euro, getLang, num, pct, tt } from "@/lib/lang";
import { COURSE } from "@/lib/routes";
import { esc } from "@/lib/svg";
import type { Persisted } from "@/store/useStore";

/**
 * Each exported document is built here as a self-contained HTML string (inline CSS + inline SVG), in the active language. The
 * on-screen "Preview of your ..." renders this same body, so what the participant reads is what they download. It never prints
 * answer keys, ticks, crosses or scores (a measure's economic viability × effect × sustainability is the learner's own priority
 * score, not a mark). From Day 13 the Core blocks are 1.1, 2.4 and the Route 2 frame; every Optional block prints "Optional · not filled in"
 * when it is empty (CLAUDE.md #48).
 */

export const DOC_CSS = `
.doc{font-family:Georgia,Cambria,"Times New Roman",serif;color:#1F2328;background:#FFFEFA;line-height:1.5;font-size:14px}
.doc *{box-sizing:border-box}
.doc h1{font-size:22px;margin:0 0 4px;font-weight:600}
.doc h2{font-size:15px;margin:22px 0 8px;padding-bottom:4px;border-bottom:1px solid #D8D1BF;font-weight:600;letter-spacing:.01em}
.doc h3{font-size:13.5px;margin:14px 0 4px;font-weight:600}
.doc .meta{display:grid;grid-template-columns:auto 1fr;gap:2px 14px;margin:12px 0 4px;font-family:system-ui,sans-serif;font-size:12.5px}
.doc .meta dt{color:#59606A}.doc .meta dd{margin:0}
.doc .kicker{font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#8A5A0B}
.doc table{width:100%;border-collapse:collapse;font-size:12.5px;font-family:system-ui,sans-serif}
.doc th{text-align:left;font-weight:600;color:#59606A;border-bottom:1px solid #59606A;padding:4px 8px 4px 0;font-size:11px;letter-spacing:.04em;text-transform:uppercase}
.doc td{border-bottom:1px solid #ECE6D6;padding:6px 8px 6px 0;vertical-align:top}
.doc td.num{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
.doc td.id{font-weight:700}
.doc table{table-layout:auto}.doc td,.doc th{overflow-wrap:anywhere}
.doc blockquote{margin:6px 0;padding:6px 12px;border-left:3px solid #D99A2B;background:#FBF0D6}
.doc .muted{color:#59606A}
.doc .foot{margin-top:26px;padding-top:8px;border-top:1px solid #59606A;font-family:system-ui,sans-serif;font-size:12px;color:#59606A}
.doc .legend{font-family:system-ui,sans-serif;font-size:11.5px;color:#59606A;margin:4px 0 0}
.doc svg{display:block;margin:8px 0}
@media print{.doc{font-size:12px}.doc h2{break-after:avoid}.doc table,.doc svg,.doc blockquote{break-inside:avoid}}
`;

const dateLabel = () => new Date().toLocaleDateString(getLang() === "de" ? "de-DE" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

function header(title: string, level: string, p: Persisted): string {
  return `
<div class="kicker">${esc(COURSE.course)} · ${esc(COURSE.company)}</div>
<h1>${esc(title)}</h1>
<dl class="meta">
  <dt>${esc(tt("Course", "Kurs"))}</dt><dd>${esc(COURSE.course)} · ${esc(tt(`Day ${COURSE.day}`, `Tag ${COURSE.day}`))}</dd>
  <dt>${esc(tt("Position", "Einordnung"))}</dt><dd>${esc(level)}</dd>
  <dt>${esc(tt("Participant", "Teilnehmer/in"))}</dt><dd>${esc(p.participant.name.trim() || "—")}</dd>
  <dt>${esc(tt("Date", "Datum"))}</dt><dd>${esc(dateLabel())}</dd>
</dl>`;
}

const para = (s: string) => `<blockquote>${esc(s.trim()) || "—"}</blockquote>`;
const cell = (s: string) => esc(s.trim()) || "—";

export function wrapDocument(title: string, body: string): string {
  return `<!doctype html>
<html lang="${getLang()}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<style>body{margin:0;background:#F3EFE4}.sheet{max-width:820px;margin:0 auto;padding:36px 40px;background:#FFFEFA}@media print{body{background:#fff}.sheet{padding:0;max-width:none}@page{margin:16mm}}${DOC_CSS}</style>
</head><body><div class="sheet"><div class="doc">${body}</div></div></body></html>`;
}

export function downloadHtml(filename: string, html: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".html") ? filename : `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Opens the same document in a new window and prints it (no PDF library). Falls back to a hidden frame if pop-ups are blocked. */
export function printDocument(title: string, html: string) {
  const win = window.open("", "_blank");
  if (win) {
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.document.title = title;
    win.focus();
    window.setTimeout(() => win.print(), 250);
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden";
  document.body.appendChild(iframe);
  const w = iframe.contentWindow;
  if (!w) return iframe.remove();
  w.document.open();
  w.document.write(html);
  w.document.close();
  window.setTimeout(() => {
    w.focus();
    w.print();
    window.setTimeout(() => iframe.remove(), 1000);
  }, 250);
}

/* ------------------------------------------------------------------ Route 1 · the Data Control File */

/** Bars of the learner's own tally: findings per family and how many moved with churn, as an inline SVG. */
function tallySvg(p: Persisted): string {
  const t = tallyOf(p.l1.tags);
  const W = 560;
  const rowH = 28;
  const rows = PATTERN_IDS.map((s, i) => {
    const y = 8 + i * rowH;
    const w = (t.count[s] / 6) * 300;
    const wl = (t.left[s] / 6) * 300;
    return `<text x="0" y="${y + 13}" font-size="11.5" fill="#1F2328" font-family="system-ui,sans-serif">${esc(PATTERNS[s].label)}</text>
<rect x="140" y="${y}" width="${Math.max(w, 1.5).toFixed(1)}" height="16" fill="#8B9098" stroke="#1F2328"/>
<rect x="140" y="${y}" width="${wl.toFixed(1)}" height="16" fill="#2F5D62" stroke="#1F2328"/>
<text x="${(146 + w).toFixed(1)}" y="${y + 13}" font-size="11.5" fill="#1F2328" font-family="system-ui,sans-serif">${esc(tt(`${t.count[s]} · ${t.left[s]} moved with churn`, `${t.count[s]} · ${t.left[s]} mit dem Churn bewegt`))}</text>`;
  }).join("\n");
  const H = 8 + PATTERN_IDS.length * rowH;
  const title = tt("Findings per family, as you tagged them; the dark part moved with churn", "Befunde pro Familie, wie Sie sie zugeordnet haben; der dunkle Teil bewegte sich mit dem Churn");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>${rows}</svg>`;
}

export function analysisBody(p: Persisted): string {
  const { l1 } = p;
  const sortRows = LINES.map((r, i) => `<tr><td class="id">${i + 1}</td><td>${esc(r.text)}</td><td>${l1.sort[r.id] ? esc(LEVEL_LABEL[l1.sort[r.id]!]) : "—"}</td></tr>`).join("");
  const sortNote = l1.sortReasoning ? `<p class="legend">${esc(tt(`The reasoning for the sort was opened after ${l1.sortChecks} checks.`, `Die Begründung zur Sortierung wurde nach ${l1.sortChecks} Prüfungen geöffnet.`))}</p>` : "";
  const pilotTable = `<table><thead><tr><th>${esc(tt("Customers by level of use (Case assumption)", "Kunden nach Nutzungsniveau (Fallannahme)"))}</th><th class="num">${esc(tt("Customers", "Kunden"))}</th><th class="num">${esc(tt("Renewed", "Verlängert"))}</th><th class="num">${esc(tt("Renewal rate", "Verlängerungsquote"))}</th></tr></thead><tbody>
<tr><td class="id">${esc(tt("Low use", "Geringe Nutzung"))}</td><td class="num">${num(PILOT.control.sent)}</td><td class="num">${PILOT.control.orders}</td><td class="num">${num(FORECAST.controlRate, { minimumFractionDigits: 1 })} %</td></tr>
<tr><td class="id">${esc(tt("Intensive use", "Intensive Nutzung"))}</td><td class="num">${num(PILOT.variant.sent)}</td><td class="num">${PILOT.variant.orders}</td><td class="num">${num(FORECAST.f1, { minimumFractionDigits: 1 })} %</td></tr></tbody></table>
<p class="legend">${esc(tt(`The rates are printed by the app; intensive customers renewed ${num(FORECAST.f2)} times as often. A correlation, not yet a cause.`, `Die Quoten druckt die App; intensive Kunden verlängerten ${num(FORECAST.f2)}-mal so oft. Eine Korrelation, noch keine Ursache.`))}</p>`;
  const optNote = tt("Optional block · not filled in.", "Optionaler Block · nicht ausgefüllt.");
  const optTag = tt(" · Optional", " · Optional");
  const has12 = l1.meaning.trim() !== "";
  const has13 = l1.valuable.length > 0 || l1.churners.length > 0 || l1.insights.some((a) => a.text.trim() !== "");
  const has14 = Object.values(l1.reflect).some((v) => v.trim() !== "");
  const has21 = RECORDS.some((r) => !!l1.tags[r.id]) || l1.misread.trim() !== "";
  const has22 = l1.unc.length > 0 || PATTERN_IDS.some((x) => l1.rows[x].risk || l1.rows[x].meaning || l1.rows[x].measure);
  const has23 = l1.ab.hyp.trim() !== "" || l1.ab.rule.trim() !== "" || AB_PARTS.some((k) => !!l1.ab[k]);
  const optEmpty = `<p class="muted">${esc(optNote)}</p>`;
  const names = (ids: string[]) => esc(ids.map((c) => CUST_BY_ID[c as keyof typeof CUST_BY_ID].name).join(", ") || "—");
  const insights = l1.insights.map((a, i) => `<h3>${esc(tt(`Insight ${i + 1}`, `Erkenntnis ${i + 1}`))} · ${a.basis ? esc(BASIS_LABEL[a.basis]) : "—"}</h3>${para(a.text)}`).join("");
  const tagRows = RECORDS.map((o) => `<tr><td class="id">${esc(o.code)}</td><td>${esc(o.text)}</td><td>${esc(OUTCOME_LABEL[o.outcome])}</td><td>${l1.tags[o.id] ? esc(PATTERNS[l1.tags[o.id]!].label) : "—"}</td></tr>`).join("");
  const tagNote = l1.tagReasoning ? `<p class="legend">${esc(tt(`The reasoning for the tags was opened after ${l1.tagChecks} checks.`, `Die Begründung zur Zuordnung wurde nach ${l1.tagChecks} Prüfungen geöffnet.`))}</p>` : "";
  const meaningLabel = (id: string | null) => MEANINGS.find((m) => m.id === id)?.label ?? "—";
  const measureLabel = (id: string | null) => PMEASURES.find((m) => m.id === id)?.label ?? "—";
  const rowRows = PATTERN_IDS.map((x) => {
    const r = l1.rows[x];
    return `<tr><td class="id">${esc(PATTERNS[x].label)}</td><td>${r.risk ? esc(RISK_LABEL[r.risk]) : "—"}</td><td>${esc(meaningLabel(r.meaning))}</td><td>${esc(measureLabel(r.measure))}</td></tr>`;
  }).join("");
  const uncList = l1.unc.length ? `<ul>${l1.unc.map((w) => `<li>${esc(UNC_BY_ID[w].label)}</li>`).join("")}</ul>` : `<p class="muted">—</p>`;
  const abRows = AB_PARTS.map((k) => `<tr><td class="id">${esc(AB[k].label)}</td><td>${esc(AB[k].options.find((o) => o.id === l1.ab[k])?.label ?? "—")}</td></tr>`).join("");
  const chosen = l1.chosen;
  const measureRows = chosen
    .map((id) => {
      const m = MEASURE_BY_ID[id];
      return `<tr><td class="id">${esc(m.name)}<br><span class="muted">${esc(MEASURE_AREA_LABEL[m.area])}</span></td><td>${m.targets.length ? esc(m.targets.map((a) => PROBLEM_LABEL[a]).join(", ")) : esc(tt("none of the three", "keines der drei"))}</td><td class="num">${l1.exp[id] || "—"} × ${l1.eff[id] || "—"} × ${l1.fea[id] || "—"} = ${measureScore(l1, id) || "—"}</td><td class="num">${esc(euro(m.cost))}</td><td class="num">${roiOf(id)} %</td></tr>`;
    })
    .join("");
  const cov = coverage(l1);
  const notServed = cov.filter((c) => !c.covered).map((c) => PROBLEM_LABEL[c.pattern]).join(", ");
  const covLine = chosen.length
    ? tt(`Problems of the brief at least one chosen measure answers: ${cov.filter((c) => c.covered).length} of 3${notServed ? ` (not answered: ${notServed})` : ""}.`, `Probleme des Auftrags, die mindestens eine gewählte Maßnahme beantwortet: ${cov.filter((c) => c.covered).length} von 3${notServed ? ` (nicht beantwortet: ${notServed})` : ""}.`)
    : "";
  const cost = totalCost(chosen);
  const order = l1.order.filter((id) => chosen.includes(id));

  return `${header("Data Control File", tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), p)}
<h2>${esc(tt("The case", "Der Fall"))}</h2>
<p>${esc(tt(`DataDriven Sales GmbH sells a reporting and analytics platform to the Mittelstand. Its data sits in three places, its churn is found when the notice arrives and its measures cannot be measured. Budget ${euro(BUDGET)}, time ${MONTHS} months. Evidence in the file: nine figures from its reports, last year's renewal figures by level of use, eight groups of customers and twelve behaviour patterns.`, `DataDriven Sales GmbH verkauft dem Mittelstand eine Reporting- und Analytics-Plattform. Seine Daten liegen an drei Orten, sein Churn wird gefunden, wenn die Kündigung eintrifft, und seine Maßnahmen lassen sich nicht messen. Budget ${euro(BUDGET)}, Zeit ${MONTHS} Monate. Belege in der Datei: neun Zahlen aus seinen Berichten, die Verlängerungs-Werte des letzten Jahres nach Nutzungsniveau, acht Kundengruppen und zwölf Verhaltensmuster.`))}</p>

<h2>${esc(tt("Part 1 · Understand the data", "Teil 1 · Die Daten verstehen"))}</h2>
<h3>${esc(tt("1.1 · Nine figures from the reports: result KPI, driver or activity count", "1.1 · Neun Zahlen aus den Berichten: Ergebnis-KPI, Treiber oder Aktivitätszahl"))}</h3>
<table><thead><tr><th>#</th><th>${esc(tt("Figure", "Zahl"))}</th><th>${esc(tt("Kind of figure", "Art der Zahl"))}</th></tr></thead><tbody>${sortRows}</tbody></table>${sortNote}
<h3>${esc(tt("One extra figure DataDriven should watch, of my own", "Eine eigene zusätzliche Zahl, die DataDriven beobachten sollte"))}</h3>${para(l1.extraInsight)}
<h3>${esc(tt("1.2 · What the renewal figures say", "1.2 · Was die Verlängerungs-Werte sagen"))}${esc(optTag)}</h3>
${has12 ? `${pilotTable}${para(l1.meaning)}` : optEmpty}
<h3>${esc(tt("1.3 · Where a measure helps most, where an analysis can use data we have, and three insights", "1.3 · Wo eine Maßnahme am meisten hilft, wo eine Analyse vorhandene Daten nutzen kann, und drei Erkenntnisse"))}${esc(optTag)}</h3>
${
  has13
    ? `<p><strong>${esc(tt("A measure helps most for:", "Eine Maßnahme hilft am meisten bei:"))}</strong> ${names(l1.valuable)}</p>
<p><strong>${esc(tt("An analysis can run on data we have for:", "Eine Analyse kann auf vorhandenen Daten laufen bei:"))}</strong> ${names(l1.churners)}</p>
${insights}`
    : optEmpty
}
<h3>${esc(tt("1.4 · Coaching reflection", "1.4 · Coaching-Reflexion"))}${esc(optTag)}</h3>
${
  has14
    ? `<h3>${esc(tt("When is a signal worth watching, and when not?", "Wann lohnt es sich, ein Signal zu beobachten, und wann nicht?"))}</h3>${para(l1.reflect.interpret)}
<h3>${esc(tt("Correlation or cause?", "Korrelation oder Ursache?"))}</h3>${para(l1.reflect.causation)}
<h3>${esc(tt("Which signals are the wrong ones to act on, where do unnecessary costs arise, and how would a strategic decision-maker proceed?", "Nach welchen Signalen sollte man nicht handeln, woher kommen unnötige Kosten, und wie würde eine strategische Entscheiderin vorgehen?"))}</h3>${para(l1.reflect.decider)}`
    : optEmpty
}

<h2>${esc(tt("Part 2 · Analyse and choose", "Teil 2 · Analysieren und auswählen"))}</h2>
<h3>${esc(tt("2.1 · The twelve behaviour patterns, as you tagged them", "2.1 · Die zwölf Verhaltensmuster, wie Sie sie zugeordnet haben"))}${esc(optTag)}</h3>
${
  has21
    ? `<table><thead><tr><th>${esc(tt("Finding", "Befund"))}</th><th>${esc(tt("What it counts", "Was es zählt"))}</th><th>${esc(tt("Last year", "Letztes Jahr"))}</th><th>${esc(tt("Family", "Familie"))}</th></tr></thead><tbody>${tagRows}</tbody></table>${tagNote}
${tallySvg(p)}
<h3>${esc(tt("My three signals", "Meine drei Signale"))}</h3>${para(l1.misread)}`
    : optEmpty
}
<h3>${esc(tt("2.2 · What each family of pattern is worth", "2.2 · Was jede Familie von Mustern wert ist"))}${esc(optTag)}</h3>
${
  has22
    ? `<table><thead><tr><th>${esc(tt("Family", "Familie"))}</th><th>${esc(tt("Link to churn", "Verbindung zum Churn"))}</th><th>${esc(tt("When it shows", "Wann es sich zeigt"))}</th><th>${esc(tt("How to use it", "Wie man sie nutzt"))}</th></tr></thead><tbody>${rowRows}</tbody></table>
<h3>${esc(tt("Uncertainties in the churn figures", "Unsicherheiten der Churn-Werte"))}</h3>${uncList}`
    : optEmpty
}
<h3>${esc(tt("2.3 · A fair A/B test", "2.3 · Ein fairer A/B-Test"))}${esc(optTag)}</h3>
${
  has23
    ? `<h3>${esc(tt("Hypothesis", "Hypothese"))}</h3>${para(l1.ab.hyp)}
<table><tbody>${abRows}</tbody></table>
<h3>${esc(tt("Decision rule", "Entscheidungsregel"))}</h3>${para(l1.ab.rule)}`
    : optEmpty
}
<h2>${esc(tt("2.4 · Three measures, scored and ordered", "2.4 · Drei Maßnahmen, bewertet und geordnet"))}</h2>
<table><thead><tr><th>${esc(tt("Measure", "Maßnahme"))}</th><th>${esc(tt("Answers", "Beantwortet"))}</th><th class="num">${esc(tt("Economic Viability × Effect × Sustainability", "Wirtschaftlichkeit × Wirkung × Nachhaltigkeit"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Return on investment (computed by the app)", "Return on Investment (von der App berechnet)"))}</th></tr></thead><tbody>${measureRows || `<tr><td colspan="5">—</td></tr>`}</tbody></table>
${chosen.length ? `<h3>${esc(tt("Why these effect and sustainability scores", "Warum diese Werte für Wirkung und Nachhaltigkeit"))}</h3><ul>${chosen.map((id) => `<li><strong>${esc(MEASURE_BY_ID[id].name)}</strong>: ${cell(l1.reasons[id] ?? "")}</li>`).join("")}</ul>` : ""}
<p class="legend">${esc(tt(`Total cost ${euro(cost)} of the ${euro(BUDGET)} budget${cost > BUDGET ? ` (${euro(cost - BUDGET)} over)` : ""}.`, `Gesamtkosten ${euro(cost)} vom Budget von ${euro(BUDGET)}${cost > BUDGET ? ` (${euro(cost - BUDGET)} darüber)` : ""}.`))} ${esc(covLine)}</p>
<h3>${esc(tt("Priority order", "Reihenfolge"))}</h3>
<ol>${order.map((id) => `<li>${esc(MEASURE_BY_ID[id].name)}</li>`).join("") || "<li>—</li>"}</ol>
${para(l1.why)}

<div class="foot">${esc(tt(`Checks requested: ${l1.checks}`, `Angeforderte Prüfungen: ${l1.checks}`))}<br/>${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}

/* ------------------------------------------------------------------ Route 2 · the Control System Memo */

/** The Level 3 memo. The on-screen live preview and the exported file are both built by this function. */
export function memoBody(p: Persisted): string {
  const { l1, r2 } = p;
  const name = p.participant.name.trim();
  const situation =
    l1.chosen.length
      ? `<blockquote><strong>${esc(tt("Where Route 1 left off.", "Wo Route 1 aufgehört hat."))}</strong> ${esc(tt("Measures chosen:", "Gewählte Maßnahmen:"))} ${esc(l1.chosen.map((id) => MEASURE_BY_ID[id].name).join(", "))}.</blockquote>`
      : `<p class="muted">${esc(tt("Route 1 is not finished, so there is nothing to quote yet. Nothing is blocked.", "Route 1 ist nicht fertig, daher gibt es noch nichts zu zitieren. Nichts ist gesperrt."))}</p>`;
  const principleRows = r2.principles.map((c) => `<tr><td class="id">${esc(PRINCIPLES[c].name)}</td><td>${cell(r2.principleText[c] ?? "")}</td></tr>`).join("");
  const sourceRows = SOURCES.map((s) => `<tr><td class="id">${esc(s.name)}</td><td>${esc(s.decision ?? "—")}</td><td class="num">${pct(s.complete)}</td><td>${r2.sources[s.id] ? esc(USE_LABEL[r2.sources[s.id]]) : "—"}</td></tr>`).join("");
  const B = ["—", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];
  const compRows = r2.comps
    .map((id) => `<tr><td class="id">${esc(COMP_BY_ID[id].name)}${r2.greatest === id ? ` <span class="muted">(${esc(tt("greatest leverage", "größte Hebelwirkung"))})</span>` : ""}</td>${CRIT_IDS.map((c) => `<td>${esc(B[r2.rate[`${id}.${c}`] || 0])}</td>`).join("")}</tr>`)
    .join("");
  const logicRows = SITUATIONS.map((s) => {
    const r = r2.logic[s.id];
    return `<tr><td class="id">${esc(s.signal)}</td><td class="num">${s.lift > 0 ? "+" : s.lift < 0 ? "−" : ""}${esc(pct(Math.abs(s.lift)))} · ${s.cases}</td><td>${r?.action ? esc(ACTION_LABEL[r.action]) : "—"}</td><td>${r?.owner ? esc(LOGIC_OWNER_LABEL[r.owner]) : "—"}</td></tr>`;
  }).join("");

  // The architecture (Step A) as facts, in both data scenarios; never a grade (CLAUDE.md #47).
  const brief = planOf(r2, 0);
  const weak = planOf(r2, 1);
  const rng = rangeOf(r2);
  const pc = (n: number | null) => (n === null ? "—" : `${n}${tt("%", " %")}`);
  const archRows = ARCH.map((a) => {
    const v = brief.items[a.id];
    const funded = v.tier !== "not";
    return `<tr><td class="id">${esc(PANEL[a.id].short)}</td><td>${esc(TIER_LABEL[v.tier])}</td><td class="num">${funded ? esc(euro(a.cost)) : "—"}</td><td class="num">${funded && !v.never ? esc(tt(`month ${v.start} to ${v.inUse}`, `Monat ${v.start} bis ${v.inUse}`)) : "—"}</td><td>${funded && v.notes.length ? esc(v.notes.join("; ")) : "—"}</td></tr>`;
  }).join("");
  const testRows = brief.tests
    .map((x, i) => (x.applies ? `<tr><td class="id">${esc(x.name)}</td><td>${esc(x.holds ? tt("holds", "stimmt") : tt("open", "offen"))}</td><td>${esc(weak.tests[i].holds ? tt("holds", "stimmt") : tt("open", "offen"))}</td></tr>` : ""))
    .join("");
  const b = brief.bars;
  const barFacts = `<ul>
<li><strong>${esc(tt("Budget:", "Budget:"))}</strong> ${esc(tt(`${euro(b.spent)} of ${euro(R2_BUDGET)}`, `${euro(b.spent)} von ${euro(R2_BUDGET)}`))}${b.over > 0 ? esc(tt(`, ${euro(b.over)} over the budget (a decision the reasons in this memo defend)`, `, ${euro(b.over)} über dem Budget (eine Entscheidung, die die Begründungen in diesem Memo stützen)`)) : esc(tt(`, ${euro(b.left)} left`, `, ${euro(b.left)} übrig`))}</li>
<li><strong>${esc(tt("Measurable:", "Messbar:"))}</strong> ${esc(tt(`${pc(rng.meas[0])} of the money sits on items that are measured, whose data is complete and that are in use within the ${R2_MONTHS} months; ${pc(rng.meas[1])} if the data is ${WEAK_POINTS} points weaker.`, `${pc(rng.meas[0])} des Geldes liegen auf Punkten, die gemessen werden, deren Daten vollständig sind und die innerhalb der ${R2_MONTHS} Monate im Einsatz sind; ${pc(rng.meas[1])}, wenn die Daten ${WEAK_POINTS} Punkte schwächer sind.`))}</li>
<li><strong>${esc(tt("Risk:", "Risiko:"))}</strong> ${esc(tt(`${pc(rng.risk[0])} of the money rests on a black box, on data below 80% complete when the item starts or on an item in use only after the ${R2_MONTHS} months; ${pc(rng.risk[1])} if the data is ${WEAK_POINTS} points weaker.`, `${pc(rng.risk[0])} des Geldes beruhen auf einer Black Box, auf Daten unter 80 % vollständig, wenn der Punkt startet, oder auf einem Punkt, der erst nach den ${R2_MONTHS} Monaten im Einsatz ist; ${pc(rng.risk[1])}, wenn die Daten ${WEAK_POINTS} Punkte schwächer sind.`))}</li>
</ul>`;
  const d = DECISIONS.find((x) => x.id === r2.decision);
  const optNone = `<p class="muted">${esc(tt("Optional block, not answered.", "Optionaler Block, nicht beantwortet."))}</p>`;
  const answered = (list: unknown[]) => list.length > 0;

  return `${header("Control System Memo", tt("Level 3 · Management decision", "Level 3 · Managemententscheidung"), p)}
<p class="muted">${esc(tt(`To: the board · From: ${name || "Chief Customer Officer"}, DataDriven Sales GmbH · Budget ${euro(R2_BUDGET)} over ${R2_MONTHS} months.`, `An: den Vorstand · Von: ${name || "Chief Customer Officer"}, DataDriven Sales GmbH · Budget ${euro(R2_BUDGET)} über ${R2_MONTHS} Monate.`))}</p>
<h2>${esc(tt("1 · Situation", "1 · Lage"))}</h2>
<p>${esc(tt("Data sits in three places, churn is found when the notice arrives and the measures are not managed; the budget is limited, the data is incomplete and the goals conflict (costs against customer value). The board asks for a data-driven control system and an investment decision despite an unclear forecast.", "Die Daten liegen an drei Orten, Churn wird gefunden, wenn die Kündigung eintrifft, und die Maßnahmen werden nicht gesteuert; das Budget ist begrenzt, die Daten sind unvollständig, und die Ziele widersprechen sich (Kosten gegen Kundenwert). Der Vorstand verlangt ein datengetriebenes Steuerungssystem und eine Investitionsentscheidung trotz unklarer Prognose."))}</p>
${situation}
<h2>${esc(tt("2 · Target vision of the control system", "2 · Zielbild des Steuerungssystems"))}</h2>
${para(r2.vision)}
<h2>${esc(tt("3 · The prioritised system", "3 · Das priorisierte System"))}</h2>
<table><thead><tr><th>${esc(tt("Item", "Punkt"))}</th><th>${esc(tt("When", "Wann"))}</th><th class="num">${esc(tt("Cost", "Kosten"))}</th><th class="num">${esc(tt("Start to in use", "Start bis Einsatz"))}</th><th>${esc(tt("What the panel noted (data as the brief says)", "Was das Panel vermerkte (Daten wie im Auftrag)"))}</th></tr></thead><tbody>${archRows}</tbody></table>
${barFacts}
${testRows ? `<table><thead><tr><th>${esc(tt("Test", "Test"))}</th><th>${esc(tt("Data as the brief says", "Daten wie im Auftrag"))}</th><th>${esc(tt(`Data ${WEAK_POINTS} points weaker`, `Daten ${WEAK_POINTS} Punkte schwächer`))}</th></tr></thead><tbody>${testRows}</tbody></table>` : ""}
<h3>${esc(tt("What my plan gives me, and what I give up", "Was mein Plan mir gibt, und worauf ich verzichte"))}</h3>${para(r2.giveUp)}
<h2>${esc(tt("4 · The investment decision", "4 · Die Investitionsentscheidung"))}</h2>
<p><strong>${d ? esc(d.label) : "—"}</strong>${d ? ` — ${esc(d.detail)}` : ""}</p>
<h3>${esc(tt("Why", "Warum"))}</h3>${para(r2.decisionWhy)}
<h3>${esc(tt("What I will watch, and when I would stop", "Was ich beobachte, und wann ich aufhören würde"))}</h3>${para(r2.watch)}
<h2>${esc(tt("5 · Go deeper (optional blocks)", "5 · Vertiefen (optionale Blöcke)"))}</h2>
<h3>${esc(tt("Principles of the control system", "Prinzipien des Steuerungssystems"))}</h3>
${answered(r2.principles) ? `<table><thead><tr><th>${esc(tt("Principle", "Prinzip"))}</th><th>${esc(tt("What it means at DataDriven", "Was es bei DataDriven bedeutet"))}</th></tr></thead><tbody>${principleRows}</tbody></table>` : optNone}
<h3>${esc(tt("The data sources of the control system", "Die Datenquellen des Steuerungssystems"))}</h3>
${answered(Object.keys(r2.sources)) ? `<table><thead><tr><th>${esc(tt("Source", "Quelle"))}</th><th>${esc(tt("What the customer decides through it", "Was der Kunde darüber entscheidet"))}</th><th class="num">${esc(tt("Data complete", "Daten vollständig"))}</th><th>${esc(tt("Decision", "Entscheidung"))}</th></tr></thead><tbody>${sourceRows}</tbody></table>` : optNone}
<h3>${esc(tt("The KPI system for control", "Das KPI-System für die Steuerung"))}</h3>
${answered(r2.comps) ? `<table><thead><tr><th>${esc(tt("KPI", "KPI"))}</th>${CRITERIA.map((c) => `<th>${esc(c.name)}</th>`).join("")}</tr></thead><tbody>${compRows}</tbody></table>${para(r2.greatestWhy)}` : optNone}
<h3>${esc(tt("Measures tested: roll out, keep testing or stop", "Maßnahmen getestet: ausrollen, weiter testen oder stoppen"))}</h3>
${answered(Object.values(r2.logic).filter((r) => !!r?.action)) ? `<table><thead><tr><th>${esc(tt("Test", "Test"))}</th><th class="num">${esc(tt("Lift · customers per group", "Lift · Kunden pro Gruppe"))}</th><th>${esc(tt("What happens", "Was passiert"))}</th><th>${esc(tt("Who acts", "Wer handelt"))}</th></tr></thead><tbody>${logicRows}</tbody></table>` : optNone}

<div class="foot">${esc(tt(`Checks requested: ${r2.checks}`, `Angeforderte Prüfungen: ${r2.checks}`))}<br/>${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}

export { ARCH_BY_ID };
