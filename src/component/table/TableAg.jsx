import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";


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
