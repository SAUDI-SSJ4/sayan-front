
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import FinancialTransactionsTable from "../../component/table/FinancialTransactionsTable/FinancialTransactionsTable";
import Up from "../../../assets/icons/Up.svg";
import WalletSend from "../../../assets/icons/card-send.svg";
import WalletRec from "../../../assets/icons/card-receive.svg";
import Card from "../../../assets/images/Wallet.png";
import down from "../../../assets/icons/down.svg";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import { dataSeries } from "./ok";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Dropdown } from "rsuite";
import Select from "react-select";
import "./FinancialTransactions.scss";

const customStyles = {
  // ... your custom styles
};

const optionss = [
  // ... your options
];

const generateDataSets = (t) => {
  // ... your data generation logic
};

const FinancialTransactions = () => {
  const [active, setActive] = useState(0);
  const [TimeActive, setTimeActive] = useState(0);
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [selected, setSelected] = useState(null);

  const series = [{
    name: "sales",
    data: generateDataSets(0)
  }];

  const options = {
    // ... your chart options
  };

  useEffect(() => {
    if (selected?.value == "option1") {
      setModalShow1(false);
      setModalShow2(true);
    }
  }, [selected]);

  return (
    <>
      <div className="TablePageHeader">
        <div className="d-flex align-items-center name">
          <div className="icon">
            <PeopleAltIcon sx={{ color: "#A3AED0" }} />
          </div>
          <div style={{ color: "#7E8799" }}> المعاملات المالية</div>
        </div>
      </div>

      <div className="main-wallet--info mt-3">
        <div className="WalletContainer">
          <div className="row g-3">
            <div className="col-lg-6 col-md-12 mt-3">
              <div className="WalletCash">
                <span className="fs-6 fw-medium title-text--1">رصيد المحفظة</span>
                <h2 className="fs-4 fw-bold text-content--1">24,590.00 ر.س.</h2>
                <p className="fs-6 fw-medium text-content--1">
                  54.81% مبيعات الشهر
                  <img src={Up} alt="up" />
                </p>
                <div className="WalletBtns flex-wrap gap-3">
                  <div className="btn-wallet--1">
                    <img src={WalletSend} alt="send" />
                    شحن المحفظة
                  </div>
                  <div onClick={() => setModalShow1(true)} className="btn-wallet--1">
                    <img src={WalletRec} alt="receive" />
                    طلب تحويل الارباح
                  </div>
                </div>
                <div>
                  <img src={Card} className="w-100 h-100 object-fit-cover" alt="card" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 mt-3">
              <div className="WalletStatistics">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="area"
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<FinancialTransactionsTable />} />
      </Routes>

      {/* Add your modals here */}
    </>
  );
};

export default FinancialTransactions;
