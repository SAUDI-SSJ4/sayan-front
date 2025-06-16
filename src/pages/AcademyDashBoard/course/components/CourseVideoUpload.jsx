import React, { useState, useEffect } from "react";
import { FiUpload, FiVideo, FiAlertCircle, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function CourseVideoUpload({
  video,
  onVideoChange,
  videoInputRef,
  error,
  touched,
  courseVideo, // Previous uploaded video URL
  uploadProgress = 0, // New prop for upload progress
  isUploading = false, // New prop for upload state
}) {
  const [videoError, setVideoError] = useState("");
  const [videoSource, setVideoSource] = useState(null);
  
  // Maximum video size (128MB)
  const MAX_VIDEO_SIZE = 128 * 1024 * 1024; // 128MB in bytes
  
  useEffect(() => {
    // Set video source from existing uploaded video or newly selected file
    if (video) {
      setVideoSource(URL.createObjectURL(video));
      setVideoError("");
    } else if (courseVideo) {
      setVideoSource(courseVideo);
      setVideoError("");
    } else {
      setVideoSource(null);
    }
  }, [video, courseVideo]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size
      if (file.size > MAX_VIDEO_SIZE) {
        setVideoError(`حجم الفيديو يتجاوز الحد الأقصى (128 ميجابايت). الحجم الحالي: ${(file.size / (1024 * 1024)).toFixed(2)} ميجابايت`);
        e.target.value = null;
        return;
      }
      
      setVideoError("");
      onVideoChange(e);
    }
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div 
        className="card-img-top position-relative bg-light"
        style={{ 
          height: "250px", 
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center" 
        }}
      >
        {videoSource ? (
          <video
            src={videoSource}
            controls
            className="w-100 h-100"
            style={{
              objectFit: "contain",
              backgroundColor: "#000",
              maxHeight: "100%",
              width: "100%"
            }}
            controlsList="nodownload"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center h-100 w-100 text-center p-4 bg-light">
            <FiVideo size={128} color="#94a3b8" className="mb-3" />
            <p className="text-muted mb-0" style={{ fontSize: '15px' }}>
              لم يتم رفع فيديو بعد
            </p>
            <p className="text-muted" style={{ fontSize: '13px' }}>
              الحد الأقصى لحجم الفيديو: 128 ميجابايت
            </p>
          </div>
        )}
      </div>
      <div className="card-body bg-white p-3">
        <input
          type="file"
          accept="video/mp4,video/quicktime,video/x-matroska"
          ref={videoInputRef}
          style={{ display: "none" }}
          onChange={handleVideoChange}
        />
        
        {/* مؤشر التقدم أثناء الرفع */}
        <AnimatePresence>
          {isUploading && uploadProgress >= 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-3"
              style={{
                padding: '16px',
                backgroundColor: '#f0f9ff',
                border: '2px solid #0ea5e9',
                borderRadius: '12px',
              }}
            >
              <div className="d-flex align-items-center gap-3 mb-2">
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '3px solid #0ea5e9',
                  borderTop: '3px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <div className="flex-grow-1">
                  <p className="mb-1 fw-bold text-primary" style={{ fontSize: '14px' }}>
                    {uploadProgress === 0 ? 'جاري إعداد الرفع...' : `جاري رفع الفيديو... ${uploadProgress}%`}
                  </p>
                  {video && (
                    <p className="mb-0 text-muted" style={{ fontSize: '12px' }}>
                      {video.name} ({(video.size / (1024 * 1024)).toFixed(1)} MB)
                    </p>
                  )}
                </div>
              </div>
              
              {/* شريط التقدم */}
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#e0f2fe',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: '100%',
                    backgroundColor: '#0ea5e9',
                    borderRadius: '4px',
                    position: 'relative'
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="d-flex flex-column gap-2">
          <button
            type="button"
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center py-2"
            onClick={() => videoInputRef.current.click()}
            style={{ fontSize: '14px', borderRadius: '6px' }}
            disabled={isUploading}
          >
            <FiUpload className="me-2" size={16} />
            {videoSource ? "تغيير الفيديو" : "رفع فيديو تعريفي"}
          </button>
          
          {videoSource && !isUploading && (
            <div className="d-flex align-items-center mt-1">
              <div className="bg-success bg-opacity-10 text-success rounded-pill px-2 py-1 d-inline-flex align-items-center" style={{ fontSize: '12px' }}>
                <FiCheck className="me-1" size={12} />
                تم تحميل الفيديو
              </div>
            </div>
          )}
          
          {videoError && (
            <div className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '12px' }}>
              <FiAlertCircle className="me-1" size={14} />
              {videoError}
            </div>
          )}
          
          {touched && error && !videoError && !isUploading && (
            <div className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '12px' }}>
              <FiAlertCircle className="me-1" size={14} />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseVideoUpload;
