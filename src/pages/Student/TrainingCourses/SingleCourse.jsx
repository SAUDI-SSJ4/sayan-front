import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import image from "../../../assets/images/bg.png";

const FAKE_COURSE = {
  title: "عنوان الدورة التدريبية",
  summary: "الملخص المختصر عن الدورة ويمكنك تحرير هذا النص كما تريد.",
  description: `هذا النص يمثل وصفًا حقيقيًا للدورة. بإمكانك تعديله كما ترغب ليتناسب مع محتواك ويكون شاملاً وعمليًا وقابلاً للقراءة السريعة من قبل الزائر أو المستخدم. هدفك الأساس أن تجعل من يزور الصفحة يهتم فعلا بالانضمام للدورة.`,
  category: ["الذكاء الاصطناعي", "البرمجة", "إدارة الأعمال"],
  academey: "أكاديمية ضوء",
  studentLevel: "جميع المستويات",
  price: "120.00 ر.س.",
  mode: "مباشرة غير تفاعلية",
  image,
  features: [
    "تم إعداد الاختبار الذكي بناءً على تحليل محتوى الدورة التدريبية.",
    "منهج متدرج يراعي احتياج المبتدئ والمتقدم.",
    "تمارين عملية مع تغذية راجعة فورية.",
  ],
};

