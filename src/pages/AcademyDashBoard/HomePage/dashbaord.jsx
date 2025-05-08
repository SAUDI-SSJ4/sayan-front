import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Pagination } from "@mui/material";
import { Loader } from "rsuite";
import AcademyHeader from "../Header/AcademyHeader";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import { getHome } from "../../../utils/apis/client";
import { isNotEmpty } from "../../../utils/helpers";

const POSTS_PER_PAGE = 5;

const CourseCard = ({ course }) => (
  <Card className="mb-4 border-0 shadow-sm rounded-5 p-3">
    <Card.Body>
      <Row>
        <Col md={5} style={{ maxWidth: "40%" }}>
          <h2 className="fs-5 fw-bold text-start">{course.title}</h2>
          <p className="text-end">{course.short_content}</p>

          <div className="mt-4 text-end">
            <h5>تفاصيل الدورة</h5>
            {[
              { label: "السعر", value: `$${course.price}` },
              { label: "المستوى", value: course.level },
              { label: "النجوم", value: course.stars },
              { label: "النوع", value: course.type },
            ].map((item, idx) => (
              <div key={idx} className="d-flex gap-2 my-3">
                <span className="fw-medium">{item.label}:</span>
                <span className="fw-bold text-capitalize">{item.value}</span>
              </div>
            ))}
          </div>
        </Col>

        <Col md={6} className="text-center">
          <video
            width="100%"
            height="240"
            controls
            style={{ borderRadius: "8px" }}
          >
            <source src={course.short_video} type="video/mp4" />
            المتصفح الخاص بك لا يدعم تشغيل الفيديو.
          </video>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={5}>
          <h5>ماذا ستتعلم</h5>
          <p>{course.learn}</p>
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-between align-items-center flex-wrap"
        >
          {course.gallery?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Gallery ${idx}`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              className="m-2"
            />
          ))}
        </Col>
      </Row>

      <div className="text-center mt-4">
        <Button
          variant="primary"
          href={course.url}
          target="_blank"
          className="px-4 text-white"
        >
          الرابط
        </Button>
      </div>
    </Card.Body>
  </Card>
);

const AcademyDashboard = () => {
  const { data: homeData, isLoading } = useQuery({
    queryKey: ["getHome"],
    queryFn: getHome,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const courses = homeData?.allCourses || [];

  const paginatedCourses = courses.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <Fragment>
      <AcademyHeader academy />
      <div className="row g-3 mt-3">
        <HeaderAcademy title="الدورات التدريبية" />
        {isNotEmpty(paginatedCourses) &&
          paginatedCourses.map((course, idx) => (
            <CourseCard key={idx} course={course} />
          ))}
      </div>

      <div className="d-flex justify-content-center my-4">
        <Pagination
          count={Math.ceil(courses.length / POSTS_PER_PAGE)}
          color="primary"
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
        />
      </div>
    </Fragment>
  );
};

export default AcademyDashboard;
