import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Info, Headphones, UserPlus } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa"; 
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About Us", href: "#about", icon: Info },
    { name: "Support", href: "#support", icon: Headphones },
    {
      name: "WhatsApp",
      href: "https://wa.me/8743011865",
      icon: FaWhatsapp,
      isExternal: true,
    },
  ];

  // 🔥 NAVBAR ENTRY (top se slide + blur feel)
  const navVariant = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // 🔥 LINKS STAGGER
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav
      variants={navVariant}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-14 items-center">

          {/*  LOGO ENTRY */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img src={logo} className="h-10 w-auto" />

            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="text-lg md:text-xl font-bold text-gray-800"
            >
              SuperX Technology
            </motion.span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-6"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    variants={linkVariants}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    href={link.href}
                    target={link.isExternal ? "_blank" : "_self"}
                    rel={link.isExternal ? "noopener noreferrer" : ""}
                    className="group relative py-1 flex items-center gap-2 text-md font-semibold text-gray-700 hover:text-blue-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all hover:after:w-full"
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </motion.a>
                );
              })}
            </motion.div>

            {/* 🔥 BUTTON ANIMATION */}
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-md cursor-pointer "
            >
              <UserPlus className="w-5 h-5" />
              Sign Up
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 MOBILE MENU ANIMATION */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 left-0 w-full bg-white border-b shadow-xl md:hidden"
          >
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="px-4 pt-3 pb-5 space-y-2"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    variants={linkVariants}
                    whileHover={{ x: 5 }}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </motion.a>
                );
              })}

              <motion.button 
                variants={linkVariants}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold mt-2"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
};

export default Navbar;