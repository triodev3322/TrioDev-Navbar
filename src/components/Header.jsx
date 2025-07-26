import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaBars, FaTimes } from 'react-icons/fa';

const navLinks = ['Services', 'Work', 'Process', 'Contact'];

const scrollToSection = (id) => {
  const el = document.getElementById(id.toLowerCase());
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Header() {
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const evaluateCollapsed = () => {
      const heroHeight = document.getElementById('hero')?.offsetHeight || 300;
      setCollapsed(window.scrollY > heroHeight - 80);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      evaluateCollapsed();
    };

    window.addEventListener('scroll', evaluateCollapsed);
    window.addEventListener('resize', handleResize);
    evaluateCollapsed();

    return () => {
      window.removeEventListener('scroll', evaluateCollapsed);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("triodev226@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavClick = (link) => {
    setActive(link);
    scrollToSection(link);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.div
        className="fixed top-4 z-[999] w-full flex justify-center items-start px-4 pointer-events-none"
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className={`bg-black text-white pointer-events-auto relative transition-all duration-700 overflow-hidden flex items-center 
          ${collapsed && !isMobile
              ? 'w-[60px] h-[60px] rounded-full justify-center'
              : 'rounded-full px-6 py-4 w-full max-w-6xl justify-between'
            }`}
          layout
          style={{ background: 'rgba(0,0,0)' }}
        >
          <button
            onClick={() => {
              if (!isMobile) {
                setCollapsed(!collapsed);
              }
            }}
            className="bg-white shadow-md border border-gray-300 p-2 rounded-full w-12 h-12 flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <img
              src="/logo.png"
              alt="logo"
              className="w-12 h-12 object-contain"
            />
          </button>


          <AnimatePresence>
            {!collapsed && !isMobile && (
              <motion.div
                className="hidden md:flex gap-16 ml-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {navLinks.map((link, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleNavClick(link)}
                    className={`cursor-pointer ${active === link ? 'font-bold' : 'font-normal'}`}
                    whileHover={{ y: -3 }}
                    animate={{ y: active === link ? 6 : 0, scale: active === link ? 1.08 : 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                  >
                    {link}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!collapsed && !isMobile && (
              <motion.button
                onClick={handleCopyEmail}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white text-black px-4 py-2 rounded-full font-medium border shadow-inner hidden md:block hover:bg-gray-200 transition-all duration-300"
              >
                {copied ? "Copied!" : "triodev226@gmail.com"}
              </motion.button>
            )}
          </AnimatePresence>

          {isMobile && !mobileOpen && (
            <button
              onClick={() => setMobileOpen(true)}
              className="bg-white text-black p-3 rounded-full ml-auto md:hidden"
            >
              <FaBars size={20} />
            </button>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen bg-black text-white flex flex-col px-6 md:hidden z-[1000] pointer-events-auto"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="w-full flex items-center justify-between py-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="bg-white text-black p-2 rounded-full w-12 h-12 flex items-center justify-center border border-gray-300 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-12 h-12 object-contain"
                />
              </button>


              <button
                onClick={() => setMobileOpen(false)}
                className="text-white bg-white/10 hover:bg-white/20 p-3 rounded-full"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-4">
              {navLinks.map((link, i) => (
                <button
                  key={i}
                  onClick={() => handleNavClick(link)}
                  className="text-xl font-semibold hover:underline w-full text-center"
                >
                  {link}
                </button>
              ))}

              <button
                onClick={handleCopyEmail}
                className="mt-6 bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition"
              >
                {copied ? "Copied!" : "triodev226@gmail.com"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}