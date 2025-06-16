import { Link } from "react-router-dom";
import { MainSpinner } from "../../UI/MainSpinner";

const TrainingCoursesCardContainer = ({ courses, isLoading }) => {
  // التحقق من وجود دورات صالحة
  const hasValidCourses = Array.isArray(courses) && courses.length > 0;

  return (
    <div
      style={{
        minHeight: 480,
        margin: "0 auto",
        padding: "0px",
      }}
      className="w-full"
    >
      {isLoading && (
        <div className="flex justify-center items-center h-70">
          <MainSpinner />
        </div>
      )}

      {!isLoading && hasValidCourses && (
        <ul
          className="
            grid gap-7 md:gap-7
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            list-none
            p-0 m-0 mt-5
          "
          style={{ direction: "rtl" }}
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ul>
      )}

      {!isLoading && !hasValidCourses && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 20px",
          textAlign: "center",
          background: "linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)",
          borderRadius: "20px",
          border: "2px dashed #87ceeb",
          margin: "20px 0"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            boxShadow: "0 8px 32px rgba(74, 144, 226, 0.3)"
          }}>
            <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </svg>
          </div>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#2c3e50",
            marginBottom: "12px",
          }}>
            📚 لا توجد مواد تعليمية مسجل بها حالياً
          </h2>
          <p style={{
            fontSize: "16px",
            color: "#64748b",
            lineHeight: "1.6",
            marginBottom: "20px",
            maxWidth: "400px",
          }}>
            استكشف المواد التعليمية المتاحة وابدأ رحلة تعلمك! يمكنك تصفح المواد والتسجيل في المواد التعليمية التي تناسب اهتماماتك وأهدافك التعليمية.
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: "rgba(74, 144, 226, 0.1)",
            borderRadius: "50px",
            color: "#4a90e2",
            fontSize: "14px",
            fontWeight: "600",
          }}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
ابحث عن المواد التعليمية المتاحة في المتجر          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCoursesCardContainer;

// === الكارد مخصص احترافي جداً ===
const CourseCard = ({ course }) => {
  return (
    <li
      className="
        bg-white
        border border-[#E5EAF7]
        rounded-[20px]
        shadow-md
        hover:shadow-xl
        transition-all duration-200
        flex flex-col
        overflow-hidden
        min-h-[390px]
        group
        cursor-pointer
      "
      style={{
        boxShadow: "0 6px 33px 0 rgba(40, 84, 150, 0.10)",
      }}
    >
              {/* صورة المادة التعليمية */}
      <Link to={`/student/Coursedetails/${course.id}`}>
        <div
          className="w-full bg-[#F6FAFE] relative"
          style={{
            minHeight: 230,
            maxHeight: 230,
            overflow: "hidden",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <img
            src={course.image || "/images/placeholder-course.png"}
            alt="Material Thumbnail"
            className="
              w-full h-[225px]
              object-cover
              rounded-tr-[20px] rounded-tl-[20px]
              group-hover:scale-105
              duration-200
              transition-transform
              bg-[#F2F6FB]
            "
            loading="lazy"
            style={{ background: "#eaf3ff" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/placeholder-course.png";
            }}
          />
        </div>
      </Link>
      
      {/* التفاصيل النصية */}
      <div className="flex flex-col justify-between flex-grow p-4 gap-3">
        <Link to={`/student/Coursedetails/${course.id}`}>
          <h3
            className="
              text-lg md:text-xl
              text-[#2B3674]
              font-bold
              hover:text-[#0062ff]
              transition-colors
              line-clamp-2
              mb-1
            "
            title={course.title}
            style={{ minHeight: 48 }}
          >
            {course.title}
          </h3>
        </Link>
        
        {/* بادج أو نوع المادة */}
        <span
          className="
            bg-[#0FE8E819]
            text-[#0FE8E8]
            rounded-[15px]
            px-4 py-2
            inline-block
            text-center
            font-semibold
            tracking-wide
            text-sm
          "
          style={{ width: 96 }}
        >
          تفاعلية
        </span>
        
        {/* الأكاديمية - رابط منفصل */}
        <div className="flex items-center gap-3 mt-2">
          <Link 
            to={`/academy/${course.academy_id || 'default'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={course.academy_image || "/images/placeholder-academy.png"}
              alt="Academy Logo"
              className="
                w-12 h-12
                rounded-full
                border border-[#e8f1f9]
                shadow-sm
                opacity-95 hover:opacity-100
                duration-200
                transition-opacity
                cursor-pointer
                hover:border-[#0062ff]
              "
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/placeholder-academy.png";
              }}
            />
          </Link>
          <Link 
            to={`/acdemy/${course.academy_id || 'default'}`}
            onClick={(e) => e.stopPropagation()}
            className="no-underline"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="
                text-base
                text-[#7E8799]
                hover:text-[#0062ff]
                font-medium
                transition-colors
                cursor-pointer
              "
            >
              {course.academy}
            </span>
          </Link>
        </div>
      </div>
    </li>
  );
};
