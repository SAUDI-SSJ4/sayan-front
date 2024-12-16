import React, { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Formik, Form, Field } from "formik";

const S3Uploader = () => {
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  // S3 Configuration
  const s3Config = {
    bucketName: import.meta.env.VITE_APP_S3_BUCKET_NAME,
    region: import.meta.env.VITE_APP_S3_REGION,
    accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
  };

  // AWS S3 Client
  const s3Client = new S3Client({
    region: s3Config.region,
    credentials: {
      accessKeyId: s3Config.accessKeyId,
      secretAccessKey: s3Config.secretAccessKey,
    },
  });

  const uploadToS3 = async (file) => {
    try {
      const params = {
        Bucket: s3Config.bucketName,
        Key: `uploads/videos/${Date.now()}-${file.name}`,
        Body: file,
        ContentType: file.type,
      };

      const command = new PutObjectCommand(params);

      // Monitor upload progress
      const progressTracker = {
        httpUploadProgress: (progress) => {
          setUploadProgress(
            Math.round((progress.loaded / progress.total) * 100)
          );
        },
      };

      await s3Client.send(command, progressTracker);
      setUploadMessage("Upload Successful!");
      setUploadProgress(null);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadMessage("Upload failed. Please try again.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Video to S3</h2>
      <Formik
        initialValues={{ video: null }}
        validate={(values) => {
          const errors = {};
          if (!values.video) {
            errors.video = "Please select a video file.";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const file = values.video;
          if (file) {
            setUploadMessage("");
            await uploadToS3(file);
          }
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <div>
              <input
                name="video"
                type="file"
                accept="video/*"
                onChange={(event) => setFieldValue("video", event.target.files[0])}
              />
              {errors.video && touched.video && (
                <div style={{ color: "red" }}>{errors.video}</div>
              )}
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </Form>
        )}
      </Formik>

      {uploadProgress !== null && <p>Upload Progress: {uploadProgress}%</p>}

      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default S3Uploader;
