import StudentDashboardHeader from "../../../component/dashboard/Header/StudentHeader";
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
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import prest from "../../../assets/icons/presntation.svg";
import Assigned from "../../../assets/icons/Assigned.png";
import MixedArea from "../../../component/charts/mixedArea";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStudentHome } from "../../../utils/apis/client";

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

const StudentDashboard = () => {
  const { data: studentHeader, isLoading } = useQuery({
    queryKey: ["StudentHome"],
    queryFn: () => getStudentHome(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    cacheTime: 1000,
  });

  const chartOptions = useMemo(
    () => ({
      plugins: {
        legend: {
          position: "bottom",
          rtl: true,
        },
      },
      responsive: true,
      scales: {
        x: {
          display: false,
        },
        y: {
          display: true,
          stacked: true,
        },
      },
    }),
    []
  );

  const chartData = useMemo(
    () => ({
      labels: ["January", "February", "March", "April", "May", "June", "July", "August"],
      datasets: [
        {
          label: "لم يقوموا بالتسجيل",
          data: [400, 370, 330, 390, 320, 350, 360, 200],
          backgroundColor: "#A290FF",
          barBorderRadius: 50,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
        },
      ],
    }),
    []
  );


  return (
    <div>
      {studentHeader && <StudentDashboardHeader StudentData={studentHeader} />}
      <div className="row mt-5">
        <div className="col-lg-6 mt-3">
          <div
            className={`${classes.ChartCard}`}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <img src={prest} />
              <div>
                <p
                  style={{
                    margin: "0px",
                    fontSize: "18px",
                    color: "#7E8799",
                    marginBottom: "8px",
                  }}
                >
                  دورة تدريبية قادمة
                </p>
                <h2
                  style={{
                    margin: "0px",
                    fontSize: "22px",
                    color: "#2B3674",
                    lineHeight: "1.2",
                  }}
                >
                  عنوان الدورة
                </h2>
              </div>
            </div>
            <h2
              style={{
                margin: "0px",
                fontSize: "22px",
                color: "#2B3674",
                lineHeight: "1.2",
                marginTop: "32px",
              }}
            >
              عنوان الفصل للدورة التدريبية
            </h2>
            <div className="mt-5 d-flex justify-content-between">
              <img src={Assigned} className="object-fit-contain" />
              <div className="addBtn">الدخول</div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mt-3">
          <div className={`${classes.ChartCard} card-detials-chart`}>
            <div className={`${classes.ChartCardHeader} card-detials-chart-info`}>
              <div>
                <p>احصائيات</p>
                <h2> برنامج التسويق بالعمولة </h2>
              </div>
            </div>
            <Bar options={chartOptions} data={chartData} />
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-7">
          <div className={`${classes.ChartCard}`}>
            <div
              className={`${classes.ChartCardHeader} b-0 card-chart--1`}
              style={{ border: "none" }}
            >
              <div>
                <p style={{ fontSize: "18px" }}>باقات الاشتراك</p>
                <h2 className="d-flex align-items-end mt-2">
                  12,563 <p> مشترك</p>{" "}
                </h2>
              </div>
              <div className="">
                <h2 style={{ fontSize: "34px" }}> 5,773</h2>
                <p style={{ fontSize: "20px" }}>زائر/خلال هذا الاسبوع</p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className=" w-100">
                <MixedArea />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
