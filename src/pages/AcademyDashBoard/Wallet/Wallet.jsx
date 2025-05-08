import { useEffect, useState } from "react";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import WalletCustomIcon from "../../../assets/icons/WalletCustomIcon";
import WalletRec from "../../../assets/icons/card-receive.svg";
import moment from "moment";
import { toast } from "react-toastify";
import TableAg from "../../../component/table/TableAg";
import { Loader } from "rsuite";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";


const AcademeyWallet = () => {
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [modalShow1, setModalShow1] = useState(false);

  // بيانات الفورم
  const [form, setForm] = useState({
    email: "",
    phone: "",
    amount: "",
    bank: "",
    customer_name: "",
    iban: ""
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add this function before the return statement
  const handleSubmitWithdraw = async (e) => {
    e.preventDefault();
    try {
      const withdrawalData = {
        ...form,
        recipient_email: 'dhi.yazan.d@gmail.com'
      };
  
      const response = await axios.post('https://sayan.pro/academy/finance/withdraw', withdrawalData, {
        withCredentials: true
      });
  
      toast.success("تم إرسال الطلب بنجاح");
      setModalShow1(false);
      setForm({
        email: "",
        phone: "",
        amount: "",
        bank: "",
        customer_name: "",
        iban: ""
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "حدث خطأ في إرسال الطلب");
    }
  };

  const getWalletData = async () => {
    try {
      const academy_client = axios.create({
        baseURL: "https://sayan.pro/academy",
        withCredentials: true,
      });
      const response = await academy_client.get("/finance/wallet");
      setWalletData(response?.data);
      const formatedData = response?.data?.activity?.map((item) => ({
        id: item?.id,
        academy_id: item?.academy_id,
        amount: item?.amount,
        type: item?.type,
        type_id: item?.type_id,
        status: item?.status,
        content: item?.content,
        payment_method: item?.payment_method,
        payment_status: item?.payment_status,
        payment_details: item?.payment_details,
        created_at: item?.created_at,
        updated_at: item?.updated_at,
      }));
      setRowData(formatedData);
    } catch (error) {
      toast.error(error?.response?.data?.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWalletData();
  }, []);

  const columnDefs = [
    { headerName: "#", field: "id", flex: 0.5 },
    { headerName: "المبلغ", field: "amount", flex: 1 },
    { headerName: "النوع", field: "type", flex: 1 },
    { headerName: "المحتوى", field: "content", flex: 1 },
    { headerName: "طريقة الدفع", field: "payment_method", flex: 1 },
    {
      headerName: "حالة الدفع",
      field: "payment_status",
      flex: 1,
      cellRenderer: (params) => {
        const { payment_status } = params.data;
        const getBadgeClass = (status) => {
          switch (status) {
            case 1:
              return "badge bg-success px-4 py-2";
            case 2:
              return "badge bg-warning px-4 py-2";
            case 3:
              return "badge bg-danger px-4 py-2";
            default:
              return "badge bg-secondary px-4 py-2";
          }
        };
        return (
          <span className={getBadgeClass(payment_status)}>
            {payment_status === 1 ? "تم" : "معلق"}
          </span>
        );
      },
    },
  ];

  const styles = {
    allWalletContent: { padding: "20px" },
    WalletContainer: {
      background: "white",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
    },
    walletStatsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px",
      marginBottom: "32px",
    },
    walletStatCard: {
      background: "#f8fafb",
      borderRadius: "12px",
      padding: "20px",
      transition: "all 0.3s ease",
    },
    statContent: { textAlign: "center" },
    statLabel: {
      color: "#0062ff",
      fontSize: "16px",
      fontWeight: "700",
      marginBottom: "8px",
      display: "block",
    },
    btnContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "12px",
    },
    statValue: {
      color: "#2B3674",
      fontSize: "22px",
      fontWeight: "600",
      margin: "0",
    },
    btnWallet: {
      background: "#0062ff",
      color: "white",
      padding: "12px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.3s ease",
    },
  };

  return (
    <>
      {loading ? (
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
          <Loader size="lg" />
        </div>
      ) : (
        <>
          <HeaderAcademy icon={<WalletCustomIcon />} title={"المحفظة"} />
          <div style={styles.allWalletContent}>
            <div style={styles.WalletContainer}>
              <div className="row g-3">
                <div className="col-lg-12">
                  <div style={styles.walletStatsRow}>
                    <div style={styles.walletStatCard}>
                      <div style={styles.statContent}>
                        <span style={styles.statLabel}>إجمالي الإيرادات</span>
                        <h3 style={styles.statValue}>{walletData?.total_earnings || 0} ر.س</h3>
                      </div>
                    </div>
                    <div style={styles.walletStatCard}>
                      <div style={styles.statContent}>
                        <span style={styles.statLabel}>الرصيد القابل للسحب</span>
                        <h3 style={styles.statValue}>{walletData?.total_earnings ? (walletData.total_earnings * 0.9).toFixed(2) : 0} ر.س</h3>
                      </div>
                    </div>
                    <div style={styles.walletStatCard}>
                      <div style={styles.statContent}>
                        <span style={styles.statLabel}>نسبة منصة سيان</span>
                        <h3 style={styles.statValue}>{walletData?.total_earnings ? (walletData.total_earnings * 0.1).toFixed(2) : 0} ر.س</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div style={styles.btnContainer}>
                    <div onClick={() => setModalShow1(true)} style={styles.btnWallet}>
                      <img src={WalletRec} alt="receive" />
                      طلب تحويل الارباح
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-4">
              <TableAg rowData={rowData} columnDefs={columnDefs} />
            </div>
          </div>
        </>
      )}

      {/* Modal لفورم التحويل - تنسيقات افتراضية فقط */}
      <Modal show={modalShow1} onHide={() => setModalShow1(false)} centered>
        <Modal.Header>
          <Modal.Title>طلب تحويل الأرباح</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitWithdraw}>
            <Form.Group controlId="formEmail">
              <Form.Label>البريد الإلكتروني</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone" className="mt-2">
              <Form.Label>رقم الجوال</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAmount" className="mt-2">
              <Form.Label>مبلغ السحب</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                min={1}
                value={form.amount}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBank" className="mt-2">
              <Form.Label>اسم البنك</Form.Label>
              <Form.Control
                type="text"
                name="bank"
                value={form.bank}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCustomerName" className="mt-2">
              <Form.Label>اسم العميل</Form.Label>
              <Form.Control
                type="text"
                name="customer_name"
                value={form.customer_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formIban" className="mt-2">
              <Form.Label>رقم الآيبان</Form.Label>
              <Form.Control
                type="text"
                name="iban"
                value={form.iban}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 w-100">
              ارسال
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AcademeyWallet;