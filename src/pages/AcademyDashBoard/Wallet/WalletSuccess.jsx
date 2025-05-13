import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import successIcon from '../../../assets/icons/success-tick.svg';
import './wallet-success.scss';

const WalletSuccess = () => {
  return (
    <div className="wallet-success-container">
      <div className="success-card">
        <div className="success-icon-container">
          <img src={successIcon} alt="نجاح" className="success-icon" />
        </div>
        <h2 className="success-title">تم تقديم طلب السحب بنجاح</h2>
        <p className="success-message">
          تم استلام طلب سحب الأرباح الخاص بك وسيتم مراجعته من قبل فريق الإدارة.
          سيتم إشعارك عبر البريد الإلكتروني ورقم الجوال عند تغيير حالة الطلب.
        </p>
        <div className="success-note">
          <p>ملاحظة:</p>
          <ul>
            <li>الوقت المتوقع لمعالجة الطلب: 1-3 أيام عمل</li>
            <li>سيتم التحويل للحساب البنكي المرفق في الطلب</li>
          </ul>
        </div>
        <Button 
          as={Link} 
          to="/academy/wallet" 
          variant="primary" 
          className="back-button"
        >
          العودة إلى المحفظة
        </Button>
      </div>
    </div>
  );
};

export default WalletSuccess; 