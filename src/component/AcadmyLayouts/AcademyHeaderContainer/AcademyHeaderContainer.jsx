import AcademyLayoutNavbar from "../AcademyLayoutNavbar/AcademyLayoutNavbar";
import classes from "./AcademyHeaderContainer.module.scss";
import Divider from "./dvider";
import layout2Image from "../../../assets/images/layout2.png";

const AcademyHeaderContainer = ({ profileData }) => {
  return (
    <>
      <div className={classes.Container} style={{ backgroundColor: "white" }}>
        <AcademyLayoutNavbar />
      </div>
      <div className="container d-flex justify-content-center mt-5">
        <img src={layout2Image} style={{ maxWidth: "100%" }} />
      </div>
    </>
  );
};

export default AcademyHeaderContainer;
