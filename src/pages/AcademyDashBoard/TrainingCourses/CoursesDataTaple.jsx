// import { AgGridReact } from "ag-grid-react";
// import React, { useEffect, useMemo, useState } from "react";
// import { Spinner } from "react-bootstrap";
// import Swal from "sweetalert2";
// import axiosInstance from "../../../../axios";
// import { Link } from "react-router-dom";
// import Cookies from "js-cookie";

// function CoursesDataTaple({ CoursesData: rowData }) {

//   const imageData = (params) => {
//     return (
//       <img
//         src={params.value}
//         alt="Course"
//         style={{ width: "20px", height: "20px" }}
//       />
//     );
//   };

//   const courseDetailsFun = (p) => {
//     return (
//       <>
//         <Link to={`/student/courseDetails/${p.value}`}>التفاصيل</Link>
//       </>
//     );
//   };

//   const sweetFunctiontoAddFav = (e) => {
//     Swal.fire({
//       title: "الاضافة الي المفضلة",
//       text: "هل تريد اضافة هذة الدورة الي المفضلة",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "اضافة",
//       cancelButtonText: "لا",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         console.log(e);
//         axiosInstance
//           .post(
//             `/toggle`,
//             { course_id: e.value },
//             {
//               headers: {
//                 Authorization: `Bearer ${ Cookies.get("token")}`,
//               },
//             }
//           )
//           .then((res) => res.data)
//           .then((data) => {
//             console.log(data);
//             Swal.fire({
//               title: "🎉تمت الاضافة",
//               text: "تم اضافة الدورة التعليمية الي المفضلة",
//               icon: "success",
//             });
//           });
//       }
//     });
//   };

//   const addCourseToFav = (p) => {
//     return (
//       <>
//         <button
//           onClick={() => {
//             sweetFunctiontoAddFav(p);
//           }}
//         >
//           اضافة
//         </button>
//       </>
//     );
//   };

//   const defaultColDef = useMemo(
//     () => ({
//       flex: 1,
//       filter: true,
//       // floatingFilter: true,
//       editable: false,
//     }),
//     []
//   );

//   // SweetAlert for Delete Confirmation
//   const handleDelete = (courseId) => {
//     Swal.fire({
//       title: "حذف الدورة",
//       text: "هل تريد بالتأكيد حذف هذه الدورة؟",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "نعم، احذفها!",
//       cancelButtonText: "إلغاء",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // API request to delete course
//         axiosInstance
//           .delete(`/courses/${courseId}`, {
//             headers: {
//               Authorization: `Bearer ${Cookies.get("token")}`,
//             },
//           })
//           .then((response) => {
//             Swal.fire("تم الحذف!", "تم حذف الدورة بنجاح", "success");
//             // You can refresh the data here or remove the deleted item from rowData
//           })
//           .catch((error) => {
//             console.error("Error deleting course:", error);
//             Swal.fire("خطأ", "حدث خطأ أثناء حذف الدورة", "error");
//           });
//       }
//     });
//   };

//   // Add Edit and Delete buttons
//   const actionCellRenderer = (params) => {
//     return (
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <Link to={`/courses/edit/${params.value}`}>
//           <button className="btn btn-primary mx-1">تعديل</button>
//         </Link>
//         <button
//           onClick={() => handleDelete(params.value)}
//           className="btn btn-danger mx-1"
//         >
//           حذف
//         </button>
//       </div>
//     );
//   };

//   const handleEdit  =(value) => {
//     console.log(value);

//   }

