import React, { useState, useEffect, useRef } from 'react';

const CountUp = ({ end, duration }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCount();
          observer.unobserve(countUpRef.current);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.5, // Adjust as needed
      }
    );

    observer.observe(countUpRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const countUpRef = useRef(null);

  const startCount = () => {
    startTimeRef.current = Date.now();
    const updateCount = () => {
      const now = Date.now();
      const elapsedTime = now - startTimeRef.current;
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        const newValue = Math.floor(progress * end);
        setCurrentValue(newValue);
        requestAnimationFrame(updateCount);
      } else {
        setCurrentValue(end);
      }
    };
    requestAnimationFrame(updateCount);
  };

  // Format end value


  return (
    <span ref={countUpRef}>
      {isVisible && <>{
        currentValue >= 1000 ? `${currentValue ==end ? (currentValue / 1000):(currentValue / 1000).toFixed(1)}K` : currentValue
      }</>}
    </span>
  );
};

export default CountUp;
