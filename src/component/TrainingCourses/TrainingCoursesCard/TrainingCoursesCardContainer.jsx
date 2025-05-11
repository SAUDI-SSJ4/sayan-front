import { Link } from "react-router-dom";
import { MainSpinner } from "../../UI/MainSpinner";

// بيانات افتراضية لو لم يوجد كورسات
const FAKE_COURSES = [
  {
    id: "xx11",
    title: "أساسيات تطوير المواقع",
    image: "https://i.imgur.com/znpqLnH.png",
    academy: "أكاديمية المبرمج",
    academy_image: "https://i.imgur.com/0y0y0y0.png"
  },
  {
    id: "jj32",
    title: "الذكاء الاصطناعي للمبتدئين",
    image: "https://i.imgur.com/ZFaS4vT.png",
    academy: "مسار التقنية",
    academy_image: "https://i.imgur.com/WjsGU4G.png"
  },
  {
    id: "gg43",
    title: "تجربة المستخدم من الصفر للاحتراف",
    image: "https://i.imgur.com/F0BihN4.png",
    academy: "تصميم بلس",
    academy_image: "https://i.imgur.com/n1t6mmR.png"
  },
];

const TrainingCoursesCardContainer = ({ courses, isLoading }) => {
  // استخدم بيانات وهمية إذا لا توجد بيانات
  const displayCourses =
    Array.isArray(courses) && courses.length > 0 ? courses : FAKE_COURSES;

  return (
    <div
      style={{
        minHeight: 480,
        margin: "0 auto",
        padding: "0px"
      }}
      className="w-full"
    >
      {isLoading && (
        <div className="flex justify-center items-center h-70">
          <MainSpinner />
        </div>
      )}

      {!isLoading && (
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
          {displayCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ul>
      )}

      {!isLoading && (!courses || courses.length === 0) && (
        <div className="mt-10 text-center text-slate-600 font-semibold">
          <h2>لا توجد دورات تدريبية متاحة حالياً</h2>
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
      <Link
        to={`/student/Coursedetails/${course.id}`}
        className="flex flex-col h-full"
      >
        {/* صورة الدورة */}
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
            alt="Course Thumbnail"
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
        {/* التفاصيل النصية */}
        <div className="flex flex-col justify-between flex-grow p-4 gap-3">
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
          {/* بادج أو نوع الدورة */}
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
          {/* الأكاديمية */}
          <div className="flex items-center gap-3 mt-2">
            <img
              src={course.academy_image || "/images/placeholder-academy.png"}
              alt="Academy Logo"
              className="
                w-12 h-12
                rounded-full
                border border-[#e8f1f9]
                shadow-sm
                opacity-95 group-hover:opacity-100
                duration-200
                transition-opacity
              "
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/placeholder-academy.png";
              }}
            />
            <span
              className="
                text-base
                text-[#7E8799]
                group-hover:text-[#0062ff]
                font-medium
                transition-colors
              "
            >
              {course.academy}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};