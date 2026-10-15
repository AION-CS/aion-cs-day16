import type { ReactNode } from "react";

/**
 * Drawing kit for the story comics (CLAUDE.md #49). Pure SVG, no state, no text of its own except numerals and short labels the
 * scene passes in, so the same figures work in both languages (all speech and captions are HTML in ComicModal). Colours are
 * hardcoded on purpose: a comic scene is a drawing, it does not follow the page theme. Rina is the recurring Customer Success
 * Manager of the course; the other cast members are fictional and are said to be so on screen.
 */
export type Kind = "rina" | "boss" | "customer" | "engineer" | "member";
export type Face = "smile" | "neutral" | "shock" | "worry";
export type Arms = "none" | "up" | "right";

const BODY: Record<Kind, string> = { rina: "#0F6B6B", boss: "#3A3F47", customer: "#5B7A99", engineer: "#D99A2B", member: "#7A6A58" };
const SKIN: Record<Kind, string> = { rina: "#F2C9A5", boss: "#E0B38C", customer: "#E8BE98", engineer: "#D9A57E", member: "#EBC7A2" };
const HAIR = "#4A2F20";

export const INK = "#1F2328";
export const AMBER = "#D99A2B";
export const TEAL = "#0F6B6B";
export const RUST = "#A4472A";
export const GREY = "#8B9098";
const WOOD = "#A67C52";

/** A person drawn around the centre of the head (x, y). Standing full height with `legs`, otherwise a bust to the waist. */
export function Person({ kind, x, y, face = "neutral", s = 1.3, arms = "none", legs = false, flip = false, phone = false }: { kind: Kind; x: number; y: number; face?: Face; s?: number; arms?: Arms; legs?: boolean; flip?: boolean; phone?: boolean }) {
  const body = BODY[kind];
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
      {legs && (
        <>
          <rect x="-11" y="60" width="8" height="30" fill={INK} />
          <rect x="3" y="60" width="8" height="30" fill={INK} />
        </>
      )}
      {arms === "up" && (
        <>
          <line x1="-15" y1="26" x2="-27" y2="8" stroke={body} strokeWidth="7" strokeLinecap="round" />
          <line x1="15" y1="26" x2="27" y2="8" stroke={body} strokeWidth="7" strokeLinecap="round" />
        </>
      )}
      {arms === "right" && <line x1="15" y1="26" x2="40" y2="44" stroke={body} strokeWidth="7" strokeLinecap="round" />}
      <rect x="-17" y="16" width="34" height="46" rx="9" fill={body} />
      {kind === "boss" && <rect x="-2.5" y="16" width="5" height="26" fill={RUST} />}
      {kind === "rina" && <circle cx="0" cy="-17" r="6" fill={HAIR} />}
      <circle r="15" fill={SKIN[kind]} />
      {kind === "rina" && <path d="M-16 2A16 16 0 0 1 16 2Q16 -6 0 -9Q-16 -6 -16 2Z" fill={HAIR} />}
      {kind === "customer" && <path d="M-16 -2A16 16 0 0 1 16 -2Q10 -9 0 -9Q-10 -9 -16 -2Z" fill="#B4B2A9" />}
      {kind === "member" && <path d="M-15 -3A15 15 0 0 1 15 -3Q8 -10 0 -9Q-8 -10 -15 -3Z" fill={HAIR} />}
      {kind === "engineer" && <path d="M-16 -4A16 16 0 0 1 16 -4L18 -4L18 -1L-18 -1L-18 -4Z" fill="#F4E4B8" stroke={INK} strokeWidth="0.8" />}
      {face === "shock" ? (
        <>
          <circle cx="-5.5" cy="0" r="2.6" fill="#fff" stroke={INK} strokeWidth="0.8" />
          <circle cx="5.5" cy="0" r="2.6" fill="#fff" stroke={INK} strokeWidth="0.8" />
          <circle cx="-5.5" cy="0" r="1" fill={INK} />
          <circle cx="5.5" cy="0" r="1" fill={INK} />
        </>
      ) : (
        <>
          <circle cx="-5.5" cy="0" r="1.8" fill={INK} />
          <circle cx="5.5" cy="0" r="1.8" fill={INK} />
        </>
      )}
      {face === "smile" && <path d="M-5 6Q0 11 5 6" fill="none" stroke={INK} strokeWidth="1.5" />}
      {face === "neutral" && <path d="M-4 8H4" fill="none" stroke={INK} strokeWidth="1.5" />}
      {face === "worry" && <path d="M-4 9Q0 5 4 9" fill="none" stroke={INK} strokeWidth="1.5" />}
      {face === "shock" && <ellipse cx="0" cy="8" rx="3" ry="4" fill={INK} />}
      {kind === "customer" && (
        <>
          <circle cx="-6" cy="0" r="4.6" fill="none" stroke={INK} strokeWidth="1" />
          <circle cx="6" cy="0" r="4.6" fill="none" stroke={INK} strokeWidth="1" />
        </>
      )}
      {phone && <rect x="14" y="-9" width="5" height="14" rx="2" fill={INK} />}
    </g>
  );
}

