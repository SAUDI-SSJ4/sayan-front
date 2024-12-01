import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { EditIcon } from "@mui/icons-material/Edit";
import DeleteIcon from "../../assets/icons/DeleteIcon";

export default function TableAg({
  columnDefs,
  rowData,
  selectedRow,
  setSelectedRow,
  onEdit,
  onDelete,
}) {
  // Checkbox column as the last column with "Select All" functionality
  const checkboxColumn = {
    headerCheckboxSelection: true, // "Select All" checkbox in the header
    checkboxSelection: true, // Checkboxes in each row
    width: 50,
    pinned: "right", // Pin checkbox column to the right
    sortable: false, // Disable sorting for this column
    filter: false, // Disable filtering for this column
  };

  // Action column with edit and delete buttons
  // const actionColumn = {
  //   headerName: "",
  //   field: "actions",
  //   cellRendererFramework: (params) => (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="42"
  //         height="42"
  //         viewBox="0 0 28 29"
  //         fill="none"
  //       >
  //         <circle opacity="0.5" cx="16.8" cy="8.65547" r="2.8" fill="#7E8799" />
  //         <ellipse
  //           opacity="0.5"
  //           cx="17.7331"
  //           cy="18.9211"
  //           rx="4.66667"
  //           ry="2.8"
  //           fill="#7E8799"
  //         />
  //         <circle cx="11.2021" cy="8.65521" r="3.73333" fill="#7E8799" />
  //         <ellipse
  //           cx="11.2013"
  //           cy="18.9208"
  //           rx="6.53333"
  //           ry="3.73333"
  //           fill="#7E8799"
  //         />
  //       </svg>
  //     </div>
  //   ),
  //   width: 100,
  //   pinned: "left", // Pin action column to the right
  //   sortable: false, // Disable sorting for this column
  //   filter: false, // Disable filtering for this column
  // };

  // Merge action and checkbox columns into the column definitions
  // const mergedColumnDefs = useMemo(
  //   () => [...columnDefs, actionColumn, checkboxColumn],
  //   [columnDefs]
  // );

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
      <AgGridReact
        enableRtl={true} // Enable right-to-left language support
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="multiple" // Allow multiple row selection
        onRowSelected={(event) => setSelectedRow(event.api.getSelectedRows())}
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: false,
          minWidth: 100,

          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        rowHeight={80} // Set row height to 80px
        headerHeight={60} // Set header height to 80px
      />
    </div>
  );
}
