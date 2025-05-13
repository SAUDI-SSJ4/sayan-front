import React, { useEffect, useState, useCallback } from "react";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import WalletCustomIcon from "../../../assets/icons/WalletCustomIcon";
import WalletSend from "../../../assets/icons/card-send.svg";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Loader as RSuiteLoader } from "rsuite";
import 'rsuite/dist/rsuite.min.css';
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import './wallet.scss';
import './wallet-additions.css';
import visaCard from '../../../assets/images/Wallet.png';
import Cookies from "js-cookie";
import authService from "../../../services/authService";
// استيراد أيقونة الريال السعودي
import sarSymbolPath from "../../../assets/icons/currency/sar-symbol.svg";

// أيقونة الريال السعودي
const SARIcon = () => (
  <img src={sarSymbolPath} alt="SAR" className="sar-icon" />
);



// مكون رسم بياني خطي محسن
const SimpleChart = ({ data }) => {
  // بناء مسار الرسم البياني ديناميكياً من البيانات الواردة
  const generatePath = () => {
    if (!data || data.length < 2) {
      // مسار افتراضي جميل للرسم البياني
      return "M0,80 C30,70 60,40 90,60 C120,80 150,30 180,50 C210,70 240,20 270,40 C300,60 330,50 360,40";
    }
    
    // تحديد القيم القصوى للتحجيم المناسب
    const maxAmount = Math.max(...data.map(item => item.amount), 100);
    const scale = 80 / (maxAmount || 1); // نسبة التحجيم، مع حد أدنى لتجنب القسمة على صفر
    
    let path = `M0,${100 - (data[0].amount * scale)}`;
    for (let i = 1; i < data.length; i++) {
      const x = (i * 300) / (data.length - 1);
      const y = 100 - (data[i].amount * scale); // قلب القيمة لأن 0 في SVG هو الأعلى
      
      // استخدام منحنيات بيزيه لتنعيم الرسم البياني
      const prevX = ((i-1) * 300) / (data.length - 1);
      const prevY = 100 - (data[i-1].amount * scale);
      const cpX1 = prevX + (x - prevX) / 3;
      const cpX2 = prevX + 2 * (x - prevX) / 3;
      
      path += ` C${cpX1},${prevY} ${cpX2},${y} ${x},${y}`;
    }
    return path;
  };

  return (
    <div className="chart-container">
      <div className="chart-values">
        <div className="currency-value">100 ر.س</div>
        <div className="currency-value">50 ر.س</div>
        <div className="currency-value">0 ر.س</div>
      </div>
      <svg viewBox="0 0 300 100" className="chart-svg">
        {/* خط أفقي للقيمة صفر */}
        <line x1="0" y1="100" x2="300" y2="100" stroke="#e5e7eb" strokeWidth="1" />
        {/* خط أفقي للقيمة 50 */}
        <line x1="0" y1="50" x2="300" y2="50" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="5,5" />
        {/* مسار الرسم البياني */}
        <path d={generatePath()} stroke="#6366f1" strokeWidth="2" fill="url(#gradient)" strokeLinecap="round" strokeLinejoin="round" />
        {/* تعبئة تحت المنحنى */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d={generatePath() + " L300,100 L0,100 Z"} fill="url(#gradient)" />
        
        {/* نقاط البيانات */}
        {data && data.length > 0 && data.map((item, i) => {
          const maxAmount = Math.max(...data.map(d => d.amount), 100);
          const scale = 80 / (maxAmount || 1);
          const x = (i * 300) / (data.length - 1);
          const y = 100 - (item.amount * scale);
          return (
            <circle 
              key={i} 
              cx={x} 
              cy={y} 
              r="3" 
              fill="#ffffff" 
              stroke="#6366f1" 
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
      <div className="chart-dates">
        {data && data.length > 0 ? 
          data.map((item, i) => <span key={i}>{item.date}</span>) : 
          <>
            <span>3.July</span>
            <span>4.July</span>
            <span>5.July</span>
            <span>6.July</span>
            <span>7.July</span>
            <span>8.July</span>
            <span>9.July</span>
          </>
        }
      </div>
    </div>
  );
};

const AcademeyWallet = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('الإيراد');
  const [academyProfileData, setAcademyProfileData] = useState({
    user: null,
    academy: {
      wallet: 0,
      name: "..."
    }
  });
  const [modalShowWithdraw, setModalShowWithdraw] = useState(false);
  const navigate = useNavigate();
  const [monthlyStats, setMonthlyStats] = useState({
    growth_rate: 0,
    income: 0,
    expenses: 0
  });
  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: "",
    phone: "",
    amount: "",
    bank: "",
    customer_name: "",
    iban: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  // بيانات المحفظة - الرصيد هو الصافي بعد خصم عمولة المنصة
  const totalEarnings = academyProfileData?.academy?.wallet || 0;
  const growthRate = monthlyStats?.growth_rate || 0; 
  const monthlyIncome = monthlyStats?.income || 0;
  const monthlyExpenses = monthlyStats?.expenses || 0;
  
  // المبلغ المتاح للسحب هو الرصيد الإجمالي
  const calculatedWithdrawableBalance = totalEarnings;

  // تحويل حالة طلب السحب إلى نص عربي
  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'معلق',
      'approved': 'تمت الموافقة',
      'rejected': 'مرفوض'
    };
    return statusMap[status] || 'معلق';
  };

  // تحويل حالة طلب السحب إلى لون
  const getStatusColor = (status) => {
    const colorMap = {
      'معلق': '#d97706',
      'تمت الموافقة': '#047857',
      'مرفوض': '#b91c1c'
    };
    return colorMap[status] || '#d97706';
  };

  // تحويل نوع المعاملة إلى نص عربي
  const getTransactionTypeText = (type, description) => {
    if (description && description.includes('سحب')) {
      return 'سحب أرباح';
    }
    
    if (type === 'deposit') {
      return 'إضافة رصيد';
    } else if (type === 'withdrawal') {
      return 'سحب رصيد';
    }
    
    return 'معاملة مالية';
  };

  // الحصول على معلومات المنتج
  const getProductInfo = (transaction) => {
    if (!transaction.product_info) return '-';
    
    const productType = transaction.product_info.type === 'course' ? 'كورس' : 'منتج رقمي';
    return `${transaction.product_info.name} (${productType})`;
  };

  // جلب بيانات المحفظة - تم نقل هذه الدالة للأعلى قبل استخدامها في useEffect
  const getWalletData = useCallback(async () => {
    setLoading(true);
    try {
      console.log("جلب بيانات المحفظة...");
      
      // التحقق من صلاحية التوكن قبل إجراء الطلبات
      const isTokenValid = await authService.validateTokenBeforeRequest();
      if (!isTokenValid) {
        toast.error("فشل في الاتصال بالخادم، يرجى تسجيل الدخول مرة أخرى");
        navigate('/login');
        return;
      }
      
      // إنشاء عميل axios جديد في كل مرة لضمان أحدث رمز مصادقة
      const client = authService.createAuthClient();
      
      try {
        // جلب البيانات بشكل متسلسل بدلاً من متوازٍ للتأكد من صحة المصادقة
        const walletResponse = await client.get("/api/v1/academy/finance/wallet");
        console.log("تم استلام بيانات المحفظة:", walletResponse.data);
        
        if (walletResponse.data) {
          setAcademyProfileData(walletResponse.data);
        }

        const statsResponse = await client.get("/api/v1/academy/finance/wallet/stats");
        if (statsResponse.data) {
          console.log("تم استلام إحصائيات المحفظة:", statsResponse.data);
          setMonthlyStats({
            growth_rate: statsResponse.data.growth_rate || 0,
            income: statsResponse.data.income || 0, 
            expenses: statsResponse.data.expenses || 0
          });
          setChartData(statsResponse.data.chart_data || []);
        }

        const withdrawalResponse = await client.get("/api/v1/academy/finance/wallet/withdrawals");
        if (withdrawalResponse.data && withdrawalResponse.data.items) {
          console.log("تم استلام طلبات السحب:", withdrawalResponse.data);
          setWithdrawalRequests(withdrawalResponse.data.items.map(req => ({
            id: req.id,
            date: new Date(req.created_at).toLocaleDateString('ar-SA'),
            amount: req.amount,
            status: getStatusText(req.status),
            notes: req.notes
          })));
        } else {
          setWithdrawalRequests([]);
        }
        
        const transactionsResponse = await client.get("/api/v1/academy/finance/wallet/transactions");
        // معالجة المعاملات المالية
        if (transactionsResponse.data && transactionsResponse.data.transactions) {
          console.log("تم استلام المعاملات المالية:", transactionsResponse.data);
          setTransactions(transactionsResponse.data.transactions.data);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        // تسجيل الخطأ وعرض رسالة للمستخدم
        console.error("خطأ أثناء جلب بيانات المحفظة:", error);
        toast.error("فشل في الاتصال بالخادم، يرجى المحاولة مرة أخرى");
        
        // إعادة تعيين البيانات إلى الحالة الأولية
        setAcademyProfileData({ 
          user: null, 
          academy: { wallet: 0, name: "..." },
        });
        
        setTransactions([]);
        setWithdrawalRequests([]);
        setMonthlyStats({
          growth_rate: 0,
          income: 0,
          expenses: 0
        });
        setChartData([]);
      }
    } catch (error) {
      console.error("خطأ في جلب بيانات المحفظة:", error);
      
      toast.error("فشل في الاتصال بالخادم، يرجى المحاولة مرة أخرى");
      
      // إعادة تعيين جميع البيانات إلى الحالة الأولية
      setAcademyProfileData({ 
        user: null, 
        academy: { wallet: 0, name: "..." },
      });
      
      setTransactions([]);
      setWithdrawalRequests([]);
      setMonthlyStats({
        growth_rate: 0,
        income: 0,
        expenses: 0
      });
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleSubmitWithdraw = async (e) => {
    e.preventDefault();
    
    if (parseFloat(form.amount) <= 0) {
      toast.error("مبلغ السحب يجب أن يكون أكبر من صفر");
      return;
    }

    if (parseFloat(form.amount) > calculatedWithdrawableBalance) {
      toast.error("المبلغ المطلوب أكبر من الرصيد المتاح للسحب");
      return;
    }

    try {
      setIsSubmitting(true);
      const withdrawalData = {
        ...form,
        amount: parseFloat(form.amount)
      };
      
      console.log("بدء إرسال طلب السحب...", withdrawalData);
      
      // إنشاء عميل axios باستخدام خدمة المصادقة
      const client = authService.getClient();
      
      // إضافة تأخير صغير لتمكين المستخدم من رؤية حالة التحميل
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await client.post('/api/v1/academy/finance/wallet/withdraw', withdrawalData);
      console.log("تم استلام الرد من الخادم:", response.data);
  
      toast.success("تم إرسال طلب السحب بنجاح");
      setModalShowWithdraw(false);
      setForm({
        email: "", phone: "", amount: "", bank: "", customer_name: "", iban: ""
      });
      
      // تحديث البيانات بعد إرسال الطلب
      await getWalletData();
      
      navigate('/academy/wallet/success');
    } catch (error) {
      console.error("خطأ في إرسال طلب السحب:", error);
      
      toast.error(error.response?.data?.message || "حدث خطأ أثناء إرسال طلب السحب");
    } finally {
      setIsSubmitting(false);
    }
  };

  // التحقق من وجود رمز الوصول وتهيئة البيانات عند تحميل الصفحة
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        // إضافة تأخير بسيط للتأكد من أن رمز المصادقة جاهز قبل أي طلبات
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // التحقق من صلاحية التوكن قبل إجراء الطلبات
        const isTokenValid = await authService.validateTokenBeforeRequest();
        if (!isTokenValid) {
          toast.error("انتهت صلاحية الجلسة، الرجاء تسجيل الدخول مرة أخرى");
          navigate('/login');
          return;
        }
        
        // التحقق من حالة الجلسة
        const sessionValid = await authService.checkSession();
        if (!sessionValid) {
          toast.error("الرجاء تسجيل الدخول مرة أخرى");
          navigate('/login');
          return;
        }
        
        // إضافة تأخير إضافي قبل جلب البيانات
        await new Promise(resolve => setTimeout(resolve, 100));
        getWalletData();
      } catch (error) {
        console.error("خطأ في تهيئة المحفظة:", error);
        toast.error("حدث خطأ أثناء تحميل البيانات، يرجى المحاولة مرة أخرى");
      }
    };
    
    initializeWallet();
  }, [getWalletData, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <RSuiteLoader size="lg" content="جاري التحميل..." vertical />
      </div>
    );
  }

  return (
    <div className="wallet-page">
        <HeaderAcademy icon={<WalletCustomIcon />} title={"المحفظة"} />
        
      <div className="wallet-content">
        <div className="wallet-container">
          {/* القسم العلوي - رصيد المحفظة */}
          <div className="wallet-balance-section">
            <div className="balance-info">
              <h6>رصيد المحفظة</h6>
              <h2 className="balance-amount">
                <span className="amount-value">{totalEarnings.toLocaleString()}</span>
                <span className="currency-symbol"><SARIcon /></span>
              </h2>
              <p className="monthly-return">
                <span className={`${growthRate >= 0 ? 'green-text' : 'red-text'}`}>
                  {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(2)}%
                </span> العوائد الشهرية
              </p>
            </div>
            
            <div className="wallet-actions">
              <button 
                className="withdraw-btn"
                onClick={() => setModalShowWithdraw(true)} 
                disabled={calculatedWithdrawableBalance <= 0}
              >
                <img src={WalletSend} alt="withdraw" />
                سحب الأرباح
              </button>
            </div>
          </div>
          
          {/* القسم الأوسط - جدول المعاملات المالية */}
          <div className="monthly-payments-section">
            <div className="section-header">
              <h4>سجل المعاملات المالية</h4>
            </div>
            
            <div className="transactions-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>التاريخ</th>
                    <th>نوع المعاملة</th>
                    <th>المنتج</th>
                    <th>الطالب</th>
                    <th>قبل </th>
                    <th>التغيير</th>
                    <th> بعد</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => {
                      const isPositive = transaction.difference > 0;
                      const date = new Date(transaction.created_at).toLocaleDateString('ar-SA');
                      const transactionType = getTransactionTypeText(transaction.transaction_type, transaction.description);
                      const productInfo = getProductInfo(transaction);
                      const studentName = transaction.student_info ? transaction.student_info.name : '-';
                      
                      return (
                        <tr key={transaction.id}>
                          <td>{date}</td>
                          <td>{transactionType}</td>
                          <td>{productInfo}</td>
                          <td>{studentName}</td>
                          <td>
                            <div className="amount-cell">
                              <span className="amount-value">{transaction.balance_before.toLocaleString()}</span>
                              <span className="currency-symbol"><SARIcon /></span>
                            </div>
                          </td>
                          <td>
                            <div className={`amount-cell ${isPositive ? 'positive-amount' : transaction.difference < 0 ? 'negative-amount' : ''}`}>
                              {transaction.difference !== 0}
                              <span className="amount-value">
                                {transaction.difference === 0 ? '0' : (isPositive ? '+' : '') + transaction.difference.toLocaleString()}
                              </span>
                              <span className="currency-symbol"><SARIcon /></span>
                            </div>
                          </td>
                          <td>
                            <div className="amount-cell">
                              <span className="amount-value">{transaction.balance_after.toLocaleString()}</span>
                              <span className="currency-symbol"><SARIcon /></span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">لا توجد معاملات مالية حالياً</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* القسم السفلي - طلبات سحب الأرباح */}
          <div className="withdrawal-requests-section">
            <h4>طلبات سحب الأرباح</h4>
            {withdrawalRequests.length > 0 ? (
              withdrawalRequests.map((request) => (
                <div className="withdrawal-request-item" key={request.id}>
                  <div className="request-info">
                    <span className="request-text">طلب سحب الأرباح 
                      <span className="amount-cell">
                        (<span className="amount-value">{request.amount.toLocaleString()}</span>
                        <span className="currency-symbol"><SARIcon /></span>)
                      </span>
                    </span>
                    <span className="request-date">{request.date}</span>
                  </div>
                  <div className="request-status" style={{ color: getStatusColor(request.status) }}>
                    <span>{request.status}</span>
                    <div className="status-icon" style={{ 
                      backgroundColor: `${request.status === 'معلق' ? '#fef3c7' : request.status === 'تمت الموافقة' ? '#d1fae5' : '#fee2e2'}`,
                      border: `2px solid ${getStatusColor(request.status)}`
                    }}></div>
                  </div>
                  {request.status === 'مرفوض' && request.notes && (
                    <div className="mt-2 request-notes">
                      <span className="notes-label">سبب الرفض: </span>
                      <span className="notes-text">{request.notes}</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-data">لا توجد طلبات سحب حالياً</div>
            )}
          </div>
        </div>

        {/* القسم الأيمن - العمليات المالية */}
        <div className="financial-operations">
          <div className="financial-tabs">
            <div className="tab active">الإيراد</div>
          </div>
          
          <div className="tab-selector">
            <div className="period-selector">
              <div className="period active">أسبوعي</div>
              <div className="period">شهري</div>
              <div className="period">السنة السابقة</div>
            </div>
          </div>
          
          <div className="revenue-stats">
            <div className="stats-card">
              <div className="stats-header">الإيرادات الشهرية</div>
              <div className="stats-value">
                <span className="amount-value">{monthlyIncome.toLocaleString()}</span>
                <span className="currency-symbol"><SARIcon /></span>
              </div>
              <div className="stats-growth">
                <span className={`growth-badge ${growthRate >= 0 ? 'positive' : 'negative'}`}>
                  {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
                </span>
                <span className="growth-label">مقارنة بالشهر السابق</span>
              </div>
            </div>
            
            <div className="stats-card">
              <div className="stats-header">المصروفات الشهرية</div>
              <div className="stats-value">
                <span className="amount-value">{monthlyExpenses.toLocaleString()}</span>
                <span className="currency-symbol"><SARIcon /></span>
              </div>
              <div className="stats-info">
                <span className="info-label">طلبات سحب معتمدة</span>
              </div>
            </div>
          </div>
          
          <div className="card-visual">
            <div className="visa-card-container">
              <div className="visa-card">
                <div className="visa-card-header">
                  <span className="visa-card-name">محفظة الأكاديمية</span>
                  <div className="visa-card-chip"></div>
                </div>
                <div className="visa-card-number">
                  <span className="visa-card-balance">{totalEarnings.toLocaleString()}</span>
                  <span className="visa-card-currency"><SARIcon /></span>
                </div>
                <div className="visa-card-footer">
                  <span className="visa-card-type">CARD</span>
                  {/* <span className="visa-card-expiry">05/30</span> */}
                </div>
                <div className="visa-card-dots">**** **** **** 1890</div>
                <div className="visa-card-glow"></div>
              </div>
            </div>
          </div>
          
          <div className="chart-section">
            <h4 className="chart-title">تحليل الإيرادات</h4>
            <SimpleChart data={chartData} />
          </div>
        </div>
      </div>

      <Modal show={modalShowWithdraw} onHide={() => setModalShowWithdraw(false)} centered dir="rtl">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">طلب تحويل الأرباح</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 text-center withdraw-balance-info">
            <div className="mb-2">الرصيد المتاح للسحب</div>
            <div className="available-balance">
              <span className="amount-value">{calculatedWithdrawableBalance.toLocaleString()}</span>
              <span className="currency-symbol"><SARIcon /></span>
            </div>
          </div>

          <Form onSubmit={handleSubmitWithdraw}>
            <Form.Group className="mb-3" controlId="formCustomerNameWithdraw">
              <Form.Label className="form-label">اسم صاحب الحساب (كما هو مسجل في البنك)</Form.Label>
              <Form.Control type="text" name="customer_name" value={form.customer_name}
                onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBankWithdraw">
              <Form.Label className="form-label">اسم البنك</Form.Label>
              <Form.Control type="text" name="bank" value={form.bank}
                onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIbanWithdraw">
              <Form.Label className="form-label">رقم الآيبان (IBAN)</Form.Label>
              <Form.Control type="text" name="iban" value={form.iban}
                onChange={handleInputChange} required placeholder="SAXXXXXXXXXXXXXXXXXXXXXX" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAmountWithdraw">
              <Form.Label className="form-label">مبلغ السحب المطلوب</Form.Label>
              <div className="input-with-currency">
                <Form.Control 
                  type="number" 
                  name="amount" 
                  min="1" 
                  value={form.amount}
                  onChange={handleInputChange} 
                  required 
                  max={calculatedWithdrawableBalance}
              />
                <span className="currency-symbol"><SARIcon /></span>
              </div>
              {parseFloat(form.amount) > calculatedWithdrawableBalance && form.amount && (
                <Form.Text className="text-danger">
                  المبلغ المطلوب أكبر من الرصيد المتاح للسحب
                </Form.Text>
              )}
            </Form.Group>
            <hr/>
            <p className="mb-2 text-muted small">سيتم استخدام معلومات الاتصال التالية لإشعارك بحالة الطلب:</p>
            <Form.Group className="mb-3" controlId="formEmailWithdraw">
              <Form.Label className="form-label">البريد الإلكتروني للتواصل</Form.Label>
              <Form.Control type="email" name="email" value={form.email}
                onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhoneWithdraw">
              <Form.Label className="form-label">رقم الجوال للتواصل</Form.Label>
              <Form.Control type="text" name="phone" value={form.phone}
                onChange={handleInputChange} required />
            </Form.Group>
            
            <Button 
              variant="primary" 
              type="submit" 
              className="mt-3 submit-button w-100"
              disabled={isSubmitting || parseFloat(form.amount) > calculatedWithdrawableBalance}
            >
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AcademeyWallet;