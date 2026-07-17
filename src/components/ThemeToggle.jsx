import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      className={`relative w-14 h-8 rounded-full border p-1 flex items-center cursor-pointer transition-colors duration-300 select-none shadow-inner ${
        isDark ? 'bg-[#121b36] border-slate-800' : 'bg-[#e2e8f0] border-slate-300'
      }`}
      aria-label="Toggle Display Theme Layer"
    >
      {/* 🛝 THEME TRACK SLIDER ICON COMPONENT */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
        animate={{
          x: isDark ? 24 : 0, // Switch horizontal path track directly
        }}
        className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md border ${
          isDark ? 'bg-[#00c2a8] border-emerald-400/20' : 'bg-white border-slate-200'
        }`}
      >
        {/* 🔄 ICON ROTATION TRACK OVERLAY ENGINE */}
        <motion.div
          key={theme} // Key changes trigger an absolute fresh spin animation on change
          initial={{ rotate: -180, scale: 0.6, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 180, scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={isDark ? "text-[#050b1d]" : "text-amber-500"}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 fill-[#050b1d]" />
          ) : (
            <Sun className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}