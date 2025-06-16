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
import { useMemo, useCallback } from "react";
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
    })),
    faved: randomInt(0, 50),
    refered: randomInt(0, 100),
    latest_products: Array.from({ length: randomInt(1, 3) }, (_, i) => ({
      id: `product_${i}_${Date.now()}`,
      name: `منتج ${i+1}`,
      price: randomInt(50, 500)
    })),
    nextCourse: {
      title: courseTitles[randomInt(0, courseTitles.length - 1)],
      chapterTitle: chapterTitles[randomInt(0, chapterTitles.length - 1)],
    },
    student_courses: {
      January: randomInt(0, 10),
      February: randomInt(0, 10),
      March: randomInt(0, 10),
      April: randomInt(0, 10),
      May: randomInt(0, 10),
      June: randomInt(0, 10),
      July: randomInt(0, 10),
      August: randomInt(0, 10),
      September: randomInt(0, 10),
      October: randomInt(0, 10),
      November: randomInt(0, 10),
      December: randomInt(0, 10),
    }
  };
};

// مكون هيكل عظمي للنص
const TextSkeleton = ({ width = "100px", height = "20px", className = "" }) => (
  <div
    className={className}
    style={{
      width,
      height,
      backgroundColor: "#e0e0e0",
      borderRadius: "4px",
      margin: "4px 0",
      display: 'inline-block',
    }}
    aria-busy="true"
    aria-live="polite"
  />
);

const StudentDashboard = () => {
  const { data: studentData, isLoading, isError } = useQuery({
    queryKey: ["StudentHome"],
    queryFn: getStudentHome,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  // توليد بيانات وهمية عند الخطأ
  const mockData = useMemo(() => {
    if (isError) {
      console.log("Error fetching data, generating mock data.");
      return generateRandomMockData();
    }
    return null;
  }, [isError]);

  // البيانات الفعلية أو البيانات الوهمية عند الخطأ
  const displayData = useMemo(() => {
    if (isError && mockData) {
      return mockData;
    }
    return studentData || {};
  }, [studentData, isError, mockData]);

  // إعداد خيارات الرسم البياني
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

          // إعداد بيانات الرسم البياني للإحصائيات الشهرية للمواد التعليمية
  const barChartData = useMemo(() => {
    const studentCourses = displayData?.student_courses || {};
    const monthsInArabic = {
      January: "يناير",
      February: "فبراير",
      March: "مارس",
      April: "أبريل",
      May: "مايو",
      June: "يونيو",
      July: "يوليو",
      August: "أغسطس",
      September: "سبتمبر",
      October: "أكتوبر",
      November: "نوفمبر",
      December: "ديسمبر"
    };
    
    const labels = Object.keys(studentCourses)
      .filter(month => monthsInArabic[month])
      .map(month => monthsInArabic[month]);
      
    const dataPoints = Object.values(studentCourses);
    
    return {
      labels: labels.length > 0 ? labels : ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس"],
      datasets: [
        {
          label: "المواد التعليمية المسجلة",
          data: dataPoints.length > 0 ? dataPoints : Array(8).fill(0).map(() => Math.floor(Math.random() * 100)),
          backgroundColor: "#A290FF",
          barBorderRadius: 50,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
        },
      ],
    };
  }, [displayData]);

  // بيانات النشاط الأسبوعي (مزيج من بيانات افتراضية لتوضيح الرسم البياني)
  const mixedAreaData = useMemo(() => {
    return {
      labels: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
      datasets: [
        {
          label: 'زيارات للمواد التعليمية',
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 45) + 5),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          type: 'line',
        },
        {
          label: 'مشاهدات الدروس',
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 400) + 100),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
  }, []);

  // الحصول على الدورة التدريبية التالية (إذا وجدت)
  const nextCourse = useMemo(() => {
    if (!displayData?.latest_courses || displayData.latest_courses.length === 0) {
      return null;
    }
    
    // استخدام أول دورة من latest_courses كدورة تالية
    const course = displayData.latest_courses[0];
    return {
      title: course.title || "لا توجد دورة قادمة",
      chapterTitle: "الفصل التالي" // يمكن تعديله حسب البيانات المتاحة
    };
  }, [displayData]);

  // الحصول على عدد المشتريات (المنتجات)
  const purchasesCount = useMemo(() => {
    return displayData?.payments || 0;
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
                  مادة تعليمية قادمة
                </p>
                <h2 style={{ margin: 0, fontSize: "22px", color: "#2B3674", lineHeight: "1.2" }}>
                  {isLoading ? (
                    <TextSkeleton width="150px" />
                  ) : (
                    nextCourse?.title || "لا توجد دورة قادمة"
                  )}
                </h2>
              </div>
            </div>
            <h2 style={{ margin: "32px 0 0", fontSize: "22px", color: "#2B3674", lineHeight: "1.2" }}>
              {isLoading ? (
                <TextSkeleton width="200px" />
              ) : (
                nextCourse?.chapterTitle || "لا يوجد فصل محدد"
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
                <h2>إحصائيات المواد التعليمية</h2>
              </div>
            </div>
            {isLoading && !isError ? (
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
                <p style={{ fontSize: "18px" }}>موادي التعليمية</p>
                <h2 className="d-flex align-items-end mt-2">
                  {isLoading ? (
                    <TextSkeleton width="80px" />
                  ) : (
                    displayData?.courses ?? "0"
                  )}
                  <p style={{ marginLeft: "5px" }}> دورة</p>
                </h2>
              </div>
              <div>
                <h2 style={{ fontSize: "34px" }}>
                  {isLoading ? (
                     <TextSkeleton width="100px" />
                  ) : (
                    displayData?.faved ?? "0"
                  )}
                </h2>
                <p style={{ fontSize: "20px" }}>دورة مفضلة</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="w-100">
                <MixedArea
                  isLoading={isLoading && !isError}
                  data={mixedAreaData}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5 mt-3">
          <div className={`${classes.ChartCard} d-flex flex-column justify-content-center align-items-center h-100`}>
            <div className="text-center">
              <div className="d-flex align-items-center justify-content-center" 
                   style={{ 
                     width: "80px", 
                     height: "80px", 
                     borderRadius: "50%", 
                     backgroundColor: "#e94e9c", 
                     margin: "0 auto 20px auto" 
                   }}>
                <i className="bi bi-bag" style={{ fontSize: "32px", color: "white" }}></i>
              </div>
              <h2 style={{ fontSize: "24px", color: "#2B3674" }}>المشتريات المكتملة</h2>
              <h1 style={{ fontSize: "42px", fontWeight: "bold", color: "#2B3674" }}>
                {isLoading ? (
                  <TextSkeleton width="60px" height="50px" />
                ) : (
                  purchasesCount
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;