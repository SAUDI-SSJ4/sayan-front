import React from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Style from './LoginModal.module.scss';

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className={Style.modalOverlay}>
      <div className={Style.modal}>
        <button className={Style.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
        
        <div className={Style.modalContent}>
          <h2>تسجيل الدخول مطلوب</h2>
          <p>يجب عليك تسجيل الدخول كطالب للمتابعة إلى الدفع</p>
          
          <div className={Style.buttons}>
            <button 
              className={Style.loginButton}
              onClick={() => navigate('/login', { state: { from: '/cart' } })}
            >
              تسجيل الدخول
            </button>
            <button 
              className={Style.registerButton}
              onClick={() => navigate('/student/signin')}
            >
              إنشاء حساب جديد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
