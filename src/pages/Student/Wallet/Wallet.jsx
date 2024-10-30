import Up from "../../../assets/icons/Up.svg";
import WalletSend from "../../../assets/icons/card-send.svg";
import WalletRec from "../../../assets/icons/card-receive.svg";
import Card from "../../../assets/images/Wallet.png";
import down from "../../../assets/icons/down.svg";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import { dataSeries } from "./ok";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Dropdown } from "rsuite";
import Select from "react-select";
import axiosInstance from "../../../../axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import WalletDataTable from "./WalletDataTable";
import { getStudentWallet } from "../../../utils/apis/client";
import "./wallet.css";
import comingSoon from "../../../assets/coming-soon.svg";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    borderRadius: "10px",
    border: `1px solid ${state.isFocused ? "#0062ff" : "#EDEFF2"}`,
    background: "var(--semantic-colors-primary-contrast, #FFF)",
    padding: "5px",
    boxShadow: "none",
    "&:focus": {
      outline: "none",
      border: "1px solid #0062ff",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    border: "none",
  }),
  indicatorSeparator: () => ({
    border: "none",
  }),
};
const optionss = [
  { value: "option1", label: " اضافة حساب بنكي جديد" },
  { value: "option2", label: "**** **** **** **** **** 2889" },
  { value: "option3", label: "Option 3" },
];

const generateDataSets = (t) => {
  var ts1 = 1388534400000;
  var ts2 = 1388620800000;
  var ts3 = 1389052800000;

  var dataSet = [[], [], []];

  for (let i = 0; i < 12; i++) {
    ts1 = ts1 + 86400000;
    const innerArr = [ts1, dataSeries[2][i].value];
    dataSet[0].push(innerArr);
  }
  for (let i = 0; i < 18; i++) {
    ts2 = ts2 + 86400000;
    const innerArr = [ts2, dataSeries[1][i].value];
    dataSet[1].push(innerArr);
  }
  for (let i = 0; i < 12; i++) {
    ts3 = ts3 + 86400000;
    const innerArr = [ts3, dataSeries[0][i].value];
    dataSet[2].push(innerArr);
  }

  if (t === 0) {
    return dataSet[0];
  } else if (t === 1) {
    return dataSet[1];
  } else {
    return dataSet[2];
  }
};
const data = [
  { date: "01/01/2014", value: 10 },
  { date: "01/5/2014", value: 20 },
  { date: "01/18/2014", value: 30 },
  { date: "01/20/2014", value: 40 },
];

const StudentWallet = () => {
  var series = [
    {
      name: "sales",
      data: generateDataSets(0),
    },
  ];

  var options = {
    chart: {
      type: "area",
      stacked: false,
      height: 300,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#8e8da4",
        },
        offsetX: 0,
        formatter: function (val) {
          return Number.parseInt((val / 1000000).toFixed(2));
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
      tickAmount: 8,
      min: new Date("01/01/2014").getTime(),
      max: new Date("01/20/2014").getTime(),
      labels: {
        formatter: function (val, timestamp) {
          return moment(new Date(timestamp)).format("DD MMM ");
        },
      },
    },

    tooltip: {
      shared: false,
    },
    legend: {
      show: false,
    },
  };

  // const { data: walletData, isLoading } = useQuery({
  //   queryKey: ["wallet"],
  //   queryFn: getStudentWallet,
  //   refetchOnWindowFocus: false,
  //   cacheTime: 1000,
  //   retry: 3,
  // });

  // console.log(walletData);

  const [active, setActive] = useState(0);
  const [TimeActive, setTimeActive] = useState(0);

  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected?.value == "option1") {
      setModalShow1(false);
      setModalShow2(true);
    }
  }, [selected]);
  return (
    <div className="all-wallet-content">
      <div className="mt-3">
        <div className="card-wallet">
          <img src={comingSoon} alt="comingSoon" />
        </div>

        {/* <div className="WalletContainer">
           <div className="row">
            <div className="col-12 mt-3 mb-3">
              <div className="WalletCash">
                <span>رصيد المحفظة</span>
                <h2>{isLoading ? walletData?.total.toLocaleString() : "00,00.00"} ر.س.</h2>
                <p>
                  54.81% مبيعات الشهر
                  <img src={Up} />
                </p>
                <div className="WalletBtns">
                  <div className="button-wallet">
                    <img src={WalletSend} />
                    شحن المحفظة
                  </div>
                  <div className="button-wallet" onClick={() => setModalShow1(true)}>
                    <img src={WalletRec} />
                    طلب تحويل الارباح
                  </div>
                </div>
              </div>
            </div>
          </div>
          <WalletDataTable WalletData={walletData} /> 
        </div>*/}
      </div>
      {/* <Modal style={{ direction: "rtl" }} show={modalShow1} onHide={() => setModalShow1(false)}>
        <div className="ModalContainer">
          <div className="ModalHeader">
            <h3>طلب تحويل الارباح</h3>
          </div>
          <div className="ModalBody">
            <div className="CustomFormControl">
              <label htmlFor="name"> الى الحساب البنكي </label>
              <Select
                defaultValue={optionss[1]}
                styles={customStyles}
                style={{ width: "100%" }}
                options={optionss}
                onChange={(e) => setSelected(e)}
                name="colors"
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className="CustomFormControl">
              <label htmlFor="name"> القيمة </label>
              <Select
                styles={customStyles}
                style={{ width: "100%" }}
                name="colors"
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <Button variant="primary">سحب الارباح</Button>
            <Button variant="secondary">الرجوع</Button>
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default StudentWallet;
