import React, { useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

const FONT_LINK_ID = "superx-fonts";

export const useInjectFonts = () => {
  useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
};

export const StatusDot = ({ label = "LIVE" }) => (
  <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest text-[#4ADE80]">
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
    </span>
    {label}
  </span>
);

export const RadarSweep = () => (
  <div className="relative h-64 w-64 shrink-0 sm:h-80 sm:w-80">
    <div className="absolute inset-0 rounded-full border border-[#243040]" />
    <div className="absolute inset-6 rounded-full border border-[#243040]" />
    <div className="absolute inset-12 rounded-full border border-[#243040]" />
    <div className="absolute inset-20 rounded-full border border-[#243040]" />
    {/* crosshair */}
    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#1A232E]" />
    <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[#1A232E]" />
    {/* sweep */}
    <motion.div
      className="absolute inset-0 origin-center rounded-full"
      style={{
        background:
          "conic-gradient(from 0deg, rgba(74,222,128,0.35), rgba(74,222,128,0) 28%)",
      }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
    />
    {/* blips */}
    <div className="absolute left-[30%] top-[38%] h-1.5 w-1.5 rounded-full bg-[#F5A524]" />
    <div className="absolute left-[64%] top-[58%] h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <ShieldCheck className="h-9 w-9 text-[#EDEFF2]" strokeWidth={1.5} />
    </div>
  </div>
);

export const SectionEyebrow = ({ children }) => (
  <div className="mb-4 flex items-center gap-3">
    <span className="h-px w-8 bg-[#4ADE80]" />
    <span className="font-mono text-xs tracking-[0.25em] text-[#4ADE80] uppercase">
      {children}
    </span>
  </div>
);