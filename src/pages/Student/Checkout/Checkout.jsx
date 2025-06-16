import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { useNotification } from "../../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import classes from "./Checkout.module.scss";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Visa from "../../../assets/icons/payment/visa.svg?react";
import Paypal from "../../../assets/icons/payment/paypal.svg?react";
import Mada from "../../../assets/icons/payment/mada.svg?react";
import ApplePay from "../../../assets/icons/payment/apple-pay.svg?react";
import axios from "axios";
import Cookies from "js-cookie";

// URL قاعدة الـ API الصحيح
const API_BASE_URL = "https://www.sayan-server.com/api/v1";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // حساب إجماليات الطلب
  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price, 0);
  const calculateTotal = () =>
    calculateSubtotal() - discountAmount;

  // التحقق من وجود دورات مجانية
  const isFreeOrder = () => calculateTotal() === 0;

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
        `${API_BASE_URL}/coupons/validate`,
        { code: couponCode },
        {
          headers: {
            "Content-Type": "application/json",
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

      const isOrderFree = isFreeOrder();
      
      // إضافة logging لتتبع العملية
      console.log("بدء عملية الطلب:", {
        isOrderFree,
        cartItems: cartItems.length,
        total: calculateTotal(),
        couponApplied,
        couponCode
      });
      
      showNotification({
        type: "info",
        title: isOrderFree ? "جاري تسجيل الدورات المجانية..." : "جاري معالجة الطلب...",
        message: "يرجى الانتظار...",
        duration: 2000,
      });

      // إعداد بيانات الطلب
      const requestData = {
        coupon: couponApplied ? couponCode : null,
      };

      // إضافة payment_method للطلبات المدفوعة فقط
      if (!isOrderFree) {
        requestData.payment_method = "credit";
      }

      // إرسال طلب الدفع/التسجيل إلى الباك إند
      const response = await axios.post(
        `${API_BASE_URL}/checkout/process`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("student_token")}`,
            TheCookie: Cookies.get("cart_id"),
          },
        }
      );

      // إضافة logging لتتبع الـ response
      console.log("Checkout Response:", response.data);

      // التحقق من نجاح العملية بطرق مختلفة
      const isSuccess = response.data?.success || 
                       response.data?.status === 'success' || 
                       response.status === 200;

      if (isSuccess) {
        if (isOrderFree) {
          // للدورات المجانية - إفراغ السلة وإظهار رسالة نجاح
          try {
            clearCart();
            console.log("تم إفراغ السلة للدورات المجانية");
          } catch (cartError) {
            console.warn("خطأ في إفراغ السلة:", cartError);
          }
          
          showNotification({
            type: "success",
            title: "تم التسجيل بنجاح! 🎉",
            message: "تم تسجيلك في الدورات المجانية بنجاح وأصبحت متاحة في حسابك",
            duration: 4000,
          });
          
          // انتظار قصير قبل التوجيه للتأكد من اكتمال العمليات
          setTimeout(() => {
            navigate("/student/TrainingCourses");
          }, 1500);
        } else {
          // للدورات المدفوعة - توجيه لبوابة الدفع
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
            throw new Error("فشل في الحصول على رابط الدفع");
          }
        }
      } else {
        // في حالة عدم نجاح العملية
        const serverMessage = response.data?.message || 
                             response.data?.error || 
                             "فشل في معالجة الطلب";
        throw new Error(serverMessage);
      }
    } catch (error) {
      console.error("خطأ في معالجة الطلب:", error);
      console.error("تفاصيل الخطأ:", {
        response: error.response?.data,
        status: error.response?.status,
        message: error.message
      });
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "حدث خطأ أثناء الاتصال بالخادم";
      
      setError(errorMessage);
      
      // رسالة خطأ واضحة حسب نوع الطلب
      const isOrderFree = isFreeOrder();
      showNotification({
        type: "error",
        title: isOrderFree ? "فشل في تسجيل الدورات المجانية" : "فشل في معالجة الدفع",
        message: `${errorMessage}. يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني.`,
        duration: 5000,
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
            <div style={{ color: "#7E8799" }}> إتمام الشراء </div>
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
                      <span>
                        {item.price === 0 ? "مجاني" : `${item.price.toFixed(2)} ر.س.`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!isFreeOrder() && (
              <div className={classes.Card}>
                <h2>طريقة الدفع</h2>
                <div className={classes.paymentMethodsGroup}>
                  <div className={classes.creditCardOption}>
                    <CreditCardIcon className={classes.paymentIcon} />
                    <div className={classes.paymentDetails}>
                      <h3>بطاقة ائتمانية</h3>
                      <p>ادفع بأمان باستخدام بطاقتك الائتمانية</p>
                      <div className={classes.supportedCards}>
                        <Visa />
                        <span>Visa, Mastercard, American Express</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={classes.securityInfo}>
                  <SecurityIcon className={classes.securityIcon} />
                  <span>جميع المدفوعات محمية ومشفرة بتقنية SSL</span>
                </div>

                <p className={classes.paymentNote}>
                  سيتم تحويلك إلى بوابة الدفع الآمنة عند النقر على زر "إتمام الشراء"
                </p>
              </div>
            )}

            {isFreeOrder() && (
              <div className={classes.Card}>
                <div className={classes.freeOrderNotice}>
                  <CheckCircleIcon className={classes.freeIcon} />
                  <div>
                    <h3>دورات مجانية</h3>
                    <p>يمكنك الحصول على هذه الدورات مجانًا بدون دفع</p>
                  </div>
                </div>
              </div>
            )}

            <div className={classes.termsSection}>
              <label className={classes.termsLabel}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span style={{ fontWeight: 'bold' }}>
                  أوافق على <a href="/privacy-policy">الشروط والأحكام</a> و{" "}
                  <a href="/privacy-policy">سياسة الخصوصية</a>
                </span>
              </label>
            </div>

            {error && <div className={classes.errorMessage}>{error}</div>}
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

              {discountAmount > 0 && (
                <div className={`${classes.summaryRow} ${classes.discount}`}>
                  <p>الخصم</p>
                  <p>- {discountAmount.toFixed(2)} ر.س.</p>
                </div>
              )}

              <div className={`${classes.summaryRow} ${classes.total}`}>
                <p>المجموع النهائي</p>
                <p>
                  {isFreeOrder() ? "مجاني" : `${calculateTotal().toFixed(2)} ر.س.`}
                </p>
              </div>

              <button
                className={`${classes.checkoutButton} ${isFreeOrder() ? classes.freeButton : ""}`}
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing
                  ? "جاري المعالجة..."
                  : isFreeOrder()
                  ? "الحصول على الدورات مجانًا"
                  : `إتمام الشراء ${calculateTotal().toFixed(2)} ر.س.`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
