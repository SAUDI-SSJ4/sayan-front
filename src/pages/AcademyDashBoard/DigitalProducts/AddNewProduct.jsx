import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import {
  useCreateProduct,
  useSpasificProduct,
  useUpdateProduct,
} from "../../../framework/accademy/product";
import classes from "./formStyle.module.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  fetchSpasificProduct,
  updateProduct as updateProductAPI,
} from "../../../utils/apis/client/academy";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  content: Yup.string().required("Content  is required"),
});

const AddNewProduct = () => {
  let [change, setChange] = useState(0);
  let [file, setFile] = useState();
  const [radio, setRadio] = useState();
  const firstRadio = useRef();
  const SecondRadio = useRef();

  const navigate = useNavigate();
  let location = useLocation();
  let nav = useParams();
  const fileInputRef = useRef(null);
  
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setChange(1);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type.split("/")[0];
      console.log("Selected file:", selectedFile.name);
      if (fileType === "image") {
        formik.setFieldValue("image", selectedFile);
        setFile(selectedFile);
      } else {
        console.error("The selected file is not an image.");
      }
    } else {
      console.log("No file selected.");
    }
  };

  // let { data, isLoading: loader, error, postData } = useUpdateProduct(nav.slug);
  // let { data: createData, postData: postCreate } = useCreateProduct();

  const {
    data: sliderData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["spasificProduct"],
    queryFn: () => fetchSpasificProduct(nav.slug),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    enabled: !!nav.slug,
  });

  const m = useMutation({
    mutationFn: (data) => createProduct(data),
    onSuccess: (data) => {
      toast.success("تم اضافة الاعدادات", {
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
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (id, data) => updateProductAPI(id, data),
    onSuccess: (data) => {
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
      navigate(location.pathname.replace(`/AddNewProduct/${nav.slug}`, ""));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (values) => {
    if (sliderData) {
      values.image = file;
      m.mutateAsync(values);
      updateProductMutation.mutateAsync(nav.slug, values);
    } else {
      console.log(values);
      values.image = file;
      values.file = file;
      values.show_download = radio;
      m.mutateAsync(values);
    }
  };
  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (sliderData) {
      formik.setValues(sliderData);
      setRadio(sliderData?.show_download);
    } else {
      formik.setValues({
        title: "",
        content: "",
      });
      setRadio(0);
    }
  }, [sliderData]);

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
              <div style={{ color: "#7E8799" }}> تعديل </div>
            </div>
            <div
              className="updateBtn"
              onClick={() =>
                navigate(
                  location.pathname.replace(
                    `${nav.slug ? `/AddNewProduct/${nav.slug}` : "/AddNewProduct"}`,
                    ""
                  )
                )
              }
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
                  accept="image/*"
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
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">السعر</label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price && <div>{formik.errors.price}</div>}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">الوصف الجزئى</label>
              <textarea
                type="text"
                placeholder="ادخل النص هنا"
                id="short_content"
                name="short_content"
                value={formik.values.short_content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.short_content && formik.errors.short_content && (
                <div>{formik.errors.short_content}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">الوصف التفصيلى</label>
              <textarea
                type="text"
                placeholder="ادخل النص هنا"
                id="content"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.content && formik.errors.content && (
                <div>{formik.errors.content}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="type">النوع</label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.type && formik.errors.type && <div>{formik.errors.type}</div>}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="CustomFormControl">
              <label htmlFor="title">التقيم</label>
              <input
                type="text"
                placeholder="ادخل عنوان المقال هنا"
                id="priratece"
                name="rate"
                value={formik.values.rate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.rate && formik.errors.rate && <div>{formik.errors.rate}</div>}
            </div>
          </div>

          <div className="d-flex row mt-5" style={{ marginTop: "30px" }}>
            <div className="form-check col-lg-6">
              <div
                className={`${classes.FormRadio} ${radio && classes.active} `}
                onClick={() => {
                  firstRadio.current.checked = 1;
                  SecondRadio.current.checked = 0;
                  setRadio(1);
                }}
              >
                <input
                  className="form-radio-input"
                  type="radio"
                  value=""
                  id="flexCheckDefault"
                  checked={radio}
                  name="flexRadioDefault"
                  ref={firstRadio}
                  onChange={() => setRadio(1)}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  متاح التحميل{" "}
                </label>
              </div>
            </div>
            <div className="form-check  col-lg-6">
              <div
                className={`${classes.FormRadio} ${!radio && classes.active} `}
                onClick={() => {
                  firstRadio.current.checked = 0;
                  SecondRadio.current.checked = 1;
                  setRadio(0);
                }}
              >
                <input
                  className="form-radio-input"
                  type="radio"
                  value=""
                  ref={SecondRadio}
                  name="flexRadioDefault"
                  onChange={() => setRadio(0)}
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  غير متاح التحميل
                </label>
              </div>
            </div>
          </div>

          <div className=" justify-content-center">
            <div className=" row m-auto justify-content-center">
              <div className="d-flex button-content--1 justify-content-center">
                <input
                  type="file"
                  name="file"
                  id="file"
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
                  رفع الملف
                </div>
              </div>
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

export default AddNewProduct;
