import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import { StatusDot, SectionEyebrow, fadeUp } from "./SupportShared";

export default function SupportHero() {
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTicker((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = new Date(Date.now() + ticker * 1000).toLocaleTimeString(
    "en-IN",
    { hour12: false }
  );

  return (
    <>
      {/* Live status strip */}
      <div className="border-b border-[#1A232E] bg-[#0B0F14]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-end px-6 py-2">
          <div className="hidden items-center gap-6 font-mono text-[11px] text-[#5B6672] sm:flex">
            <StatusDot label="SUPPORT ONLINE" />
            <span>{timeStr} IST</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> INDIA-WIDE
            </span>
          </div>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className="grid-overlay relative overflow-hidden border-b border-[#1A232E]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="mb-4 flex justify-center">
              <SectionEyebrow>Support Center</SectionEyebrow>
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#EDEFF2] sm:text-5xl">
              Need help? We're
              <span className="text-[#4ADE80]"> one call away.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#9AA4B0] sm:text-lg">
              Whether it's an installation issue, a warranty claim, or just a
              question — SuperX's support team is always available.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}