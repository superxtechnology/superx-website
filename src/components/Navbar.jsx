import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Info, Headphones, Package } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/#products", icon: Package },
    { name: "About Us", href: "/about", icon: Info },
    { name: "Support", href: "/support", icon: Headphones },
    {
      name: "WhatsApp",
      href: "https://wa.me/918743011865",
      icon: FaWhatsapp,
      isExternal: true,
    },
  ];

  const navVariant = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.nav
        variants={navVariant}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">

            {/* LOGO */}
            <motion.a
              href="/"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <img src={logo} className="h-10 w-auto" alt="SuperX Logo" />
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-lg md:text-xl hover:text-blue-600 font-bold text-gray-800"
              >
                SuperX Technology
              </motion.span>
            </motion.a>

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
                      className={`group relative py-1 flex items-center gap-2 text-md font-semibold text-gray-700 hover:text-blue-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all hover:after:w-full ${
                        link.name === 'WhatsApp' ? 'text-green-600 hover:text-green-700' : ''
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {link.name}
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
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
                      target={link.isExternal ? "_blank" : "_self"}
                      rel={link.isExternal ? "noopener noreferrer" : ""}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 ${
                        link.name === 'WhatsApp' ? 'text-green-600' : ''
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.name}
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;