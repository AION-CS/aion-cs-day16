import type { ReactNode } from "react";
import { AMBER, Bubble, Card, Check, Desk, EnvelopeIcon, Floor, GREY, INK, Laptop, LaptopBack, Person, RUST, Scene, TEAL } from "@/components/comic/ComicKit";
import { tt } from "@/lib/lang";

/** The drawings of the Day 16 comic (data/comics.ts, COMIC_A1). Numerals and proper names only, so they read the same in both languages. */

function Report() {
  return (
    <Scene label={tt("Rina at her desk with her monthly report: 8 e-mails, 4 dashboards, 12 calls", "Rina an ihrem Schreibtisch mit ihrem Monatsbericht: 8 E-Mails, 4 Dashboards, 12 Anrufe")}>
      <Person kind="rina" x={80} y={72} face="smile" arms="right" />
      <Desk x={20} y={140} w={190} />
      <Laptop x={126} y={96} />
      <Card x={226} y={40} w={84} h={116}>
        <EnvelopeIcon x={236} y={58} />
        <text x="298" y="73" textAnchor="end" fontSize="18" fontWeight="600" fill={INK}>8</text>
        <rect x="238" y="96" width="5" height="10" fill={GREY} /><rect x="246" y="90" width="5" height="16" fill={GREY} /><rect x="254" y="84" width="5" height="22" fill={GREY} />
        <text x="298" y="105" textAnchor="end" fontSize="18" fontWeight="600" fill={INK}>4</text>
        <rect x="238" y="124" width="14" height="22" rx="3" fill="#fff" stroke={INK} strokeWidth="1.2" /><circle cx="245" cy="141" r="1.5" fill={INK} />
        <text x="298" y="142" textAnchor="end" fontSize="18" fontWeight="600" fill={INK}>12</text>
      </Card>
    </Scene>
  );
}

function Praise() {
  return (
    <Scene label={tt("Rina and her boss look at a report on which every bar rises", "Rina und ihr Chef sehen einen Bericht, auf dem jeder Balken steigt")}>
      <Floor />
      <Person kind="rina" x={64} y={65} face="smile" legs />
      <Person kind="boss" x={256} y={65} face="smile" legs flip />
      <Card x={116} y={64} w={88} h={86}>
        <rect x="126" y="126" width="12" height="14" fill={GREY} /><rect x="144" y="114" width="12" height="26" fill={GREY} /><rect x="162" y="100" width="12" height="40" fill={GREY} /><rect x="180" y="84" width="12" height="56" fill={GREY} />
        <line x1="122" y1="140" x2="198" y2="140" stroke={INK} strokeWidth="1" />
      </Card>
    </Scene>
  );
}

function Kessler() {
  const days = [18, 13, 6, 2];
  const months = [tt("Jan", "Jan"), tt("Mar", "Mär"), tt("Jun", "Jun"), tt("Aug", "Aug")];
  return (
    <Scene label={tt("A Kessler employee at a laptop; a thought bubble shows login days falling 18, 13, 6, 2", "Ein Kessler-Mitarbeiter am Laptop; eine Gedankenblase zeigt sinkende Login-Tage: 18, 13, 6, 2")}>
      <Person kind="customer" x={78} y={78} face="neutral" />
      <Desk x={20} y={146} w={110} legs={30} />
      <LaptopBack x={58} y={118} />
      <circle cx="122" cy="118" r="5" fill="#fff" stroke={INK} /><circle cx="112" cy="106" r="3.5" fill="#fff" stroke={INK} />
      <Bubble x={140} y={12} w={170} h={124} think />
      <line x1="152" y1="112" x2="300" y2="112" stroke={GREY} />
      {days.map((d, k) => {
        const x = 160 + k * 38;
        return (
          <g key={k}>
            <rect x={x} y={112 - d * 4} width="24" height={d * 4} fill={TEAL} />
            <text x={x + 12} y={112 - d * 4 - 5} textAnchor="middle" fontSize="13" fontWeight="600" fill={INK}>{d}</text>
            <text x={x + 12} y="127" textAnchor="middle" fontSize="11" fill={INK}>{months[k]}</text>
          </g>
        );
      })}
    </Scene>
  );
}

function Notice() {
  return (
    <Scene label={tt("Rina is shocked; a cancellation letter from Kessler lies on the table", "Rina ist schockiert; ein Kündigungsbrief von Kessler liegt auf dem Tisch")}>
      <Floor />
      <Person kind="rina" x={84} y={65} face="shock" arms="up" legs />
      <rect x="170" y="100" width="124" height="74" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <path d="M170 100L232 144L294 100" fill="none" stroke={INK} strokeWidth="1.5" />
      <circle cx="232" cy="144" r="9" fill={RUST} />
      <text x="232" y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">✕</text>
    </Scene>
  );
}

function List() {
  const rows: ReactNode[] = [
    <g key="k"><rect x="168" y="84" width="130" height="24" fill="none" stroke={AMBER} strokeWidth="2" /><text x="176" y="101" fontSize="13" fontWeight="600" fill="#0C447C">Kessler</text><text x="290" y="101" textAnchor="end" fontSize="13" fontWeight="600" fill="#0C447C">13 ▼</text></g>,
    <g key="w"><text x="176" y="126" fontSize="13" fill="#0C447C">Weber</text><text x="290" y="126" textAnchor="end" fontSize="13" fill="#0C447C">11 ▼</text></g>,
    <g key="r"><text x="176" y="148" fontSize="13" fill="#0C447C">Roth</text><text x="290" y="148" textAnchor="end" fontSize="13" fill="#0C447C">9 ▼</text></g>,
  ];
  return (
    <Scene label={tt("Rina reads a weekly list of customers whose login days fell; Kessler is highlighted", "Rina liest eine wöchentliche Liste der Kunden mit gesunkenen Login-Tagen; Kessler ist markiert")}>
      <Floor />
      <Person kind="rina" x={62} y={65} face="neutral" arms="right" legs />
      <rect x="150" y="26" width="160" height="136" rx="5" fill={INK} />
      <rect x="154" y="30" width="152" height="128" fill="#E6F1FB" />
      <text x="162" y="52" fontSize="12" fontWeight="700" fill="#0C447C">{tt("Login days, falling", "Login-Tage, sinkend")}</text>
      <line x1="162" y1="60" x2="298" y2="60" stroke="#85B7EB" />
      <text x="176" y="76" fontSize="11" fill="#444441">{tt("Customer", "Kunde")}</text>
      <text x="290" y="76" textAnchor="end" fontSize="11" fill="#444441">{tt("Days", "Tage")}</text>
      {rows}
      <rect x="226" y="162" width="8" height="12" fill="#5F5E5A" /><rect x="212" y="174" width="36" height="5" fill="#5F5E5A" />
    </Scene>
  );
}

function Call() {
  return (
    <Scene label={tt("Rina and Kessler talk on the phone; the customer will stay", "Rina und Kessler telefonieren; der Kunde bleibt")}>
      <Person kind="rina" x={70} y={80} face="smile" phone />
      <Person kind="customer" x={250} y={80} face="smile" flip phone />
      <path d="M96 72Q160 28 224 72" fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="5 4" />
      <Check cx={160} cy={118} r={20} />
    </Scene>
  );
}

export const ART_16: Record<string, ReactNode> = { report: <Report />, praise: <Praise />, kessler: <Kessler />, notice: <Notice />, list: <List />, call: <Call /> };
