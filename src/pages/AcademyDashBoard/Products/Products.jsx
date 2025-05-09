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
import axiosInstance from "../../../../axios";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import TableAg from "../../../component/table/TableAg";
import { Loader } from "rsuite";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import AcademyDeleteModal from "../../../component/UI/DeleteModal/AcademyDeleteModal";
import { academy_client } from "../../../utils/apis/client.config";

export default function Products() {
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await academy_client.get("/product");
      console.log(data);
      
      const formattedData = data?.data?.map((product) => ({
        id: product?.id,
        academy_id: product?.academy_id,
        title: product?.title,
        content: product?.content,
        short_content: product?.short_content,
        image: product?.image,
        price: product?.price,
        status: product?.status,
        type: product?.type,
        file: product?.file,
        rate: product?.rate,
        show_download: product?.show_download,
        created_at: product?.created_at,
        updated_at: product?.updated_at,
      }));
      setRowData(formattedData);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleDelete = async () => {
    try {
      await academy_client.delete(`/product/${deletingId}`);
      toast.success("تم حذف المنتج بنجاح");
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      toast.error("فشل حذف المنتج");
    }
  };
  // Define the column definitions for the table
  const columnDefs = useMemo(
    () => [
      {
        headerName: "#",
        field: "id",
        flex: 0.5,
      },

      {
        headerName: "المنتج",
        field: "title",
        cellRenderer: ({ data }) => (
          <div className=" d-flex justify-content-start w-100 align-items-center gap-2 px-2 text-truncate">
            <img
              src={data.image}
              alt={data.name}
              style={{ width: "50px", height: "50px", borderRadius: "10%" }}
            />
            <span>{data.title}</span>
          </div>
        ),
        flex: 1,
      },

      {
        headerName: "محتوى مختصر",
        field: "short_content",
        flex: 1,
      },
      {
        headerName: "السعر",
        field: "price",
        flex: 0.5,
      },
      {
        headerName: "النوع",
        field: "type",
        flex: 0.5,
      },

      {
        headerName: "التقييم",
        field: "rate",
        flex: 0.5,
      },
      {
        headerName: "الملف",
        field: "file",
        flex: 0.5,
        cellRenderer: (params) => {
          const { show_download, file } = params.data;
          const handleDownload = () => {
            window.open(file, "_blank");
          };

          return (
            <button
              onClick={handleDownload}
              disabled={show_download === 0}
              className={`btn btn-primary ${
                show_download === 0 ? "opacity-25" : ""
              } `}
            >
              تحميل
            </button>
          );
        },
      },
      // {
      //   headerName: "الملف",
      //   field: "file",
      //   flex: 0.5,
      //   cellRenderer: (params) => {
      //     const { show_download, file } = params.data;

      //     // Handle download button click
      //     const handleDownload = async () => {
      //       try {
      //         if (file) {
      //           // Fetch the file from the server
      //           const response = await fetch(file);
      //           if (response.ok) {
      //             // Convert the response to a blob
      //             const blob = await response.blob();
      //             // Create a link element for downloading
      //             const url = URL.createObjectURL(blob);
      //             const link = document.createElement("a");
      //             link.href = url;
      //             link.download = file.split("/").pop(); // Extract the file name from the URL
      //             document.body.appendChild(link);
      //             link.click();
      //             // Cleanup
      //             document.body.removeChild(link);
      //             URL.revokeObjectURL(url);
      //           } else {
      //             throw new Error("File not found");
      //           }
      //         } else {
      //           throw new Error("No file URL provided");
      //         }
      //       } catch (error) {
      //         console.error("Error downloading file:", error);
      //       }
      //     };

      //     return (
      //       <button
      //         onClick={handleDownload}
      //         disabled={show_download === 0}
      //         className={`btn btn-primary ${
      //           show_download === 0 ? "opacity-25" : ""
      //         }`}
      //       >
      //         تحميل
      //       </button>
      //     );
      //   },
      // },
      {
        headerName: "إجراءات",
        field: "actions",
        cellRenderer: (params) => (
          <div>
            <div
              className="btn"
              onClick={() =>
                navigate(`/academy/Product/edit/${params.data.id}`)
              }
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
                  navigate("/academy/Product/add");
                }}
                className="btn btn-primary"
              >
                اضافة منتج
              </button>
            }
            title={"ادارة المنتجات"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 28 29"
                fill="none"
              >
                <circle
                  opacity="0.5"
                  cx="16.8"
                  cy="8.65547"
                  r="2.8"
                  fill="#7E8799"
                />
                <ellipse
                  opacity="0.5"
                  cx="17.7331"
                  cy="18.9211"
                  rx="4.66667"
                  ry="2.8"
                  fill="#7E8799"
                />
                <circle cx="11.2021" cy="8.65521" r="3.73333" fill="#7E8799" />
                <ellipse
                  cx="11.2013"
                  cy="18.9208"
                  rx="6.53333"
                  ry="3.73333"
                  fill="#7E8799"
                />
              </svg>
            }
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
