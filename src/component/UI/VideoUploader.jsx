import React, { useState, useRef } from "react";

const VideoUploader = ({ onVideoUpload, onDurationChange, initialVideo }) => {
  const videoRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(initialVideo || null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith("video/")) {
        alert("لا يمكن تحميل ملف لا ينتمي للفيديو");
        return;
      }

      // Validate file size (example: 200MB limit)
      const maxFileSize = 200 * 1024 * 1024;
      if (file.size > maxFileSize) {
        alert("لا يمكن تحميل ملف أكبر من 200 ميغابايت");
        return;
      }

      // Set video file and URL for preview
      const fileURL = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoURL(fileURL);

      // Pass the file itself to the parent component
      if (onVideoUpload) {
        onVideoUpload(file);
      }
      
      // Get video duration
      const tempVideo = document.createElement("video");
      tempVideo.preload = "metadata";
      tempVideo.src = fileURL;

      tempVideo.onloadedmetadata = () => {
        const durationInSeconds = tempVideo.duration;
        const durationInMinutes = durationInSeconds / 60;
        
        if (onDurationChange) {
          onDurationChange(durationInMinutes);
        }
        
        URL.revokeObjectURL(tempVideo.src); // Clean up
      };
    }
  };

  return (
    <div style={{
      border: '2px dashed #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f8fafc'
    }}>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{
          display: 'none'
        }}
        id="video-upload"
      />
      <label 
        htmlFor="video-upload"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#0062ff',
          color: 'white',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '16px',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        اختر ملف الفيديو
      </label>

      {videoURL && (
        <div style={{
          marginTop: '20px',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <video
            ref={videoRef}
            src={videoURL}
            controls
            style={{
              width: '100%',
              maxHeight: '300px',
              backgroundColor: '#000'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
