import { useQuery } from "@tanstack/react-query";
import TrainingCoursesCardContainer from "../../../component/TrainingCourses/TrainingCoursesCard/TrainingCoursesCardContainer";
import { getStudentCourses } from "../../../utils/apis/client"; // The updated API function
import SkeletonCard from "../../../components/SkeletonCard";

const TrainingCourses = () => {
  const {
    data: studentCourses = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["studentCourses"],
    queryFn: getStudentCourses,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    cacheTime: 1000,
  });

  return (
    <div className="all-info-top-header">
      {/* Loading and error handling */}
      {isLoading && (
        <>
          <div
            className="d-flex justify-content-between flex-wrap gap-3 SearchAndShowbar all-search-bar animate-pulse"
            style={{
              border: "1px solid #EDEFF2",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <div className="w-24 h-6 bg-gray-300 rounded" />
            <div className="flex gap-3 items-center flex-wrap">
              <div className="w-40 h-10 bg-gray-200 rounded" />
              <div className="w-40 h-10 bg-gray-200 rounded" />
              <div className="w-20 h-10 bg-gray-200 rounded" />
            </div>
            <div className="w-24 h-10 bg-gray-200 rounded" />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-0 m-0 mt-2">
            {[...Array(6)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </ul>
        </>
      )}
      {isError && <p>Something went wrong: {error.message}</p>}

      {isSuccess && <TrainingCoursesCardContainer courses={studentCourses} />}
    </div>
  );
};

export default TrainingCourses;
