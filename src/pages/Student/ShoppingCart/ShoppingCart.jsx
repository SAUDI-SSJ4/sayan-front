import React from 'react';
import { useCart } from '../../../context/CartContext';
import classes from './ShoppingCart.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { RemoveShoppingCartRounded, ShoppingCartRounded } from '@mui/icons-material';
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
        <p>لم تقم بإضافة أي منتجات إلى عربة التسوق بعد</p>
        <div 
          className={classes.shopButton}
          onClick={() => navigate('/student/Products')}
        >
          تصفح المنتجات
        </div>
      </div>
    );
  }

  return (
    <div className={classes.shoppingCartContainer}>
      <h2 className={classes.pageTitle}>سلة التسوق</h2>
      
      <div className={classes.cartContent}>
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
                    <p className={classes.itemPrice}>{item.price} ر.س.</p>
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
        
        <div className={classes.cartSummary}>
          <div className={classes.Card}>
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
          
          <div className={classes.Card}>
            <h3>هل لديك كود خصم؟</h3>
            <div className={classes.Input}>
              <input type="text" placeholder="أدخل كود الخصم" />
              <div>تطبيق</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
