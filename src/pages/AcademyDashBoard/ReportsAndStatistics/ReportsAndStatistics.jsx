import DashboardHeader from "../../../component/dashboard/Header/Header";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import classes from "./dasahboard.module.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
} from "chart.js";
import Happy from "../../../assets/icons/Positive.svg";
import Neutral from "../../../assets/icons/Neutral.svg";
import Negative from "../../../assets/icons/Negative.svg";

import { motion } from "framer-motion";

import { Line, Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

import { useState } from "react";
import { SelectPicker } from "rsuite";
import BarChart from "../../../component/charts/BarChart";
import SemiCircleGaugeChart from "../../../component/charts/SemiCircleGaugeChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);
const ReportsAndStatistics = () => {
  const [active, setActive] = useState(1);
  const options = {
    plugins: {
      legend: {
        position: "bottom",
        rtl: true
      }
    },
    responsive: true,
    scales: {
      x: {
        display: false,
        stacked: true
      },
      y: {
        display: false,
        stacked: false
      }
    }
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August"
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "لم يقوموا بالتسجيل",
        data: [400, 370, 330, 390, 320, 350, 360, 200],
        backgroundColor: "#3D4BC8",
        barBorderRadius: 50,
        barPercentage: 0.5, // Adjust this value to control the width of the bars
        categoryPercentage: 0.5 // Adjust this value to control the space between bars
      },
      {
        label: "مسجلين في المنصة",
        data: [-400, -220, -330, -390, -320, -350, -360, -500],
        backgroundColor: "#CE6AB2",
        barBorderRadius: 50,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      }
    ]
  };

  const options2 = {
    responsive: true,

    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: true
      }
    }
  };

  const data2 = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [400, 370, 330, 390, 320, 350, 360, 200],
        borderColor: "#FF718B",
        backgroundColor: "#FF718B",
        tension: 0.4
      },
      {
        label: "Dataset 2",
        data: [200, 400, 500, 450, 500, 570, 570, 410],
        borderColor: "#4A3AFF",
        backgroundColor: "#4A3AFF",
        tension: 0.4
      }
    ]
  };
  const data3 = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [24, 29, 36, 11],
        backgroundColor: ["#583AED", "#0FE8E8", "#0062FF", "#FF718B"],
        borderColor: ["#583AED", "#0FE8E8", "#0062FF", "#FF718B"],
        borderWidth: 1
      }
    ]
  };

  const options3 = {
    plugins: {
      legend: {
        display: false,
        position: "top",

        labels: {
          usePointStyle: true, // Use a circular point style for the legend
          boxWidth: 8 // Adjust the box width as needed
        },
        itemStyle: {
          lineHeight: 1.5 // Adjust the line height as needed
        }
      }
    },
    layout: {
      padding: 20
    },
    elements: {
      cutout: 50,
      responsive: true
    }
  };
  const dataSelect = [
    "Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert"
  ].map((item) => ({ label: item, value: item }));
  return (
    <div>
      <div className="row g-3 mt-3">
        <div className="col-lg-6">
          <div className={`${classes.ChartCard}`}>
            <div className={`${classes.ChartCardHeader}`}>
              <div>
                <p className="fs-6 fw-medium text-content--1">تقارير</p>
                <h2 className="fs-6 fw-medium text-content--1">
                  {" "}
                  تجربة الطلاب
                </h2>
              </div>
            </div>

            <Line options={options2} data={data2} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className={`${classes.ChartCard}`}>
            <div className={`${classes.ChartCardHeader} flex-wrap `}>
              <div>
                <p className="fs-6 fw-medium text-content--1">تقارير</p>
                <h2 className="fs-6 fw-medium text-content--1">
                  {" "}
                  باقات الاشتراك{" "}
                </h2>
              </div>
              <div className="main-report--info">
                <div className="MonthlyAndYearly ">
                  <div
                    className={`${active == 1 ? "active" : null} btn---1`}
                    onClick={() => setActive(1)}
                  >
                    شهري
                  </div>
                  <div
                    className={`${active == 2 ? "active" : null} btn---1`}
                    onClick={() => setActive(2)}
                  >
                    سنوي{" "}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="ChartRow">
                <div className="ChartRowHeader">
                  <h2 className="fs-6 fw-medium text-content--1">
                    باقة التميز
                  </h2>
                  <span className="fs-6 fw-bold text-content--1">121,799</span>
                </div>
                <div className="ChartBar">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { width: 0 },
                      visible: { width: "90%", transition: { duration: 1 } }
                    }}
                    className="data active"
                    style={{ width: "90%" }}
                  ></motion.div>
                </div>
              </div>
              <div className="ChartRow">
                <div className="ChartRowHeader">
                  <h2 className="fs-6 fw-medium text-content--1">
                    باقة التميز
                  </h2>
                  <span className="fs-6 fw-bold text-content--1">121,799</span>
                </div>
                <div className="ChartBar">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { width: 0 },
                      visible: { width: "40%", transition: { duration: 1 } }
                    }}
                    className="data"
                  ></motion.div>
                </div>
              </div>
              <div className="ChartRow">
                <div className="ChartRowHeader">
                  <h2 className="fs-6 fw-medium text-content--1">
                    باقة التميز
                  </h2>
                  <span className="fs-6 fw-bold text-content--1">121,799</span>
                </div>
                <div className="ChartBar">
                  <div className="data"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-6">
          <div className={`${classes.ChartCard}`} style={{ padding: "35px" }}>
            <div className={`${classes.ChartCardHeader} b-0`}>
              <div>
                <p
                  className="fs-6 fw-medium text-content--1"
                  style={{ fontSize: "18px" }}
                >
                  المبيعات{" "}
                </p>
                <h2 className="d-flex align-items-end mt-2 fs-6 fw-medium text-content--1">
                  {" "}
                  بناء على المحتوى
                </h2>
              </div>
              <div className="">
                <SelectPicker data={dataSelect} />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center"
              }}
              className="row g-3"
            >
              <div className="col-lg-5">
                <div className="d-flex justify-content-between">
                  <div className="fs-6 fw-medium text-content--1">
                    <FiberManualRecordIcon style={{ color: "#4BE6C1" }} />{" "}
                    الباقة الاساسية
                  </div>{" "}
                  <div>410</div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div className="fs-6 fw-medium text-content--1">
                    <FiberManualRecordIcon style={{ color: "#4BD3E6" }} /> باقة
                    النمو
                  </div>{" "}
                  <div>410</div>
                </div>
                <div className="d-flex justify-content-between  mt-2">
                  <div className="fs-6 fw-medium text-content--1">
                    <FiberManualRecordIcon style={{ color: "#C6D2FD" }} />{" "}
                    الباقة الاحترافية
                  </div>{" "}
                  <div>410</div>
                </div>
                <div className="d-flex justify-content-between  mt-2">
                  <div className="fs-6 fw-medium text-content--1">
                    <FiberManualRecordIcon style={{ color: "#E0C6FD" }} /> باقة
                    التميز
                  </div>{" "}
                  <div>410</div>
                </div>
              </div>
              <div className="col-lg-7">
                <div style={{ width: "100%" }}>
                  <Pie data={data3} options={options3} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className={`${classes.ChartCard}`} style={{ padding: "35px" }}>
            <div className={`${classes.ChartCardHeader} b-0`}>
              <div>
                <p
                  className="fs-6 fw-medium text-content--1"
                  style={{ fontSize: "18px" }}
                >
                  المجتمع{" "}
                </p>
                <h2 className="d-flex align-items-end mt-2 fs-6 fw-medium text-content--1">
                  {" "}
                  معدل رضاء الطلاب
                </h2>
              </div>
            </div>

            <div className="BarPercentChart">
              <div className="data"></div>
              <div className="data"></div>
              <div className="data"></div>
              <div></div>
            </div>
            <div className="BarNumbers">
              <div className="SingleNumber">
                <div>
                  <h2 className="fs-6 fw-medium text-content--1">ممتاز</h2>
                  <span className="fs-6 fw-medium text-content--1">
                    {" "}
                    2,113 <img src={Happy} />{" "}
                  </span>
                </div>
              </div>
              <div className="SingleNumber">
                <div>
                  <h2 className="fs-6 fw-medium text-content--1">محايد</h2>
                  <span className="fs-6 fw-medium text-content--1">
                    {" "}
                    45 <img src={Neutral} />{" "}
                  </span>
                </div>
              </div>
              <div className="SingleNumber">
                <div>
                  <h2 className="fs-6 fw-medium text-content--1">غير راضي</h2>
                  <span className="fs-6 fw-medium text-content--1">
                    {" "}
                    16 <img src={Negative} />{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 mt-3">
        <div className="col-lg-6">
          <div className={`${classes.ChartCard}`} style={{ padding: "35px" }}>
            <div className={`${classes.ChartCardHeader} b-0`}>
              <div>
                <p
                  className="fs-6 fw-medium text-content--1"
                  style={{ fontSize: "18px" }}
                >
                  المبيعات{" "}
                </p>
                <h2 className="d-flex align-items-end mt-2 fs-6 fw-medium text-content--1">
                  {" "}
                  بناء على المحتوى
                </h2>
              </div>
              <div className=""></div>
            </div>
            <SemiCircleGaugeChart />
          </div>
        </div>
        <div className="col-lg-6">
          <div className={`${classes.ChartCard}`} style={{ padding: "35px" }}>
            <div className={`${classes.ChartCardHeader} b-0`}>
              <div>
                <p
                  className="fs-6 fw-medium text-content--1"
                  style={{ fontSize: "18px" }}
                >
                  باقة الاشتراك (الاحترافية){" "}
                </p>
                <h2 className="d-flex align-items-end mt-2 fs-6 fw-medium text-content--1">
                  {" "}
                  500.00 / شهر
                </h2>
              </div>
              <div className=""></div>
            </div>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndStatistics;
