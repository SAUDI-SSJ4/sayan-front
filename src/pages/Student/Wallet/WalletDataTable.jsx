import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MainSpinner } from "../../../component/UI/MainSpinner";
import { GoArrowUpRight } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";


function WalletDataTable({ WalletData }) {
  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(WalletData);

  useEffect(() => {
    if (WalletData) {
      setRowData(WalletData?.activity);
      setIsLoading(false);
    }
  }, [WalletData]);

  const renderCourseDetailsLink = (p) => {
    return (
      <>
        <Link to={`/student/courseDetails/${p.value}`}>
        <GoArrowUpRight color="#0e85ff" size={22} cursor="pointer" /></Link>
      </>
    );
  };

  const addCourseToFav = (p) => {
    return (
      <>
        <Link to={`/student/courseDetails/${p.value}`}>اضافة
        <IoMdAdd color="#0e85ff" size={22} cursor="pointer"/>
        </Link>
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

  const colDefs = useMemo(
    () => [
      {
        field: "id",
        headerName: "تفاصيل الكورس",
        flex: 1,
        cellStyle: { textAlign: "center" },
        cellRenderer: renderCourseDetailsLink,
      },
      {
        field: "id",
        headerName: "المفضلة",
        flex: 1,
        cellStyle: { textAlign: "center" },
      },
      {
        field: "payment_status",
        headerName: "المستوى", // Set a fixed header name
        flex: 1,
        // checkboxSelection: true,
        cellStyle: { textAlign: "center" },
        // valueFormatter: (params) => {
        //   if (params.value === "intermediate") {
        //     return "متوسط";
        //   } else if (params.value === "advanced") {
        //     return "متقدم";
        //   } else if (params.value === "beginner") {
        //     return "مبتدئ";
        //   } else {
        //     return params.value;
        //   }
        // },
      },

      {
        field: "trainer",
        headerName: "اسم المدرب",
        flex: 1,
        cellStyle: { textAlign: "center" },
      },
      {
        field: "status",
        headerName: "التقييم",
        cellStyle: { textAlign: "center" },
        // valueFormatter: (params) => `${params.value} ⭐`,
      },
      {
        field: "type",
        headerName: "النوع", // Set a fixed header name
        cellStyle: { textAlign: "center" },
        valueFormatter: (params) => params.value,
      },
      {
        field: "title",
        headerName: "اسم الدورة التدريبية",
        flex: 3,
        cellStyle: { textAlign: "center" },
      },
    ],
    [WalletData]
  );

  return (
    <div className="ag-theme-quartz overflow-x-scroll" style={{ height: 600 }}>
      {isLoading ? (
        <MainSpinner css=""/>
      ) : (
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          rowSelection="multiple"
          pagination
          paginationPageSize={8}
          paginationPageSizeSelector={[4, 8]}
          defaultColDef={defaultColDef}
        />
      )}
    </div>
  );
}

export default WalletDataTable;
