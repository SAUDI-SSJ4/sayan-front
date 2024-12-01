import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import defualt from "../../assets/images/img.png";
import chroma from "chroma-js";
import Select from "react-select";
import { useRef, useState } from "react";
import axiosInstance from "../../../axios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(" يرجي ادخال اسم التصنيف"),
  content: Yup.string().required(" يرجي ادخال محتوي التصنيف "),
  file: Yup.mixed().required("File is required")
});

const AddNewCate = () => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    // Handle file change logic here, if needed
    console.log("Selected file:", e.target.files[0]);
    formik.setFieldValue("file", e.target.files[0]);
  };
  const [file, setFile] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      content: "",

      file: null
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("content", values.content);
      formData.append("file", values.file);
      console.log(formData);
      axiosInstance.post("admin/category", formData).then((res) => {
        console.log(res.data);
      });
    }
  });

  const onDrop = (acceptedFiles) => {
    formik.setFieldValue("file", acceptedFiles[0]);
  };

  return (
    <div className="all-info-top-header main-info-top mb-5">
      <div className="TablePageHeader ">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name ">
              <div className="icon">
                <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              </div>
              <div style={{ color: "#7E8799" }}> انشاء تصنيف جديد </div>
            </div>
            <div className="updateBtn">
              الرجوع <KeyboardBackspaceIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="CustomCard formCard all-new-blog pb-4 pt-4">
        <form onSubmit={formik.handleSubmit} className="row">
          <div className=" justify-content-center">
            <div className=" row justify-content-center">
              <img
                src={
                  formik.values.file
                    ? URL.createObjectURL(formik.values.file)
                    : defualt
                }
                alt="Selected File"
                style={{
                  maxWidth: "366px",
                  maxHeight: "212px",
                  objectFit: "contain",
                  marginTop: "10px"
                }}
              />

              <div className="d-flex justify-content-center">
                <input
                  type="file"
                  name="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div
                  style={{
                    background: "white",
                    marginTop: "25px",
                    marginBottom: "30px"
                  }}
                  className="updateBtn"
                  onClick={handleButtonClick}
                >
                  رفع صورة الايقونة
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name">العنوان </label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name">المصنِّف </label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name">المحتوى </label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="content"
                name="content"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.content && formik.errors.content && (
                <div>{formik.errors.content}</div>
              )}
            </div>
          </div>
          {/* <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="name">رابط التصنيف </label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              
              />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
          </div> */}
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

export default AddNewCate;
