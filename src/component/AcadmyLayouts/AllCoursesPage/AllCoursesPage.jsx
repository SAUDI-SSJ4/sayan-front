import AcademyHeaderContainer from "../AcademyHeaderContainer/AcademyHeaderContainer";
import SearchIcon from "@mui/icons-material/Search";

import AcademyFooter from "../Footer/Footer";
import SubjectCard from "../SubjectCard/SubjectCard";
const AllCoursesPage = () => {
  return (
    <div>
      <AcademyHeaderContainer LayOut2 />

      <div className="container " style={{ marginTop: "100px" }}>
        <div className="d-flex justify-content-center flex-column align-items-center">
          <h2
            className="fs-3 fw-medium title-text--1"
            style={{ color: "#272727", fontSize: "36px" }}
          >
            {" "}
            الدورات الالكترونية .
          </h2>
          <div className="d-flex gap-2">
            <div className="searchBar mt-5" style={{ minWidth: "400px" }}>
              <input type="text" placeholder="ابحث عن ..." />
              <div className="iconWrapper">
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="container " style={{ marginTop: "100px" }}>
          <div className="d-flex justify-content-between align-items-center">
            <h2
              className="fs-6 fw-bold title-text--1"
              style={{ color: "#272727", fontSize: "24px" }}
            >
              الدورات الأكثر مبيعا . .
            </h2>
          </div>
          <div className="row g-3 mt-3">
            {[1, 2, 3].map((item) => (
              <div className="col-lg-4 col-md-6 col-sm-12">
                <SubjectCard />
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h2 style={{ color: "#272727", fontSize: "24px" }}> كل الدورات .</h2>
        </div>
        <div className="row g-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
              <SubjectCard />
            </div>
          ))}
        </div>
      </div>
      <AcademyFooter />
    </div>
  );
};

export default AllCoursesPage;
