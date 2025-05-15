import React from "react";

function CourseVideoUpload({
  video,
  onVideoChange,
  videoInputRef,
  error,
  touched,
}) {
  return (
    <div className="row g-3 button-content--1 m-auto justify-content-center">
      <div>
        <video
          src={video && URL.createObjectURL(video)}
          controls
          style={{
            objectFit: "full",
            width: "600px",
            height: "200px",
            overflow: "hidden",
            borderRadius: "12px",
          }}
          controlsList="nodownload"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="d-flex justify-content-center">
        <input
          type="file"
          accept="video/*"
          ref={videoInputRef}
          style={{ display: "none" }}
          onChange={onVideoChange}
        />
        <div
          style={{
            background: "white",
            marginTop: "15px",
            marginBottom: "30px",
          }}
          className="updateBtn"
          onClick={() => videoInputRef.current.click()}
        >
          رفع فيديو الدورة التدريبية
        </div>
      </div>
      {touched && error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default CourseVideoUpload;
