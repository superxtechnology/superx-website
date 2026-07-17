import React from "react";
import { PhoneCall, Mail, Wrench, ClipboardCheck } from "lucide-react";
import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";
import {
  SectionEyebrow,
  fadeUp,
  fromLeft,
  fromRight,
  staggerContainer,
  staggerItem,
} from "./SupportShared";

export default function SupportContact() {
  return (
    <>
      {/* ===== CONTACT CHANNELS ===== */}
      <section className="border-b border-[#1A232E] bg-[#0D131A]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {[
              {
                icon: PhoneCall,
                title: "Call Us",
                desc: "Talk directly to our support team.",
                action: "+91 00000 00000",
                href: "tel:+910000000000",
              },
              {
                icon: FaWhatsapp,
                title: "WhatsApp",
                desc: "Send a message, get a quick reply.",
                action: "Chat on WhatsApp",
                href: "https://wa.me/8743011865",
              },
              {
                icon: Mail,
                title: "Email",
                desc: "Write us a detailed query or complaint.",
                action: "support@superxtechnology.com",
                href: "mailto:support@superxtechnology.com",
              },
            ].map(({ icon: Icon, title, desc, action, href }) => (
              <motion.a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="group rounded-lg border border-[#1A232E] bg-[#0B0F14] p-6 transition hover:border-[#4ADE80]/40"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#12181F] text-[#4ADE80] transition group-hover:bg-[#4ADE80]/10">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display mb-1 text-lg font-semibold text-[#EDEFF2]">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#9AA4B0]">
                  {desc}
                </p>
                <p className="mt-3 font-mono text-xs font-medium text-[#4ADE80]">
                  {action} →
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== HOW WARRANTY CLAIM WORKS ===== */}
      <section className="border-b border-[#1A232E]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <SectionEyebrow>Service & Warranty</SectionEyebrow>
            <h2 className="font-display mb-10 text-3xl font-semibold tracking-tight text-[#EDEFF2] sm:text-4xl">
              Filing a warranty claim is easy.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fromLeft}
              className="rounded-lg border border-[#1A232E] bg-[#0D131A] p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#12181F] text-[#4ADE80]">
                <PhoneCall className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <span className="font-mono text-xs text-[#4ADE80]">STEP 1</span>
              <h3 className="font-display mt-1 mb-2 text-lg font-semibold text-[#EDEFF2]">
                Reach Out
              </h3>
              <p className="text-sm leading-relaxed text-[#9AA4B0]">
                Call or WhatsApp us and describe your issue — sharing the
                camera number or installation date helps speed things up.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="rounded-lg border border-[#1A232E] bg-[#0D131A] p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#12181F] text-[#4ADE80]">
                <ClipboardCheck className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <span className="font-mono text-xs text-[#4ADE80]">STEP 2</span>
              <h3 className="font-display mt-1 mb-2 text-lg font-semibold text-[#EDEFF2]">
                Issue Verified
              </h3>
              <p className="text-sm leading-relaxed text-[#9AA4B0]">
                Our team checks the issue and schedules a visit at a time
                convenient for you.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fromRight}
              className="rounded-lg border border-[#1A232E] bg-[#0D131A] p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#12181F] text-[#4ADE80]">
                <Wrench className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <span className="font-mono text-xs text-[#4ADE80]">STEP 3</span>
              <h3 className="font-display mt-1 mb-2 text-lg font-semibold text-[#EDEFF2]">
                Fixed, Free of Cost
              </h3>
              <p className="text-sm leading-relaxed text-[#9AA4B0]">
                A technician visits your home/office and resolves the issue —
                no extra charge during the 1-year warranty period.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}