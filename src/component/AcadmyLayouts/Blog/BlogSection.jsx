import { useEffect, useState } from "react";
import SingleBlogCard from "./SingleBlogCard";
import { useLocation, useNavigate } from "react-router-dom";

const BlogSection = () => {
  const [path, setPath] = useState("");
  const router = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let temp = location.pathname;
    if (temp.split("/").length === 3) {
      console.log(temp); // Output: "/academyLayout/3"
    } else {
      // Remove the last segment and trailing slash if they exist
      temp = temp.replace(/\/[^\/]+\/?$/, "");
    }

    setPath(temp);
  });
  return (
    <div style={{ paddingBlock: "70px" }}>
      <div className="container">
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <h2
            style={{ color: "#272727", fontSize: "28px" }}
            className="fs-6 fw-bold title-text--1"
          >
            المدونة .
          </h2>
          <span
            onClick={() => {
              router(`${path}/AllBlogs`);
            }}
            style={{
              color: "#009AFF",
              fontSize: "18px",
              fontWeight: "800",
              cursor: "pointer",
            }}
            className="fs-6 fw-medium title-text--1"
          >
            شاهد المزيد
          </span>
        </div>
        <div className="row g-3">
          <div
            data-aos="fade-up"
            data-aos-duration="800"
            className="col-lg-4 col-md-6 col-sm-12 "
          >
            <SingleBlogCard />
          </div>
          <div
            data-aos="fade-down"
            data-aos-duration="800"
            data-aos-delay="200"
            className="col-lg-4 col-md-6 col-sm-12 "
          >
            <SingleBlogCard />
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
            className="col-lg-4 col-md-6 col-sm-12 "
          >
            <SingleBlogCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
