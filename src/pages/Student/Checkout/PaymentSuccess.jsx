import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import classes from './PaymentSuccess.module.scss';
import { useCart } from '../../../context/CartContext';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('loading'); // loading, success, failed, pending
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState('');
  const [cartCleared, setCartCleared] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    // استخراج معلومات من الـ URL
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || localStorage.getItem('moyasar_id');  // معرف قديم من ميسر
    const transactionId = params.get('transaction_id') || localStorage.getItem('transaction_id');  // معرف المعاملة الجديد
    const invoiceId = params.get('invoice_id') || localStorage.getItem('invoice_id'); // معرف الفاتورة
    const moyasarStatus = params.get('status') || localStorage.getItem('payment_status'); // حالة الدفع من ميسر
    
    console.log('معلومات الدفع:', {
      id,
      transactionId,
      invoiceId,
      status: moyasarStatus,
      searchParams: location.search,
      allParams: Object.fromEntries(params.entries()),
      localStorage: {
        moyasar_id: localStorage.getItem('moyasar_id'),
        transaction_id: localStorage.getItem('transaction_id'),
        invoice_id: localStorage.getItem('invoice_id'),
        payment_status: localStorage.getItem('payment_status')
      }
    });

    // استخدام معرف المعاملة من URL، أو معرف قديم للتوافقية، أو المخزن محلياً
    const usedTransactionId = transactionId || id || localStorage.getItem('transaction_id');
    const usedInvoiceId = invoiceId || localStorage.getItem('invoice_id');
    
    // أولوية استخدام معرف المعاملة، ثم معرف الفاتورة
    const usedId = usedTransactionId || usedInvoiceId;

    if (!usedId) {
      setError('معلومات الدفع غير كاملة');
      setStatus('failed');
      return;
    }

    // إذا كانت ميسر أرسلت حالة الدفع مباشرة "paid"، نعتبر العملية ناجحة مبدئياً
    if (moyasarStatus === 'paid') {
      setStatus('success');
    }

    const verifyPayment = async () => {
      try {
        console.log('التحقق من عملية الدفع:', {
          transactionId: usedTransactionId,
          invoiceId: usedInvoiceId,
          retryCount
        });
        
        // أولاً نحاول استخدام المعاملة، ثم الفاتورة إذا لم تكن المعاملة متوفرة
        let apiUrl = '';
        
        if (usedTransactionId) {
          // استخدام رابط التحقق المباشر من المعاملة
          apiUrl = `https://www.sayan-server.com/api/v1/transaction/check/${usedTransactionId}`;
        } else if (usedInvoiceId) {
          // استخدام رابط التحقق من الفاتورة
          apiUrl = `https://www.sayan-server.com/api/v1/payment/verify/${usedInvoiceId}`;
        } else {
          throw new Error('لا توجد معرفات كافية للتحقق من عملية الدفع');
        }
        
        const response = await axios.get(
          apiUrl,
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${Cookies.get('student_token')}`,
            }
          }
        );

        console.log('استجابة التحقق من الدفع:', response.data);

        // تحليل الاستجابة
        if (response.data.status === 'success') {
          const paymentDetails = response.data.data || {};
          
          // إذا كانت حالة المعاملة مكتملة أو مدفوعة
          if (paymentDetails.transaction_status === 'completed' || 
              paymentDetails.moyasar_status === 'paid' || 
              paymentDetails.status === 'paid') {
            
            setStatus('success');
            setPaymentData({
              reference_number: paymentDetails.transaction_id || usedTransactionId || usedInvoiceId,
              total_amount: paymentDetails.amount || 0,
              payment_date: paymentDetails.updated_at || new Date().toISOString()
            });
            
            // إفراغ السلة بعد تأكيد نجاح الدفع
            if (!cartCleared) {
              try {
                await clearCart();
                setCartCleared(true);
                console.log('تم إفراغ السلة بنجاح');
              } catch (error) {
                console.error('فشل في إفراغ السلة:', error);
              }
            }
            
            // حذف المعرفات المخزنة
            localStorage.removeItem('transaction_id');
            localStorage.removeItem('invoice_id');
            localStorage.removeItem('moyasar_id');
            localStorage.removeItem('payment_status');
          } 
          // إذا كانت العملية معلقة أو جارية
          else if (paymentDetails.transaction_status === 'pending' || 
                   paymentDetails.status === 'pending') {
            setStatus('pending');
            setPaymentData({
              reference_number: paymentDetails.transaction_id || usedTransactionId || usedInvoiceId
            });
            
            // إعادة المحاولة إذا كانت العملية معلقة وعدد المحاولات أقل من الحد الأقصى
            if (retryCount < MAX_RETRIES) {
              setTimeout(() => {
                setRetryCount(prev => prev + 1);
              }, 3000); // إعادة المحاولة بعد 3 ثوانٍ
            }
          } 
          // إذا كانت العملية فاشلة
          else if (paymentDetails.transaction_status === 'failed' || 
                   paymentDetails.status === 'failed') {
            setStatus('failed');
            setError('فشلت عملية الدفع، يرجى المحاولة مرة أخرى');
          }
          // حالة غير معروفة
          else {
            // إذا كانت ميسر تقول أن العملية ناجحة، نعتبرها ناجحة
            if (moyasarStatus === 'paid') {
              setStatus('success');
              setPaymentData({
                reference_number: usedTransactionId || usedInvoiceId,
                total_amount: 'جاري التحميل...',
                payment_date: new Date().toISOString()
              });
            } else {
              setStatus('pending');
              setPaymentData({
                reference_number: usedTransactionId || usedInvoiceId
              });
            }
          }
        } 
        // إذا كان هناك خطأ في استجابة API
        else {
          // إذا كانت ميسر تقول أن الدفع ناجح، نظهر حالة نجاح مع رسالة تحذيرية
          if (moyasarStatus === 'paid') {
            setStatus('success');
            setPaymentData({
              reference_number: usedTransactionId || usedInvoiceId,
              total_amount: 'جاري التحميل...',
              payment_date: new Date().toISOString()
            });
            setError('تم استلام تأكيد الدفع من ميسر، وجاري التحقق من الخادم');
            
            // إعادة المحاولة
            if (retryCount < MAX_RETRIES) {
              setTimeout(() => {
                setRetryCount(prev => prev + 1);
              }, 3000);
            }
          } else {
            setStatus('failed');
            setError(response.data.message || 'فشلت عملية الدفع، يرجى المحاولة مرة أخرى');
          }
        }
      } catch (error) {
        console.error('خطأ في التحقق من عملية الدفع:', error);
        
        // إذا كانت ميسر تقول أن الدفع ناجح، نظهر حالة نجاح حتى مع وجود خطأ في API
        if (moyasarStatus === 'paid') {
          setStatus('success');
          setPaymentData({
            reference_number: usedTransactionId || usedInvoiceId,
            total_amount: 'تم الدفع بنجاح',
            payment_date: new Date().toISOString()
          });
          setError('تم تأكيد الدفع، ولكن قد يستغرق ظهور الدورات بعض الوقت');
          
          // إفراغ السلة
          if (!cartCleared) {
            try {
              await clearCart();
              setCartCleared(true);
            } catch (cartError) {
              console.error('فشل في إفراغ السلة بعد نجاح الدفع:', cartError);
            }
          }
        } else {
          setStatus('failed');
          if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
          } else {
            setError('حدث خطأ أثناء التحقق من حالة الدفع، يرجى التواصل مع الدعم الفني');
          }
        }
      }
    };

    verifyPayment();
  }, [location, clearCart, cartCleared, retryCount]);

  // محتوى مختلف حسب حالة الدفع
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className={classes.paymentStatusLoading}>
            <div className={classes.statusIcon}>
              <AccessTimeIcon />
            </div>
            <h2>جاري التحقق من عملية الدفع</h2>
            <p>يرجى الانتظار بينما نتحقق من حالة عملية الدفع الخاصة بك...</p>
          </div>
        );
      
      case 'success':
        return (
          <div className={classes.paymentStatusSuccess}>
            <div className={classes.statusIcon}>
              <CheckCircleOutlineIcon />
            </div>
            <h2>تم إتمام عملية الدفع بنجاح!</h2>
            <p>تم اعتماد المبلغ بنجاح وإضافة العناصر إلى حسابك.</p>
            
            {paymentData && (
              <div className={classes.paymentDetails}>
                <div className={classes.detailRow}>
                  <span>رقم المرجع:</span>
                  <span>{paymentData.reference_number}</span>
                </div>
                {paymentData.total_amount && (
                  <div className={classes.detailRow}>
                    <span>المبلغ المدفوع:</span>
                    <span>{typeof paymentData.total_amount === 'number' 
                      ? `${paymentData.total_amount} ر.س.` 
                      : paymentData.total_amount}
                    </span>
                  </div>
                )}
                {paymentData.payment_date && (
                  <div className={classes.detailRow}>
                    <span>تاريخ الدفع:</span>
                    <span>{new Date(paymentData.payment_date).toLocaleString('ar-SA')}</span>
                  </div>
                )}
              </div>
            )}
            
            {error && <p className={classes.noteText}>{error}</p>}
            
            <div className={classes.actionButtons}>
              <button
                className={classes.primaryButton}
                onClick={() => navigate('/student/courses')}
              >
                عرض دوراتي
              </button>
              <button
                className={classes.secondaryButton}
                onClick={() => navigate('/')}
              >
                العودة للصفحة الرئيسية
              </button>
            </div>
          </div>
        );
      
      case 'pending':
        return (
          <div className={classes.paymentStatusPending}>
            <div className={classes.statusIcon}>
              <AccessTimeIcon />
            </div>
            <h2>عملية الدفع قيد المعالجة</h2>
            <p>
              تم استلام طلب الدفع الخاص بك وهو قيد المعالجة الآن.
              سيتم إشعارك بمجرد اكتمال العملية.
            </p>
            
            {paymentData && paymentData.reference_number && (
              <div className={classes.paymentDetails}>
                <div className={classes.detailRow}>
                  <span>رقم المرجع:</span>
                  <span>{paymentData.reference_number}</span>
                </div>
              </div>
            )}
            
            <div className={classes.actionButtons}>
              <button
                className={classes.primaryButton}
                onClick={() => window.location.reload()}
              >
                إعادة التحقق
              </button>
              <button
                className={classes.secondaryButton}
                onClick={() => navigate('/')}
              >
                العودة للصفحة الرئيسية
              </button>
            </div>
          </div>
        );
      
      case 'failed':
        return (
          <div className={classes.paymentStatusFailed}>
            <div className={classes.statusIcon}>
              <CancelOutlinedIcon />
            </div>
            <h2>فشلت عملية الدفع</h2>
            <p>{error || 'حدث خطأ أثناء معالجة عملية الدفع. يرجى المحاولة مرة أخرى.'}</p>
            
            <div className={classes.actionButtons}>
              <button
                className={classes.primaryButton}
                onClick={() => navigate('/student/ShoppingCart')}
              >
                العودة إلى السلة
              </button>
              <button
                className={classes.secondaryButton}
                onClick={() => navigate('/')}
              >
                العودة للصفحة الرئيسية
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={classes.paymentSuccessPage}>
      <div className={classes.container}>
        {renderContent()}
      </div>
    </div>
  );
};

export default PaymentSuccess; 