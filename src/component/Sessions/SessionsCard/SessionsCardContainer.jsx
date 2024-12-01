import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Spinner } from "react-bootstrap";
import { handleLevels } from "../../../utils/helpers";

const SessionsCardContainer = ({ products, isLoading, isFetched }) => {
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
      editable: false,
    }),
    []
  );

  const colDefs = useMemo(
    () => [
      {
        field: "level",
        headerName: "المستوى",
        flex: 1,
        cellStyle: { textAlign: "center" },
        valueFormatter: ({ value }) => handleLevels(value),
      },
      {
        field: "title",
        headerName: "اسم الدورة التدريبية",
        flex: 3,
        cellStyle: { textAlign: "center" },
      },
      {
        field: "trainer",
        headerName: "اسم المدرب",
        flex: 1,
        cellStyle: { textAlign: "center" },
      },
      {
        field: "price",
        headerName: "السعر",
        cellStyle: { textAlign: "center" },
        valueFormatter: ({ value }) => `ريال ${value.toLocaleString()}`,
        cellClassRules: {
          "red-cell": ({ value }) => value > 100,
          "blue-cell": ({ value }) => value <= 100,
        },
      },
      {
        field: "rated",
        headerName: "التقييم",
        cellStyle: { textAlign: "center" },
        valueFormatter: ({ value }) => `${value} ⭐`,
      },
    ],
    [products]
  );

  return (
    <div className="ag-theme-quartz overflow-x-scroll" style={{ height: 600 }}>
      <AgGridReact
        rowData={products}
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
  );
};

export default SessionsCardContainer;
