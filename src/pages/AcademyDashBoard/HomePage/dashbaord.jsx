import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Row, Col } from "react-bootstrap";
import { Loader } from "rsuite";
import AcademyHeader from "../Header/AcademyHeader";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import { getHome } from "../../../utils/apis/client";
import {
  FiUsers,
  FiBook,
  FiDollarSign,
  FiTrendingUp,
  FiCalendar,
  FiClock
} from "react-icons/fi";
import { Link } from "react-router-dom";
import SARIcon from "../../../components/SARIcon/SARIcon";

// Revenue Card Component
const RevenueCard = ({ totalRevenue, monthlyRevenue, growthRate }) => (
  <Card className="border-0 shadow-sm h-100">
    <Card.Body className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "48px",
            height: "48px",
            backgroundColor: "#10B98120",
          }}
        >
          <FiDollarSign size={24} className="text-success" />
        </div>
        <span className="badge rounded-pill px-2 py-1 d-flex align-items-center gap-1 bg-success bg-opacity-10 text-success">
          +{growthRate}%
          <FiTrendingUp size={14} />
        </span>
      </div>
      
      <h2 className="mb-1 fw-bold text-success d-flex align-items-center" style={{ fontSize: "1.75rem" }}>
        {totalRevenue}
        <SARIcon />
      </h2>
      <p className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
        إجمالي الإيرادات
      </p>
      
      <div className="border-top pt-3">
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted" style={{ fontSize: "0.85rem" }}>الإيرادات الشهرية</span>
          <span className="fw-semibold text-dark d-flex align-items-center">
            {monthlyRevenue}
            <SARIcon />
          </span>
        </div>
      </div>
    </Card.Body>
  </Card>
);

// Latest Courses Card Component
const LatestCoursesCard = ({ courses }) => (
  <Card className="border-0 shadow-sm h-100">
    <Card.Body className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="card-title mb-0 d-flex align-items-center gap-2">
          <FiBook className="text-primary" />
          أحدث الدورات
        </h5>
        <Link to="/academy/training-courses" className="btn btn-sm btn-primary px-3">
          عرض الكل
        </Link>
      </div>
      
      {courses && courses.length > 0 ? (
        <div className="course-list">
          {courses.slice(0, 4).map((course, idx) => (
            <div
              key={idx}
              className="d-flex align-items-center gap-3 mb-3 p-3 rounded"
              style={{ backgroundColor: idx % 2 === 0 ? "#f8fafc" : "white" }}
            >
              <img
                src={course.image}
                alt={course.title}
                className="rounded"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
              <div className="flex-grow-1">
                <h6 className="mb-1 text-truncate">{course.title}</h6>
                <div className="d-flex mt-1 align-items-center justify-content-between">
                  <small className="text-muted d-flex align-items-center gap-1">
                    <FiUsers size={12} /> {course.enrolled || 0} طالب
                  </small>
                  <span className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center">
                    {course.price}
                    <SARIcon />
                  </span>
                </div>
                <small className="text-muted">{course.level || "جميع المستويات"}</small>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 text-muted">
          <FiBook size={48} className="mb-3" />
          <p className="mb-0">لا توجد دورات حالياً</p>
          <Link to="/academy/training-courses" className="btn btn-primary btn-sm mt-2">
            إضافة دورة جديدة
          </Link>
        </div>
      )}
    </Card.Body>
  </Card>
);

// Recent Activities Component
const RecentActivities = ({ activities }) => (
  <Card className="border-0 shadow-sm h-100">
    <Card.Body className="p-4">
      <h5 className="card-title mb-4 d-flex align-items-center gap-2">
        <FiClock className="text-primary" />
        النشاطات الأخيرة
      </h5>
      
      {activities && activities.length > 0 ? (
        <div className="timeline">
          {activities.slice(0, 6).map((activity, idx) => (
            <div key={idx} className="timeline-item mb-3 pb-3 position-relative">
              <div className="d-flex">
                <div className="timeline-icon me-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "#e0e7ff",
                      position: "relative",
                      zIndex: 1
                    }}
                  >
                    <FiCalendar className="text-primary" size={16} />
                  </div>
                </div>
                <div className="timeline-content">
                  <h6 className="mb-1" style={{ fontSize: "0.9rem" }}>{activity.title}</h6>
                  <p className="text-muted mb-1" style={{ fontSize: "0.8rem" }}>
                    {activity.description}
                  </p>
                  <small className="text-muted" style={{ fontSize: "0.75rem" }}>{activity.time}</small>
                </div>
              </div>
              {idx !== activities.length - 1 && (
                <div 
                  className="timeline-line" 
                  style={{
                    position: "absolute",
                    top: "36px",
                    left: "18px",
                    bottom: "0",
                    width: "2px",
                    backgroundColor: "#e0e7ff",
                    zIndex: 0
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 text-muted">
          <FiClock size={48} className="mb-3" />
          <p className="mb-0">لا توجد نشاطات حديثة</p>
        </div>
      )}
    </Card.Body>
  </Card>
);

const AcademyDashboard = () => {
  const { data: homeData, isLoading } = useQuery({
    queryKey: ["getHome"],
    queryFn: getHome,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000,
  });

  if (isLoading) {
    return (
      <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
        <Loader size="lg" />
      </div>
    );
  }

  const courses = homeData?.allCourses || [];
  const totalRevenue = courses.reduce((sum, course) => sum + (course.price * (course.enrolled || 0)), 0);
  
  // حساب الإيرادات الشهرية (افتراضياً 30% من الإجمالي)
  const monthlyRevenue = Math.round(totalRevenue * 0.3);
  const growthRate = 15; // نسبة نمو افتراضية
  
  // ترتيب الدورات حسب تاريخ الإنشاء (الأحدث أولاً)
  const latestCourses = courses.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  
  // بيانات النشاطات الأخيرة - يمكن استبدالها ببيانات حقيقية من API
  const recentActivities = [
    { title: "تم إضافة دورة جديدة", description: "تم إضافة دورة البرمجة بلغة JavaScript", time: "منذ ساعتين" },
    { title: "تسجيل طالب جديد", description: "انضم أحمد محمد إلى دورة تطوير الويب", time: "منذ 3 ساعات" },
    { title: "تحديث محتوى", description: "تم تحديث محتوى دورة التصميم الجرافيكي", time: "منذ 5 ساعات" },
    { title: "إضافة شهادة", description: "تم إضافة شهادة جديدة لدورة التسويق الرقمي", time: "منذ يوم" },
    { title: "تقييم جديد", description: "تلقت دورة إدارة المشاريع تقييم 5 نجوم", time: "منذ يومين" },
    { title: "اكتمال دورة", description: "أكمل 15 طالب دورة أساسيات البرمجة", time: "منذ 3 أيام" }
  ];

  return (
    <Fragment>
      <AcademyHeader academy />
      <div className="px-3 pt-4 pb-5">
        <HeaderAcademy title="لوحة التحكم" />
        
        <Row className="g-4 mt-2">
          {/* بيانات الإيرادات */}
          <Col lg={4}>
            <RevenueCard 
              totalRevenue={totalRevenue}
              monthlyRevenue={monthlyRevenue}
              growthRate={growthRate}
            />
          </Col>
          
          {/* أحدث الدورات */}
          <Col lg={4}>
            <LatestCoursesCard courses={latestCourses} />
          </Col>
          
          {/* النشاطات الأخيرة */}
          <Col lg={4}>
            <RecentActivities activities={recentActivities} />
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default AcademyDashboard;
