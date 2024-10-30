import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import ProductIcon from "../../../assets/icons/ProductIcon";
import { Loader } from "rsuite";
import { academyAPI } from "../../../utils/apis/client/academy";

const AddEditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
    short_content: "",
    type: "",
    rate: "",
    show_download: null,
    price: "",
    image: null,
    file: null,
  });

  useEffect(() => {
    if (id) {
      academyAPI
        .get(`/product/${id}`)
        .then((response) => {
          console.log({ response });

          const product = response?.data?.data;
          setInitialValues({
            title: product.title || "",
            content: product.content || "",
            short_content: product.short_content || "",
            type: product.type || "",
            rate: product.rate,
            show_download: product.show_download ? "true" : "false",
            price: product.price || "",
            image: product.image || null,
            file: product.file || null,
          });
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    short_content: Yup.string().required("Short content is required"),
    type: Yup.string().required("Type is required"),
    rate: Yup.number().min(0).max(5).required("Rate is required"),
    show_download: Yup.boolean().required("Show download is required"),
    price: Yup.number().positive().required("Price is required"),
    image: Yup.mixed().required("Image is required"),
    file: Yup.mixed().required("File is required"),
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("short_content", values.short_content);
    formData.append("type", values.type);
    formData.append("rate", values.rate);
    formData.append("show_download", values.show_download === "true" ? 1 : 0);
    formData.append("price", values.price);
    if (values.image) {
      formData.append("image", values.image);
    }
    if (values.file) {
      formData.append("file", values.file);
    }

    try {
      if (id) {
        // Update existing product
        const response = await academyAPI.put(`/product/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("تم تعديل المنتج بتجاح");

        navigate("/academy/Products");
      } else {
        // Create a new product
        const response = await academyAPI.post("/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("تم اضافة المنتج بتجاح!");

        navigate("/academy/Products");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("Error:", error.response || error.message);
    }
  };

  const DropzoneField = ({ field, form, type }) => {
    const [fileName, setFileName] = React.useState("");

    const onDrop = (acceptedFiles) => {
      form.setFieldValue(field.name, acceptedFiles[0]);
      setFileName(acceptedFiles[0].name);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
      <div className="form-group">
        <div
          {...getRootProps()}
          className="border p-3 text-center"
          style={{ cursor: "pointer" }}
        >
          <input {...getInputProps()} />
          <p>{type === "image" ? "Upload Image" : "Upload File"}</p>
          {fileName && <p className="text-muted">{fileName}</p>}
        </div>
        {form.errors[field.name] && form.touched[field.name] && (
          <div className="text-danger">{form.errors[field.name]}</div>
        )}
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <div className="vh-100 w-100 d-flex justify-content-center align-items-center  ">
          <Loader size="lg" />
        </div>
      ) : (
        <div className="mt-4">
          <HeaderAcademy
            title={id ? "تعديل" : "اضافة"}
            icon={<ProductIcon />}
          />
          <div className="bg-white rounded-2 p-4">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="row">
                    <div className="col-md-6 py-2">
                      <div className="form-group">
                        <label className="my-2" htmlFor="title">
                          العنوان
                        </label>
                        <Field
                          name="title"
                          type="text"
                          className="form-control py-3"
                        />
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 py-2">
                      <div className="form-group">
                        <label className="my-2" htmlFor="type">
                          النوع
                        </label>
                        <Field
                          name="type"
                          type="text"
                          className="form-control py-3"
                        />
                        <ErrorMessage
                          name="type"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 py-2">
                      <div className="form-group">
                        <label className="my-2" htmlFor="rate">
                          التقييم
                        </label>
                        <Field
                          name="rate"
                          type="number"
                          className="form-control py-3"
                          min="0"
                          max="5"
                        />
                        <ErrorMessage
                          name="rate"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <div className="col-md-6 py-2">
                      <div className="form-group">
                        <label className="my-2" htmlFor="price">
                          السعر
                        </label>
                        <Field
                          name="price"
                          type="number"
                          className="form-control py-3"
                        />
                        <ErrorMessage
                          name="price"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 py-2">
                      <div className="form-group">
                        <label className="my-2" htmlFor="short_content">
                          محتوى مختصر
                        </label>
                        <Field
                          name="short_content"
                          as="textarea"
                          className="form-control py-3"
                        />
                        <ErrorMessage
                          name="short_content"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 py-2">
                      <div className="form-group">
                        <label className="my-2" htmlFor="content">
                          المحتوى
                        </label>
                        <Field
                          name="content"
                          as="textarea"
                          className="form-control py-3"
                        />
                        <ErrorMessage
                          name="content"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 py-2">
                      <Field
                        name="image"
                        component={DropzoneField}
                        type="image"
                      />
                    </div>

                    <div className="col-md-6 py-2">
                      <Field
                        name="file"
                        component={DropzoneField}
                        type="file"
                      />
                    </div>
                  </div>
                  <div className="col-md-12 py-2">
                    <div className="form-group">
                      <div className="d-flex align-items-center w-25 justify-content-start my-2">
                        <label className="my-2">عرض للتنزيل</label>
                        <div className="d-flex justify-content-around align-items-center w-50">
                          <div>
                            <Field
                              name="show_download"
                              type="radio"
                              value="true"
                              className="form-check-input"
                            />
                            <label className="form-check-label px-2">نعم</label>
                          </div>
                          <div>
                            <Field
                              name="show_download"
                              type="radio"
                              value="false"
                              className="form-check-input"
                            />
                            <label className="form-check-label px-2">لا</label>
                          </div>
                        </div>
                        <ErrorMessage
                          name="show_download"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start">
                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "حفظ...." : "حفظ"}{" "}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEditProducts;
