import React, { useEffect, useState } from "react";
import { PhoneCall, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { StatusDot, RadarSweep, SectionEyebrow } from "./AboutShared";

export default function AboutHero() {
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTicker((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = new Date(Date.now() + ticker * 1000).toLocaleTimeString(
    "en-IN",
    { hour12: false },
  );

  return (
    <>
      {/* Live status strip */}
      <div className="border-b border-[#1A232E] bg-[#0B0F14]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-end px-6 py-2">
          <div className="hidden items-center gap-6 font-mono text-[11px] text-[#5B6672] sm:flex">
            <StatusDot label="SYSTEM ARMED" />
            <span>{timeStr} IST</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> INDIA-WIDE
            </span>
          </div>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className="grid-overlay relative overflow-hidden border-b border-[#1A232E]">
        <div className="mx-auto grid grid-cols-1 items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Hero Left Content: Slide from Left to Right + Fade in */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SectionEyebrow>About SuperX Technology</SectionEyebrow>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Security that watches
              <br />
              <span className="text-[#4ADE80]">itself,</span> end to end.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#9AA4B0] sm:text-lg">
              Getting a CCTV installed used to mean double hassle — first buy
              the camera, then find a technician. SuperX has simplified the
              entire process under one roof: sales, installation, and support —
              everything handled by us.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md bg-[#4ADE80] px-5 py-3 font-medium text-[#0B0F14] transition hover:bg-[#3FC873] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#0B0F14]"
              >
                <PhoneCall className="h-4 w-4" /> Book Installation
              </a>
              <span className="font-mono text-xs text-[#5B6672]">
                REC ● 1 YEAR SERVICE WARRANTY
              </span>
            </div>
          </motion.div>

          {/* Hero Right Content: Slide from Right to Left + Fade in */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <RadarSweep />
          </motion.div>
        </div>
      </section>
    </>
  );
}