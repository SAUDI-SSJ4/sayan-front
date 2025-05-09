import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { useNotification } from "../../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import classes from "./Checkout.module.scss";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaymentSuccess from "./PaymentSuccess";
import axios from "axios";
import Cookies from "js-cookie";

/*
To include external CSS and JavaScript files in React:

1. For the CSS file, add this in your index.html <head> section:
   <link rel="stylesheet" href="https://cdn.moyasar.com/mpf/1.15.0/moyasar.css" />

2. For the JavaScript file, you have two options:

   Option 1: Add to index.html before closing </body> tag:
   <script src="https://cdn.moyasar.com/mpf/1.15.0/moyasar.js"></script>

   Option 2: Load dynamically in your component using 1:
   useEffect(() => {
     const script = document.createElement('script');
     script.src = 'https://cdn.moyasar.com/mpf/1.15.0/moyasar.js';
     script.async = true;
     document.body.appendChild(script);
     return () => {
       document.body.removeChild(script);
     };
   }, []);
*/

const Checkout = () => {
  const { cartItems, clearCart } = useCart();

  // Extract titles from cartItems and join them with spaces
  const cartItemsTitles = cartItems.map((item) => item.title).join(" ");
  console.log("cart details: ", cartItemsTitles);

  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [couponCode, setCouponCode] = useState("");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price, 0);
  const calculateDiscount = () => 0; // Update based on your discount logic

  // Store total price in a variable
  const totalPrice = (calculateSubtotal() - calculateDiscount()) * 100;
  const calculateTotal = () => totalPrice;

  const ShowedTotal = () => totalPrice / 100;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (paymentMethod === "credit") {
      if (!formData.cardNumber.trim())
        newErrors.cardNumber = "رقم البطاقة مطلوب";
      if (!formData.expiryDate.trim())
        newErrors.expiryDate = "تاريخ الانتهاء مطلوب";
      if (!formData.cvv.trim()) newErrors.cvv = "رمز CVV مطلوب";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /*
  https://www.sayan-server.com/api/v1/checkout/process
  */

  /*
  https://api.moyasar.com/v1/invoices
      amount: totalPrice,
      currency: 'SAR',
      description: cartItemsTitles,
      success_url:
      back_url:
  */
  const handlePaymentMethodClick = async () => {
    const username = "sk_test_Bewx3QMQDuhpsRdnMGPbWKozQRMiFCaDGQ1ZojtK";
    const token = Cookies.get("student_token");
    const encoded = btoa(`${username}:`);

    try {
      const response = await axios.post(
        `https://api.moyasar.com/v1/invoices`,
        {
          amount: totalPrice,
          currency: "SAR",
          description: cartItemsTitles,
          callback_url: "https://www.sayan-server.com/api/v1/veify/",
          success_url: null,
          back_url: null,
          expired_at: "2038-01-19T03:14:07Z",
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Basic ${encoded}`,
            "X-Auth-Role": "student",
          },
        }
      );

      if (response) {
        console.log("response:", response);
        setIsProcessing(true);

        console.log("Invoice created ✅", response.data);

        const invoiceUrl = response.data.url;
        if (invoiceUrl) {
          // Redirect to payment page
          window.location.href = invoiceUrl;
          // Show processing notification
          showNotification({
            type: "success",
            title: "جاري معالجة الدفع",
            message: "يرجى الانتظار لحظة...",
            duration: 2000,
          });
        }
      }
    } catch (error) {
      console.error("Error processing checkout:", error);
      return;
    }

    setPaymentMethod();
    if (validateForm()) {
      processPayment();
    }
  };

  const processPayment = () => {
    setIsProcessing(true);

    // Show processing notification
    showNotification({
      type: "success",
      title: "جاري معالجة الدفع",
      message: "يرجى الانتظار لحظة...",
      duration: 2000,
    });

    // Handle iframe close/completion
    // iframe.onload = () => {
    //   showNotification({
    //     type: 'success',
    //     title: 'تم الدفع بنجاح!',
    //     message: `تم إضافة ${cartItems.length} دورة إلى حقيبتك التعليمية`,
    //     duration: 3000
    //   });

    //   setShowSuccess(true);
    //   setIsProcessing(false);
    //   document.body.removeChild(iframe);
    // };
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearCart();

    // Show final success notification in cart page
    navigate("/student/ShoppingCart", {
      state: {
        paymentSuccess: true,
        message: "تم إضافة الدورات إلى حقيبتك التعليمية بنجاح!",
      },
    });
  };

  if (cartItems.length === 0) {
    navigate("/student/ShoppingCart");
    return null;
  }

  // useEffect(() => {
  //   if (window.Moyasar) {
  //     window.Moyasar.init({
  //       element: '.mysr-form',
  //       amount: totalPrice,
  //       currency: 'SAR',
  //       description: cartItemsTitles,
  //       publishable_api_key: 'pk_test_vnkFtCmh3soMRKwHN45PrW5472GxvTd3GJdEnAhB',
  //       callback_url: 'https://moyasar.com/thanks',
  //       methods: ['creditcard']
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://cdn.moyasar.com/mpf/1.15.0/moyasar.js';
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.moyasar.com/mpf/1.15.0/moyasar.css"
      />
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
              <h2>الدفع</h2>
              {/* <RadioGroup
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
              </RadioGroup> */}

              {/* <div class="mysr-form"></div> */}
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
                <div
                  onClick={() => {
                    /* Apply coupon logic */
                  }}
                >
                  تطبيق
                </div>
              </div>
            </div>

            <div className={`${classes.Card} ${classes.summary}`}>
              {["المجموع", "الخصم", "المجموع"].map((label, index) => (
                <div
                  key={label}
                  className={`${classes.summaryRow} ${
                    index === 2 ? classes.total : ""
                  }`}
                >
                  <p>{label}</p>
                  <p className={index === 1 ? classes.discount : ""}>
                    {(index === 0
                      ? calculateSubtotal()
                      : index === 1
                      ? calculateDiscount()
                      : ShowedTotal()
                    ).toFixed(2)}{" "}
                    ر.س.
                  </p>
                </div>
              ))}
              <button
                className={classes.checkoutButton}
                onClick={() => handlePaymentMethodClick()}
                disabled={isProcessing}
              >
                {isProcessing ? "جاري المعالجة..." : "متابعة وشراء"}
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
