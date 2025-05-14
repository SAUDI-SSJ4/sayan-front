import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/hooks/useAuth';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header2 from '../../component/MainPages/Header2/Header2';
import Footer from '../../component/MainPages/Footer/Footer';
import LoginModal from '../../component/UI/LoginModal/LoginModal';
import Style from './CartPage.module.scss';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';

const CartPage = () => {
  const { cartItems, removeFromCart, getCartTotal, loading } = useCart();
  const { user } = useAuth();
  const loginType = Cookies.get("login_type");
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCheckoutClick = () => {
    if (!user || loginType !== 'student') {
      setShowLoginModal(true);
    } else {
      navigate('/student/checkout');
    }
  };

  if (loading) {
    return (
      <>
        <Header2>
          <div className={Style.loadingContainer}>
            <CircularProgress />
            <p>جاري تحميل محتويات السلة...</p>
          </div>
        </Header2>
        <Footer />
      </>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <Header2>
          <div className={Style.emptyCart}>
            <h2>عربة التسوق فارغة</h2>
            <p>لم تقم بإضافة أي دورات إلى عربة التسوق بعد</p>
            <button onClick={() => navigate('/')} className={Style.continueShoppingBtn}>
              تصفح الدورات <ArrowBackIcon />
            </button>
          </div>
        </Header2>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header2>
        <div className={Style.cartPage}>
          <div className={Style.cartHeader}>
            <h1>عربة التسوق</h1>
            <p>{cartItems.length} عناصر في العربة</p>
          </div>

          <div className={Style.cartContent}>
            <div className={Style.cartItems}>
              {cartItems.map((item) => (
                <div key={item.cart_id} className={Style.cartItem}>
                  <div className={Style.itemImage}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={Style.itemInfo}>
                    <h3>{item.title}</h3>
                    <p className={Style.price}>{item.price} ر.س.</p>
                    {item.quantity > 1 && (
                      <p className={Style.quantity}>الكمية: {item.quantity}</p>
                    )}
                  </div>
                  <button
                    className={Style.removeButton}
                    onClick={() => removeFromCart(item.cart_id)}
                  >
                    <DeleteOutlineIcon />
                    حذف
                  </button>
                </div>
              ))}
            </div>

            <div className={Style.cartSummary}>
              <h3>ملخص الطلب</h3>
              <div className={Style.summaryDetails}>
                <div className={Style.summaryRow}>
                  <span>المجموع الفرعي</span>
                  <span>{getCartTotal()} ر.س.</span>
                </div>
                <div className={Style.summaryRow}>
                  <span>الضريبة</span>
                  <span>0 ر.س.</span>
                </div>
                <div className={`${Style.summaryRow} ${Style.total}`}>
                  <span>المجموع الكلي</span>
                  <span>{getCartTotal()} ر.س.</span>
                </div>
              </div>
              <button
                className={Style.checkoutButton}
                onClick={handleCheckoutClick}
              >
                إتمام الشراء
              </button>
              <button
                className={Style.continueShoppingButton}
                onClick={() => navigate('/')}
              >
                متابعة التسوق
              </button>
            </div>
          </div>
        </div>
      </Header2>
      <Footer />
      
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        message="يرجى تسجيل الدخول كطالب للمتابعة إلى الدفع"
      />
    </>
  );
};

export default CartPage;
