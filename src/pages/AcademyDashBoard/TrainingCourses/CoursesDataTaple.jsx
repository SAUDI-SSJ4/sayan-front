import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAcademyCoursesThunk } from "../../../../redux/courses/CourseThunk";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const typeTranslations = {
  live: "مباشرة",
  recorded: "تفاعلية",
  attend: "حضورية",
};

const levelTranslations = {
  intermediate: "متوسط",
  advanced: "متقدم",
  beginner: "مبتدئ",
};

function CoursesDataTable({ CoursesData, academyId }) {
  const dispatch = useDispatch();

  const handleDelete = (courseId) => {
    Swal.fire({
      title: "حذف الدورة",
      text: "هل تريد بالتأكيد حذف هذه الدورة؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذفها!",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        const baseUrl = new URL(import.meta.env.VITE_SERVER_DEV).origin;

        axios
          .delete(`${baseUrl}/api/v1/academies/courses/${courseId}`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("academy_token")}`,
            },
          })
          .then(() => {
            Swal.fire("تم الحذف!", "تم حذف الدورة بنجاح", "success");
            dispatch(getAcademyCoursesThunk(academyId)).unwrap();
          })
          .catch(() => Swal.fire("خطأ", "حدث خطأ أثناء الحذف", "error"));
      }
    });
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-md bg-white border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-white text-blue-800 font-medium">
              <th className="py-4 px-3"></th>
              <th className="py-4 px-3">اسم المادة المادة</th>
              <th className="py-4 px-3">الفئة</th>
              <th className="py-4 px-3">النوع</th>
              <th className="py-4 px-3">المستوى</th>
              <th className="py-4 px-3">اسم المدرب</th>
              <th className="py-4 px-3">السعر</th>
              <th className="py-4 px-3 text-center rounded-tr-lg">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {CoursesData.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="p-3">
                  <div className="w-16 h-16 overflow-hidden rounded-lg mr-0">
                    <img
                      src={
                        course.image ||
                        `https://source.unsplash.com/random/200x200?${course.category}`
                      }
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-3 font-medium text-gray-900">
                  {course.title}
                </td>
                <td className="p-3 text-gray-700">{course.category}</td>
                <td className="p-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {typeTranslations[course.type] || course.type}
                  </span>
                </td>
                <td className="p-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {levelTranslations[course.level] || course.level}
                  </span>
                </td>
                <td className="p-3 text-gray-700">{course.trainer}</td>
                <td className="p-3 font-bold text-indigo-600">
                  {course.price.toLocaleString()} ريال
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-2">
                    <div className="relative group">
                      <Link to={`/academy/course/${course.id}/manage`}>
                        <button className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                          <FiEdit2 size={16} />
                        </button>
                      </Link>
                      <div className="absolute -top-10 right-1/2 transform translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        تعديل الدورة
                      </div>
                    </div>
                    <div className="relative group">
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                      <div className="absolute -top-10 right-1/2 transform translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        حذف الدورة
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {CoursesData.length === 0 && (
              <tr>
                <td colSpan="8" className="p-8 text-center text-gray-500">
                  لا توجد دورات متاحة حالياً
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoursesDataTable;
