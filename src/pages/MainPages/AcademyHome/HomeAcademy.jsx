import Style from "./home.module.scss";
import { useState, lazy, Suspense, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "@mui/material";
import { HomeMainHeader } from "./HomeComponents/HomeMainHeader";
import { SubjectHeader } from "./HomeComponents/SubjectHeader";
import { SideBarFilter } from "./HomeComponents/SideBarFilter";
import {  getCourses } from "../../../utils/apis/client";
import { MainSpinner } from "../../../component/UI/MainSpinner";
import { motion } from "framer-motion";
import Skeleton from "@mui/material/Skeleton";
import { getCourse } from "../../../utils/apis/client/academy";

// تغيير طريقة استيراد المكونات
import SubjectCard from "../../../component/MainPages/SubjectCard/SubjectCard";
import Footer from "../../../component/MainPages/Footer/Footer";

// استخدام lazy فقط للمكونات الثقيلة
const Numbers = lazy(() => import("../../../component/MainPages/Numbers/Numbers"));
const SubjectSlider = lazy(() => import("../../../component/MainPages/SubjectCard/subjectSlider"));

const HomeAcademy = () => {
  
  const [filterData, setFilterData] = useState([]);

  const queryClient = useQueryClient();

  const {
    data: courses,
    isLoadingCourses,
    errorsCourses,
  } = useQuery({
    queryKey: ["ACourses"],
    queryFn: () => getCourse(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });

  const coursePrices = useMemo(
    () => courses?.data?.map((course) => course.price) || [],
    [courses?.data]
  );

  const minPrice = Math.min(...coursePrices, 0);
  const maxPrice = Math.max(...coursePrices, 10000);

  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 9;

  const filteredData = useMemo(() => {
    return filterData?.length === 0 ? courses?.data : filterData;
  }, [courses?.data, filterData]);

  
  const lastIndex = currentPage * POSTS_PER_PAGE;
  const firstIndex = lastIndex - POSTS_PER_PAGE;
  const currentCourses = filteredData?.slice(firstIndex, lastIndex);

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
    queryClient.prefetchQuery(["courses", page + 1], () =>
      getCourses(page + 1)
    );
  };

  const filterByCourseTitle = useCallback(
    (searchQuery) => {
      const filtered = searchQuery
        ? courses?.data?.filter((course) =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : courses?.data;

      setFilterData(filtered);
      return filtered;
    },
    [courses?.data]
  );

  const filterByCategories = useCallback(
    (priceRange, category, type) => {
      const filtered = courses?.data?.filter((course) => {
        
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
    [courses?.data]
  );

  return (
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
              <div className="row g-2">
                {isLoadingCourses ? (
                  <div className="row g-2">
                    {[...Array(POSTS_PER_PAGE)].map((_, index) => (
                      <div
                        key={index}
                        className="col-12 col-md-6 col-lg-6 col-xl-4"
                      >
                        <Skeleton
                          variant="rectangular"
                          width={220}
                          height={200}
                        />
                        <Skeleton width="40%" />
                        <Skeleton width="70%" />
                      </div>
                    ))}
                  </div>
                ) : errorsCourses ? (
                  <div>Error loading courses</div>
                ) : (
                  currentCourses &&
                  currentCourses.map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="col-12 col-md-6 col-lg-6 col-xl-4"
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
                  count={Math.ceil(filteredData?.length / POSTS_PER_PAGE)}
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
  );
};

export default HomeAcademy;
