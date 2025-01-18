// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import "./users.module.scss";
// import { Link, NavLink, Route, Routes } from "react-router-dom";
// import AddCircleIcon from "@mui/icons-material/AddCircle";

// import { useEffect, useState } from "react";
// import TrainingTable from "../../../component/TrainingTable/TrainigTable";
// const Trainers = () => {
//   const [userType, setUserType] = useState("all");

//   return (
//     <div className="all-info-top-header main-info-top">
//       <div className="TablePageHeader">
//         <div className="HeaderContainer">
//           <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
//             <div className="d-flex align-items-center name">
//               <div className="icon">
//                 <PeopleAltIcon sx={{ color: "#A3AED0" }} />
//               </div>
//               <div style={{ color: "#7E8799" }}>الطلاب</div>
//             </div>

//             <Link to={"/academy/addNewStudent"} className="addBtn">
//               <AddCircleIcon />
//               إضافة طالب جديد
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div
//         style={{
//           border: "1px solid #EDEFF2",
//           borderRadius: "10px",
//           padding: "10px",
//           backgroundColor: "white",
//         }}
//       >
//         <TrainingTable />
//       </div>
//     </div>
//   );
// };

// export default Trainers;

import React, { useEffect, useState, useMemo } from "react";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import TableAg from "../../../component/table/TableAg";
import { Loader } from "rsuite";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BlogIcon from "../../../assets/icons/BlogIcon";
import AcademyDeleteModal from "../../../component/UI/DeleteModal/AcademyDeleteModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { academy_client } from "../../../utils/apis/client.config";

export default function Blogs() {
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();
  const fetchBlogs = async () => {
    try {

      const { data } = await academy_client.get("/blog");
      
      const formattedData = data?.data?.map((blog) => ({
        id: blog?.id,
        category_id: blog?.category_id,
        academy_id: blog?.academy_id,
        title: blog?.title,
        content: blog?.content,
        image: blog?.image,
        video: blog?.video,
        cover: blog?.cover,
        status: blog?.status,
        views: blog?.views,
        created_at: blog?.created_at,
        updated_at: blog?.updated_at,
      }));
      setRowData(formattedData);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  const handleDelete = async () => {
    try {
      await academy_client.delete(`/blog/${deletingId}`);
      toast.success("تم حذف المدونة بنجاح");
      setShowModal(false);
      fetchBlogs();
    } catch (error) {
      toast.error("فشل حذف المدونة");
    }
  };
  // Define the column definitions for the table
  const columnDefs = useMemo(
    () => [
      { headerName: "#", field: "id", flex: 0.5 },
      {
        headerName: "المدونة",
        field: "title",
        cellRenderer: (params) => (
          <div className="d-flex align-items-center justify-content-start w-100 gap-1">
            <img
              src={
                params.data.image ||
                "https://cdn-icons-png.flaticon.com/128/7439/7439231.png"
              }
              alt={params.data.title}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
            <p>{params.data.title}</p>
          </div>
        ),
        flex: 1.5,
      },
      {
        headerName: "محتوى وصورة الغلاف",
        field: "content",
        cellRenderer: (params) => (
          <div className="d-flex align-items-center justify-content-start w-100 gap-1">
            <img
              src={
                params.data.cover ||
                "https://cdn-icons-png.flaticon.com/128/7439/7439231.png"
              }
              alt={params.data.title}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
            <div>
              <p>{params.data.content}</p>
            </div>
          </div>
        ),
        flex: 2,
      },
      { headerName: "عدد المشاهدات", field: "views", flex: 0.5 },
      {
        headerName: "إجراءات",
        field: "actions",
        cellRenderer: (params) => (
          <div>
            <div
              className="btn"
              onClick={() => navigate(`/academy/Blogs/edit/${params.data.id}`)}
            >
              <FaEdit />
            </div>
            <div
              className="btn"
              onClick={() => {
                setDeletingId(params.data.id);
                setShowModal(true);
              }}
              style={{ marginLeft: "5px" }}
            >
              <FaTrash />
            </div>
          </div>
        ),
        flex: 0.5,
      },
    ],
    []
  );

  return (
    <>
      {loading ? (
        <div className=" w-100 vh-100 d-flex justify-content-center align-items-center">
          <Loader size="lg" />
        </div>
      ) : (
        <div>
          <HeaderAcademy
            btn={
              <button
                onClick={() => {
                  navigate("/academy/Blogs/add");
                }}
                className="btn btn-primary"
              >
                اضافة مدونة
              </button>
            }
            title={"ادارة المدونات"}
            icon={<BlogIcon />}
          />
          <TableAg
            columnDefs={columnDefs}
            rowData={rowData}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            onEdit={(data) => console.log("Edit:", data)}
            onDelete={(data) => console.log("Delete:", data)}
          />
          <AcademyDeleteModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDelete}
          />
        </div>
      )}
    </>
  );
}
