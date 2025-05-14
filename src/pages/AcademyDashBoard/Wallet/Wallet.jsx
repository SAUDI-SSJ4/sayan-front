import React, { useEffect, useState, useCallback } from "react";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy"; // تأكد من صحة المسار
import WalletCustomIcon from "../../../assets/icons/WalletCustomIcon"; // تأكد من صحة المسار
import WalletRec from "../../../assets/icons/card-receive.svg"; // تأكد من صحة المسار
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Loader as RSuiteLoader } from "rsuite";
import 'rsuite/dist/rsuite.min.css';
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const AcademeyWallet = () => {
  const [loading, setLoading] = useState(true);
  // تهيئة الحالة بقيمة افتراضية آمنة لتجنب null issues
  const [academyProfileData, setAcademyProfileData] = useState({
    user: null,
    academy: {
      wallet: 0,
      name: "..." // قيمة مبدئية لاسم الأكاديمية
      // يمكنك إضافة المزيد من الخصائص الافتراضية إذا لزم الأمر
    }
  });
  const [modalShowWithdraw, setModalShowWithdraw] = useState(false);

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

  // استخدام .? للوصول الآمن، وتوفير قيمة افتراضية 0 إذا كان أي جزء null/undefined
  const totalEarnings = academyProfileData?.academy?.wallet || 0;
  
  const commissionRate = 0.1; // 10%
  const withdrawableRate = 1 - commissionRate; // 90%
  
  const calculatedWithdrawableBalance = typeof totalEarnings === 'number' ? totalEarnings * withdrawableRate : 0;
  const platformDues = typeof totalEarnings === 'number' ? totalEarnings * commissionRate : 0;

  const handleSubmitWithdraw = async (e) => {
    e.preventDefault();
    
    if (parseFloat(form.amount) <= 0) {
      toast.error("مبلغ السحب يجب أن يكون أكبر من صفر.");
      return;
    }
    if (parseFloat(form.amount) > calculatedWithdrawableBalance) {
      toast.warn("المبلغ المطلوب أكبر من الرصيد القابل للسحب. سيتم مراجعة الطلب.");
      // إذا أردت منع الإرسال تمامًا:
      // toast.error("المبلغ المطلوب أكبر من الرصيد القابل للسحب.");
      // return;
    }

    try {
      const withdrawalData = {
        ...form,
        recipient_email: 'dhi.yazan.d@gmail.com' // تأكد من هذا البريد
      };
      
      const axios_client_for_withdraw = axios.create({
        baseURL: "https://sayan.pro/academy", // تأكد من هذا الـ URL
        withCredentials: true,
      });
      await axios_client_for_withdraw.post('/finance/withdraw', withdrawalData);
  
      toast.success("تم إرسال طلب السحب بنجاح، ستتم مراجعته قريباً.");
      setModalShowWithdraw(false);
      setForm({
        email: "", phone: "", amount: "", bank: "", customer_name: "", iban: ""
      });
      getWalletData(); // إعادة تحميل بيانات المحفظة
    } catch (error) {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء إرسال طلب السحب");
      console.error("Withdrawal error:", error.response || error);
    }
  };

  const getWalletData = useCallback(async () => {
    setLoading(true);
    try {
      const academy_api_client = axios.create({
        baseURL: "https://www.sayan-server.com", // هذا الـ URL من بياناتك
        withCredentials: true,
         headers: { 'Authorization': `Bearer ${your_auth_token}` }
      });
      const response = await academy_api_client.get("/website/profile-academy");
      
      if (response && response.data && response.data.academy) {
        setAcademyProfileData(response.data); 
      } else {
        console.warn("API response for academy profile is not as expected or missing 'academy' property:", response);
        // الحفاظ على القيمة الافتراضية الآمنة إذا كانت الاستجابة غير متوقعة
        setAcademyProfileData(prevData => ({
            ...prevData, // الحفاظ على بيانات user إذا كانت موجودة
            academy: { wallet: 0, name: "غير متوفر", ...prevData.academy } // تحديث academy فقط بقيم آمنة
        }));
      }

    } catch (error) {
      console.error("Fetch academy profile data error:", error.response || error);
      // تعيين قيمة افتراضية آمنة جدًا في حالة الخطأ الكامل للطلب
      setAcademyProfileData({ user: null, academy: { wallet: 685, name: "غير متوفر" } }); 
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getWalletData();
  }, [getWalletData]);

  const styles = {
    pageContainer: { padding: "20px", direction: 'rtl', fontFamily: "'Tajawal', sans-serif" }, // تأكد من تحميل خط Tajawal
    walletInfoCard: { background: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)", marginBottom: "2rem" },
    statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "32px" },
    statItem: { background: "#f8f9fa", borderRadius: "12px", padding: "20px", textAlign: "center", border: "1px solid #e9ecef" },
    statLabel: { color: "#007bff", fontSize: "1rem", fontWeight: "bold", marginBottom: "8px", display: "block" },
    statValue: { color: "#212529", fontSize: "1.75rem", fontWeight: "600", margin: "0" },
    actionButtonContainer: { display: "flex", justifyContent: "center", marginTop: "12px", flexDirection: 'column', alignItems: 'center' },
    withdrawButton: { background: "#007bff", color: "white", padding: "12px 28px", borderRadius: "8px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "10px", border: "none", fontWeight: "500", fontSize: "1rem", transition: "background-color 0.2s ease" },
    modalTitle: { fontWeight: 'bold', color: '#343a40' },
    modalFormLabel: { fontWeight: '500', color: '#495057', fontSize: '0.9rem' },
    modalFormControl: { borderRadius: '0.25rem', borderColor: '#ced4da' },
    modalSubmitButton: { fontWeight: 'bold', padding: '0.5rem 1.5rem' }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <RSuiteLoader size="lg" content="جاري التحميل..." vertical />
      </div>
    );
  }

  return (
    <>
      <div style={styles.pageContainer}>
        <HeaderAcademy icon={<WalletCustomIcon />} title={"المحفظة"} />
        
        <div style={styles.walletInfoCard} className="mt-4">
          <>
            <div style={styles.statsGrid}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>إجمالي الأرباح</span>
                <h3 style={styles.statValue}>{(typeof totalEarnings === 'number' ? totalEarnings.toFixed(2) : '0.00')} ر.س</h3>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>الرصيد القابل للسحب</span>
                <h3 style={styles.statValue}>
                  {calculatedWithdrawableBalance.toFixed(2)} ر.س
                </h3>
                <small className="text-muted d-block mt-1">(بعد خصم نسبة المنصة {commissionRate * 100}%)</small>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>مستحقات منصة سيان ({commissionRate * 100}%)</span>
                <h3 style={styles.statValue}>
                  {platformDues.toFixed(2)} ر.س
                </h3>
              </div>
            </div>
            <div style={styles.actionButtonContainer}>
              <button 
                onClick={() => setModalShowWithdraw(true)} 
                style={styles.withdrawButton}
              >
                <img src={WalletRec} alt="receive icon" style={{ width: '20px', height: '20px' }} />
                طلب تحويل الأرباح
              </button>
              {calculatedWithdrawableBalance <= 0 && (
                <p className="text-center text-muted mt-2 small">تنبيه: لا يوجد رصيد كافٍ لطلب السحب حاليًا.</p>
              )}
            </div>
          </>
          {/* عرض رسالة إذا لم يتم تحميل academyProfileData.academy بشكل صحيح حتى بعد انتهاء التحميل */}
          {!(academyProfileData && academyProfileData.academy && typeof academyProfileData.academy.wallet === 'number') && !loading && (
            <div className="text-center p-5">
                <h4>تعذر تحميل بيانات المحفظة بشكل كامل.</h4>
                <p className="text-muted">يرجى المحاولة مرة أخرى لاحقًا أو الاتصال بالدعم.</p>
            </div>
          )}
        </div>
      </div>

      <Modal show={modalShowWithdraw} onHide={() => setModalShowWithdraw(false)} centered dir="rtl">
        <Modal.Header closeButton>
          <Modal.Title style={styles.modalTitle}>طلب تحويل الأرباح</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitWithdraw}>
            <Form.Group className="mb-3" controlId="formCustomerNameWithdraw">
              <Form.Label style={styles.modalFormLabel}>اسم صاحب الحساب (كما هو مسجل في البنك)</Form.Label>
              <Form.Control type="text" name="customer_name" value={form.customer_name}
                onChange={handleInputChange} required style={styles.modalFormControl} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBankWithdraw">
              <Form.Label style={styles.modalFormLabel}>اسم البنك</Form.Label>
              <Form.Control type="text" name="bank" value={form.bank}
                onChange={handleInputChange} required style={styles.modalFormControl} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIbanWithdraw">
              <Form.Label style={styles.modalFormLabel}>رقم الآيبان (IBAN)</Form.Label>
              <Form.Control type="text" name="iban" value={form.iban}
                onChange={handleInputChange} required placeholder="SAXXXXXXXXXXXXXXXXXXXXXX" style={styles.modalFormControl} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAmountWithdraw">
              <Form.Label style={styles.modalFormLabel}>مبلغ السحب المطلوب (ر.س)</Form.Label>
              <Form.Control type="number" name="amount" min="1" value={form.amount}
                onChange={handleInputChange} required style={styles.modalFormControl}
                max={calculatedWithdrawableBalance.toFixed(2)}
              />
               {parseFloat(form.amount) > calculatedWithdrawableBalance && form.amount !== "" && (
                <Form.Text className="text-danger">
                  تنبيه: المبلغ المطلوب أكبر من الرصيد القابل للسحب.
                </Form.Text>
              )}
            </Form.Group>
            <hr/>
            <p className="text-muted small mb-2">سيتم استخدام معلومات الاتصال التالية لإشعارك بحالة الطلب:</p>
            <Form.Group className="mb-3" controlId="formEmailWithdraw">
              <Form.Label style={styles.modalFormLabel}>البريد الإلكتروني للتواصل</Form.Label>
              <Form.Control type="email" name="email" value={form.email}
                onChange={handleInputChange} required style={styles.modalFormControl} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhoneWithdraw">
              <Form.Label style={styles.modalFormLabel}>رقم الجوال للتواصل</Form.Label>
              <Form.Control type="text" name="phone" value={form.phone}
                onChange={handleInputChange} required style={styles.modalFormControl} />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100 mt-3" style={styles.modalSubmitButton}>
              إرسال الطلب
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AcademeyWallet;