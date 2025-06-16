import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Popover, IconButton, CircularProgress } from "@mui/material";
import Style from "./CartButton.module.scss";
import { useCart } from "../../../context/CartContext";

const CartButton = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getCartTotal, loading } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const cartItemCount = cartItems.length;

  // تشغيل الأنيميشن عند تغيير محتويات السلة
  useEffect(() => {
    if (cartItems.length > 0) {
      setIsAnimating(true);
      setShowPopup(true);

      // إخفاء النافذة المنبثقة بعد ثانيتين
      const popupTimer = setTimeout(() => {
        setShowPopup(false);
      }, 2000);

      // إعادة تعيين الأنيميشن بعد اكتماله
      const animTimer = setTimeout(() => {
        setIsAnimating(false);
      }, 820); // 820ms تتوافق مع مدة الأنيميشن

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
      <div className={Style.cartButton}>
        <div
          className={`${Style.cartIconWrapper} ${
            isAnimating ? Style.animate : ""
          }`}
          onClick={handleClick}
        >
          <ShoppingCartOutlinedIcon className={Style.cartIcon} />
          {cartItemCount > 0 && (
            <span className={Style.cartCount}>{cartItemCount}</span>
          )}
        </div>

      {showPopup && cartItemCount > 0 && (
        <div className={Style.addedPopup}>تمت الإضافة للسلة</div>
      )}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        classes={{
          paper: Style.popoverPaper,
        }}
        style={{
          zIndex: 10001
        }}
        PaperProps={{
          style: {
            zIndex: 10001
          }
        }}
      >
        <div className={Style.cartPopover}>
          <h3>عربة التسوق</h3>
          {loading ? (
            <div className={Style.loadingContainer}>
              <CircularProgress size={30} />
              <p>جاري التحميل...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <p className={Style.emptyCart}>عربة التسوق فارغة</p>
          ) : (
            <>
              <div className={Style.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.cart_id} className={Style.cartItem}>
                    <img src={item.image} alt={item.title} />
                    <div className={Style.itemInfo}>
                      <h4>{item.title}</h4>
                      <p>{item.price} ر.س.</p>
                      {item.quantity > 1 && (
                        <span className={Style.quantity}>
                          الكمية: {item.quantity}
                        </span>
                      )}
                    </div>
                    <IconButton
                      className={Style.deleteButton}
                      onClick={() => removeFromCart(item.cart_id)}
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
                    navigate("/student/ShoppingCart");
                  }}
                >
                  عرض العربة
                </button>
                <button
                  className={Style.checkoutButton}
                  onClick={() => {
                    handleClose();
                    navigate("/student/Checkout");
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
    </div>
  );
};

export default CartButton;
