import DashboardHeader from "../../component/dashboard/Header/Header";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import classes from "./dasahboard.module.scss";
import useImage from "../../assets/images/userimg.png";
import Image1 from "./../../assets/images/Image.png";
import PersonIcon from "@mui/icons-material/Person";
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
import SchoolIcon from "@mui/icons-material/School";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import EmployeeCard from "../../component/dashboard/emploeeCard/EmployeeCard";
import FirstCard from "../../component/dashboard/firstCard/firstCard";
import { Dropdown } from "rsuite";

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
const Dashboard = () => {
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
        display: true
      },
      y: {
        display: false
      }
    }
  };

  const data2 = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [400, 370, 330, 390, 320, 350, 360, 200],
        borderColor: "#6A8BFF",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4
      },
      {
        label: "Dataset 2",
        data: [700, 600, 500, 450, 680, 570, 600, 410],
        borderColor: "#05CD99",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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
        backgroundColor: ["#4BE6C1", "#E0C6FD", "#C6D2FD", "#4BD3E6"],
        borderColor: ["#4BE6C1", "#E0C6FD", "#C6D2FD", "#4BD3E6"],
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
      arc: {
        spacing: 30,
        borderRadius: 15 // Adjust the border radius as needed
      },
      responsive: true
    }
  };
  return (
    <div>
      <DashboardHeader />
      <div className="row mt-5">
        <div className="col-lg-6 mt-3">
          <div className={`${classes.ChartCard}`}>
            <div className={`${classes.ChartCardHeader} flex-wrap gap-3`}>
              <div>
                <p className="text-content--1">احصائيات</p>
                <h2 className="title-text--1"> زوار المنصة</h2>
              </div>
              <div className="d-flex align-items-end gap-2">
                <h2 className="text-content--1" style={{ fontSize: "25px" }}>
                  {" "}5,773
                </h2>
                <p className="title-text--1" style={{ fontSize: "18px" }}>
                  زائر/خلال هذا الاسبوع
                </p>
              </div>
            </div>
            <Bar options={options} data={data} />
          </div>
        </div>
        <div className="col-lg-6 mt-3">
          <div className={`${classes.ChartCard}`}>
            <div className={`${classes.ChartCardHeader} flex-wrap  gap-3`}>
              <div>
                <p className="text-content--1">احصائيات</p>
                <h2 className="title-text--1"> زوار المنصة</h2>
              </div>
              <div className="d-flex align-items-end gap-2">
                <h2 className="title-text--1" style={{ fontSize: "22px" }}>
                  {" "}5,773
                </h2>
                <p className="text-content--1" style={{ fontSize: "17px" }}>
                  زائر/خلال هذا الاسبوع
                </p>
              </div>
            </div>
            <Line options={options2} data={data2} />
          </div>
        </div>
      </div>
      <div className="row mt-3 g-3">
        <div className="col-lg-8">
          <div className={`${classes.ChartCard}`}>
            <div
              className={`${classes.ChartCardHeader} b-0 flex-wrap  gap-3`}
              style={{ border: "none" }}
            >
              <div>
                <p className="text-content--1" style={{ fontSize: "18px" }}>
                  باقات الاشتراك
                </p>
                <h2
                  className="title-text--1 d-flex align-items-end mt-2 gap-2 align-items-center"
                  
                >
                  {" "}12,563 <p> مشترك</p>{" "}
                </h2>
              </div>
              <div className="d-flex flex-column gap-2">
                <h2 className="text-content--1" style={{ fontSize: "24px" }}>
                  {" "}5,773
                </h2>
                <p className="title-text--1" style={{ fontSize: "17px" }}>
                  زائر/خلال هذا الاسبوع
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div className="Doughnut">
                <Doughnut data={data3} options={options3} />
              </div>
              <div className="DoughnutLegned">
                <div className="d-flex justify-content-between">
                  <div className="title-text--1">
                    <FiberManualRecordIcon style={{ color: "#4BE6C1" }} />{" "}
                    الباقة الاساسية
                  </div>{" "}
                  <div>410</div>
                </div>
                <div className="d-flex justify-content-between mt-2 gap-2 flex-wrap">
                  <div>
                    <FiberManualRecordIcon style={{ color: "#4BD3E6" }} /> باقة
                    النمو
                  </div>{" "}
                  <div>410</div>
                </div>
                <div className="d-flex justify-content-between  mt-2 gap-2 flex-wrap">
                  <div>
                    <FiberManualRecordIcon style={{ color: "#C6D2FD" }} />{" "}
                    الباقة الاحترافية
                  </div>{" "}
                  <div>410</div>
                </div>
                <div className="d-flex justify-content-between  mt-2 gap-2 flex-wrap">
                  <div>
                    <FiberManualRecordIcon style={{ color: "#E0C6FD" }} /> باقة
                    التميز
                  </div>{" "}
                  <div>410</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className={`${classes.ChartCard} `} style={{ height: " 100%" }}>
            <div className="d-flex justify-content-between gap-2 flex-wrap">
              <h2
                className="title-text--1"
                style={{ color: "#2B3674", fontSize: "16px", fontWeight: 700 }}
              >
                فريق سيان
              </h2>
              <div>
                <AddCircleIcon sx={{ color: "#0062FF" }} />
              </div>
            </div>
            <div>
              <EmployeeCard
                name={"نور مدحت"}
                title={"مدير المشروع"}
                img={useImage}
              />
              <EmployeeCard
                name={" مختار علي"}
                title={" المدير التقني"}
                img={useImage}
              />
              <EmployeeCard
                name={" حمدي محمد "}
                title={" مبرمج "}
                img={useImage}
              />
              <EmployeeCard
                name={"  عمر شكري "}
                title={" مبرمج "}
                img={useImage}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3 g-3">
        <div className="col-lg-8 ">
          <div className="row g-3">
            <div className="col-lg-6">
              <FirstCard image={Image1} />
            </div>
            <div className="col-lg-6">
              <FirstCard image={Image1} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className={`${classes.sideCard} card-side-one`}>
            <div>
              <h2 className="fs-6 fw-medium title-text--1">
                الاكاديمية الاكثر تميزاً
              </h2>
              <div className={classes.Dropdown}>
                <Dropdown title="هذا الشهر" style={{ color: "#1E02AA" }}>
                  <Dropdown.Item> قبراير</Dropdown.Item>
                  <Dropdown.Item>يناير</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center gap-2">
              <img src={Image1} className="image-card-side" />
              <div className={`${classes.Text} title-text--1 d-flex align-items-center flex-wrap gap-2`}>
                <SchoolIcon />
                اسم الاكاديمية
              </div>
            </div>
          </div>
          <div className={`${classes.sideCard} card-side-one`}>
            <div>
              <h2 className="title-text--1"> الطالب الاكثر تميزاً</h2>
              <div className={classes.Dropdown}>
                <Dropdown title="هذا الشهر" style={{ color: "#1E02AA" }}>
                  <Dropdown.Item> قبراير</Dropdown.Item>
                  <Dropdown.Item>يناير</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center gap-2">
              <img src={Image1} className="image-card-side" />
              <div
                className={`${classes.Text} text-content--1 d-flex align-items-center gap-2 flex-wrap `}
              >
                <PersonIcon />
                اسم الطالب
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
