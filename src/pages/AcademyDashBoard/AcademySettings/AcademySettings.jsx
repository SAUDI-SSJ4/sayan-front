import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchAndShowBar from "../../../component/UI/SearchAndShowBar/SearchAndShowBar";
import { useEffect, useState } from "react";
import DigitalProductsCardContainer from "../../../component/DigitalProducts/DigitalProductsCard/DigitalProductsCardContainer";
import DigitalProductsTable from "../../../component/DigitalProducts/DigitalProductsTable/DigitalProductsTable";
import { motion, AnimatePresence } from "framer-motion";
import AreaChart from "../../../component/charts/doubleArea";
import SuccesModal from "../../../component/UI/SuccesModal/SuccesModal";
import DeleteModal from "../../../component/UI/DeleteModal/DeleteModal";
import axios from "axios";

import { Link, useLocation } from "react-router-dom";
import SliderTable from "../../../component/SettingsTables/SliderTable/SliderTable";
import AboutTable from "../../../component/SettingsTables/AboutTable/AboutTable";
import FaqTable from "../../../component/SettingsTables/FaqTable/FaqTable";
import CallToActionTable from "../../../component/SettingsTables/CallToActionTable/CallToActionTable";
import FooterTable from "../../../component/SettingsTables/FooterTable/FooterTable";
import PartnersTable from "../../../component/SettingsTables/PartnersTable/PartnersTable";
import TemplateTable from "../../../component/SettingsTables/TemplateTable/TemplateTable";
import { getData } from "../../../framework/accademy/production";
import TrainingTable from "./../../../component/TrainingTable/TrainigTable";
import Template from "./Template";
import StudentRatesTable from "../../../component/SettingsTables/StudentRatesTable/StudentRatesTable";
import { Button } from "rsuite";
import { useDeleteOpinion } from "../../../framework/accademy/academysetting-opinions";
import { Error } from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  DeleteAcademyFaq,
  DeleteAcademyOpinion,
} from "../../../utils/apis/client/academy";

