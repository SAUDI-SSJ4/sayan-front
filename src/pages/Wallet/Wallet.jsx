import Up from "../../assets/icons/Up.svg";
import WalletSend from "../../assets/icons/card-send.svg";
import WalletRec from "../../assets/icons/card-receive.svg";
import Card from "../../assets/images/Wallet.png";
import down from "../../assets/icons/down.svg";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import { dataSeries } from "./ok";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Dropdown } from "rsuite";
import Select from "react-select";
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
      border: "1px solid #0062ff"
    }
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    border: "none"
  }),
  indicatorSeparator: () => ({
    border: "none"
  })
};
const optionss = [
  { value: "option1", label: " اضافة حساب بنكي جديد" },
  { value: "option2", label: "**** **** **** **** **** 2889" },
  { value: "option3", label: "Option 3" }
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
  { date: "01/20/2014", value: 40 }
  // Add more date-value pairs as needed
];

const Wallet = () => {
  var series = [
    {
      name: "sales",
      data: generateDataSets(0)
    }
  ];

  var options = {
    chart: {
      type: "area",
      stacked: false,
      height: 300,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100]
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: "#8e8da4"
        },
        offsetX: 0,
        formatter: function (val) {
          return Number.parseInt((val / 1000000).toFixed(2));
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    xaxis: {
      type: "datetime",
      tickAmount: 8,
      min: new Date("01/01/2014").getTime(),
      max: new Date("01/20/2014").getTime(),
      labels: {
        formatter: function (val, timestamp) {
          return moment(new Date(timestamp)).format("DD MMM ");
        }
      }
    },

    tooltip: {
      shared: false
    },
    legend: {
      show: false
    }
  };

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
    <>
      <div className="main-wallet--info mt-3">
        <div className=" WalletContainer ">
          <div className="row g-3">
            <div className="col-lg-6 col-md-12 mt-3">
              <div className="WalletCash">
                <span className="fs-6 fw-medium title-text--1">
                  رصيد المحفظة
                </span>
                <h2 className="fs-4 fw-bold text-content--1">24,590.00 ر.س.</h2>
                <p className="fs-6 fw-medium text-content--1">
                  54.81% مبيعات الشهر
                  <img src={Up} />
                </p>
                <div className="WalletBtns flex-wrap gap-3">
                  <div className="btn-wallet--1">
                    <img src={WalletSend} />
                    شحن المحفظة
                  </div>
                  <div
                    onClick={() => setModalShow1(true)}
                    className="btn-wallet--1"
                  >
                    <img src={WalletRec} />
                    طلب تحويل الارباح
                  </div>
                </div>
                <div>
                  <img src={Card} className="w-100 h-100 object-fit-cover" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 mt-3">
              <div className="WalletStatistics">
                <div className="row g-3">
                  <div className="col-lg-6 col-md-12 mt-3">
                    <div className="SingleStatistice">
                      <span className="fs-6 fw-medium text-content--1">
                        المستحقات{" "}
                      </span>
                      <h2 className="fs-5 fw-bold text-content--1">
                        1,200.00 ر.س.
                      </h2>
                      <p className="fs-6 fw-medium text-content--1 d-flex align-items-center gap-3">
                        8%
                        <img src={down} />
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 mt-3">
                    <div className="SingleStatistice">
                      <span className="fs-6 fw-medium text-content--1">
                        الارباح{" "}
                      </span>
                      <h2 className="fs-5 fw-bold text-content--1">
                        23,310.00 ر.س.
                      </h2>
                      <p className="fs-6 fw-medium text-content--1 d-flex align-items-center gap-3">
                        54%
                        <img src={Up} />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ChartCardWallet">
                  <div className="WalletChartHeader">
                    <div className="Tittle flex-wrap gap-3">
                      <h2 className="fs-6 fw-medium text-content--1">
                        {" "}
                        العمليات المالية
                      </h2>
                      <div className="btns flex-wrap">
                        <div
                          onClick={() => setActive(0)}
                          className={`${active == 0 && "active"} btn--1`}
                        >
                          المستحقات
                        </div>
                        <div
                          onClick={() => setActive(1)}
                          className={`${active == 1 && "active"} btn--1`}
                        >
                          الارباح
                        </div>
                      </div>
                    </div>
                    <div className="Time mb-3 flex-wrap gap-3">
                      <div
                        onClick={() => setTimeActive(0)}
                        className={TimeActive == 0 && "active"}
                      >
                        اسبوعي
                      </div>
                      <div
                        onClick={() => setTimeActive(1)}
                        className={TimeActive == 1 && "active"}
                      >
                        شهري
                      </div>
                      <div
                        onClick={() => setTimeActive(2)}
                        className={TimeActive == 2 && "active"}
                      >
                        السنة السابقة
                      </div>
                    </div>
                  </div>
                  <div className="Chart" dir="ltr">
                    <ReactApexChart
                      options={options}
                      type="area"
                      series={series}
                    />
                  </div>
                </div>
                <div
                  className="addBtn mt-3 text-center "
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  ادارة وسائل الدفع
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        style={{ direction: "rtl" }}
        show={modalShow1}
        onHide={() => setModalShow1(false)}
      >
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
      </Modal>
    </>
  );
};

export default Wallet;
