import React from 'react';
import { useCart } from '../../../context/CartContext';
import classes from './ShoppingCart.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { RemoveShoppingCartRounded, ShoppingCartRounded } from '@mui/icons-material';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CircularProgress from '@mui/material/CircularProgress';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, getCartTotal, loading } = useCart();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return getCartTotal();
  };

  const calculateDiscount = () => {
    // يمكن تحديث هذا بناءً على منطق الخصم الخاص بك
    return 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
        <p>جاري تحميل محتويات السلة...</p>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={classes.emptyCart}>
        <ShoppingCartRounded
          sx={{
            width: '100px',
            height: '100px',
            color: '#888',
            marginBottom: '20px'
          }}
        />
        <h2>عربة التسوق فارغة</h2>
        <p>لم تقم بإضافة أي مواد تعليمية إلى عربة التسوق بعد</p>
        <div 
          className={classes.shopButton}
          onClick={() => navigate('/')}
        >
          تصفح المواد التعليمية
        </div>
      </div>
    );
  }

  return (
    <div className={classes.shoppingCartContainer}>
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="d-flex align-items-center name">
            <div className="icon">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
            </div>
            <div style={{ color: "#7E8799" }}> عربة التسوق </div>
          </div>
        </div>
      </div>

      <div className="pt-0 info-details--1">
        <div className="row gx-3 gy-4">
          <div className="col-lg-8">
            <div className={classes.Card}>
              <h2 className={classes.pageTitle}>عناصر السلة</h2>
              <div className={classes.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.cart_id} className={classes.cartItem}>
                    <div className={classes.itemContent}>
                      <div className={classes.itemInfo}>
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className={classes.productImage} 
                        />
                        <div className={classes.itemDetails}>
                          <h3>{item.title}</h3>
                          <div className={classes.itemPrice}>
                            {item.price === 0 ? "مجاني" : `${item.price} ر.س.`}
                          </div>
                          {item.quantity > 1 && (
                            <p className={classes.itemQuantity}>الكمية: {item.quantity}</p>
                          )}
                        </div>
                      </div>
                      <div className={classes.itemActions}>
                        <button
                          className={classes.deleteButton}
                          onClick={() => removeFromCart(item.cart_id)}
                        >
                          <DeleteIcon />
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className={`${classes.Card} ${classes.cartSummary}`}>
              <h3>ملخص الطلب</h3>
              
              <div className={classes.summaryRow}>
                <span>المجموع الفرعي</span>
                <span>{calculateSubtotal()} ر.س.</span>
              </div>
              
              {calculateDiscount() > 0 && (
                <div className={classes.summaryRow}>
                  <span>الخصم</span>
                  <span>-{calculateDiscount()} ر.س.</span>
                </div>
              )}
              
              <div className={`${classes.summaryRow} ${classes.total}`}>
                <span>المجموع الكلي</span>
                <span>{calculateTotal()} ر.س.</span>
              </div>
              
              <button 
                className={classes.checkoutButton}
                onClick={() => navigate('/student/Checkout')}
              >
                إتمام الشراء
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
