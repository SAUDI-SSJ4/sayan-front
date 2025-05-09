import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import { Loader } from "rsuite";
import { academy_client } from "../../../utils/apis/client.config";

export default function AddEditTrainers() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [file, setFile] = useState(null); // State to store selected file

  useEffect(() => {
    if (id) {
      setLoading(true);
      academy_client.get(`/trainer/${id}`).then((response) => {
        setInitialValues({
          name: response?.data?.data?.name,
          email: response?.data?.data?.email,
          phone: response?.data?.data?.phone,
        });
        setLoading(false);
      });
    }
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .min(10, "يجب أن يكون رقم الهاتف على الأقل 10 أحرف"),
  });

  const onSubmit = async (values) => {
    setBtnLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    if (file) {
      formData.append("image", file); // Append file to form data
    }

    try {
      if (id) {
        const response = await academy_client.put(`/trainer/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("تم تحديث المدرب بنجاح!");
        console.log("Trainer updated:", response.data);
      } else {
        const response = await academy_client.post("/trainer", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("تمت إضافة المدرب بنجاح!");
        console.log("Trainer added:", response.data);
      }
      navigate("/academy/TrainersManagment");
    } catch (error) {
      toast.error(error?.response?.data?.message || "حدث خطأ. حاول مرة أخرى.");
      console.error("Error:", error.response || error.message);
    } finally {
      setBtnLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]); // Store the first file in state
      console.log("Selected file:", acceptedFiles[0]);
    },
  });

  return (
    <div>
      <HeaderAcademy
        title={id ? "تعديل" : "اضافة"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 28 29"
            fill="none"
          >
            <circle
              opacity="0.5"
              cx="16.8"
              cy="8.65547"
              r="2.8"
              fill="#7E8799"
            />
            <ellipse
              opacity="0.5"
              cx="17.7331"
              cy="18.9211"
              rx="4.66667"
              ry="2.8"
              fill="#7E8799"
            />
            <circle cx="11.2021" cy="8.65521" r="3.73333" fill="#7E8799" />
            <ellipse
              cx="11.2013"
              cy="18.9208"
              rx="6.53333"
              ry="3.73333"
              fill="#7E8799"
            />
          </svg>
        }
      />
      {loading ? (
        <div className="w-100 vh-50 d-flex justify-content-center align-items-center">
          <Loader size="lg" />
        </div>
      ) : (
        <div className="bg-white rounded-2 p-4">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="row gap">
                  <div className="col-md-6 py-2">
                    <div className="form-group">
                      <label htmlFor="name">الاسم</label>
                      <Field
                        name="name"
                        type="text"
                        className="form-control py-3"
                        id="name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 py-2">
                    <div className="form-group">
                      <label htmlFor="email">البريد الإلكتروني</label>
                      <Field
                        name="email"
                        type="email"
                        className="form-control py-3"
                        id="email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 py-2">
                    <div className="form-group">
                      <label htmlFor="phone">رقم الهاتف</label>
                      <Field
                        name="phone"
                        type="text"
                        className="form-control py-3"
                        id="phone"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 py-2">
                    <div className="form-group">
                      <label>الصورة الشخصية</label>
                      <div
                        {...getRootProps()}
                        className="dropzone border border-black border-opacity-25 rounded p-2 py-3"
                      >
                        <input
                          className="form-control py-3"
                          {...getInputProps()}
                          onChange={(e) => {
                            const selectedFile = e.currentTarget.files[0];
                            setFieldValue("profilePicture", selectedFile);
                            setFile(selectedFile); // Update the file state
                            console.log("Selected file:", selectedFile);
                          }}
                        />
                        <p>
                          اسحب وأفلت بعض الملفات هنا، أو انقر لتحديد الملفات
                        </p>
                      </div>
                      {!file && (
                        <div className="text-danger">
                          {"الصورة الشخصية مطلوبة"}
                        </div>
                      )}
                      {file && (
                        <div className="mt-2">
                          <strong>الملف المختار:</strong> {file.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  disabled={isSubmitting || !file}
                >
                  {isSubmitting ? "حفظ..." : "حفظ"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