const SingleCourse = ({ course = FAKE_COURSE }) => {
  return (
    <div className="py-6 w-full bg-[#f9fafc] min-h-[100vh]">
      {/* Header */}
      <div
        className="
          flex items-center justify-between
          max-w-[1150px] mx-auto mb-7 px-3 sm:px-6
        "
      >
        <div className="flex items-center gap-3">
          <PeopleAltIcon sx={{ color: "#A3AED0", fontSize: 30 }} />
          <span className="text-[#7695b6] text-lg font-semibold tracking-wide">
            المواد التعليمية
          </span>
        </div>
        <Link
          to="/courses"
          className="
            flex items-center gap-1 px-4 py-2 rounded-md bg-[#0062ff13] text-[#0f59ac]
            font-semibold text-base hover:bg-[#14a0ff13] transition-colors
          "
          style={{ boxShadow: "0 2px 10px #a6d8fc33" }}
        >
          <KeyboardBackspaceIcon sx={{ fontSize: 20, mr: 0.5 }} />
          الرجوع
        </Link>
      </div>

      {/* Content Container */}
      <div className="max-w-[1150px] mx-auto bg-white shadow-md rounded-3xl overflow-hidden">
        <div className="md:flex">
          {/* Main Image & Basic */}
          <div className="md:w-7/12 w-full bg-[#f8fafd] relative">
            <div className="relative w-full h-[310px] sm:h-[350px] md:h-[400px] flex items-end overflow-hidden">
              <img
                src={course.image}
                className="w-full h-full object-cover object-center shadow-md"
                style={{
                  borderTopRightRadius: "24px",
                  borderBottomRightRadius: "0px",
                }}
                alt="Course main"
              />
              <div
                className="absolute top-4 right-5 bg-[#f8fafdcc] px-3 py-1.5 rounded-lg text-[#0b5aaa] font-bold shadow-sm text-base"
                style={{ backdropFilter: "blur(2px)" }}
              >
                <SchoolOutlinedIcon
                  sx={{ fontSize: 19, color: "#0062ff", mr: 0.8 }}
                />
                {course.category && Array.isArray(course.category)
                  ? course.category[0]
                  : "غير محدد"}
              </div>
            </div>
            <div className="p-7 pr-9">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#173f73] leading-[110%]">
                {course.title}
              </h2>
              <p className="text-[#7e8799] text-base md:text-lg font-medium">
                {course.summary}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-5/12 w-full flex flex-col justify-between bg-white">
            <div className="p-6 pt-10 pb-6">
              {/* Course Basic Info */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#18396b] mb-1">
                  تفاصيل الدورة
                </h3>
                <p className="text-[#727e9a] text-[15.5px]">
                  {course.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 mb-7">
                {(course.category || []).map((cat, i) => (
                  <span
                    key={i}
                    className="bg-[#dfedff] text-[#0f87e6] font-semibold rounded-lg px-3 py-1 text-sm shadow"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              {/* Course Features */}
              <div className="mb-7">
                <h3 className="text-lg font-semibold text-[#1476c8] mb-3 mt-4">
                  سيتعلم الطالب من خلال هذه الدورة
                </h3>
                <ul className="space-y-3">
                  {(course.features || []).map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-[#6b7785] text-[16px] bg-[#f7fcff] p-3 rounded-xl border-l-4 border-[#0fe8e885] font-medium"
                    >
                      <CheckCircleIcon
                        sx={{ color: "#0FE8E8", fontSize: 22, mt: "1.5px" }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* CTA's */}
              <div className="flex justify-center gap-4 mb-2 mt-6">
                <button className="px-6 py-2.5 bg-gradient-to-l from-[#11e8de] to-[#14a0ff] hover:from-[#2cf0f0] hover:to-[#0062ff] text-white text-lg font-bold rounded-lg shadow transition">
                  تحديث المعلومات
                </button>
                <button className="px-6 py-2.5 bg-[#f8c6c6] text-[#e52323] font-bold text-lg rounded-lg shadow hover:bg-[#ffcfcf] border-2 border-[#eeaaaa] transition">
                  إزالة الدورة
                </button>
              </div>
            </div>
            {/* Side Card (Details) */}
            <div className="p-7 bg-[#f6fbff] rounded-2xl shadow-sm mx-6 mb-6">
              <div className="flex items-center mb-4 gap-2">
                <SchoolOutlinedIcon sx={{ color: "#0FE8E8", fontSize: 26 }} />
                <span className="font-bold text-[#2B3674] text-md">
                  {course.academey || "أكاديمية ضوء"}
                </span>
              </div>
              <div className="flex items-center mb-4 gap-2">
                <TrendingUpOutlinedIcon
                  sx={{ color: "#0FE8E8", fontSize: 26 }}
                />
                <span className="font-medium text-[#5275A6]">
                  مستوى الطالب:
                </span>
                <span className="ml-1 font-bold text-[#2067b2]">
                  {course.studentLevel}
                </span>
              </div>
              <div className="flex items-center mb-4 gap-2">
                <AttachMoneyOutlinedIcon
                  sx={{ color: "#0FE8E8", fontSize: 26 }}
                />
                <span className="font-medium text-[#5275A6]">السعر:</span>
                <span className="ml-1 font-bold text-[#2067b2]">
                  {course.price}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarTodayOutlinedIcon
                  sx={{ color: "#0FE8E8", fontSize: 26 }}
                />
                <span className="font-medium text-[#5275A6]">نوع الدورة:</span>
                <span className="ml-1 font-bold text-[#2067b2]">
                  {course.mode}
                </span>
              </div>
              {/* معاينة كطالب + زر */}
              <div className="flex flex-col gap-2 mt-5">
                <Link
                  to="/AffiliateMarketingSetting"
                  className="px-4 py-2 bg-[#eaf8ff] hover:bg-[#ddefff] rounded-lg font-semibold flex items-center gap-1 justify-center text-[#1380eb] shadow-sm transition"
                >
                  <RemoveRedEyeIcon sx={{ color: "#42BCF8" }} />
                  <span>معاينة كطالب</span>
                </Link>
                <Link
                  to="/AffiliateMarketingSetting"
                  className="px-4 py-2 bg-gradient-to-l from-[#2ef393] to-[#15c47b] hover:from-[#45f7b1] hover:to-[#17e8a0] rounded-lg font-semibold flex items-center gap-1 justify-center text-white shadow-sm transition"
                >
                  <CheckCircleIcon />
                  <span>ظهور الدورة التدريبية</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
