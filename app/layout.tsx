import type { Metadata } from "next";
import "@/styles/globals.css";
import { TopBar } from "@/components/chrome/TopBar";
import { Footer } from "@/components/chrome/Footer";
import { ParticipantStrip } from "@/components/chrome/ParticipantStrip";
import { StoreHydrator } from "@/components/chrome/StoreHydrator";
import { MentorBar } from "@/components/chrome/MentorBar";
import { GlossaryPanel } from "@/components/chrome/GlossaryPanel";
import { LangProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Retention Lab · Day 16 — Data-Driven Customer Success: Analysing Customer Data and Controlling Churn with It",
  description:
    "Self-study companion for Customer Retention & Buying Behaviour in B2B IT Sales, Day 16: which figures to steer by, which patterns in the customer data move with churn, how to test a measure fairly, measures weighed by return on investment and a data-driven control system, with study material, live instruments and two working documents. English and German.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <StoreHydrator />
        <LangProvider>
          <MentorBar />
          <TopBar />
          <main className="mx-auto w-full max-w-[1100px] flex-1 px-4 pb-8 md:px-6">
            <ParticipantStrip />
            {children}
          </main>
          <Footer />
          <GlossaryPanel />
        </LangProvider>
      </body>
    </html>
  );
}
