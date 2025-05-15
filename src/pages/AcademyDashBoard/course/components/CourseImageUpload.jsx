import React from "react";
import defaultCourseImage from "../../../../assets/images/img.png";

function CourseImageUpload({
  image,
  onImageChange,
  fileInputRef,
  error,
  touched,
  courseImage,
}) {
  const imageSrc = image
    ? URL.createObjectURL(image)
    : courseImage
    ? courseImage
    : defaultCourseImage;

  return (
    <div className="row g-3 button-content--1 m-auto justify-content-center">
      <img
        src={imageSrc}
        alt="Course"
        style={{
          width: "359px",
          height: "199px",
          objectFit: "contain",
          marginTop: "10px",
        }}
      />
      <div className="d-flex justify-content-center">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onImageChange}
        />
        <div
          style={{
            background: "white",
            marginTop: "20px",
            marginBottom: "30px",
          }}
          className="updateBtn"
          onClick={() => fileInputRef.current.click()}
        >
          رفع صورة الدورة التدريبية
        </div>
      </div>
      {touched && error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default CourseImageUpload;
