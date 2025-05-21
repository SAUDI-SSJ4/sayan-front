import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./NewOffCanvas.module.scss";

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
            className={classes.backdrop}
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className={classes.offcanvas}
          >
            {/* Header */}
            <div className={classes.logo}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <img src={logo} alt="sayn academy logo" />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={classes.closeButton}
                onClick={onClose}
              >
                <svg
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
              className={classes.navList}
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
                    className={`${classes.navLink} ${
                      location.pathname === link.path ? classes.active : ""
                    }`}
                    onClick={(e) => {
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
              className={classes.userActions}
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