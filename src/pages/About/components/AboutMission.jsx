import React from "react";
import { X, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { SectionEyebrow } from "./AboutShared";

export default function AboutMission() {
  return (
    <>
      {/* ===== MISSION STRIP ===== */}
      <section className="border-b border-[#1A232E] bg-[#0D131A]">
        {/* Simple smooth Fade In Up on scroll */}
        <motion.div
          className="mx-auto max-w-6xl px-6 py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionEyebrow>Our Mission</SectionEyebrow>
          <p className="font-display max-w-3xl text-2xl font-medium leading-snug text-[#EDEFF2] sm:text-3xl">
            "Our mission is simple — every home and business deserves a reliable
            security partner, where you get not just cameras, but complete peace
            of mind."
          </p>
          <p className="mt-6 max-w-2xl text-[#9AA4B0]">
            SuperX Technology was built on this idea. We don’t treat CCTV
            installation as just a product sale — we see it as a complete
            security service. From sourcing to installation to after-sales
            support, we take full responsibility for everything.
          </p>
        </motion.div>
      </section>

      {/* ===== OLD WAY vs SUPERX WAY ===== */}
      <section className="border-b border-[#1A232E]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionEyebrow>The Problem We Fixed</SectionEyebrow>
            <h2 className="font-display mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">
              Ignore every problem, with just one solution — SuperX.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 overflow-hidden">
            {/* OLD WAY: Left-to-Right Side Entrance */}
            <motion.div
              className="rounded-lg border border-[#2A1E1E] bg-[#141014] p-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-[#F87171] uppercase">
                  Old Way
                </span>
                <X className="h-4 w-4 text-[#F87171]" />
              </div>
              <ul className="space-y-4 text-sm text-[#9AA4B0]">
                <li className="flex gap-3">
                  <span className="font-mono text-[#F87171]">1</span>
                  Buy a CCTV camera from a random shop — no guarantee of quality.
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-[#F87171]">2</span>
                  Then search for a local technician yourself for installation.
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-[#F87171]">3</span>
                  If something breaks, you have to call multiple people — no clear warranty.
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-[#F87171]">4</span>
                  Constant follow-ups for service — wasting both time and money.
                </li>
              </ul>
            </motion.div>

            {/* SUPERX WAY: Right-to-Left Side Entrance */}
            <motion.div
              className="rounded-lg border border-[#1E2A1E] bg-[#0F1611] p-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-[#4ADE80] uppercase">
                  SuperX Way
                </span>
                <CheckCircle2 className="h-4 w-4 text-[#4ADE80]" />
              </div>
              <ul className="space-y-4 text-sm text-[#C7CDD4]">
                <li className="flex gap-3">
                  <span className="font-mono text-[#4ADE80]">1</span>
                  Get tested, reliable cameras from a single place — carefully selected by us.
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-[#4ADE80]">2</span>
                  Our trained installation team comes to your location and sets everything up.
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-[#4ADE80]">3</span>
                  1-year service warranty — if anything goes wrong, just call SuperX.
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-[#4ADE80]">4</span>
                  One number, one team, full responsibility — from start to finish.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}