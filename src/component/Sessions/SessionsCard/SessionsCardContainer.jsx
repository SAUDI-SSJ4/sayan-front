// import { useMemo } from "react";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
// import { Spinner } from "react-bootstrap";
// import { handleLevels } from "../../../utils/helpers";

// const SessionsCardContainer = ({ products, isLoading, isFetched }) => {
//   const defaultColDef = useMemo(
//     () => ({
//       flex: 1,
//       filter: true,
//       editable: false,
//     }),
//     []
//   );

//   const colDefs = useMemo(
//     () => [
//       {
//         field: "level",
//         headerName: "المستوى",
//         flex: 1,
//         cellStyle: { textAlign: "center" },
//         valueFormatter: ({ value }) => handleLevels(value),
//       },
//       {
//         field: "title",
//         headerName: "اسم الدورة التدريبية",
//         flex: 3,
//         cellStyle: { textAlign: "center" },
//       },
//       {
//         field: "trainer",
//         headerName: "اسم المدرب",
//         flex: 1,
//         cellStyle: { textAlign: "center" },
//       },
//       {
//         field: "price",
//         headerName: "السعر",
//         cellStyle: { textAlign: "center" },
//         valueFormatter: ({ value }) => `ريال ${value.toLocaleString()}`,
//         cellClassRules: {
//           "red-cell": ({ value }) => value > 100,
//           "blue-cell": ({ value }) => value <= 100,
//         },
//       },
//       {
//         field: "rated",
//         headerName: "التقييم",
//         cellStyle: { textAlign: "center" },
//         valueFormatter: ({ value }) => `${value} ⭐`,
//       },
//     ],
//     [products]
//   );

//   return (
//     <div className="ag-theme-quartz overflow-x-scroll" style={{ height: 600 }}>
//       <AgGridReact
//         rowData={products}
//         columnDefs={colDefs}
//         rowSelection="multiple"
//         loadingCellRenderer={isLoading}
//         loadingCellRendererParams={isFetched}
//         pagination
//         paginationPageSize={8}
//         paginationPageSizeSelector={[4, 8]}
//         defaultColDef={defaultColDef}
//       />
//     </div>
//   );
// };

// export default SessionsCardContainer;







import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { handleLevels } from "../../../utils/helpers";

const SessionsCardContainer = ({ products, isLoading, isFetched }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const totalPages = Math.ceil(products.length / pageSize);
  const paginatedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  return (
    <div className="overflow-x-auto" style={{ height: 600 }}>
      {isLoading && <Spinner animation="border" />}
      {!isLoading && isFetched && (
        <table className="table-auto w-full border-collapse border border-gray-300 text-center text-blue-900">
          <thead className="bg-white">
            <tr>
              <th className="px-4 py-2">المستوى</th>
              <th className="px-4 py-2">اسم الدورة التدريبية</th>
              <th className="px-4 py-2">اسم المدرب</th>
              <th className="px-4 py-2">السعر</th>
              <th className="px-4 py-2">التقييم</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{handleLevels(product.level)}</td>
                <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                <td className="border border-gray-300 px-4 py-2">{product.trainer}</td>
                <td className={`border border-gray-300 px-4 py-2 ${product.price > 100 ? "text-red-500" : "text-blue-500"}`}>
                  ريال {product.price.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">{product.rated} ⭐</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          السابق
        </button>
        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
        <button
          className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default SessionsCardContainer;
