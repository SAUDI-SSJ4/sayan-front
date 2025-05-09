import React from 'react';
import { useCart } from '../../../context/CartContext';
import classes from './ShoppingCart.module.scss';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { RemoveShoppingCartRounded, ShoppingCartRounded } from '@mui/icons-material';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  console.log(cartItems)

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const calculateDiscount = () => {
    // This can be updated based on your discount logic
    return 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  if (cartItems.length === 0) {
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
    <div>
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
              {cartItems.map((item) => (
                <div key={item.id} className={classes.cartItem}>
                  <div className={classes.itemContent}>
                    <div className={classes.itemInfo}>
                      <img src={item.image} alt={item.title} className={classes.productImage} />
                      <div className={classes.itemDetails}>
                        <h3>{item.title}</h3>
                      </div>
                    </div>
                    
                    <div className={classes.itemPrice}>
                      {item.price.toFixed(2)} ر.س.
                    </div>
                  </div>

                  <div className={classes.itemActions}>
                    <button
                      className={classes.actionButton}
                      onClick={() => {/* Add to favorites logic */}}
                    >
                      <FavoriteIcon /> اضافة الى قائمة المفضلة
                    </button>
                    <button
                      className={`${classes.actionButton} ${classes.removeButton}`}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteIcon /> ازالة
                    </button>
                  </div>
                </div>
              ))}

              <div className={classes.clearCart}>
                <button
                  className={classes.clearButton}
                  onClick={clearCart}
                >
                  ازالة الكل
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className={classes.Card}>
              <h3 className="mb-3">لديك كوبون خصم؟</h3>
              <div className={classes.Input}>
                <input type="text" placeholder="ادخل كود الخصم" />
                <div>تطبيق</div>
              </div>
            </div>

            <div className={`${classes.Card} ${classes.summary}`}>
              <div className={classes.summaryRow}>
                <p>المجموع</p>
                <p>{calculateSubtotal().toFixed(2)} ر.س.</p>
              </div>
              <div className={classes.summaryRow}>
                <p>الخصم</p>
                <p className={classes.discount}>{calculateDiscount().toFixed(2)} ر.س.</p>
              </div>
              <div className={`${classes.summaryRow} ${classes.total}`}>
                <h3>المجموع</h3>
                <h3>{calculateTotal().toFixed(2)} ر.س.</h3>
              </div>
              <button 
                className={classes.checkoutButton}
                onClick={() => navigate('/student/checkout')}
              >
                متابعة وشراء
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
