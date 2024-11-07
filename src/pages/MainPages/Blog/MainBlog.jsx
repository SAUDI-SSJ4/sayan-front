import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Style from "./MainBlog.module.scss";
import Footer from "../../../component/MainPages/Footer/Footer";
import Header2 from "../../../component/MainPages/Header2/Header2";
import BlogsPic from "../../../assets/images/Blogs.png";
import SearchIcon from "@mui/icons-material/Search";
import SingleBlogCard from "../../../component/AcadmyLayouts/Blog/SingleBlogCard";
import { MainSpinner } from "../../../component/UI/MainSpinner";
import { getBlogs } from "../../../utils/apis/client";
import { useQuery } from "@tanstack/react-query";
import { formatLongText, isNotEmpty } from "../../../utils/helpers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMemo, useState } from "react";
import { Pagination } from "@mui/material";

const MainBlog = () => {
  const POSTS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    cacheTime: 10000,
  });

  const blogsData = useMemo(() => {
    return blogs?.blogs || [];
  }, [blogs]);

  const lastIndex = currentPage * POSTS_PER_PAGE;
  const firstIndex = lastIndex - POSTS_PER_PAGE;
  const currentBlogs = blogsData.slice(firstIndex, lastIndex);

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  const renderBlogCards = () => {
    if (blogsData.length > 0) {
      return (
        <div className="row g-3">
          {currentBlogs.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-6 col-xl-4" key={index}>
              <SingleBlogCard blogData={item} />
            </div>
          ))}
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              count={Math.ceil(blogsData.length / POSTS_PER_PAGE)}
              page={currentPage}
              color="primary"
              onChange={handlePageChange}
            />
          </div>
        </div>
      );
    } else {
      return <p>No blogs found</p>;
    }
  };
  

  const renderMainBlog = () => {
    const mainBlog = isNotEmpty(blogs?.blogs) && blogs.blogs[0];
    if (!mainBlog) {
      return <p>No main blog available</p>;
    }
    return (
      <div className={`${Style.CardContainer}`}>
        <div className={`${Style.ImageContainer}`}>
          <img src={mainBlog.image} alt={mainBlog.title} style={{ height: "559.57px" }} />
          <div className={Style.Badge}>تأسيس شركات</div>
        </div>
        <p>{mainBlog.title}</p>
        <div className={`${Style.Footer}`} style={{ position: "relative", bottom: "20px" }}>
          <span>{mainBlog.content}</span>
          <span>
            تفاصيل أكثر <ArrowBackIcon />
          </span>
        </div>
      </div>
    );
  };

  const renderTwoBlogs = () => {
    const twoBlogs = isNotEmpty(blogs?.blogs) ? blogs.blogs.slice(2, 4) : [];
    return twoBlogs.map((item, idx) => (
      <div className="mb-4" key={idx}>
        <div className={Style.CardContainer}>
          <div className={Style.ImageContainer}>
            <img src={item.image} alt="Single Blog" style={{ height: "208px" }} />
            <div className={Style.Badge}>تأسيس شركات</div>
          </div>
          <p style={{ fontSize: "20px" }}>{formatLongText(item.title, 20)}</p>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Header2>
        <div className={Style.Container}>
          <div className={Style.BannerText} data-aos="fade-up">
            <div>
              <h1>المدونة</h1>
              <p className="text-content--1">
                نعمل لبناء تقديم افضل تعليمية, سيان هي مستقبل التعليم تعليمية, سيان هي مستقبل
                التعليم.
              </p>
            </div>
            <div>
              <img className={Style.BlogsPic} src={BlogsPic} alt="Blogs Banner" />
            </div>
          </div>
        </div>
      </Header2>

      <div className="mt-3 CustomContainer">
        <div className="d-flex">
          <div className="searchBar">
            <input type="text" placeholder="ابحث عن ..." />
            <div className="iconWrapper">
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-8">{renderMainBlog()}</div>
          <div className="col-lg-4">{renderTwoBlogs()}</div>
        </div>
        {isLoading ? <MainSpinner /> : renderBlogCards()}
      </div>
      <Footer />
    </>
  );
};

export default MainBlog;
