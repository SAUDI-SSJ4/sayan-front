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
      navigate(`/myacademy/${encodedName}/${profileData.id}/${generateUUID()}`);
    }else if(loginType === "student") {
      navigate("/");
    }
  };

  const profileImage = profileData?.image || AcademyImage;
  const profileName = profileData?.name || "أكاديمية ضوء";

  const handleProfileSwitch = () => {
    const isProfileVisible =
      pathname.includes("/student") || pathname.includes("/admin") || pathname.includes("/academy");

    if (isProfileVisible) {
      return (
        <div className={`${classes.Profile} ${classes.profileVisible}`} 
        onClick={() => handleNavigation()}>
          <img src={profileImage} alt={profileData?.id || "Academy"} />
          <p className={classes.profileName}>{formatLongText(profileName, 10)}</p>
        </div>
      );
    }

    return (
      <div className={classes.Profile}>
        <img src={AcademyImage} alt="Academy" />
        <p className={classes.profileName}>أكاديمية ضوء</p>
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
      <div onClick={() => setShow(false)} className="icon-close-side">
        X
      </div>

      <div className={classes.sidebarHeader}>{handleProfileSwitch()}</div>

      <div className={classes.body}>{NavigationComponent}</div>
    </div>
  );
};

export default SideBar;
