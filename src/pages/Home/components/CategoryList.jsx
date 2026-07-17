import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Camera, Cpu, Cable, Shield, Star } from 'lucide-react';

const CATEGORY_ICONS = {
  'IP Camera': Wifi,
  'HD Camera': Camera,
  'DVR / NVR': Cpu,
  'CCTV Wire & Cable': Cable,
  'CP Plus Camera': Shield,
  'Accessories': Star,
};

const CATEGORY_COLORS = {
  'IP Camera': 'from-blue-500 to-cyan-500',
  'HD Camera': 'from-purple-500 to-pink-500',
  'DVR / NVR': 'from-orange-500 to-red-500',
  'CCTV Wire & Cable': 'from-green-500 to-teal-500',
  'CP Plus Camera': 'from-indigo-500 to-violet-500',
  'Accessories': 'from-yellow-500 to-amber-500',
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const CategoryList = ({ activeCategory, onSelectCategory }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {Object.entries(CATEGORY_ICONS).map(([name, Icon]) => (
            <motion.button
              key={name}
              variants={fadeUp}
              onClick={() => onSelectCategory(name)}
              className={`group flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-lg ${
                activeCategory === name
                  ? 'border-blue-500 bg-blue-50 shadow-blue-100 shadow-md'
                  : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${CATEGORY_COLORS[name]} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-gray-700 text-center leading-tight">{name}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryList;
