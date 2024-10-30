import classes from "./navbar.module.scss";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { AnimatePresence, motion } from "framer-motion";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useLogOut } from "../../utils/hooks/useLogOut";
import SayanLogo from "../../assets/images/SayanLogo.png";
import { useNavigate } from "react-router-dom";


const NavBar = ({ setShow, profileData }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  
  const dropdownVariants = {
    hidden: { opacity: 0, y: "120%" },
    visible: { opacity: 1, y: " 100%", transition: { duration: 0.3 } },
  };

  const navigate = useNavigate();

  return (
    <div className={`${classes.navbar} navbar-dash`}>
      <div className={classes.container}>
        <div className={classes.forMobile}>
          <MenuOutlinedIcon
            sx={{ width: "30px", height: "30px", color: "#7E8799" }}
            onClick={() => setShow(true)}
          />
        </div>
        <div>
          <div className={`${classes.Profile}`}>
            <img
              src={profileData?.image}
              alt="user-avatar"
              onClick={() => setShowDropDown(!showDropDown)}
            />
            <div className={classes.greenBall}></div>
            <AnimatePresence>
              {showDropDown && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={`${classes.dropDownMenu} drop-menu--1`}
                >
                  <div>
                    <AccountBalanceWalletIcon sx={{ color: "#A3AED0" }} />
                    حساب المنصة
                  </div>

                  {/* <div>
                    <SettingsIcon sx={{ color: "#A3AED0" }} />
                    ادارة النظام
                  </div>
                  <div>
                    <LanguageIcon sx={{ color: "#A3AED0" }} />
                    اللغة (العربية)
                  </div>
                  <div>
                    <BedtimeIcon sx={{ color: "#A3AED0" }} />
                    الوضع (فاتح)
                  </div> */}

                  <div className="d-flex align-items-center" onClick={() => useLogOut()}>
                    <LogoutOutlinedIcon sx={{ color: "#A3AED0" }} />
                    <span style={{ color: "red" }}> تسجيل الخروج</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <NotificationsNoneOutlinedIcon sx={{ width: "30px", height: "30px", color: "#7E8799" }} />
      </div>
      <div className={`${classes.Title} input--info`}>
        <div className={classes.searchBar}>
          <input type="text" placeholder="ابحث..." />
          <SearchIcon sx={{ width: "20px", height: "20px", color: "#7E8799" }} />
        </div>
      </div>

      {/*  */}
      <div className={classes.SayanLogo} onClick={() => navigate('/')}>

        <img src={SayanLogo} alt="SayanLogo" />
      </div>
    </div>
  );
};

export default NavBar;
