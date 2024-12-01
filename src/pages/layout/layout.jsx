import { Fragment, useEffect, useState } from "react";
import NavBar from "../../component/navbar/navbar";
import SideBar from "../../component/sidebar/sidebar.jsx";
import MobileSideBar from "../../component/sidebar/mobileSideBar";
import { Navigate, useLocation } from "react-router-dom";
import { MainSpinner } from "../../component/UI/MainSpinner.jsx";
import { useAuth } from "../../utils/hooks/useAuth.jsx";
import Cookies from "js-cookie";

const LayOut = ({ children }) => {
  const [show, setShow] = useState(false);

  const location = useLocation();

  const {user, isLoading} = useAuth();



  if (isLoading) {
    return <MainSpinner />;
  }

  if (user) {
    return (
      <Fragment>
        {["/login", "/register", "/home"].some((path) =>
          location.pathname.includes(path)
        ) ? (
          children
        ) : (
          <div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="resposive-container"
            >
              <div
                style={{
                  width: "20%",
                  maxWidth: "350px",
                  transition: "0.4s",
                }}
                className="responsive-sideBar"
              >
                <SideBar flag={false} profileData={user} />
              </div>
              <div className="main-page">
                <NavBar setShow={setShow} profileData={user} />
                {children}
              </div>
            </div>
            <MobileSideBar show={show} setShow={setShow} profileData={user} />
          </div>
        )}
      </Fragment>
    );
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default LayOut;
