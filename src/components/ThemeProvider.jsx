import React from 'react';

// مكون Theme Provider بسيط بدون Material-UI
const CustomThemeProvider = ({ children }) => {
  // إضافة RTL CSS variables
  React.useEffect(() => {
    document.documentElement.style.setProperty('--mui-direction', 'rtl');
    document.documentElement.dir = 'rtl';
  }, []);

  return (
    <div style={{ 
      direction: 'rtl',
    }}>
      {children}
    </div>
  );
};

export default CustomThemeProvider; 