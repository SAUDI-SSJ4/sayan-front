import { useEffect, useState } from "react";
import Up from "../../../assets/icons/Up.svg";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import WalletCustomIcon from "../../../assets/icons/WalletCustomIcon";
import { toast } from "react-toastify";
import TableAg from "../../../component/table/TableAg";
import { Loader } from "rsuite";
import { academy_client } from "../../../utils/apis/client.config";

const AcademeyWallet = () => {
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState(null);
  const [rowData, setRowData] = useState(null);

  const getWalletData = async () => {
    try {
      const response = await academy_client.get("/wallet");
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
      console.log({ response });
    } catch (error) {
      toast.error(error?.response?.data?.message);
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

        // Define badge styles based on payment_status
        const getBadgeClass = (status) => {
          switch (status) {
            case 1:
              return "badge bg-success  px-4 py-2";
            case 2:
              return "badge bg-warning  px-4 py-2";
            case 3:
              return "badge bg-danger  px-4 py-2";
            default:
              return "badge bg-secondary  px-4 py-2";
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
  return (
    <>
      {loading ? (
        <div className=" w-100 vh-100 d-flex justify-content-center align-items-center ">
          <Loader size="lg" /> :
        </div>
      ) : (
        <>
          <HeaderAcademy icon={<WalletCustomIcon />} title={"المحفظة"} />
          <div className="all-wallet-content">
            <div className="WalletContainer">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-12 mt-3">
                  <div className="WalletCash">
                    <span className="fs-4 fw-medium text-content--1">
                      رصيد المحفظة
                    </span>
                    <h2 className="fs-3 fw-bold text-content--1">
                      {walletData?.total} ر.س.
                    </h2>
                    {/* <p className="fs-5 fw-medium text-content--1">
                      54.81% مبيعات الشهر
                      <img src={Up} />
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className=" my-4">
              <TableAg rowData={rowData} columnDefs={columnDefs} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AcademeyWallet;
