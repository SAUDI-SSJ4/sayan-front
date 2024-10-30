const CouponIcon = ({ active }) => {
  return (
    <>
      {active ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 28 29"
          fill="none"
        >
          {/* Coupon Base */}
          <rect
            x="4"
            y="8"
            width="20"
            height="16"
            rx="2"
            fill="white"
            stroke="white"
            strokeWidth="1"
          />
          {/* Dotted Line */}
          <line
            x1="4"
            y1="16"
            x2="24"
            y2="16"
            stroke="white"
            strokeDasharray="4,4"
            strokeWidth="1"
          />
          {/* Discount Tag */}
          <polygon points="12,4 16,8 12,12 8,8" fill="white" opacity="0.5" />
          {/* Bottom Line */}
          <rect x="6" y="20" width="16" height="2" fill="white" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 28 29"
          fill="none"
        >
          {/* Coupon Base */}
          <rect
            x="4"
            y="8"
            width="20"
            height="16"
            rx="2"
            fill="#7E8799"
            stroke="#7E8799"
            strokeWidth="1"
          />
          {/* Dotted Line */}
          <line
            x1="4"
            y1="16"
            x2="24"
            y2="16"
            stroke="#7E8799"
            strokeDasharray="4,4"
            strokeWidth="1"
          />
          {/* Discount Tag */}
          <polygon points="12,4 16,8 12,12 8,8" fill="#7E8799" opacity="0.5" />
          {/* Bottom Line */}
          <rect x="6" y="20" width="16" height="2" fill="#7E8799" />
        </svg>
      )}
    </>
  );
};

export default CouponIcon;
