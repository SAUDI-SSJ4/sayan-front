import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import BlogIcon from "../../../assets/icons/BlogIcon";
import { Loader } from "rsuite";
import { academyAPI } from "../../../utils/apis/client/academy";

const AddEditBlog = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
    category_id: "",
    status: "true", // Default value to handle status correctly
    image: null,
    cover: null,
  });
  const [loading, setLoading] = useState(false); // State to manage loading

  useEffect(() => {
    if (id) {
      setLoading(true); // Set loading to true while fetching
      academyAPI
        .get(`/blog/${id}`)
        .then((response) => {
          const blog = response?.data?.data;
          setInitialValues({
            title: blog.title || "",
            content: blog.content || "",
            category_id: blog.category_id || "",
            status: blog.status ? "true" : "false",
            image: blog.image || null,
            cover: blog.cover || null,
          });
        })
        .catch((error) => {
          toast.error("فشل في تحميل بيانات المدونة.");
          console.error("Error loading blog data:", error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching
        });
    }
  }, [id]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("العنوان مطلوب"),
    content: Yup.string().required("المحتوى مطلوب"),
    category_id: Yup.string().required("النوع مطلوب"),
    status: Yup.string().oneOf(["true", "false"]).required("الحالة مطلوبة"),
    image: Yup.mixed().required("الصورة مطلوبة"),
    cover: Yup.mixed().required("الغلاف مطلوب"),
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("category_id", values.category_id); // Fixed key
    formData.append("status", values.status === "true" ? 1 : 0);
    formData.append("image", values.image);
    formData.append("cover", values.cover); // Fixed key

    try {
      if (id) {
        const response = await academyAPI.put(`/api/blog/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("تم تحديث المدونة بنجاح!");
        console.log("Blog updated:", response.data);
      } else {

        console.log(formData)

        const response = await academyAPI.post("/api/blog", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("تمت إضافة المدونة بنجاح!");
        console.log("Blog added:", response.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "حدث خطأ");
      console.error("Error:", error.response || error.message);
    } finally {
      // Set loading to false after submission
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
          <p>
            {type === "image" ? "تحميل صورة المدونة" : "تحميل غلاف المدونة"}
          </p>
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
        <div className="vh-100 bg-white d-flex justify-content-center align-items-center">
          <Loader size="lg" />
        </div>
      ) : (
        <div className="mt-4">
          <HeaderAcademy
            title={id ? "تعديل المدونة" : "إضافة مدونة"}
            icon={<BlogIcon />}
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
                        <label className="my-2" htmlFor="category_id">
                          النوع
                        </label>
                        <Field
                          name="category_id"
                          type="text"
                          className="form-control py-3"
                        />
                        <ErrorMessage
                          name="category_id"
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
                        name="cover"
                        component={DropzoneField}
                        type="file"
                      />
                    </div>
                  </div>
                  <div className="col-md-12 py-2">
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
                  <div className="col-md-12 py-2">
                    <div className="form-group">
                      <div className="d-flex align-items-center w-25 justify-content-start my-2">
                        <label className="my-2">الحالة</label>
                        <div className="d-flex justify-content-around align-items-center w-50">
                          <div>
                            <Field
                              name="status"
                              type="radio"
                              value="true"
                              className="form-check-input"
                            />
                            <label className="form-check-label px-2">نعم</label>
                          </div>
                          <div>
                            <Field
                              name="status"
                              type="radio"
                              value="false"
                              className="form-check-input"
                            />
                            <label className="form-check-label px-2">لا</label>
                          </div>
                        </div>
                        <ErrorMessage
                          name="status"
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
                      {isSubmitting ? "حفظ...." : "حفظ"}
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

export default AddEditBlog;
