import React from "react";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { useInjectFonts } from "./components/SupportShared";
import SupportHero from "./components/SupportHero";
import SupportContact from "./components/SupportContact";
import SupportFAQ from "./components/SupportFaq";

export default function SupportPage() {
  useInjectFonts();

  return (
    <div
      className="min-h-screen w-full bg-[#0B0F14] text-[#EDEFF2] selection:bg-[#4ADE80] selection:text-[#0B0F14]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .grid-overlay {
          background-image:
            linear-gradient(to right, #1A232E 1px, transparent 1px),
            linear-gradient(to bottom, #1A232E 1px, transparent 1px);
          background-size: 48px 48px;
        }
      `}</style>

      <SupportHero />
      <SupportContact />
      <SupportFAQ />
    </div>
  );
}