import React, { useEffect, useState, useRef } from "react";
import MainHeader from "../../../../component/MainPages/Header/Header";
import Style from "../home.module.scss";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSlider } from "../../../../utils/apis/client/academy";
import { isObject } from "../../../../utils/helpers";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiPlay } from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";

export const HomeMainHeader = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { data: slider = [] } = useQuery({
    queryKey: ["slider"],
    queryFn: () => getSlider(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });

  const title = isObject(slider) ? slider.title : "تعليم يفتح آفاق المستقبل";
  const content = isObject(slider) ? slider.content : "نعمل لبناء وتقديم أفضل تجربة تعليمية، سيان هي مستقبل التعليم.";
  const image = isObject(slider) ? slider.image : "../../../../assets/images/MainHomeBanner.png";

  return (
    <MainHeader>
      <div className={Style.HeroWrapper} ref={heroRef}>
        {/* Decorative shapes */}
        <div className={Style.ShapesContainer}>
          <div className={`${Style.Shape} ${Style.ShapeBlue}`}></div>
          <div className={`${Style.Shape} ${Style.ShapeYellow}`}></div>
          <div className={`${Style.Shape} ${Style.ShapePurple}`}></div>
        </div>

        <div className={`${Style.Container} container-header pt-lg-5`}>
          <div className="row align-items-center min-vh-80">
            <motion.div 
              className="col-lg-6 col-12 position-relative z-index-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className={`${Style.BannerText}`}
                style={{ opacity }}
              >
                {/* Badge */}
                <motion.div 
                  className={Style.Badge}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span className={Style.BadgeIcon}><HiOutlineAcademicCap /></span>
                  <span className={Style.BadgeText}>منصة تعليمية متكاملة</span>
                </motion.div>

                {/* Main Title with Character Animation */}
                <h1 className={Style.HeroTitle}>
                  {title.split('').map((char, index) => (
                    <motion.span 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.02, duration: 0.5 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </h1>

                {/* Description */}
                <motion.p 
                  className={Style.HeroDescription}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {content}
                </motion.p>

                {/* Stats */}
                <motion.div 
                  className={Style.Stats}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <div className={Style.StatItem}>
                    <span className={Style.StatNumber}>10K+</span>
                    <span className={Style.StatLabel}>طالب</span>
                  </div>
                  <div className={Style.StatDivider}></div>
                  <div className={Style.StatItem}>
                    <span className={Style.StatNumber}>200+</span>
                    <span className={Style.StatLabel}>دورة تدريبية</span>
                  </div>
                  <div className={Style.StatDivider}></div>
                  <div className={Style.StatItem}>
                    <span className={Style.StatNumber}>50+</span>
                    <span className={Style.StatLabel}>مدرب متميز</span>
                  </div>
                </motion.div>

                {/* Buttons */}
                <motion.div 
                  className={Style.ButtonsContainer}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <motion.button 
                    className={Style.PrimaryButton}
                    onClick={() => navigate("/signin")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>انضم الآن</span>
                    <FiArrowLeft className={Style.ButtonIcon} />
                  </motion.button>
                  
                  <motion.button 
                    className={Style.SecondaryButton}
                    onClick={() => setShowVideo(true)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={Style.PlayIconWrapper}>
                      <FiPlay className={Style.PlayIcon} />
                    </div>
                    <span>شاهد الفيديو</span>
                  </motion.button>
                </motion.div>

                {/* Social Proof */}
                <motion.div 
                  className={Style.SocialProof}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className={Style.UserAvatars}>
                    <div className={Style.UserAvatar} style={{ backgroundImage: "url('https://i.pravatar.cc/150?img=1')" }}></div>
                    <div className={Style.UserAvatar} style={{ backgroundImage: "url('https://i.pravatar.cc/150?img=2')" }}></div>
                    <div className={Style.UserAvatar} style={{ backgroundImage: "url('https://i.pravatar.cc/150?img=3')" }}></div>
                    <div className={Style.UserAvatar} style={{ backgroundImage: "url('https://i.pravatar.cc/150?img=4')" }}></div>
                    <div className={Style.UserAvatarCount}>
                      <IoIosPeople />
                      <span>+2K</span>
                    </div>
                  </div>
                  <div className={Style.ReviewStars}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <motion.svg 
                        key={star}
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="#FFD700" 
                        xmlns="http://www.w3.org/2000/svg"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + star * 0.1, duration: 0.4 }}
                      >
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </motion.svg>
                    ))}
                    <span className={Style.Rating}>4.9</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Image Section */}
            <motion.div 
              className="col-lg-6 col-12 position-relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className={Style.ImageContainer}>
                <motion.div 
                  className={Style.GradientCircle}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                ></motion.div>
                
                <motion.div 
                  className={Style.ImageWrapper}
                  style={{ 
                    scale: imageScale,
                    y
                  }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    className={Style.HeroImage}
                    src={image}
                    alt="طلاب يتعلمون على منصة سيان"
                  />
                  
                  {/* Highlight icons */}
                  <motion.div 
                    className={`${Style.FeatureHighlight} ${Style.FeatureHighlight1}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    <div className={Style.FeatureIcon}>🎓</div>
                    <div className={Style.FeatureText}>شهادات معتمدة</div>
                  </motion.div>
                  
                  <motion.div 
                    className={`${Style.FeatureHighlight} ${Style.FeatureHighlight2}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  >
                    <div className={Style.FeatureIcon}>🚀</div>
                    <div className={Style.FeatureText}>تعلم سريع</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {showVideo && (
            <motion.div 
              className={Style.VideoModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className={Style.VideoModalContent}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <button 
                  className={Style.CloseButton}
                  onClick={() => setShowVideo(false)}
                >
                  &times;
                </button>
                <div className={Style.VideoContainer}>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                    title="منصة سيان التعليمية" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainHeader>
  );
};