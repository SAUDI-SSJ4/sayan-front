import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import axiosInstance from "../../../../axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
function CoursesDataTaple({ CoursesData: rowData }) {

  const imageData = (params) => {
    return (
      <img
        src={params.value}
        alt="Course"
        style={{ width: "20px", height: "20px" }}
      />
    );
  };

  const courseDetailsFun = (p) => {
    return (
      <>
        <Link to={`/student/courseDetails/${p.value}`}>التفاصيل</Link>
      </>
    );
  };

  const sweetFunctiontoAddFav = (e) => {
    Swal.fire({
      title: "الاضافة الي المفضلة",
      text: "هل تريد اضافة هذة الدورة الي المفضلة",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "اضافة",
      cancelButtonText: "لا",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(e);
        axiosInstance
          .post(
            `/toggle`,
            { course_id: e.value },
            {
              headers: {
                Authorization: `Bearer ${ Cookies.get("token")}`,
              },
            }
          )
          .then((res) => res.data)
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: "🎉تمت الاضافة",
              text: "تم اضافة الدورة التعليمية الي المفضلة",
              icon: "success",
            });
          });
      }
    });
  };

  const addCourseToFav = (p) => {
    return (
      <>
        <button
          onClick={() => {
            sweetFunctiontoAddFav(p);
          }}
        >
          اضافة
        </button>
      </>
    );
  };

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
      // floatingFilter: true,
      editable: false,
    }),
    []
  );

  // SweetAlert for Delete Confirmation
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
        // API request to delete course
        axiosInstance
          .delete(`/courses/${courseId}`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          })
          .then((response) => {
            Swal.fire("تم الحذف!", "تم حذف الدورة بنجاح", "success");
            // You can refresh the data here or remove the deleted item from rowData
          })
          .catch((error) => {
            console.error("Error deleting course:", error);
            Swal.fire("خطأ", "حدث خطأ أثناء حذف الدورة", "error");
          });
      }
    });
  };

  // Add Edit and Delete buttons
  const actionCellRenderer = (params) => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to={`/courses/edit/${params.value}`}>
          <button className="btn btn-primary mx-1">تعديل</button>
        </Link>
        <button
          onClick={() => handleDelete(params.value)}
          className="btn btn-danger mx-1"
        >
          حذف
        </button>
      </div>
    );
  };

  const handleEdit  =(value) => {
    console.log(value);
    
  }

  const colDefs = useMemo(
    () => [
      {
        field: "id",  // Assuming the course ID is passed in 'id'
        headerName: "الاجراءات",
        flex: 1,
        cellRendererFramework: (params) => (
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button
              onClick={() => handleEdit(params.value)}  // Call the edit function
              className="btn btn-primary"
            >
              تعديل
            </button>
            <button
              onClick={() => handleDelete(params.value)}  // Call the delete function
              className="btn btn-danger"
            >
              حذف
            </button>
          </div>
        ),
        cellStyle: { textAlign: "center" },
      },
      {
        field: "category",
        headerName: "الفئة",
        flex: 1,
        cellStyle: { textAlign: "center" },
        // cellRenderer: courseDetailsFun,
      },
      {
        field: "type",
        headerName: "النوع",
        flex: 1,
        cellStyle: { textAlign: "center" },
        valueFormatter: (params) => {
          if (params.value === "live") {
            return "مباشرة";
          } else if (params.value === "recorded") {
            return "تفاعلية";
          } else if (params.value === "attend") {
            return "حضورية";
          } else {
            return params.value;
          }
        },
      },
      {
        field: "level",
        headerName: "المستوى", // Set a fixed header name
        flex: 1,
        // checkboxSelection: true,
        cellStyle: { textAlign: "center" },
        valueFormatter: (params) => {
          if (params.value === "intermediate") {
            return "متوسط";
          } else if (params.value === "advanced") {
            return "متقدم";
          } else if (params.value === "beginner") {
            return "مبتدئ";
          } else {
            return params.value;
          }
        },
      },

      {
        field: "trainer",
        headerName: "اسم المدرب",
        flex: 1,
        cellStyle: { textAlign: "center" },
      },
      {
        field: "price",
        headerName: "السعر", // Set a fixed header name
        cellStyle: { textAlign: "center" },
        valueFormatter: (params) => "ريال " + params.value.toLocaleString(),
        cellClassRules: {
          "red-cell": (params) => params.value > 100,
          "blue-cell": (params) => params.value <= 100,
        },
      },
      {
        field: "title",
        headerName: "اسم الدورة التدريبية",
        flex: 3,
        cellStyle: { textAlign: "center" },
      },
      
    ],
    [rowData]
  );

  return (
    <div className="ag-theme-quartz overflow-x-scroll" style={{ height: 600 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection="multiple"
        pagination
        paginationPageSize={8}
        paginationPageSizeSelector={[4, 8]}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}

export default CoursesDataTaple;
