import React from "react";
import { motion } from "framer-motion";
import { Home, Info, Headphones, MapPin, Mail, Phone } from "lucide-react";
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About Us", href: "#about", icon: Info },
    { name: "Support", href: "#support", icon: Headphones },
    {
      name: "WhatsApp",
      href: "https://wa.me/918743011865",
      icon: FaWhatsapp,
      isExternal: true,
    },
  ];

  const socials = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/superx.technology?igsh=MWVqczFpY2tmY3Zsbw==",
      icon: FaInstagram,
      brandColor:
        "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/superxtechnology/",
      icon: FaLinkedinIn,
      brandColor: "bg-[#0077b5] text-white",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@superxtechnology1?si=GKVqSZbWOGI3Xs67",
      icon: FaYoutube,
      brandColor: "bg-[#ff0000] text-white",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/918743011865",
      icon: FaWhatsapp,
      brandColor: "bg-[#22c55e] text-white",
    },
  ];

  // 🔥 COMMON ANIMATION VARIANTS
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="bg-[#0f172a] text-slate-300 border-t border-slate-800/60 pt-16 pb-8">
      {/* 🔥 MAIN GRID WITH STAGGER */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10"
      >
        {/* LEFT → RIGHT */}
        <motion.div variants={fadeLeft} className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={logo} className="h-10" />
            <span className="text-2xl font-bold text-white">
              SuperX Technology
            </span>
          </div>
          <p className="text-slate-400 text-md leading-relaxed">
            Your trusted security automation partner. Providing high-end CCTV
            setups with 1-year service warranty.
          </p>
        </motion.div>

        {/* BOTTOM → UP */}
        <motion.div variants={fadeUp} className="space-y-4">
          <h4 className="text-lg font-bold text-white">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.li
                  key={link.name}
                  variants={fadeUp}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={link.href}
                    className="flex text-md items-center gap-2 text-slate-400 hover:text-blue-400"
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        {/* SCALE + FADE */}
        <motion.div variants={fadeUp} className="space-y-4">
          <h4 className="text-lg font-bold text-white">Follow Us</h4>
          <div className="flex gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  target="_blank"
                  key={social.name}
                  href={social.href}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${social.brandColor}`}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT → LEFT */}
        <motion.div variants={fadeRight} className="space-y-4">
          <h4 className="text-lg font-bold text-white">Contact Info</h4>
          <ul className="space-y-3 text-md text-slate-400">
            <motion.li variants={fadeUp} className="flex gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span>New Delhi, India</span>
            </motion.li>

            <motion.li variants={fadeUp} className="flex gap-2">
              <Phone className="w-5 h-5 text-blue-500" />
              <span>+91 8743011865</span>
            </motion.li>

            <motion.li variants={fadeUp} className="flex gap-2">
              <Mail className="w-5 h-5 text-blue-500" />
              <span>superxtechnology2@gmail.com</span>
            </motion.li>
          </ul>
        </motion.div>
      </motion.div>

      {/* BOTTOM FADE */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm text-slate-500 mt-10"
      >
        © {currentYear} SuperX Technology. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
