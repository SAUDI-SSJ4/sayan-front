import { Link } from "react-router-dom";
import { MainSpinner } from "../../UI/MainSpinner";

const TrainingCoursesCardContainer = ({ courses, isLoading }) => {
  return (
    <div
      className="ag-theme-quartz overflow-x-scroll m-0 !max-w-full"
      style={{ height: 600, maxWidth: "96%", margin: "auto" }}
    >
      {isLoading && <MainSpinner />}
      {!isLoading && courses && courses.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-0 m-0 mt-2">
          {courses.map((course) => (
            <Card key={course.id} course={course} />
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <h2>لا توجد دورات تدريبية متاحة</h2>
        </div>
      )}
    </div>
  );
};

export default TrainingCoursesCardContainer;

const Card = ({ course }) => {
  return (
    <li className="border border-[#EDEFF2] rounded-[10px]">
      <Link
        to={`/student/Coursedetails/${course.id}`}
        className="flex flex-col h-full"
      >
        <img
          src={course.image}
          alt="Course Thumbnail"
          className="object-cover rounded-tr-[10px] rounded-tl-[10px] h-[300px]"
        />
        <div className="p-3 space-y-3">
          <h3 className="text-lg lg:text-xl text-[#2B3674] hover:text-[#0062ff] duration-200 transition-colors">
            {course.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="bg-[#0FE8E80D] text-[#0FE8E8] rounded-[12px] w-[88px] h-[32px] text-center">
              تفاعلية
            </span>
          </div>
          <div className="flex items-center gap-3 group w-fit">
            <img
              src={course.academy_image}
              alt="Academy Image"
              className="w-10 h-10 rounded-full opacity-95 group-hover:opacity-100 duration-200 transition-opacity"
            />
            <h4 className="text-sm text-[#7E8799] m-0 group-hover:text-[#0062ff] duration-200 transition-colors">
              {course.academy}
            </h4>
          </div>
        </div>
      </Link>
    </li>
  );
};
