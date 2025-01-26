import { NavLink } from "react-router-dom";

export const CourseTabs = () => {
  return(
    <div className="userTabs">
    <ul className="flex-wrap gap-4">
      <NavLink
        to={"/student/TrainingCourses"}
        end
        className={({ isActive }) => {
          return isActive ? " tablePage active" : "tablePage";
        }}
      >
        الدورات (2214)
      </NavLink>
      {/* <NavLink
        to={"/student/TrainingCourses/DirectCourse"}
        className={({ isActive }) => {
          return isActive ? " tablePage active" : "tablePage";
        }}
      >
        الدورات المباشرة
      </NavLink>
      <NavLink
        to={"/student/TrainingCourses/AffiliateMarketingSetting"}
        className={({ isActive }) => {
          return isActive ? " tablePage active" : "tablePage";
        }}
      >
        الدورات الخحضورية
      </NavLink> */}
    </ul>
  </div>
  )
}