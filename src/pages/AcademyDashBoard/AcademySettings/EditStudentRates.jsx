import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import defualt from "../../../assets/images/img.png";
import chroma from "chroma-js";
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import TextEditor from "../../../component/UI/TextEditor";
import UploadFileInput from "../../../component/UI/UploadFile/UploadFileInput";
import { Button, Rate, Toggle } from "rsuite";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSlider, useUpdateSlider } from "../../../framework/accademy/academysetting-slider";
import { Spinner } from "react-bootstrap";
import { Error } from "@mui/icons-material";
import {
  useCreateFAQ,
  useSpasificFAQ,
  useUpdateFAQ,
} from "../../../framework/accademy/academysetting-faq";
import { ImageInput } from "../../../utils/styles";
import UploadImage from "../../../component/UI/UploadFile/UploadImage";
import { useCreateOpinion, useSpasificOpinions, useUpdateOpinion } from "../../../framework/accademy/academysetting-opinions";
import { editAcademyOpinions, postAcademyOpinions } from "../../../utils/apis/client/academy";





const validationSchema = Yup.object().shape({
  student_name: Yup.string().required("الاسم مطلوبا"),
  student_avatar: Yup.string().required("صورة الطلاب مطلوبة"),
  rate: Yup.number().required("تقييم الطلاب مطلوب"),
  opinion: Yup.string().required("تعليق الطلاب مطلوب"),
});

const EditStudentRates = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let nav = useParams();



  let { data: opinionsData, isLoading, errors } = useSpasificOpinions(nav.slug);



  // let { data, isLoading: loader, error, postData } = useUpdateOpinion(nav.slug);
  // let { data: createData, postData: postCreate } = useCreateOpinion();
  const handleSubmit = (values) => {
    if (opinionsData) {
      editAcademyOpinions(nav.slug, values)
        .then((res) => {
          console.log(res)
          // if (res.success) {
          //   toast.success("تم تحديث البيانات بنجاح", {
          //     position: "top-left",
          //   });
          //   navigate(location.pathname.replace(`/edit/${nav.slug}`, ""));
          // }
          // else {
          //   console.log(res)
          //   toast.error("حدث خطأ ما ")
          // }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {

      postAcademyOpinions(values).then((res) => {
        if (res.success) {
          toast.success("تم اضافة تعليق بنجاح", {
            position: "top-left",
            theme: "dark",
          });
          navigate(location.pathname.replace(`/add`, ""));
        }
        else {
          console.log(res)
          toast.error("حدث خطأ ما ربما اسم العنصر موجود بالفعل")
        }
      })
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
    if (opinionsData) {
      console.log(opinionsData)
      formik.setValues(opinionsData.data);
    } else {
      formik.setValues({
      });
    }
  }, [opinionsData]);

  const onDrop = (acceptedFiles) => {
    formik.setFieldValue("file", acceptedFiles[0]);
  };

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
              <div style={{ color: "#7E8799" }}> {location.pathname.includes("/edit") ? "تعديل" : "اضافة"} </div>
            </div>
            <div
              className="updateBtn"
              onClick={() => navigate(location.pathname.replace(/\/(edit\/.*|add)/, ""))}
            >
              الرجوع <KeyboardBackspaceIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="CustomCard formCard all-add-notific pb-4 pt-4">
        <form onSubmit={formik.handleSubmit} className="row">

          <div className="col-lg-12 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="student_name">اسم الطالب </label>
              <input
                type="text"
                placeholder="ادخل اسم الطالب هنا"
                id="student_name"
                name="student_name"
                value={formik.values.student_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.student_name && formik.errors.student_name && <div>{formik.errors.student_name}</div>}
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="student_avatar">صورة الطالب </label>
              <UploadImage
                type="text"
                // placeholder="ادخل عنوان المقال هنا"
                id="student_avatar"
                name="student_avatar"
                currentImage={formik.values.student_avatar}
                onChange={(value) => formik.setFieldValue("student_avatar", value)}
                onBlur={formik.handleBlur}
              />
              {formik.touched.student_avatar && formik.errors.student_avatar && <div>{formik.errors.student_avatar}</div>}
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="rate">تقييم الطالب </label>
              <Rate
                id="rate"
                value={formik.values.rate}
                onChange={(value) => {
                  formik.setFieldValue("rate", value);
                }}
              />
              {formik.touched.rate && formik.errors.rate && (
                <div style={{ color: "red", fontSize: "14px" }}>{formik.errors.rate}</div>
              )}
            </div>

          </div>

          <div className="col-lg-12 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="opinion">تعليق الطالب </label>
              <textarea
                type="text"
                placeholder="ادخل تعليق الطالب هنا"
                id="opinion"
                name="opinion"
                value={formik.values.opinion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.opinion && formik.errors.opinion && (
                <div>{formik.errors.opinion}</div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Button type="submit" appearance="primary" className="submitBtn">
              إضافة
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentRates;
