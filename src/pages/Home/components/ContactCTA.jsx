import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';

const ContactCTA = ({ onWhatsAppContact }) => {
  return (
    <section className="py-20 bg-[#070c1a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-2xl mx-auto text-center px-4"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 mb-6">
          <FaWhatsapp className="w-8 h-8 text-[#25D366]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Secure Your Property?</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Get instant pricing and expert consultation. Our team is ready to help you choose the right CCTV system.
        </p>
        <button
          onClick={onWhatsAppContact}
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-black px-10 py-4 rounded-2xl text-base shadow-2xl shadow-green-500/25 cursor-pointer transition-all hover:scale-105"
        >
          <FaWhatsapp className="w-5 h-5" />
          Get Free Consultation
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-slate-500 text-xs mt-4">We typically reply within minutes</p>
      </motion.div>
    </section>
  );
};

export default ContactCTA;
