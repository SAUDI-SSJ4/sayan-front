import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import Swal from "sweetalert2";
import { handleLevels, handleRateStare } from "../../../utils/helpers";
import { GoArrowUpRight } from "react-icons/go";
import { MdFavorite } from "react-icons/md";
import { useToggleMutation } from "../../../../services/mutation";

const SessionsTable = ({ setData, isLoading, isFetched }) => {
  console.log(setData);

  const courseDetailsFun = (p) => {
    return (
      <Link to={`/student/courseDetails/${p.value}`}>
        <GoArrowUpRight color="#0e85ff" size={22} cursor="pointer" />
      </Link>
    );
  };

  const { mutate: toggleFavorite } = useToggleMutation();

  // SweetAlert confirmation before adding to favorites
  const handleFavoriteToggle = useCallback(
    async (courseId, isFavored) => {
      const result = await Swal.fire({
        title: "إزالة من المفضلة",
        text: "هل تريد إزالة هذه الدورة من المفضلة؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "إزالة",
        cancelButtonText: "لا",
      });

      if (result.isConfirmed) {
        toggleFavorite({ course_id: courseId });
      }
    },
    [toggleFavorite]
  );

  const addCourseToFav = (params) => {
    return (
      <MdFavorite
        onClick={() => handleFavoriteToggle(params.value)}
        color="#0e85ff"
        size={22}
        cursor="pointer"
      />
    );
  };

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
        field: "id",
        headerName: "تفاصيل الكورس",
        flex: 1,
        cellStyle: { textAlign: "center" },
        cellRenderer: courseDetailsFun,
      },
      {
        field: "id",
        headerName: "المفضلة",
        flex: 1,
        cellStyle: { textAlign: "center" },
        cellRenderer: addCourseToFav,
      },
      {
        field: "level",
        headerName: "المستوى",
        flex: 1,
        cellStyle: { textAlign: "center" },
        valueFormatter: (params) => handleLevels(params.value),
      },
      {
        field: "trainer",
        headerName: "اسم المدرب",
        flex: 1,
        cellStyle: { textAlign: "center" },
      },
      {
        field: "stars",
        headerName: "التقييم",
        cellStyle: { textAlign: "center" },
        valueFormatter: (params) => handleRateStare(params.value),
      },
      {
        field: "price",
        headerName: "السعر",
        cellStyle: { textAlign: "center" },
        valueFormatter: (params) => "ريال " + params.value.toLocaleString(),
        cellClassRules: {
          "red-cell": (params) => params.value > 100,
          "blue-cell": (params) => params.value <= 100,
        },
      },
      {
        field: "title",
        headerName: "اسم الدورة التدريبية",
        flex: 3,
        cellStyle: { textAlign: "center" },
      },
    ],
    [setData]
  );

  return (
    <div className="ag-theme-quartz overflow-x-scroll" style={{ height: 600 }}>
      <AgGridReact
        rowData={setData}
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

export default SessionsTable;
