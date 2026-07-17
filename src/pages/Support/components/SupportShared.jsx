import React, { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

export const SectionEyebrow = ({ children }) => (
  <div className="mb-4 flex items-center gap-3">
    <span className="h-px w-8 bg-[#4ADE80]" />
    <span className="font-mono text-xs tracking-[0.25em] text-[#4ADE80] uppercase">
      {children}
    </span>
  </div>
);

// ===== Animation variants =====
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const fromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ===== FAQ item component (dark theme) =====
export const FAQItem = ({ item, isOpen, onClick }) => (
  <div className="rounded-lg border border-[#1A232E] bg-[#0D131A]">
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
    >
      <span className="font-medium text-[#EDEFF2]">{item.q}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="shrink-0 text-[#5B6672]"
      >
        <ChevronDown className="h-4 w-4" />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="px-5 pb-4 text-sm leading-relaxed text-[#9AA4B0]">
            {item.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ===== FAQ data (translated to English) =====
export const FAQS = [
  {
    q: "How long does installation take?",
    a: "For most homes and shops, installation is completed the same day or the next day after the site survey. Larger commercial setups may take 2-3 days.",
  },
  {
    q: "What does the 1-year service warranty cover?",
    a: "Any technical issue after installation — camera malfunction, wiring problems, DVR/NVR issues — is our responsibility, at no extra charge, for a full year.",
  },
  {
    q: "What should I do if a camera stops working?",
    a: "Just call or WhatsApp us. Our technician team will schedule a visit to your location and resolve the issue.",
  },
  {
    q: "Can an existing CCTV setup be upgraded?",
    a: "Yes, we assess your existing setup and advise on the right upgrades — new cameras, better storage, or adding remote viewing.",
  },
  {
    q: "Is support available after the warranty period ends?",
    a: "Absolutely. Even after the warranty period, we offer paid service and maintenance plans — just get in touch with us.",
  },
];