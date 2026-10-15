"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { glossify } from "@/lib/glossify";
import { tt } from "@/lib/lang";

/**
 * A story comic in a modal (CLAUDE.md #49). A card keeps its own text, picture and "Walk me through it" story untouched; it only gains one
 * quiet row that opens this dialog. One panel at a time: the drawing, the speech in HTML (so it wraps in both languages), a tag that names
 * what the panel shows, and always-visible "What this panel means". Next / Back, the dots, ← → and Escape all work; nothing is persisted.
 */
export type Speaker = string;
export type ComicPanel = {
  /** Key into the `art` record the card passes in. */
  art: string;
  /** One line that sets the scene. */
  scene: string;
  speech: { by: Speaker; text: string; think?: boolean }[];
  tag: { tone: "plain" | "teal" | "ink"; text: string };
  /** The plain meaning of the panel for the course: what it shows and why it matters. */
  means: string;
  /** Optional: what to look at in the drawing. */
  look?: string;
};
export type Comic = {
  id: string;
  title: string;
  /** One sentence under the title on the card's row. */
  teaser: string;
  /** Said on screen so nobody takes the story for case data. */
  note: string;
  /** Speaker keys to display names. */
  names: Record<string, string>;
  panels: ComicPanel[];
};

const TAG_CLS = {
  plain: "border border-dashed border-ash bg-mist text-ink",
  teal: "border border-signal bg-signalSoft text-signal",
  ink: "border border-ink bg-ink text-paper",
} as const;

const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function ComicButton({ comic, art }: { comic: Comic; art: Record<string, ReactNode> }) {
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  return (
    <>
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gold bg-accentSoft p-3">
        <button ref={opener} type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className="btn btn-sm min-h-[40px] border border-accent bg-paper font-semibold text-ink">
          ▶ {tt("Read the comic", "Comic lesen")}
        </button>
        <p className="min-w-[14rem] flex-1 text-caption text-ink">
          <span className="font-semibold">{comic.title}.</span> {comic.teaser}{" "}
          {tt(`${comic.panels.length} panels, about 2 minutes.`, `${comic.panels.length} Bilder, etwa 2 Minuten.`)}
        </p>
      </div>
      {open && (
        <ComicDialog
          comic={comic}
          art={art}
          onClose={() => {
            setOpen(false);
            window.setTimeout(() => opener.current?.focus(), 0);
          }}
        />
      )}
    </>
  );
}

function ComicDialog({ comic, art, onClose }: { comic: Comic; art: Record<string, ReactNode>; onClose: () => void }) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const n = comic.panels.length;
  const p = comic.panels[i];
  const last = i === n - 1;
  const go = useCallback((k: number) => setI(Math.max(0, Math.min(n - 1, k))), [n]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nextRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [i]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") go(i + 1);
      else if (e.key === "ArrowLeft") go(i - 1);
      else if (e.key === "Tab" && ref.current) {
        const els = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (els.length === 0) return;
        const first = els[0];
        const lastEl = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [i, go, onClose]);

  const seen = new Set<string>();
  const meansG = glossify(p.means, seen);

  return createPortal(
    <div className="fixed inset-0 z-[44] flex items-center justify-center bg-ink/60 p-2 sm:p-4 print:hidden" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby={`comic-${comic.id}-title`} className="flex max-h-full w-full max-w-2xl flex-col rounded-xl border border-line bg-paper shadow-lg">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-line px-3.5 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="smallcaps text-ash">{tt(`Comic · panel ${i + 1} of ${n}`, `Comic · Bild ${i + 1} von ${n}`)}</p>
            <h3 id={`comic-${comic.id}-title`} className="mt-0.5">
              {comic.title}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="btn btn-sm min-h-[40px] shrink-0 border border-line bg-paper text-ink hover:border-ash">
            {tt("Close", "Schließen")} ✕
          </button>
        </div>

        <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto px-3.5 py-3 sm:px-5">
          <p className="text-caption italic text-ash">{p.scene}</p>

          <div className="mt-2 rounded-lg border border-line bg-canvas p-1.5 [&_svg]:max-h-[34vh]">{art[p.art]}</div>

          <ul className="mt-3 space-y-2" aria-label={tt("What is said", "Was gesagt wird")}>
            {p.speech.map((s, k) => (
              <li key={k} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="smallcaps w-24 shrink-0 text-ash">{comic.names[s.by] ?? s.by}</span>
                <span className={clsx("min-w-0 flex-1 rounded-xl border px-3 py-1.5 text-body text-ink", s.think ? "border-dashed border-ash bg-mist italic" : "border-ink bg-paper")}>
                  {s.think ? `(${s.text})` : `${tt("“", "„")}${s.text}${tt("”", "“")}`}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-3">
            <span className={clsx("inline-block rounded-full px-3 py-1 text-caption font-semibold", TAG_CLS[p.tag.tone])}>{p.tag.text}</span>
          </div>

          <div aria-live="polite" className="insight mt-3 space-y-1">
            <p>
              <span className="smallcaps mr-1.5 text-ash">{tt("What this panel means", "Was dieses Bild bedeutet")}</span>
              {meansG}
            </p>
            {p.look && (
              <p className="text-caption text-ash">
                <span aria-hidden>👁 </span>
                {tt("Look at: ", "Schauen Sie auf: ")}
                {p.look}
              </p>
            )}
          </div>
          <p className="mt-3 text-micro text-ash">{comic.note}</p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-line px-3.5 py-2.5 sm:px-5">
          <button type="button" onClick={() => go(i - 1)} disabled={i === 0} aria-disabled={i === 0} className="btn btn-sm min-h-[40px] border border-line bg-paper text-ink disabled:opacity-40">
            ◀ {tt("Back", "Zurück")}
          </button>
          <button ref={nextRef} type="button" onClick={() => go(last ? 0 : i + 1)} className="btn btn-sm min-h-[40px] border border-accent bg-paper font-semibold text-ink">
            {last ? tt("Start over", "Von vorn") : tt("Next", "Weiter")} {last ? "↺" : "▶"}
          </button>
          <div className="ml-auto flex items-center gap-1" role="group" aria-label={tt("Jump to a panel", "Zu einem Bild springen")}>
            {comic.panels.map((_, k) => (
              <button key={k} type="button" onClick={() => go(k)} aria-label={`${tt("Panel", "Bild")} ${k + 1}`} aria-current={k === i} className="flex h-10 w-6 items-center justify-center">
                <span className={clsx("block h-2.5 w-2.5 rounded-full border", k === i ? "border-ink bg-ink" : k < i ? "border-signal bg-signal" : "border-ash bg-paper")} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
