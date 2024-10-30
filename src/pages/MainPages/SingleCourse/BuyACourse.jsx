import Style from "./SingleCourse.module.scss";
import React, { useState, useEffect } from "react";
import buycourse from "./buyacourses.module.css";
import buying from "../../../assets/icons/buying.jpg";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { postBuy } from "../../../utils/apis/client";
import { useAuth } from "../../../utils/hooks/useAuth";

function BuyACourse({ courseId, setshowBuyCourses }) {
  
  const { user, isLoading: userLoading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    mutateAsync: buyCourse,
    isLoading: isBuying,
    isSuccess: isPaymentSuccess,
    isError: isPaymentError,
    error: paymentError,
  } = useMutation({
    mutationFn: async () => await postBuy({ course_id: courseId, source: "sayan" }),
    onSuccess: (data) => {
      const newWindow = window.open("", "_blank");
      if (newWindow && data) {
        newWindow.document.open();
        newWindow.document.write(data.data);
        newWindow.document.close();
        console.log("HTML content written to new window");
      } else {
        console.error("Failed to open payment window or missing data");
      }
    },
    onError: (err) => {
      console.error("Error during payment process:", err);
    },
  });

  useEffect(() => {
    console.log({ course_id: courseId, source: "sayan" });

    if (!userLoading && !isAuthenticated && user) {
      if (!courseId) return;
      setIsAuthenticated(true);
      buyCourse();
    }
  }, [user, userLoading, isAuthenticated, buyCourse,courseId]);

  const renderPaymentState = () => {
    if (userLoading || !isAuthenticated) {
      return (
        <>
          <h3>قم بتسجيل الدخول أولا</h3>
          <span className={buycourse.lineSep}></span>
          <div className={buycourse.parentImage}>
            <img src={buying} alt="Login" className={buycourse.imagelogin} />
          </div>
          <h6>لشراء الدورة التدريبية عليك تسجيل الدخول أو إنشاء حساب أولا.</h6>
          <span className={buycourse.lineSep}></span>
          <Link
            to={"/student/login"}
            className={`${buycourse.login} btn btn-primary fs-5 mt-3 m-auto d-block`}
          >
            تسجيل الدخول أو إنشاء حساب
          </Link>
        </>
      );
    }

    switch (true) {
      case isBuying:
        return <Spinner animation="border" />;

      case isPaymentSuccess:
        return <h3>تم توجيهك إلى صفحة الدفع في نافذة جديدة</h3>;

      case isPaymentError:
        return <div>Error: {paymentError?.message || "حدث خطأ أثناء عملية الدفع"}</div>;

      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <div className={buycourse.parent}>
        <div className={`${buycourse.container} animate__animated animate__pulse`}>
          {renderPaymentState()}
        </div>
      </div>
      <IoClose className={Style.closeBut} onClick={() => setshowBuyCourses(false)} />
    </React.Fragment>
  );
}

export default BuyACourse;
