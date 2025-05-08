import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { useNotification } from "../../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import classes from "./Checkout.module.scss";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Visa from "../../../assets/icons/payment/visa.svg?react";
import Paypal from "../../../assets/icons/payment/paypal.svg?react";
import Mada from "../../../assets/icons/payment/mada.svg?react";
import ApplePay from "../../../assets/icons/payment/apple-pay.svg?react";
import axios from "axios";
import Cookies from "js-cookie";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [couponCode, setCouponCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // حساب إجماليات الطلب
  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price, 0);
  const calculateTax = () => calculateSubtotal() * 0.15;
  const calculateTotal = () =>
    calculateSubtotal() + calculateTax() - discountAmount;

  useEffect(() => {
    // التأكد من وجود عناصر في السلة
    if (cartItems.length === 0) {
      navigate("/student/ShoppingCart");
    }
  }, [cartItems, navigate]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      setIsProcessing(true);
      setError("");

      // استدعاء API للتحقق من الكوبون
      const response = await axios.post(
        "https://www.sayan-server.com/api/v1/coupons/validate",
        { code: couponCode },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("student_token")}`,
          },
        }
      );

      if (response.data.data) {
        const coupon = response.data.data;
        setCouponApplied(true);

        // حساب قيمة الخصم
        if (coupon.discount_type === "percentage") {
          const discount = calculateSubtotal() * (coupon.discount / 100);
          setDiscountAmount(discount);
        } else {
          setDiscountAmount(coupon.discount);
        }

        showNotification({
          type: "success",
          title: "تم تطبيق الكوبون",
          message: "تم تطبيق كوبون الخصم بنجاح",
          duration: 3000,
        });
      }
    } catch (error) {
      setError("الكوبون غير صالح");
      setCouponApplied(false);
      setDiscountAmount(0);

      showNotification({
        type: "error",
        title: "خطأ في الكوبون",
        message: "هذا الكوبون غير صالح أو منتهي الصلاحية",
        duration: 3000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckout = async () => {
    if (!termsAccepted) {
      setError("يجب الموافقة على الشروط والأحكام للمتابعة");
      showNotification({
        type: "warning",
        title: "الشروط والأحكام",
        message: "يجب الموافقة على الشروط والأحكام للمتابعة",
        duration: 3000,
      });
      return;
    }

    try {
      setIsProcessing(true);
      setError("");

      showNotification({
        type: "info",
        title: "جاري معالجة الطلب",
        message: "يرجى الانتظار...",
        duration: 2000,
      });

      // إرسال طلب الدفع إلى الباك إند
      const response = await axios.post(
        "https://www.sayan-server.com/api/v1/checkout/process",
        {
          coupon: couponApplied ? couponCode : null,
          payment_method: paymentMethod,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("student_token")}`,
          },
        }
      );

      if (response.data.data && response.data.data.redirect_url) {
        // تخزين بيانات المعاملة للرجوع إليها لاحقًا
        localStorage.setItem(
          "transaction_id",
          response.data.data.transaction_id
        );
        localStorage.setItem("invoice_id", response.data.data.invoice_id);

        // توجيه المستخدم إلى صفحة الدفع
        window.location.href = response.data.data.redirect_url;
      } else {
        setError("حدث خطأ أثناء معالجة طلب الدفع");
        showNotification({
          type: "error",
          title: "فشل الدفع",
          message: "حدث خطأ أثناء معالجة طلب الدفع",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("خطأ في معالجة الدفع:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("حدث خطأ أثناء الاتصال بالخادم");
      }

      showNotification({
        type: "error",
        title: "فشل في معالجة الدفع",
        message:
          error.response?.data?.message ||
          "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
        duration: 3000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    navigate("/student/ShoppingCart");
    return null;
  }

  return (
    <div className={classes.checkoutWrapper}>
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

      <div className="pt-0 info-details--1">
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
                      <p className={classes.courseSize}>
                        {item.size || "حجم الدورة غير محدد"}
                      </p>
                      <span>{item.price.toFixed(2)} ر.س.</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={classes.Card}>
              <h2>طريقة الدفع</h2>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className={classes.paymentMethodsGroup}
              >
                {[
                  { value: "credit", label: "بطاقة ائتمان", icon: <Visa /> },
                  { value: "mada", label: "مدى", icon: <Mada /> },
                  { value: "paypal", label: "باي بال", icon: <Paypal /> },
                  { value: "applePay", label: "آبل باي", icon: <ApplePay /> },
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
                    className={classes.paymentMethodLabel}
                    disabled={isProcessing}
                  />
                ))}
              </RadioGroup>
              <p className={classes.paymentNote}>
                سيتم تحويلك إلى بوابة الدفع الآمنة عند النقر على زر &quot;متابعة
                وشراء&quot;
              </p>

              <div className={classes.termsSection}>
                <label className={classes.termsLabel}>
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <span>
                    أوافق على <a href="/terms">الشروط والأحكام</a> و{" "}
                    <a href="/policy">سياسة الخصوصية</a>
                  </span>
                </label>
              </div>

              {error && <div className={classes.errorMessage}>{error}</div>}
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
                  disabled={couponApplied}
                />
                <div
                  onClick={handleApplyCoupon}
                  className={couponApplied ? classes.appliedButton : ""}
                >
                  {couponApplied ? "تم التطبيق" : "تطبيق"}
                </div>
              </div>
            </div>

            <div className={`${classes.Card} ${classes.summary}`}>
              <div className={classes.summaryRow}>
                <p>المجموع</p>
                <p>{calculateSubtotal().toFixed(2)} ر.س.</p>
              </div>

              <div className={classes.summaryRow}>
                <p>الضريبة (15%)</p>
                <p>{calculateTax().toFixed(2)} ر.س.</p>
              </div>

              {discountAmount > 0 && (
                <div className={`${classes.summaryRow} ${classes.discount}`}>
                  <p>الخصم</p>
                  <p>- {discountAmount.toFixed(2)} ر.س.</p>
                </div>
              )}

              <div className={`${classes.summaryRow} ${classes.total}`}>
                <p>المجموع النهائي</p>
                <p>{calculateTotal().toFixed(2)} ر.س.</p>
              </div>

              <button
                className={classes.checkoutButton}
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing
                  ? "جاري المعالجة..."
                  : `متابعة وشراء ${calculateTotal().toFixed(2)} ر.س.`}
              </button>

              <div className={classes.securePayment}>
                <small>الدفع آمن ومشفر عبر بوابة ميسر</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
