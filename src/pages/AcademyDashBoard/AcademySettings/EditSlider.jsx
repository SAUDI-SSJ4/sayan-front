import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  DisplayImage,
  ImageInput,
  JustifyContentWrapper,
  SetImageButton,
} from "../../../utils/styles";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postSlider, getSlider } from "../../../utils/apis/client/academy";
import { ButtonSpinner } from "../../../component/UI/Buttons/ButtonSpinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MainSpinner } from "../../../component/UI/MainSpinner";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  sub_title: Yup.string().required("Sub Title is required"),
  content: Yup.string().required("Content is required"),
  main_btn: Yup.string().required("main button is required"),
  secondary_btn: Yup.string().required("secondary button is required"),
  image: Yup.mixed().required("Image is required"),
  // video: Yup.mixed().required("Video is required"),
  // video_type: Yup.string().required("Video type is required"),
});

const EditSlider = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading ,setIsLoading] = useState(false)

  
  useEffect(() => {
    setIsLoading(true)
    getSlider()
      .then((data) => {
        formik.setValues(data);
      })
      .catch((error) => {
        console.log(error);
    }).finally(() => setIsLoading(false));
  }, []);

  const mutation = useMutation({
    mutationFn: (data) => postSlider(data),
    onSuccess: () => {
      toast.success("Data updated successfully", {
        position: "top-left",
        theme: "dark",
      });
      navigate("/academy/settings/slider");
    },
    onError: (error) => {
      toast.error("An error occurred", {
        position: "top-left",
        theme: "dark",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      sub_title: "",
      content: "",
      image: null,
      main_btn: "",
      secondary_btn: "",
      // video: null,
      // video_type: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("sub_title", values.sub_title);
      formData.append("content", values.content);
      formData.append("image", values.image);
      formData.append("main_btn", values.main_btn);
      formData.append("secondary_btn", values.secondary_btn);
      // formData.append("video", values.video);
      // formData.append("video_type", values.video_type);
      mutation.mutateAsync(formData);
    },
  });



  return (
    <div className="mb-5 all-info-top-header main-info-top">
      <div className="TablePageHeader">
        <div className="HeaderContainer">
          <div className="info-content-header d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="d-flex align-items-center name">
              <PeopleAltIcon sx={{ color: "#A3AED0" }} />
              <div style={{ color: "#7E8799" }}>Edit Slider</div>
            </div>
            <div
              className="updateBtn"
              onClick={() => navigate(location.pathname.replace("/edit", ""))}
            >
              Go Back <KeyboardBackspaceIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="CustomCard formCard all-add-notific pb-4 pt-4">
        {isLoading ? (
          <MainSpinner css="vh-100" />
        ) : (
                  <form className="row" onSubmit={formik.handleSubmit}>
                  <JustifyContentWrapper>
                    <div className="row g-3 button-content--1 m-auto justify-content-center">
                      {formik?.values?.image && (
                        <DisplayImage
                          src={
                            typeof formik.values.image === "object" && formik.values.image instanceof File
                              ? URL.createObjectURL(formik.values.image)
                              : formik.values.image
                          }
                          alt="Slider Image"
                        />
                      )}
                      <div className="d-flex justify-content-center">
                        <ImageInput
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
                        />
                        <SetImageButton onClick={() => fileInputRef.current.click()}>
                          Upload Image
                        </SetImageButton>
                      </div>
                    </div>
                  </JustifyContentWrapper>
        
                  <div className="col-lg-6 col-md-12">
                    <div className="CustomFormControl">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter title here"
                      />
                      {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
                    </div>
                  </div>
        
                  <div className="col-lg-6 col-md-12">
                    <div className="CustomFormControl">
                      <label htmlFor="sub_title">Sub Title</label>
                      <input
                        type="text"
                        id="sub_title"
                        name="sub_title"
                        value={formik.values.sub_title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter sub title here"
                      />
                      {formik.touched.sub_title && formik.errors.sub_title && (
                        <div>{formik.errors.sub_title}</div>
                      )}
                    </div>
                  </div>
        
                  <div className="col-lg-12 col-md-12">
                    <div className="CustomFormControl">
                      <label htmlFor="content">Content</label>
                      <textarea
                        id="content"
                        name="content"
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter content here"
                      />
                      {formik.touched.content && formik.errors.content && (
                        <div>{formik.errors.content}</div>
                      )}
                    </div>
                  </div>
                  

                  <div className="col-lg-6 col-md-12">
                    <div className="CustomFormControl">
                      <label htmlFor="main_btn">main button</label>
                      <input
                        type="text"
                        id="main_btn"
                        name="main_btn"
                        value={formik.values.main_btn}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter main button here"
                      />
                      {formik.touched.main_btn && formik.errors.main_btn && (
                        <p>{formik.errors.main_btn}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="CustomFormControl">
                      <label htmlFor="secondary_btn">secondary button</label>
                      <input
                        type="text"
                        id="secondary_btn"
                        name="secondary_btn"
                        value={formik.values.secondary_btn}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter secondary button here"
                      />
                      {formik.touched.secondary_btn && formik.errors.secondary_btn && (
                        <div>{formik.errors.secondary_btn}</div>
                      )}
                    </div>
                  </div>
                  <JustifyContentWrapper className="mt-4">
                  <ButtonSpinner titel="إضافة" isPending={mutation.isPending} />
                  </JustifyContentWrapper>
                </form>
        )}

      </div>
    </div>
  );
};

export default EditSlider;
