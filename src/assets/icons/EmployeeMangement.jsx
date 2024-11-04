const EmployeeMangment = ({ active }) => {
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
          <circle opacity="0.5" cx="16.8" cy="9.03438" r="2.8" fill="white" />
          <ellipse
            opacity="0.5"
            cx="17.7331"
            cy="19.3"
            rx="4.66667"
            ry="2.8"
            fill="white"
          />
          <circle cx="11.2021" cy="9.03021" r="3.73333" fill="white" />
          <ellipse
            cx="11.2013"
            cy="19.3036"
            rx="6.53333"
            ry="3.73333"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 28 29"
          fill="none"
        >
          <circle opacity="0.5" cx="16.8" cy="8.65547" r="2.8" fill="#7E8799" />
          <ellipse
            opacity="0.5"
            cx="17.7331"
            cy="18.9211"
            rx="4.66667"
            ry="2.8"
            fill="#7E8799"
          />
          <circle cx="11.2021" cy="8.65521" r="3.73333" fill="#7E8799" />
          <ellipse
            cx="11.2013"
            cy="18.9208"
            rx="6.53333"
            ry="3.73333"
            fill="#7E8799"
          />
        </svg>
      )}
    </>
  );
};

export default EmployeeMangment;
