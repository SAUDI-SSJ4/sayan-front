import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderAcademy from "../../../component/HeaderAcademy/HeaderAcademy";
import { academyAPI } from "../../../utils/apis/client/academy";

export default function AddEditAdmins() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
  });

  useEffect(() => {
    if (id) {
      // Fetch trainer details by id and set as initial values
      academyAPI.get(`/admin/${id}`).then((response) => {
        setInitialValues({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          password: "",
          passwordConfirmation: "",
        });
      });
    }
  }, [id]);

  // Validation schema for adding a new trainer
  const addValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  // Validation schema for editing an existing trainer
  const editValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const onSubmit = async (values) => {
    try {
      if (id) {
        // PUT request to update trainer details
        const response = await academyAPI.put(`/admin/${id}`, values);
        toast.success("Trainer updated successfully!");
        console.log("Trainer updated:", response.data);
      } else {
        // POST request to add a new trainer
        const response = await academyAPI.post("/admin", values);
        toast.success("Trainer added successfully!");
        console.log("Trainer added:", response.data);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error:", error.response || error.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Handle file upload
      console.log(acceptedFiles);
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
      <div className="bg-white rounded-2 p-4">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={id ? editValidationSchema : addValidationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="row gap">
              <div className="col-md-6 py-2">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field
                    name="name"
                    type="text"
                    className="form-control"
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
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
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
                  <label htmlFor="phone">Phone</label>
                  <Field
                    name="phone"
                    type="text"
                    className="form-control"
                    id="phone"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              {!id && (
                <>
                  <div className="col-md-6 py-2">
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                        id="password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 py-2">
                    <div className="form-group">
                      <label htmlFor="passwordConfirmation">
                        Password Confirmation
                      </label>
                      <Field
                        name="passwordConfirmation"
                        type="password"
                        className="form-control"
                        id="passwordConfirmation"
                      />
                      <ErrorMessage
                        name="passwordConfirmation"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="row">
              <div className="col-md-6 py-2">
                <div className="form-group">
                  <label>Upload Files</label>
                  <div
                    {...getRootProps()}
                    className="dropzone border border-black border-opacity-25  rounded p-2"
                  >
                    <input className=" form-control" {...getInputProps()} />
                    <p>
                      {
                        "Drag 'n' drop some files here, or click to select files"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              حفظ{" "}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
