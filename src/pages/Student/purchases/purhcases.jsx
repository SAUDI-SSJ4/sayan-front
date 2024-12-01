import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import { getPayments } from "../../../utils/apis/client";
import { isNotEmpty } from "../../../utils/helpers";

const Purchases = () => {
  const { data: payments = [], isLoading , isFetched} = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    cacheTime: 1000,
  });

  console.log(payments);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
      editable: false,
      cellStyle: { textAlign: "center" },
    }),
    []
  );

  const colDefs = useMemo(
    () => [
      {
        field: "course.short_content",
        headerName: "تفاصيل الكورس",
      },
      {
        field: "status",
        headerName: "المفضلة",
      },
      {
        field: "course.level",
        headerName: "المستوى",
        valueFormatter: ({ value }) =>
          ({
            intermediate: "متوسط",
            advanced: "متقدم",
            beginner: "مبتدئ",
          }[value] || value),
      },
      {
        field: "course.trainer_id",
        headerName: "اسم المدرب",
      },
      {
        field: "course.stars",
        headerName: "التقييم",
        valueFormatter: ({ value }) => `${value} ⭐`,
      },
      {
        field: "price",
        headerName: "السعر",
        valueFormatter: ({ value }) => `ريال ${value.toLocaleString()}`,
        cellClassRules: {
          "red-cell": ({ value }) => value > 100,
          "blue-cell": ({ value }) => value <= 100,
        },
      },
      {
        field: "course.title",
        headerName: "اسم الدورة التدريبية",
        flex: 3,
      },
    ],
    []
  );

  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}>المشتريات</div>
            </div>
          </div>
        </div>
      </div>

      <div className="ag-theme-quartz overflow-x-scroll" style={{ height: 600, maxWidth: "96%", margin: "auto" }}>
        <AgGridReact
          rowData={isNotEmpty(payments) ? payments : []}
          columnDefs={colDefs}
          rowSelection="multiple"
          loadingCellRenderer={isLoading}
          loadingCellRendererParams={isFetched}
          pagination
          paginationPageSize={8}
          paginationPageSizeSelector={[4, 8]}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default Purchases;