//   const colDefs = useMemo(
//     () => [
//       {
//         field: "id",  // Assuming the course ID is passed in 'id'
//         headerName: "الاجراءات",
//         flex: 1,
//         cellRendererFramework: (params) => (
//           <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
//             <button
//               onClick={() => handleEdit(params.value)}  // Call the edit function
//               className="btn btn-primary"
//             >
//               تعديل
//             </button>
//             <button
//               onClick={() => handleDelete(params.value)}  // Call the delete function
//               className="btn btn-danger"
//             >
//               حذف
//             </button>
//           </div>
//         ),
//         cellStyle: { textAlign: "center" },
//       },
//       {
//         field: "category",
//         headerName: "الفئة",
//         flex: 1,
//         cellStyle: { textAlign: "center" },
//         // cellRenderer: courseDetailsFun,
//       },
//       {
//         field: "type",
//         headerName: "النوع",
//         flex: 1,
//         cellStyle: { textAlign: "center" },
//         valueFormatter: (params) => {
//           if (params.value === "live") {
//             return "مباشرة";
//           } else if (params.value === "recorded") {
//             return "تفاعلية";
//           } else if (params.value === "attend") {
//             return "حضورية";
//           } else {
//             return params.value;
//           }
//         },
//       },
//       {
//         field: "level",
//         headerName: "المستوى", // Set a fixed header name
//         flex: 1,
//         // checkboxSelection: true,
//         cellStyle: { textAlign: "center" },
//         valueFormatter: (params) => {
//           if (params.value === "intermediate") {
//             return "متوسط";
//           } else if (params.value === "advanced") {
//             return "متقدم";
//           } else if (params.value === "beginner") {
//             return "مبتدئ";
//           } else {
//             return params.value;
//           }
//         },
//       },

//       {
//         field: "trainer",
//         headerName: "اسم المدرب",
//         flex: 1,
//         cellStyle: { textAlign: "center" },
//       },
//       {
//         field: "price",
//         headerName: "السعر", // Set a fixed header name
//         cellStyle: { textAlign: "center" },
//         valueFormatter: (params) => "ريال " + params.value.toLocaleString(),
//         cellClassRules: {
//           "red-cell": (params) => params.value > 100,
//           "blue-cell": (params) => params.value <= 100,
//         },
//       },
//       {
//         field: "title",
//         headerName: "اسم الدورة التدريبية",
//         flex: 3,
//         cellStyle: { textAlign: "center" },
//       },

//     ],
//     [rowData]
//   );

//   return (
//     <div className="ag-theme-quartz overflow-x-scroll" style={{ height: 600 }}>
//       <AgGridReact
//         rowData={rowData}
//         columnDefs={colDefs}
//         rowSelection="multiple"
//         pagination
//         paginationPageSize={8}
//         paginationPageSizeSelector={[4, 8]}
//         defaultColDef={defaultColDef}
//       />
//     </div>
//   );
// }

// export default CoursesDataTaple;

import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAcademyCoursesThunk } from "../../../../redux/courses/CourseThunk";

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
    <div className="overflow-x-auto shadow-sm  rounded-lg">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-white  text-blue-900">
            <th className="py-4 px-2 pe-5">
              <input type="checkbox" />
            </th>
            <th className="py-4 px-2">الإجراءات</th>
            <th className="py-4 px-2">الفئة</th>
            <th className="py-4 px-2">النوع</th>
            <th className="py-4 px-2">المستوى</th>
            <th className="py-4 px-2">اسم المدرب</th>
            <th className="py-4 px-2">السعر</th>
            <th className="py-4 px-2">اسم الدورة التدريبية</th>
          </tr>
        </thead>
        <tbody>
          {CoursesData.map((course) => (
            <tr key={course.id} className="text-center border border-gray-300">
              <td className="p-2 border border-gray-300">
                <input type="checkbox" />
              </td>
              <td className="p-2 border border-gray-300 flex justify-center gap-2">
                <Link to={`/courses/edit/${course.id}`}>
                  <button className="btn btn-primary">✏️</button>
                </Link>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="btn btn-danger"
                >
                  🗑️
                </button>
              </td>
              <td className="p-2 border border-gray-300">{course.category}</td>
              <td className="p-2 border border-gray-300">
                {course.type === "live"
                  ? "مباشرة"
                  : course.type === "recorded"
                  ? "تفاعلية"
                  : course.type === "attend"
                  ? "حضورية"
                  : course.type}
              </td>
              <td className="p-2 border border-gray-300">
                {course.level === "intermediate"
                  ? "متوسط"
                  : course.level === "advanced"
                  ? "متقدم"
                  : course.level === "beginner"
                  ? "مبتدئ"
                  : course.level}
              </td>
              <td className="p-2 border border-gray-300">{course.trainer}</td>
              <td className="p-2 border border-gray-300">
                ريال {course.price.toLocaleString()}
              </td>
              <td className="p-2 border border-gray-300">{course.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoursesDataTable;
