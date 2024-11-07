const ProfIleCustomIcon = ({ active }) => {
  return (
    <>
      {active ? (
 <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 28 29" fill="none">
 <circle cx="13.9999" cy="8.98333" r="3.73333" fill="white"/>
 <ellipse opacity="0.5" cx="14.0001" cy="19.249" rx="6.53333" ry="3.73333" fill="white"/>
</svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 28 29" fill="none">
  <circle cx="13.9999" cy="8.98333" r="3.73333" fill="#7E8799"/>
  <ellipse opacity="0.5" cx="14.0001" cy="19.249" rx="6.53333" ry="3.73333" fill="#7E8799"/>
</svg>
      )}
    </>
  );
};

export default ProfIleCustomIcon;
