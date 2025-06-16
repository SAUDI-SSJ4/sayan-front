import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Link } from "react-router-dom";
import { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import Swal from "sweetalert2";
import { MainSpinner } from "../../UI/MainSpinner";
import { useToggleMutation } from "../../../../services/mutation";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { handleLevels, handleRateStare } from "../../../utils/helpers";
import SARIcon from "../../../components/SARIcon/SARIcon";

const TrainingCoursesCardContainer = ({ rowData, isLoading }) => {
  // Handles course details redirection
  const renderCourseDetailsLink = useCallback(
    (params) => (
      <Link to={`/student/courseDetails/${params.value}`}>
        <GoArrowUpRight color="#0e85ff" size={22} cursor="pointer" />
      </Link>
    ),
    []
  );

  // Favorite toggle mutation
  const { mutate: toggleFavorite } = useToggleMutation();

  // SweetAlert confirmation before adding to favorites
  const handleFavoriteToggle = useCallback(
    async (courseId, isFavored) => {
      const result = await Swal.fire({
        title: isFavored ? "إزالة من المفضلة" : "الإضافة إلى المفضلة",
        text: isFavored
          ? "هل تريد إزالة هذه المادة من المفضلة؟"
          : "هل تريد إضافة هذه المادة إلى المفضلة؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: isFavored ? "إزالة" : "إضافة",
        cancelButtonText: "لا",
      });

      if (result.isConfirmed) {
        toggleFavorite({ course_id: courseId });
      }
    },
    [toggleFavorite]
  );

  // Renders the favorite icon based on `faved` status
  const renderFavoriteIcon = useCallback(
    (params) => {
      const isFavored = params.data.faved;
      return isFavored ? (
        <MdFavorite
          onClick={() => handleFavoriteToggle(params.value, isFavored)}
          color="#0e85ff"
          size={22}
          cursor="pointer"
        />
      ) : (
        <MdFavoriteBorder
          onClick={() => handleFavoriteToggle(params.value, isFavored)}
          size={22}
          cursor="pointer"
        />
      );
    },
    [handleFavoriteToggle]
  );

  // Column definitions with proper memoization
  const colDefs = useMemo(
    () => [
      {
        field: "id",
        headerName: "تفاصيل الكورس",
        cellRenderer: renderCourseDetailsLink,
      },
      {
        field: "id",
        headerName: "المفضلة",
        cellRenderer: renderFavoriteIcon,
      },
      {
        field: "level",
        headerName: "المستوى",
        valueFormatter: ({ value }) => handleLevels(value),
      },
      {
        field: "trainer",
        headerName: "اسم المدرب",
      },
      {
        field: "stars",
        headerName: "التقييم",
        valueFormatter: ({ value }) => handleRateStare(value),
      },
      {
        field: "price",
        headerName: "السعر",
        valueFormatter: ({ value }) => (
          <span className="d-flex align-items-center">
            {value.toLocaleString()}
            <SARIcon />
          </span>
        ),
        cellClassRules: {
          "red-cell": ({ value }) => value > 100,
          "blue-cell": ({ value }) => value <= 100,
        },
      },
      {
        field: "title",
        headerName: "اسم المادة التعليمية",
        flex: 3,
      },
    ],
    [renderCourseDetailsLink, renderFavoriteIcon]
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
      editable: false,
      cellStyle: { textAlign: "center" },
    }),
    []
  );

  return (
    <div
      className="ag-theme-quartz overflow-x-scroll"
      style={{ height: 600, maxWidth: "96%", margin: "auto" }}
    >
      {isLoading ? (
        <MainSpinner css="" />
      ) : rowData && rowData.length > 0 ? (
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          rowSelection="multiple"
          pagination
          paginationPageSize={8}
          paginationPageSizeSelector={[4, 8]}
          defaultColDef={defaultColDef}
        />
      ) : (
        <div>No courses available at the moment.</div> // Fallback for no data
      )}
    </div>
  );
};

export default TrainingCoursesCardContainer;
