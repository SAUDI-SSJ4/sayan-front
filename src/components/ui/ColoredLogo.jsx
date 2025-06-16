import React from 'react';

const ColoredLogo = ({ width = 120, height = 50, className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 200 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle cx="35" cy="40" r="30" fill="url(#gradient1)" />
        
        {/* Book icon inside circle */}
        <path 
          d="M22 30h6v20h-6v-20zm8 0h6v20h-6v-20zm8 2h6v16h-6v-16z" 
          fill="white" 
          opacity="0.9"
        />
        <path 
          d="M20 28h20v2h-20v-2zm0 22h20v2h-20v-2z" 
          fill="white" 
          opacity="0.9"
        />
        
        {/* Text "سيان" */}
        <text 
          x="75" 
          y="35" 
          fontSize="24" 
          fontWeight="bold" 
          fill="url(#gradient2)"
        >
          سيان
        </text>
        
        {/* Subtitle */}
        <text 
          x="75" 
          y="52" 
          fontSize="12" 
          fill="#64748b"
        >
          منصة التعليم الذكية
        </text>
        
        {/* Decorative elements */}
        <circle cx="160" cy="25" r="3" fill="#3b82f6" opacity="0.6" />
        <circle cx="170" cy="35" r="2" fill="#8b5cf6" opacity="0.6" />
        <circle cx="165" cy="45" r="2.5" fill="#06b6d4" opacity="0.6" />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ColoredLogo; 