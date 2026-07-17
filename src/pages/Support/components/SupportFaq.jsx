import React, { useState } from "react";
import { ShieldCheck, PhoneCall, MessageCircle, Clock } from "lucide-react";
import { motion } from "motion/react";
import {
  SectionEyebrow,
  FAQItem,
  FAQS,
  fadeUp,
  staggerContainer,
  staggerItem,
} from "./SupportShared";

export default function SupportFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      {/* ===== FAQ ===== */}
      <section className="border-b border-[#1A232E] bg-[#0D131A]">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <SectionEyebrow>FAQs</SectionEyebrow>
            <h2 className="font-display mb-10 text-3xl font-semibold tracking-tight text-[#EDEFF2] sm:text-4xl">
              Common questions.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="space-y-3"
          >
            {FAQS.map((item, idx) => (
              <motion.div key={item.q} variants={staggerItem}>
                <FAQItem
                  item={item}
                  isOpen={openIndex === idx}
                  onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="grid-overlay"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <ShieldCheck
            className="mx-auto mb-6 h-10 w-10 text-[#4ADE80]"
            strokeWidth={1.5}
          />
          <h2 className="font-display mx-auto max-w-2xl text-3xl font-bold tracking-tight text-[#EDEFF2] sm:text-4xl">
            Still stuck? Talk to a real person.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#9AA4B0]">
            Support team available for calls and WhatsApp, all week.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+910000000000"
              className="inline-flex items-center gap-2 rounded-md bg-[#4ADE80] px-6 py-3 font-medium text-[#0B0F14] transition hover:bg-[#3FC873] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#0B0F14]"
            >
              <PhoneCall className="h-4 w-4" /> Call Support
            </a>
            <a
              href="https://wa.me/8743011865"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[#1A232E] bg-[#0D131A] px-6 py-3 font-medium text-[#EDEFF2] transition hover:border-[#4ADE80]/40 hover:text-[#4ADE80]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
          <p className="mt-6 flex items-center justify-center gap-1 font-mono text-xs text-[#5B6672]">
            <Clock className="h-3 w-3" /> Avg. response time under 30 mins
          </p>
        </div>
      </motion.section>
    </>
  );
}