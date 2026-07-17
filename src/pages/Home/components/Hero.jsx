import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ArrowRight, ChevronDown } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Hero = ({ onBrowseProducts, onWhatsAppContact }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#070c1a]">
      {/* Animated background blobs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
        >
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" />
          Delhi's Trusted CCTV Security Solutions
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6"
        >
          Secure Your World
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            With Next-Gen CCTV
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Premium IP cameras, HD surveillance systems, DVRs, and professional security setups — 
          trusted by homes and businesses across Delhi NCR.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onBrowseProducts}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-2xl text-sm shadow-xl shadow-blue-600/30 cursor-pointer transition-all hover:shadow-blue-600/50 hover:scale-105"
          >
            <Camera className="w-5 h-5" />
            Browse Products
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onWhatsAppContact}
            className="flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-bold px-8 py-4 rounded-2xl text-sm cursor-pointer transition-all hover:bg-[#25D366]/20 hover:scale-105"
          >
            <FaWhatsapp className="w-5 h-5" />
            Chat on WhatsApp
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mt-16 pt-16 border-t border-white/5"
        >
          {[
            { number: '500+', label: 'Installations Done' },
            { number: '5+', label: 'Years Experience' },
            { number: '100%', label: 'Client Satisfaction' },
            { number: '24/7', label: 'Support Available' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-white">{stat.number}</div>
              <div className="text-slate-400 text-xs font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

export default Hero;
