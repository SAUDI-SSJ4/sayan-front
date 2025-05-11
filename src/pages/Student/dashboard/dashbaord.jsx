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
import { useMemo, useCallback } from "react"; // Added useCallback
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

// دالة لتوليد بيانات وهمية عشوائية
const generateRandomMockData = () => {
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const courseTitles = ["مقدمة في علوم الحاسوب", "تطوير تطبيقات الويب", "أساسيات الذكاء الاصطناعي", "تحليل البيانات باستخدام Python", "تصميم واجهات المستخدم UX/UI"];
  const chapterTitles = ["الفصل الأول: المفاهيم الأساسية", "الوحدة الثانية: الأدوات والتقنيات", "المشروع العملي", "مراجعة شاملة", "الاختبار النهائي"];
  const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

  return {
    courses: randomInt(0, 20),
    latest_courses: Array.from({ length: randomInt(1, 5) }, (_, i) => ({
      id: `course_${i}_${Date.now()}`,
      name: `دورة حديثة ${i + 1} - ${courseTitles[randomInt(0, courseTitles.length - 1)]}`,
      // ... أي خصائص أخرى للدورات الحديثة
    })),
    faved: randomInt(0, 50),
    nextCourse: {
      title: courseTitles[randomInt(0, courseTitles.length - 1)],
      chapterTitle: chapterTitles[randomInt(0, chapterTitles.length - 1)],
    },
    referralStats: {
      label: "المسجلون عبر الرابط",
      labels: months.slice(0, 8), // مثال لـ 8 أشهر
      dataPoints: Array.from({ length: 8 }, () => randomInt(50, 500)),
    },
    subscriptionStats: {
      subscribers: randomInt(1000, 20000),
      visitorsThisWeek: randomInt(1000, 10000),
    },
    // يمكنك إضافة بيانات وهمية لـ mixedAreaData إذا لزم الأمر
    mixedAreaData: {
        // ... هيكل بيانات وهمية لـ MixedArea
        labels: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        datasets: [
            {
                label: 'اشتراكات جديدة',
                data: Array.from({ length: 7 }, () => randomInt(5, 50)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                type: 'line',
            },
            {
                label: 'زيارات الموقع',
                data: Array.from({ length: 7 }, () => randomInt(100, 500)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    },
    // أضف أي خصائص أخرى تتوقعها من getStudentHome()
  };
};


// مثال لمكون هيكل عظمي بسيط للنص
const TextSkeleton = ({ width = "100px", height = "20px", className = "" }) => (
  <div
    className={className}
    style={{
      width,
      height,
      backgroundColor: "#e0e0e0",
      borderRadius: "4px",
      margin: "4px 0",
      display: 'inline-block', // لجعله يتماشى مع النص
    }}
    aria-busy="true"
    aria-live="polite"
  />
);

const StudentDashboard = () => {
  const { data: studentHeader, isLoading, isError } = useQuery({
    queryKey: ["StudentHome"],
    queryFn: () => getStudentHome(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false, // مهم: لمنع إعادة المحاولة عند الخطأ إذا كنا سنعرض بيانات وهمية
  });

  // نستخدم useMemo لتوليد البيانات الوهمية مرة واحدة فقط عند حدوث خطأ (أو عند تحميل المكون إذا لم يكن هناك خطأ بعد)
  // ونعيد توليدها إذا تغير isError من false إلى true
  const mockData = useMemo(() => {
    if (isError) {
      console.log("Error fetching data, generating mock data.");
      return generateRandomMockData();
    }
    return null; // لا بيانات وهمية إذا لم يكن هناك خطأ
  }, [isError]);


  // البيانات الفعلية أو البيانات الوهمية عند الخطأ، أو كائن فارغ أثناء التحميل
  const displayData = useMemo(() => {
    if (isError && mockData) {
      return mockData;
    }
    return studentHeader?.data || {};
  }, [studentHeader, isError, mockData]);


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

  const barChartData = useMemo(() => {
    const stats = displayData?.referralStats || { labels: [], dataPoints: [], label: "إحصائيات" };
    return {
      labels: stats.labels.length > 0 ? stats.labels : ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس"],
      datasets: [
        {
          label: stats.label,
          data: stats.dataPoints.length > 0 ? stats.dataPoints : Array(8).fill(0).map(() => Math.floor(Math.random() * 100)),
          backgroundColor: "#A290FF",
          barBorderRadius: 50,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
        },
      ],
    };
  }, [displayData]);


  return (
    <div>
      <StudentDashboardHeader StudentData={displayData} />

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
              <img src={prest} alt="presentation icon" />
              <div>
                <p style={{ margin: 0, fontSize: "18px", color: "#7E8799", marginBottom: "8px" }}>
                  دورة تدريبية قادمة
                </p>
                <h2 style={{ margin: 0, fontSize: "22px", color: "#2B3674", lineHeight: "1.2" }}>
                  {isLoading && !displayData?.nextCourse?.title ? (
                    <TextSkeleton width="150px" />
                  ) : (
                    displayData?.nextCourse?.title || (isError ? "عنوان دورة وهمي" : "لا توجد دورة قادمة")
                  )}
                </h2>
              </div>
            </div>
            <h2 style={{ margin: "32px 0 0", fontSize: "22px", color: "#2B3674", lineHeight: "1.2" }}>
              {isLoading && !displayData?.nextCourse?.chapterTitle ? (
                <TextSkeleton width="200px" />
              ) : (
                displayData?.nextCourse?.chapterTitle || (isError ? "فصل وهمي للدورة" : "لا يوجد فصل محدد")
              )}
            </h2>
            <div className="mt-5 d-flex justify-content-between">
              <img src={Assigned} className="object-fit-contain" alt="assigned icon" />
              <div className="addBtn">الدخول</div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mt-3">
          <div className={`${classes.ChartCard} card-detials-chart`}>
            <div className={`${classes.ChartCardHeader} card-detials-chart-info`}>
              <div>
                <p>احصائيات</p>
                <h2>برنامج التسويق بالعمولة</h2>
              </div>
            </div>
            {(isLoading && !displayData?.referralStats) && !isError ? ( // فقط أثناء التحميل وليس عند الخطأ
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
                 <TextSkeleton width="90%" height="180px" />
              </div>
            ) : (
              <Bar options={chartOptions} data={barChartData} />
            )}
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
                  {isLoading && displayData?.subscriptionStats?.subscribers === undefined && !isError ? (
                    <TextSkeleton width="80px" />
                  ) : (
                    displayData?.subscriptionStats?.subscribers ?? (isError ? Math.floor(Math.random()*5000) : "0")
                  )}
                  <p style={{ marginLeft: "5px" }}> مشترك</p>
                </h2>
              </div>
              <div>
                <h2 style={{ fontSize: "34px" }}>
                  {isLoading && displayData?.subscriptionStats?.visitorsThisWeek === undefined && !isError ? (
                     <TextSkeleton width="100px" />
                  ) : (
                    displayData?.subscriptionStats?.visitorsThisWeek ?? (isError ? Math.floor(Math.random()*1000) : "0")
                  )}
                </h2>
                <p style={{ fontSize: "20px" }}>زائر/خلال هذا الاسبوع</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="w-100">
                <MixedArea
                  isLoading={isLoading && !isError} // مرر حالة التحميل فقط إذا لم يكن هناك خطأ
                  data={displayData?.mixedAreaData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;