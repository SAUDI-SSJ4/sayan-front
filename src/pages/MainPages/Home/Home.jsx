import Style from "./home.module.scss";
import { useState, lazy, Suspense, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "@mui/material";
import { HomeMainHeader } from "./HomeComponents/HomeMainHeader";
import { SubjectHeader } from "./HomeComponents/SubjectHeader";
import { SideBarFilter } from "./HomeComponents/SideBarFilter";
import { getCourses } from "../../../utils/apis/client";
import { MainSpinner } from "../../../component/UI/MainSpinner";
import { motion } from "framer-motion";
import Skeleton from "@mui/material/Skeleton";
import { Helmet } from "react-helmet-async";

const Numbers = lazy(() =>
  import("../../../component/MainPages/Numbers/Numbers")
);
const SubjectSlider = lazy(() =>
  import("../../../component/MainPages/SubjectCard/subjectSlider")
);
const Footer = lazy(() => import("../../../component/MainPages/Footer/Footer"));
const SubjectCard = lazy(() =>
  import("../../../component/MainPages/SubjectCard/SubjectCard")
);

const Home = () => {
  const [filterData, setFilterData] = useState([]);

  const queryClient = useQueryClient();

  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data: response } = await getCourses();
      return response?.data || [];
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    cacheTime: 10000,
  });

  const coursePrices = useMemo(
    () => courses.map((course) => course.price) || [],
    [courses]
  );
  const minPrice = Math.min(...coursePrices, 0);
  const maxPrice = Math.max(...coursePrices, 10000);

  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 9;

  const filteredData = useMemo(() => {
    return filterData.length === 0 ? courses : filterData;
  }, [courses, filterData]);

  const lastIndex = currentPage * POSTS_PER_PAGE;
  const firstIndex = lastIndex - POSTS_PER_PAGE;
  const currentCourses = filteredData.slice(firstIndex, lastIndex);

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
    queryClient.prefetchQuery(["courses", page + 1], () =>
      getCourses(page + 1)
    );
  };

  const filterByCourseTitle = useCallback(
    (searchQuery) => {
      const filtered = searchQuery
        ? courses.filter((course) =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : courses;

      setFilterData(filtered);
      return filtered;
    },
    [courses]
  );

  const filterByCategories = useCallback(
    (priceRange, category, type) => {
      const filtered = courses.filter((course) => {
        const matchesPrice =
          course.price >= priceRange[0] && course.price <= priceRange[1];
        const matchesCategory =
          category === "all" || course.category_id === category;
        const matchesType = type === "all" || course.type === type;
        return matchesPrice && matchesCategory && matchesType;
      });
      setFilterData(filtered);
      return filtered;
    },
    [courses]
  );

  return (
    <>
      <Helmet>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon.svg"
          key="favicon"
        />
      </Helmet>
      <div className="header-bg" style={{ backgroundColor: "white" }}>
        <HomeMainHeader />

        <div className="container">
          <Suspense fallback={<MainSpinner />}>
            <Numbers />
          </Suspense>
        </div>

        <Suspense fallback={<MainSpinner />}>
          <SubjectSlider />
        </Suspense>

        <div className={Style.AllSubject}>
          <div className="CustomContainer">
            <SubjectHeader filterByCourseTitle={filterByCourseTitle} />

            <div className="row g-3">
              <div className="col-12 col-md-12 col-lg-3">
                <SideBarFilter
                  minValue={minPrice}
                  maxValue={maxPrice}
                  filterByCategories={filterByCategories}
                />
              </div>

              <div className="col-12 col-md-12 col-lg-9">
                <div className="row g-2 justify-content-center">
                  {isLoading ? (
                    <div className="row g-2 justify-content-center">
                      {[...Array(POSTS_PER_PAGE)].map((_, index) => (
                        <div
                          key={index}
                          className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4"
                        >
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={200}
                            style={{ maxWidth: '300px', margin: '0 auto' }}
                          />
                          <Skeleton width="40%" style={{ margin: '8px auto' }} />
                          <Skeleton width="70%" style={{ margin: '8px auto' }} />
                        </div>
                      ))}
                    </div>
                  ) : error ? (
                    <div>Error loading courses</div>
                  ) : (
                    currentCourses &&
                    currentCourses.map((course, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 d-flex justify-content-center"
                      >
                        <Suspense fallback={<MainSpinner />}>
                          <SubjectCard mainData={course} />
                        </Suspense>
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    count={Math.ceil(filteredData.length / POSTS_PER_PAGE)}
                    color="primary"
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Suspense fallback={<MainSpinner />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
