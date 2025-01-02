import React, { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import classes from './PaymentSuccess.module.scss';

const PaymentSuccess = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={classes.overlay}>
      <div className={classes.content}>
        <CheckCircleIcon />
        <h2>تم الدفع بنجاح!</h2>
        <p>شكراً لك على الطلب. سيتم تحويلك تلقائياً...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
