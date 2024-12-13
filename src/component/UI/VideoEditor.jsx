import React, { useState, useRef } from "react";

const VideoUploader = ({ setFieldValue }) => {
  const videoRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith("video/")) {
        alert(" لا يمكن تحميل ملف لا ينتمي للفيديو");
        return;
      }

      // Validate file size (example: 50MB limit)
      const maxFileSize = 200 * 1024 * 1024;
      if (file.size > maxFileSize) {
        alert("لا يمكن تحميل ملف أكبر من 200 ميغابايت");
        return;
      }

      // Set video file and URL for preview
      const fileURL = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoURL(fileURL);

      // Update Formik state
      setFieldValue("videoFile", file);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>رفع ملف الفيديو</label>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={styles.fileInput}
      />

      {videoURL && (
        <div style={styles.previewContainer}>
          <video
            ref={videoRef}
            src={videoURL}
            controls
            style={styles.video}
          ></video>
          <button type="button" onClick={handlePlayPause} style={styles.playPauseButton}>
            تشغيل / إيقاف مؤقت
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  fileInput: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  previewContainer: {
    marginTop: "10px",
    textAlign: "center",
  },
  video: {
    width: "100%",
    maxHeight: "300px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  playPauseButton: {
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#007BFF",
    color: "white",
    cursor: "pointer",
    border: "none",
  },
};

export default VideoUploader;