const AcademySettings = () => {
  const [TableOrNot, setTableOrNot] = useState(true);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [data, setData] = useState([]);
  const [ShowDeleteModal, setDeleteModal] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  let location = useLocation();
  console.log(location.pathname.split("/")[3]);

  const checkAllHandler = () => {
    setCheckedKeys((perv) => {
      if (
        perv?.length === data?.length &&
        (perv?.length !== 0 || data?.length !== 0)
      ) {
        return [];
      } else {
        return [...data];
      }
    });
  };
  const DeleteSelectedOpinions = async () => {
    try {
      // Create an array of deletion promises
      const deletionPromises = checkedKeys.map((item) =>
        DeleteAcademyOpinion(item.id)
      );

      // Wait for all deletions to finish
      const results = await Promise.all(deletionPromises);

      // Check each response and handle success/failure
      let successCount = 0;
      results.forEach((res, index) => {
        if (res.success) {
          successCount++;
          toast.success(
            `تم حذف تعليق ${checkedKeys[index].student_name} بنجاح`
          );
          setCheckedKeys([]);
          setIsRefresh(true);
        } else {
          toast.error(`حدث خطأ عند حذف العنصر ${checkedKeys[index].id}`);
        }
      });

      if (successCount > 0) {
        // Refresh the table data
        const updatedData = data.filter(
          (item) => !checkedKeys.some((key) => key.id === item.id)
        );
        setData(updatedData);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء حذف العناصر");
      console.error("Error deleting opinions:", error);
    }
  };
  const DeleteSelectedFAQs = async () => {
    try {
      // Create an array of deletion promises
      const deletionPromises = checkedKeys.map(
        (item) => DeleteAcademyFaq(item.id) // Assume DeleteFAQ is the API function for deleting a FAQ
      );

      // Wait for all deletions to finish
      const results = await Promise.all(deletionPromises);

      // Check each response and handle success/failure
      let successCount = 0;
      results.forEach((res, index) => {
        if (res.success) {
          successCount++;
          toast.success(`تم حذف السؤال الشائع ${checkedKeys[index].id} بنجاح`);
          setCheckedKeys([]);
          setIsRefresh(true);
        } else {
          toast.error(`حدث خطأ عند حذف العنصر ${checkedKeys[index].id}`);
        }
      });

      if (successCount > 0) {
        // Refresh the table data
        const updatedData = data.filter(
          (item) => !checkedKeys.some((key) => key.id === item.id)
        );
        setData(updatedData);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء حذف العناصر");
      console.error("Error deleting FAQs:", error);
    }
  };

  const getTitle = () => {
    switch (true) {
      case location.pathname.includes("/settings/slider"):
        return " القائمة الرئيسية";
      case location.pathname.includes("/settings/about"):
        return " من نحن";
      case location.pathname.includes("/settings/faq"):
        return " الاسئلة الشائعة";
      case location.pathname.includes("/settings/ratesOfStudents"):
        return " اراء الطلبة";
      case location.pathname.includes("/settings/call-to-action"):
        return " ادارة الاعدادات";
      case location.pathname.includes("/settings/footer"):
        return " الذيل";
      case location.pathname.includes("/settings/partner"):
        return " الشركاء";
      case location.pathname.includes("/settings/template"):
        return " النموذج";
      default:
        return "";
    }
  };

  return (
    <div className="all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}>{getTitle()}</div>
            </div>
            {location.pathname.includes("/settings/ratesOfStudents") ? (
              <div className="d-flex align-items-center gap-3 flex-wrap  ">
                {checkedKeys.length > 0 ? (
                  <Button
                    onClick={() => DeleteSelectedOpinions()}
                    size="lg"
                    appearance="primary"
                    color="red"
                  >
                    {" "}
                    حذف المحددة
                  </Button>
                ) : (
                  ""
                )}
                <Link
                  to={"/academy/settings/ratesOfStudents/add"}
                  className="addBtn"
                >
                  <AddCircleIcon />
                  أضافة
                </Link>
              </div>
            ) : location.pathname.includes("/settings/faq") ? (
              <div className="d-flex align-items-center gap-3 flex-wrap  ">
                {checkedKeys.length > 0 ? (
                  <Button
                    onClick={() => DeleteSelectedFAQs()}
                    size="lg"
                    appearance="primary"
                    color="red"
                  >
                    {" "}
                    حذف المحددة
                  </Button>
                ) : (
                  ""
                )}
                <Link to={"/academy/settings/faq/add"} className="addBtn">
                  <AddCircleIcon />
                  أضافة
                </Link>
              </div>
            ) : (
              ""
            )}
            {location.pathname.includes("/settings/call-to-action") ? (
              <Link
                to={"/academy/settings/call-to-action/add"}
                className="addBtn"
              >
                <AddCircleIcon />
                أضافة
              </Link>
            ) : (
              ""
            )}
            {location.pathname.includes("/settings/footer") ? (
              <Link to={"/academy/settings/footer/add"} className="addBtn">
                <AddCircleIcon />
                أضافة
              </Link>
            ) : (
              ""
            )}
            {location.pathname.includes("/settings/partner") ? (
              <Link to={"/academy/settings/partner/add"} className="addBtn">
                <AddCircleIcon />
                أضافة
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {TableOrNot ? (
          <motion.div
            key="expanded-content"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }} // Exit animation for the first motion.div
            transition={{ duration: 0.2 }}
          >
            {location.pathname.includes("/settings/slider") ? (
              <SliderTable
                checkedKeys={checkedKeys}
                setDeleteModal={setDeleteModal}
                setCheckedKeys={setCheckedKeys}
                checkAllHandler={checkAllHandler}
                setData={setData}
              />
            ) : location.pathname.includes("/settings/about") ? (
              <AboutTable
                checkedKeys={checkedKeys}
                setDeleteModal={setDeleteModal}
                setCheckedKeys={setCheckedKeys}
                checkAllHandler={checkAllHandler}
                setData={setData}
              />
            ) : location.pathname.includes("/settings/faq") ? (
              <FaqTable
                checkedKeys={checkedKeys}
                setDeleteModal={setDeleteModal}
                setCheckedKeys={setCheckedKeys}
                checkAllHandler={checkAllHandler}
                setData={setData}
                isRefresh={isRefresh}
                setIsRefresh={setIsRefresh}
              />
            ) : location.pathname.includes("/settings/ratesOfStudents") ? (
              <StudentRatesTable
                checkedKeys={checkedKeys}
                setDeleteModal={setDeleteModal}
                setCheckedKeys={setCheckedKeys}
                checkAllHandler={checkAllHandler}
                setData={setData}
                isRefresh={isRefresh}
                setIsRefresh={setIsRefresh}
              />
            ) : location.pathname.includes("/settings/call-to-action") ? (
              <CallToActionTable
                checkedKeys={checkedKeys}
                setDeleteModal={setDeleteModal}
                setCheckedKeys={setCheckedKeys}
                checkAllHandler={checkAllHandler}
                setData={setData}
              />
            ) : location.pathname.includes("/settings/footer") ? (
              <FooterTable
                checkedKeys={checkedKeys}
                setDeleteModal={setDeleteModal}
                setCheckedKeys={setCheckedKeys}
                checkAllHandler={checkAllHandler}
                setData={setData}
              />
            ) : location.pathname.includes("/academy/EmployeeMangment") ? (
              <TrainingTable
                checkedKeys={checkedKeys}
                setDeleteModal={setDeleteModal}
                setCheckedKeys={setCheckedKeys}
                checkAllHandler={checkAllHandler}
                setData={setData}
              />
            ) : location.pathname.includes("/settings/partner") ? (
              <PartnersTable
                checkedKeys={checkedKeys}
                setDeleteModal={setDeleteModal}
                setCheckedKeys={setCheckedKeys}
                checkAllHandler={checkAllHandler}
                setData={setData}
              />
            ) : location.pathname.includes("/settings/template") ? (
              <Template />
            ) : (
              <TemplateTable
                checkedKeys={checkedKeys}
                setDeleteModal={setDeleteModal}
                setCheckedKeys={setCheckedKeys}
                checkAllHandler={checkAllHandler}
                setData={setData}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="collapsed-content"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DigitalProductsCardContainer
              setData={setData}
              checkedKeys={checkedKeys}
              setCheckedKeys={setCheckedKeys}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <DeleteModal show={ShowDeleteModal} setShow={setDeleteModal} />
    </div>
  );
};

export default AcademySettings;
