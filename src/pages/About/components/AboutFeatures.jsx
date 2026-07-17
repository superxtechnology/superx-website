import React from "react";
import { Camera, Wrench, Clock, PhoneCall, Radio, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { SectionEyebrow } from "./AboutShared";

export default function AboutFeatures() {
  return (
    <>
      {/* ===== WHAT WE DO ===== */}
      <section className="border-b border-[#1A232E] bg-[#0D131A]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionEyebrow>What We Do</SectionEyebrow>
            <h2 className="font-display mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything in-house — from sales to support.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: Camera,
                title: "Sourcing & Sales",
                desc: "We recommend the right CCTV setup based on your space and budget — whether it's a home, shop, or office.",
              },
              {
                icon: Wrench,
                title: "Professional Installation",
                desc: "Our trained technician team handles everything from wiring to setup — no third-party mechanics involved.",
              },
              {
                icon: Clock,
                title: "1-Year Service Warranty",
                desc: "Our support doesn’t stop after installation. Any technical issue within one year is our responsibility.",
              },
            ].map(({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                className="group rounded-lg border border-[#1A232E] bg-[#0B0F14] p-6 transition hover:border-[#4ADE80]/40"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#12181F] text-[#4ADE80] transition group-hover:bg-[#4ADE80]/10">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display mb-2 text-lg font-semibold">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#9AA4B0]">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATUS / STATS STRIP ===== */}
      <section className="border-b border-[#1A232E]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex items-center gap-2 mb-8">
            <Radio className="h-4 w-4 text-[#4ADE80]" />
            <span className="font-mono text-xs tracking-widest text-[#5B6672] uppercase">
              Why Choose SuperX
            </span>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              ["1", "Point of Contact"],
              ["12", "Months Warranty"],
              ["100%", "In-House Team"],
              ["0", "Third-Party Mechanics"],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className="font-display text-3xl font-bold text-[#EDEFF2] sm:text-4xl">
                  {value}
                </div>
                <div className="mt-1 font-mono text-xs text-[#5B6672] uppercase tracking-wide">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="contact" className="grid-overlay">
        <motion.div
          className="mx-auto max-w-6xl px-6 py-20 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ShieldCheck
            className="mx-auto mb-6 h-10 w-10 text-[#4ADE80]"
            strokeWidth={1.5}
          />
          <h2 className="font-display mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Your security is now SuperX’s responsibility.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#9AA4B0]">
            Just make one call — we handle everything, from cameras to a full
            year of service.
          </p>
          <a
            href="tel:+910000000000"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#4ADE80] px-6 py-3 font-medium text-[#0B0F14] transition hover:bg-[#3FC873] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#0B0F14]"
          >
            <PhoneCall className="h-4 w-4" /> Contact SuperX
          </a>
        </motion.div>
      </section>
    </>
  );
}