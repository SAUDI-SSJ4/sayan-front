import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconTextButton from "../../../UI/IconTextButton";
import Vact1 from "../../../../../../assets/icons/Vector.svg?react";
import Vact2 from "../../../../../../assets/icons/Vector (1).svg?react";
import Vact3 from "../../../../../../assets/icons/Vector (2).svg?react";
import Vact4 from "../../../../../../assets/icons/dd.svg?react";
import Vact5 from "../../../../../../assets/icons/Widget 4.svg?react";
import {
  changeNavigate,
  changeOpenInteractive,
} from "../../../../../../../redux/CourseSidebarSlice";
import style from "../../../AddNewCourse.module.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { navigate } = useSelector((state) => state.courseSidebarSlice);

  // Handle navigation logic
  const handleNavigate = (type) => {
    if (type === "interactive") {
      dispatch(changeOpenInteractive(true));
    }

    dispatch(changeNavigate(type));
  };
  useEffect(() => {
    localStorage.setItem("navigate", navigate);
  }, [navigate]);

  return (
    <div className={`${style.sideBarNav}`}>
      {/* Upper Section */}
      <div
        className={`${style.sideup} d-flex flex-column`}
        style={{ padding: "12px" }}
      >
        <IconTextButton
          isActive={navigate === "basic-info"}
          onClick={() => handleNavigate("basic-info")}
          icon={Vact3}
          text="معلومات الدورة"
        />
        <IconTextButton
          isActive={navigate === "curriculum"}
          onClick={() => dispatch(changeNavigate("curriculum"))}
          icon={Vact5}
          text="محتوى المادة التعليمية"
        />
      </div>

      {/* Lower Section */}
    </div>
  );
};

export default Sidebar;
