import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./NavBar.module.scss";

const NewOffCanvas = ({ show, onClose, logo, links, renderUserButtons, renderUserButtonsMobile }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  // Optimize resize listener with useCallback
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 991);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            style={{ zIndex: 9998 }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 right-0 h-screen p-6 overflow-y-auto bg-white w-80 shadow-2xl"
            style={{ zIndex: 9999 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="logo px-2"
              >
                <img src={logo} alt="sayn academy logo" className="max-h-12" />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="m1 1 12 12M1 13 13 1" />
                </svg>
              </motion.button>
            </div>

            {/* Navigation Links */}
            <motion.ul 
              className="space-y-3"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1 }
                },
                closed: {}
              }}
            >
              {links.map((link, index) => (
                <motion.li
                  key={index}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: 50 }
                  }}
                >
                  <a
                    href={link.path}
                    className={`block py-3 px-4 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 ${
                      location.pathname === link.path
                        ? "bg-blue-100 text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      link.onClick(e, link.path);
                      onClose();
                    }}
                  >
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            {/* User Actions */}
            <motion.div 
              className="mt-8 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {isMobile ? renderUserButtonsMobile() : renderUserButtons()}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(NewOffCanvas);