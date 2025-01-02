import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Popover, IconButton } from '@mui/material';
import Style from './CartButton.module.scss';
import { useCart } from '../../../context/CartContext';

const CartButton = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const cartItemCount = cartItems.length;

  // Watch for changes in cart items to trigger animation
  useEffect(() => {
    if (cartItems.length > 0) {
      setIsAnimating(true);
      setShowPopup(true);
      
      // Hide popup after 2 seconds
      const popupTimer = setTimeout(() => {
        setShowPopup(false);
      }, 2000);

      // Reset animation after it completes
      const animTimer = setTimeout(() => {
        setIsAnimating(false);
      }, 820); // 820ms matches the animation duration

      return () => {
        clearTimeout(popupTimer);
        clearTimeout(animTimer);
      };
    }
  }, [cartItems.length]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={Style.cartButtonContainer}>
      {showPopup && cartItems.length > 0 && (
        <div className={Style.addedPopup}>
          تم إضافة الدورة إلى السلة
        </div>
      )}
      <IconButton 
        className={`${Style.cartButton} ${isAnimating ? Style.bump : ''}`}
        onClick={handleClick}
        color="primary"
      >
        <div className={Style.cartIcon}>
          <ShoppingCartOutlinedIcon />
          {cartItemCount > 0 && (
            <span className={Style.badge}>{cartItemCount}</span>
          )}
        </div>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{
          paper: Style.popoverPaper
        }}
      >
        <div className={Style.cartPopover}>
          <h3>عربة التسوق</h3>
          {cartItems.length === 0 ? (
            <p className={Style.emptyCart}>عربة التسوق فارغة</p>
          ) : (
            <>
              <div className={Style.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.id} className={Style.cartItem}>
                    <img src={item.image} alt={item.title} />
                    <div className={Style.itemInfo}>
                      <h4>{item.title}</h4>
                      <p>{item.price} ر.س.</p>
                    </div>
                    <IconButton
                      className={Style.deleteButton}
                      onClick={() => removeFromCart(item.id)}
                      size="small"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
              <div className={Style.cartFooter}>
                <div className={Style.total}>
                  <span>المجموع:</span>
                  <span>{getCartTotal()} ر.س.</span>
                </div>
                <button
                  className={Style.viewCartButton}
                  onClick={() => {
                    handleClose();
                    navigate('/cart');
                  }}
                >
                  عرض العربة
                </button>
                <button
                  className={Style.checkoutButton}
                  onClick={() => {
                    handleClose();
                    navigate('/checkout');
                  }}
                >
                  إتمام الشراء
                </button>
              </div>
            </>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default CartButton;
