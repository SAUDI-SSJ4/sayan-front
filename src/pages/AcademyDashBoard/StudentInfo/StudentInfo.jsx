import React, { useEffect, useState, useMemo } from "react";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import TableAg from "../../../component/table/TableAg";
import { Loader } from "rsuite";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BlogIcon from "../../../assets/icons/BlogIcon";
import moment from "moment";
import { academyAPI } from "../../../utils/apis/client/academy";
import { isNotEmpty } from "../../../utils/helpers";

export default function StudentInfo() {
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data: response } = await academyAPI.get("/student");

        const formattedData = isNotEmpty(response?.data) && response.data.map((studebt) => ({
            id: studebt?.id,
            name: studebt?.name,
            email: studebt?.email,
            phone: studebt?.phone,
            image: studebt?.image,
            gender: studebt?.gender,
            courses_count: studebt?.courses_count,
            faved_count: studebt?.faved_count,
            created_at: studebt?.created_at,
          }));

        setRowData(formattedData);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const columnDefs = useMemo(
    () => [
      { headerName: "#", field: "id", flex: 0.5, sortable: true },
      {
        headerName: "الطالب",
        field: "name",
        flex: 1,
        cellRenderer: ({ data }) => (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={data.image} // Assuming `image` is the correct field for the image URL
              alt={data.name}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <span>{data.name}</span>
          </div>
        ),
      },
      {
        headerName: "البريد الإلكتروني",
        field: "email",
        flex: 1,
        sortable: true,
        filter: true,
      },
      {
        headerName: "الهاتف",
        field: "phone",
        flex: 1,
        sortable: true,
      },
      {
        headerName: "عدد الدورات",
        field: "courses_count",
        flex: 0.75,
        sortable: true,
      },
      {
        headerName: "تاريخ الإنشاء",
        field: "created_at",
        flex: 1,
        sortable: true,
        valueFormatter: ({ value }) => moment(value).format("YYYY/MM/DD"),
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
          <HeaderAcademy title={"معلومات الطلاب"} icon={<BlogIcon />} />
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
