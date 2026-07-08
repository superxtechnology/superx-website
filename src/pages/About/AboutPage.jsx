import React, { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Camera,
  Wrench,
  Clock,
  PhoneCall,
  CheckCircle2,
  X,
  Radio,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

const FONT_LINK_ID = "superx-fonts";

const useInjectFonts = () => {
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

const StatusDot = ({ label = "LIVE" }) => (
  <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest text-[#4ADE80]">
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
    </span>
    {label}
  </span>
);

const RadarSweep = () => (
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

const SectionEyebrow = ({ children }) => (
  <div className="mb-4 flex items-center gap-3">
    <span className="h-px w-8 bg-[#4ADE80]" />
    <span className="font-mono text-xs tracking-[0.25em] text-[#4ADE80] uppercase">
      {children}
    </span>
  </div>
);

export default function AboutPage() {
  useInjectFonts();
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
    <div
      className="min-h-screen w-full bg-[#0B0F14] text-[#EDEFF2] selection:bg-[#4ADE80] selection:text-[#0B0F14]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .grid-overlay {
          background-image:
            linear-gradient(to right, #131A22 1px, transparent 1px),
            linear-gradient(to bottom, #131A22 1px, transparent 1px);
          background-size: 48px 48px;
        }
      `}</style>

      <Navbar />

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

      <Footer />
    </div>
  );
}