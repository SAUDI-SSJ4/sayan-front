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
import { academy_client } from "../../../utils/apis/client.config";

export default function Admins() {
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await academy_client.get("/admin");
        const formattedData = response.data.map((trainer) => ({
          name: trainer.name,
          id: trainer.id,
          img: trainer.img,
          phone: trainer.phone,
        }));
        setRowData(formattedData);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  // Define the column definitions for the table
  const columnDefs = useMemo(
    () => [
      { headerName: "#", field: "id", flex: 0.5 },
      {
        headerName: "الاسم",
        field: "name",
        cellRendererFramework: (params) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={
                "data:image/png;base64,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"
              }
              alt={"params.data.name"}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
            {params.value}
          </div>
        ),
        flex: 1,
      },
      { headerName: "الهاتف", field: "phone", flex: 1 },
      { headerName: "البريد الالكتروني", field: "mail", flex: 1 },
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
                  navigate("/academy/EmployeeMangment/add");
                }}
                className="btn btn-primary"
              >
                اضافة موظف
              </button>
            }
            title={"ادارة الموظفين"}
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
        </div>
      )}
    </>
  );
}
