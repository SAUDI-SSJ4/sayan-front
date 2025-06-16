import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import SideBar from "./sidebar";
import "./mobileSideBar.css";

function MobileSideBar({ show, setShow, profileData }) {
  // تعريف تأثيرات الحركة
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    exit: { 
      x: "-100%", 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  // إغلاق القائمة عند النقر خارجها
  const handleClose = () => {
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* خلفية معتمة عند فتح القائمة */}
          <motion.div 
            className="mobile-sidebar-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
          />
          
          {/* القائمة الجانبية المتحركة */}
          <motion.div 
            className="mobile-sidebar-container"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mobile-sidebar-header">
              {/* زر إغلاق عصري */}
              <motion.button 
                className="mobile-sidebar-close-btn"
                onClick={handleClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoClose size={24} />
              </motion.button>
            </div>
            
            <div className="mobile-sidebar-body">
              <SideBar mobile setShow={setShow} profileData={profileData} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileSideBar;
