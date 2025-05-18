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

  return (
    <div className={`${style.sideBarNav}`}>
      <div
        className={`${style.sideup} d-flex flex-column`}
        style={{ padding: "12px" }}
      >
        <IconTextButton
          isActive={navigate === "video"}
          onClick={() => handleNavigate("video")}
          icon={Vact1}
          text="اضافة فيديو"
        />
        <IconTextButton
          isActive={["interactive", "flippingCard", "hiddenCards"].includes(
            navigate
          )}
          onClick={() => handleNavigate("interactive")}
          icon={Vact2}
          text="اضافة اداة تفاعلية"
        />
        <IconTextButton
          isActive={navigate === "exam"}
          onClick={() => handleNavigate("exam")}
          icon={Vact3}
          text="اضافة اختبار"
        />
      </div>

      {/* Lower Section */}
      <div className={style.sidedown} style={{ padding: "12px" }}>
        <IconTextButton
          isActive={navigate === "chapter"}
          onClick={() => dispatch(changeNavigate("chapter"))}
          icon={Vact5}
          text="اضافة فصل جديد"
          isAllwo={true}
        />
      </div>
    </div>
  );
};

export default Sidebar;
