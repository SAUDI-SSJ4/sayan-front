import React, { useEffect, useState } from "react";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiUserPlus } from "react-icons/fi";
import { academy_client } from "../../../utils/apis/client.config";
import Swal from "sweetalert2";

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTrainers = async () => {
    try {
      const { data } = await academy_client.get("/trainer");
      setTrainers(data?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "حدث خطأ في جلب بيانات المدربين");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDelete = (trainerId) => {
    Swal.fire({
      title: "حذف المدرب",
      text: "هل أنت متأكد من حذف هذا المدرب؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await academy_client.delete(`/trainer/${trainerId}`);
          toast.success("تم حذف المدرب بنجاح");
          fetchTrainers();
        } catch (error) {
          toast.error("فشل في حذف المدرب");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-[2000px] mx-auto">
        <HeaderAcademy
          title="إدارة المدربين"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 28 29" fill="none">
              <circle opacity="0.5" cx="16.8" cy="8.65547" r="2.8" fill="#7E8799"/>
              <ellipse opacity="0.5" cx="17.7331" cy="18.9211" rx="4.66667" ry="2.8" fill="#7E8799"/>
              <circle cx="11.2021" cy="8.65521" r="3.73333" fill="#7E8799"/>
              <ellipse cx="11.2013" cy="18.9208" rx="6.53333" ry="3.73333" fill="#7E8799"/>
            </svg>
          }
          btn={
            <button
              onClick={() => navigate("/academy/TrainersManagment/add")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiUserPlus size={18} />
              إضافة مدرب
            </button>
          }
        />

        <div className="mt-6">
          <div className="relative rounded-xl overflow-hidden shadow-md bg-white border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-white text-blue-800 font-medium">
                    <th className="py-4 px-6"></th>
                    <th className="py-4 px-6">اسم المدرب</th>
                    <th className="py-4 px-6">البريد الإلكتروني</th>
                    <th className="py-4 px-6">رقم الهاتف</th>
                    <th className="py-4 px-6">عدد الدورات</th>
                    <th className="py-4 px-6 text-center rounded-tr-lg">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                      </td>
                    </tr>
                  ) : trainers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-500">
                        لا يوجد مدربين حالياً
                      </td>
                    </tr>
                  ) : (
                    trainers.map((trainer) => (
                      <tr key={trainer.id} className="hover:bg-blue-50 transition-colors duration-200">
                        <td className="py-4 px-6">
                          <div className="w-16 h-16 overflow-hidden rounded-lg">
                            <img
                              src={trainer.image || "https://via.placeholder.com/150"}
                              alt={trainer.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-900">{trainer.name}</td>
                        <td className="py-4 px-6 text-gray-700">{trainer.email}</td>
                        <td className="py-4 px-6 text-gray-700">{trainer.phone}</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {trainer.courses_count} دورة
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <div className="relative group">
                              <button
                                onClick={() => navigate(`/academy/TrainersManagment/edit/${trainer.id}`)}
                                className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                              >
                                <FiEdit2 size={16} />
                              </button>
                              <div className="absolute -top-10 right-1/2 transform translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                تعديل المدرب
                              </div>
                            </div>
                            <div className="relative group">
                              <button
                                onClick={() => handleDelete(trainer.id)}
                                className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                              >
                                <FiTrash2 size={16} />
                              </button>
                              <div className="absolute -top-10 right-1/2 transform translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                حذف المدرب
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
