import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Phone, Star } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const WhyChoose = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-black text-gray-900 mb-3">Why Choose SuperX Technology?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Delhi's most trusted CCTV installation and security solutions company</p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Shield,
              color: 'from-blue-500 to-indigo-500',
              title: 'Premium Quality',
              desc: 'Only branded CCTV equipment — CP Plus, Hikvision, Dahua and more trusted manufacturers.',
            },
            {
              icon: Phone,
              color: 'from-green-500 to-teal-500',
              title: '24/7 Support',
              desc: 'Round-the-clock technical support via WhatsApp. We are always just a message away.',
            },
            {
              icon: Star,
              color: 'from-orange-500 to-amber-500',
              title: '1 Year Warranty',
              desc: 'All installations come with a 1-year service warranty for complete peace of mind.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
