import React, { useMemo } from "react";
import classes from "./sidebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavigation from "./AdminNavigatio";
import StudentNavigation from "./StudentNavigation";
import AcademeyNavigation from "./AcademeyNavigation";
import AcademyImage from "../../assets/icons/Acadmy.png";
import { formatLongText, generateUUID } from "../../utils/helpers";
import Cookies from "js-cookie";

const SideBar = ({ flag, mobile, setShow, profileData }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();


  const handleNavigation = () => {
    const loginType = Cookies.get("login_type");

    if (loginType === "academy" &&profileData?.name && profileData?.id) {
      const encodedName = encodeURIComponent(profileData.name);
      navigate(`/acdemy/${profileData.academy_id}`);
    }else if(loginType === "student") {
      navigate("/");
    }
  };

  const profileImage = profileData?.academy?.image || profileData?.image;
  const loginType = Cookies.get("login_type");
  const profileName = loginType === "academy" ? profileData?.academy?.name : profileData?.name || "أكاديمية ضوء";

  const handleProfileSwitch = () => {
    const isProfileVisible =
      pathname.includes("/student") || pathname.includes("/admin") || pathname.includes("/academy");

    if (isProfileVisible) {
      return (
        <div className={`${classes.Profile} ${classes.profileVisible}`}>
          <img src={profileImage} alt={profileData?.id || "Academy"} />
          <div className="d-flex flex-column align-items-center gap-2">
            <p className={classes.Name}>{formatLongText(profileName, 15)}</p>
            {pathname.includes("/academy") && (
              <button 
                onClick={() => handleNavigation()}
                className="btn btn-primary btn-sm d-flex align-items-center justify-content-center gap-1"
                style={{ 
                  fontSize: '12px', 
                  fontWeight: 'bold',
                  height: '40px',
                  width: '150px',
                  backgroundColor: '#0062ff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0 8px'
                }}
              >
                <span style={{ color: 'white', fontWeight: 'bold' }}>زيارة صفحة الأكاديمية</span>
                <i className="fas fa-arrow-left" style={{ fontSize: '8px', color: 'white' }}></i>
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={classes.Profile}>
        <img src={AcademyImage} alt="Academy" />
        <p className={classes.Name}>أكاديمية ضوء</p>
      </div>
    );
  };

  const NavigationComponent = useMemo(() => {
    if (pathname.includes("/admin")) {
      return <AdminNavigation setShow={setShow} mobile={mobile} />;
    } else if (pathname.includes("/student")) {
      return <StudentNavigation setShow={setShow} mobile={mobile} />;
    } else {
      return <AcademeyNavigation setShow={setShow} mobile={mobile} />;
    }
  }, [pathname, setShow, mobile]);

  return (
    <div className={`${flag ? [classes.active, classes.sideBar].join(" ") : classes.sideBar}`}>

      <div className={classes.sidebarHeader}>{handleProfileSwitch()}</div>

      <div className={classes.body}>{NavigationComponent}</div>
    </div>
  );
};

export default SideBar;
