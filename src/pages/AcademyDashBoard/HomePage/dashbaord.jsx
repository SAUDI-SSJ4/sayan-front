import StudentDashboardHeader from "../../../component/dashboard/Header/StudentHeader";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Pagination } from "@mui/material";
import { Fragment, useState } from "react";
import { Loader } from "rsuite";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import { useQuery } from "@tanstack/react-query";
import { getHome } from "../../../utils/apis/client";
import { isNotEmpty } from "../../../utils/helpers";
import { useSetting } from "../../../utils/hooks/useSetting";

const AcademyDashboard = () => {
  const {
    data: homeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getHome"],
    queryFn: () => getHome(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 5;

  const lastIndex = currentPage * POSTS_PER_PAGE;
  const firstIndex = lastIndex - POSTS_PER_PAGE;
  const currentCourses =
    isNotEmpty(homeData?.allCourses) && homeData.allCourses.slice(firstIndex, lastIndex);
  const handlePageChange = (_, page) => setCurrentPage(page);


  return (
    <Fragment>
      {isLoading ? (
        <div className=" vh-100 w-100 d-flex justify-content-center align-items-center">
          <Loader size="lg" />
        </div>
      ) : (
        <div>
          <StudentDashboardHeader academy />
          <div className="row g-3 mt-3">
            <HeaderAcademy title={"الدورات التدريبية"} />
            {isNotEmpty(currentCourses) &&
              currentCourses.map((course, index) => (
                <Card key={index} className="mb-4 border-0 shadow-sm rounded-5 p-3 ">
                  <Card.Body>
                    <Row>
                      <Col
                        md={5}
                        className="d-flex flex-column justify-content-start align-items-start"
                        style={{ maxWidth: "40%" }}
                      >
                        <h2 className="fs-5 text-start fw-bold">{course.title}</h2>
                        <p className="text-end">{course.short_content}</p>
                        <div className="mt-4 text-end">
                          <h5>تفاصيل الدورة</h5>
                          <div className="d-flex justify-content-start gap-2 my-3">
                            <span className="fw-medium">السعر:</span>
                            <span className="fw-bold">${course.price}</span>
                          </div>
                          <div className="d-flex justify-content-start gap-2 my-3">
                            <span className="fw-medium">المستوى:</span>
                            <span className="fw-bold">{course.level}</span>
                          </div>
                          <div className="d-flex justify-content-start gap-2 my-3">
                            <span className="fw-medium">النجوم:</span>
                            <span className="fw-bold">{course.stars}</span>
                          </div>
                          <div className="d-flex justify-content-start gap-2 my-3">
                            <span className="fw-medium">النوع:</span>
                            <span className="fw-bold text-capitalize">{course.type}</span>
                          </div>
                        </div>
                      </Col>

                      <Col md={6} className="text-center">
                        <video width="100%" height="240" controls style={{ borderRadius: "8px" }}>
                          <source src={"course.short_video"} type="video/mp4" />
                          المتصفح الخاص بك لا يدعم تشغيل الفيديو.
                        </video>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        md={5}
                        className="d-flex flex-column justify-content-center gap-3 align-items-start"
                      >
                        <h5>ماذا ستتعلم</h5>
                        <p>{course.learn}</p>
                      </Col>
                      <Col md={6} className="d-flex justify-content-between align-items-center">
                        {course.gallery.map((image, index) => (
                          <div key={index} className="m-2">
                            <img
                              src={image}
                              alt={`Gallery ${index}`}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                          </div>
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
              ))}
          </div>
          <div className="d-flex justify-content-center my-4">
            <Pagination
              count={Math.ceil(homeData?.allCourses?.length / POSTS_PER_PAGE)}
              color="primary"
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AcademyDashboard;
