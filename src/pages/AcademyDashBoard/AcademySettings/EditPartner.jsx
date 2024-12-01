import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import * as Yup from "yup";
import chroma from "chroma-js";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import {
  useSpasificActions,
  useUpdateAction,
} from "../../../framework/accademy/academysetting-calltoaction";
import { useCreatPartner } from "../../../framework/accademy/academysetting-partner";


const validationSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
});

const EditPartner = () => {
  let [change, setChange] = useState(0);
  let [file, setFile] = useState();
  const navigate = useNavigate();
  let location = useLocation();
  let nav = useParams();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setChange(1);
    formik.setFieldValue("image", e.target.files[0]);
    setFile(e.target.files[0].file);
  };
  console.log(nav.slug);

  let { data: sliderData, isLoading, errors } = useSpasificActions(nav.slug);
  let { data, isLoading: loader, error, postData } = useUpdateAction(nav.slug);
  let { data: createData, postData: postCreate } = useCreatPartner();

  const handleSubmit = (values) => {
    if (sliderData) {
      values.image = file;
      postData(values);
      toast.success("تم تحديث البيانات ", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(location.pathname.replace(`/edit/${nav.slug}`, ""));
    } else {
      console.log(values);
      values.image = file;
      postCreate(values);
      toast.success("تم اضافة العنصر", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(location.pathname.replace(`/add`, ""));
    }
  };
  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (sliderData) {
      formik.setValues(sliderData);
    } else {
      formik.setValues({
        title: "",
      });
    }
  }, [sliderData]);


  return isLoading ? (
    <div className="w-full h-50 d-flex justify-content-center align-items-center">
      <Spinner className="" />
    </div>
  ) : (
    <div className="mb-5 all-info-top-header main-info-top">
      <div className="TablePageHeader ">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name ">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}> تعديل </div>
            </div>
            <div
              className="updateBtn"
              onClick={() => navigate(location.pathname.replace("/edit", ""))}
            >
              الرجوع <KeyboardBackspaceIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="CustomCard formCard all-add-notific pb-4 pt-4">
        <form onSubmit={formik.handleSubmit} className="row">
          <div className=" justify-content-center">
            <div className=" row m-auto justify-content-center">
              <img
                src={!change ? formik?.values?.image : URL.createObjectURL(formik.values.image)}
                alt="Selected File"
                style={{
                  maxWidth: "366px",
                  maxHeight: "212px",
                  objectFit: "contain",
                  marginTop: "10px",
                }}
              />

              <div className="d-flex button-content--1 justify-content-center">
                <input
                  type="file"
                  name="image"
                  id="image"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div
                  style={{
                    background: "white",
                    marginTop: "25px",
                    marginBottom: "30px",
                  }}
                  className="updateBtn"
                  onClick={handleButtonClick}
                >
                  رفع الصورة
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">العنوان </label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="submitBtn">
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPartner;
