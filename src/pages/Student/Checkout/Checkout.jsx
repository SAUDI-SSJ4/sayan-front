import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { useNotification } from '../../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import classes from './Checkout.module.scss';
import { TextField, Radio, RadioGroup, FormControlLabel, Alert, Divider } from '@mui/material';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Visa from "../../../assets/icons/payment/visa.svg?react";
import Paypal from "../../../assets/icons/payment/paypal.svg?react";
import Mada from "../../../assets/icons/payment/mada.svg?react";
import ApplePay from "../../../assets/icons/payment/apple-pay.svg?react";
import PaymentSuccess from '../../../components/PaymentSuccess/PaymentSuccess';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [couponCode, setCouponCode] = useState('');
  const [formData, setFormData] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const calculateSubtotal = () => cartItems.reduce((total, item) => total + item.price, 0);
  const calculateDiscount = () => 0; // Update based on your discount logic
  const calculateTotal = () => calculateSubtotal() - calculateDiscount();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (paymentMethod === 'credit') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'رقم البطاقة مطلوب';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'تاريخ الانتهاء مطلوب';
      if (!formData.cvv.trim()) newErrors.cvv = 'رمز CVV مطلوب';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentMethodClick = (method) => {
    setPaymentMethod(method);
    if (validateForm()) {
      processPayment(method);
    }
  };

  const processPayment = (method) => {
    setIsProcessing(true);
    
    // Show processing notification
    showNotification({
      type: 'success',
      title: 'جاري معالجة الدفع',
      message: 'يرجى الانتظار لحظة...',
      duration: 2000
    });

    setTimeout(() => {
      // Show success notification
      showNotification({
        type: 'success',
        title: 'تم الدفع بنجاح!',
        message: `تم إضافة ${cartItems.length} دورة إلى حقيبتك التعليمية`,
        duration: 3000
      });
      
      setShowSuccess(true);
      setIsProcessing(false);
    }, 1500);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearCart();
    
    // Show final success notification in cart page
    navigate('/student/ShoppingCart', { 
      state: { 
        paymentSuccess: true, 
        message: 'تم إضافة الدورات إلى حقيبتك التعليمية بنجاح!' 
      } 
    });
  };

  if (cartItems.length === 0) {
    navigate('/student/ShoppingCart');
    return null;
  }

  return (
    <div>
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="d-flex align-items-center name">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}> الدفع </div>
          </div>
        </div>
      </div>

      <div className="info-details--1 pt-0">
        <div className="row gx-3 gy-4">
          <div className="col-lg-8">
            <div className={classes.Card}>
              <h2>ملخص الطلب والدورات</h2>
              <div className={classes.orderItems}>
                {cartItems.map((item) => (
                  <div key={item.id} className={classes.orderItem}>
                    <img src={item.image} alt={item.title} />
                    <div className={classes.itemDetails}>
                      <h4>{item.title}</h4>
                      <p className={classes.courseSize}>{item.size || 'حجم الدورة غير محدد'}</p>
                      <span>{item.price.toFixed(2)} ر.س.</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={classes.Card}>
              <h2>اختر طريقة الدفع</h2>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className={classes.paymentMethodsGroup}
              >
                {[
                  { value: 'credit', label: 'بطاقة ائتمان', icon: <Visa /> },
                  { value: 'mada', label: 'مدى', icon: <Mada /> },
                  { value: 'paypal', label: 'باي بال', icon: <Paypal /> },
                  { value: 'applePay', label: 'آبل باي', icon: <ApplePay /> },
                ].map(({ value, label, icon }) => (
                  <FormControlLabel 
                    key={value}
                    value={value} 
                    control={<Radio />} 
                    label={
                      <div className={classes.paymentOption}>
                        {icon}
                        <span>{label}</span>
                      </div>
                    }
                    className={`${classes.paymentMethodLabel} ${classes.largerOption}`}
                    disabled={isProcessing}
                  />
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="col-lg-4">
            <div className={classes.Card}>
              <h3 className="mb-3">لديك كوبون خصم؟</h3>
              <div className={classes.Input}>
                <input 
                  type="text" 
                  placeholder="ادخل كود الخصم"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <div onClick={() => {/* Apply coupon logic */}}>تطبيق</div>
              </div>
            </div>

            <div className={`${classes.Card} ${classes.summary}`}>
              {['المجموع', 'الخصم', 'المجموع'].map((label, index) => (
                <div key={label} className={`${classes.summaryRow} ${index === 2 ? classes.total : ''}`}>
                  <p>{label}</p>
                  <p className={index === 1 ? classes.discount : ''}>
                    {(index === 0 ? calculateSubtotal() : 
                      index === 1 ? calculateDiscount() : 
                      calculateTotal()).toFixed(2)} ر.س.
                  </p>
                </div>
              ))}
              <button 
                className={classes.checkoutButton}
                onClick={() => handlePaymentMethodClick(paymentMethod)}
                disabled={isProcessing}
              >
                {isProcessing ? 'جاري المعالجة...' : 'متابعة وشراء'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && <PaymentSuccess onClose={handleSuccessClose} />}
    </div>
  );
};

export default Checkout;
