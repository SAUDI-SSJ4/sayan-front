import React, { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import classes from './Notification.module.scss';

const Notification = ({ 
  type = 'success',
  title,
  message,
  onClose,
  autoClose = true,
  duration = 3000
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  return (
    <div className={`${classes.notification} ${classes[type]}`}>
      {type === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
      <div className={classes.content}>
        <h4>{title}</h4>
        {message && <p>{message}</p>}
      </div>
      <button className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default Notification;
