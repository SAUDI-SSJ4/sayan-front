const ProductIcon = ({ active }) => {
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
          {/* Box Base */}
          <rect
            x="6"
            y="8"
            width="16"
            height="16"
            rx="2"
            fill="white"
            stroke="white"
            strokeWidth="1"
          />
          {/* Tag */}
          <polygon points="20,4 24,8 20,12 16,8" fill="white" opacity="0.5" />
          {/* Top Line */}
          <rect x="8" y="4" width="12" height="2" fill="white" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 28 29"
          fill="none"
        >
          {/* Box Base */}
          <rect
            x="6"
            y="8"
            width="16"
            height="16"
            rx="2"
            fill="#7E8799"
            stroke="#7E8799"
            strokeWidth="1"
          />
          {/* Tag */}
          <polygon points="20,4 24,8 20,12 16,8" fill="#7E8799" opacity="0.5" />
          {/* Top Line */}
          <rect x="8" y="4" width="12" height="2" fill="#7E8799" />
        </svg>
      )}
    </>
  );
};

export default ProductIcon;