export function Desk({ x, y, w, legs = 32 }: { x: number; y: number; w: number; legs?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height="10" fill={WOOD} />
      <rect x={x + 8} y={y + 10} width="6" height={legs} fill={WOOD} />
      <rect x={x + w - 14} y={y + 10} width="6" height={legs} fill={WOOD} />
    </>
  );
}

/** A laptop seen from the front (screen toward the viewer). `lines` are placeholder text lines on the screen. */
export function Laptop({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect x={x} y={y + 38} width="64" height="6" fill="#5F5E5A" />
      <rect x={x + 6} y={y} width="52" height="38" rx="3" fill={INK} />
      <rect x={x + 9} y={y + 3} width="46" height="32" fill="#E6F1FB" />
      <rect x={x + 14} y={y + 10} width="30" height="3" fill="#85B7EB" />
      <rect x={x + 14} y={y + 17} width="22" height="3" fill="#85B7EB" />
      <rect x={x + 14} y={y + 24} width="26" height="3" fill="#85B7EB" />
    </>
  );
}

/** The back of a laptop (the person at the desk is looking at it). */
export function LaptopBack({ x, y }: { x: number; y: number }) {
  return <rect x={x} y={y} width="46" height="30" rx="3" fill={GREY} />;
}

export function Floor({ y = 182 }: { y?: number }) {
  return <line x1="10" y1={y} x2="310" y2={y} stroke="#B4B2A9" strokeWidth="1" />;
}

export function Bubble({ x, y, w, h, children, think = false }: { x: number; y: number; w: number; h: number; children?: ReactNode; think?: boolean }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={think ? 16 : 8} fill="#fff" stroke={INK} strokeWidth="1" />
      {children}
    </>
  );
}

/** A small card on a stand-alone page, white with a thin border. */
export function Card({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children?: ReactNode }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="4" fill="#fff" stroke={GREY} strokeWidth="1" />
      {children}
    </>
  );
}

export function EnvelopeIcon({ x, y, color = INK }: { x: number; y: number; color?: string }) {
  return (
    <>
      <rect x={x} y={y} width="24" height="17" rx="2" fill="#fff" stroke={color} strokeWidth="1.2" />
      <path d={`M${x} ${y + 1}L${x + 12} ${y + 10}L${x + 24} ${y + 1}`} fill="none" stroke={color} strokeWidth="1.2" />
    </>
  );
}

export function Check({ cx, cy, r = 14, color = TEAL }: { cx: number; cy: number; r?: number; color?: string }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={color} />
      <path d={`M${cx - r * 0.45} ${cy} L${cx - r * 0.1} ${cy + r * 0.38} L${cx + r * 0.5} ${cy - r * 0.35}`} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

/** The frame every scene sits in: a fixed 320 × 190 drawing area with an accessible name. */
export function Scene({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 320 190" role="img" aria-label={label} className="block h-auto w-full">
      <title>{label}</title>
      {children}
    </svg>
  );
}
