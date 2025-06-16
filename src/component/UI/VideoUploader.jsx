import React, { useState, useRef, useEffect } from "react";
import Cookies from 'js-cookie';

const VideoUploader = ({ onVideoUpload, onDurationChange, initialVideo }) => {
  const videoRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingTimeout, setLoadingTimeout] = useState(null);

  // تحديث الفيديو عند تغيير initialVideo
  useEffect(() => {
    if (initialVideo) {
      setIsLoadingVideo(true);
      setVideoError(false);
      setLoadingProgress(0);
      
      // إضافة التوكن للفيديوهات المحفوظة في السيرفر
      let authenticatedVideoURL = initialVideo;
      
      // التحقق من أن الرابط من السيرفر ويحتاج إلى authentication
      if (initialVideo.includes('sayan-server.com') || initialVideo.includes('/stream')) {
        const loginType = Cookies.get("login_type");
        let token = null;
        
        if (loginType === "academy") {
          token = Cookies.get("academy_token");
        } else if (loginType === "student") {
          token = Cookies.get("student_token");
        }
        
        if (token) {
          // إضافة التوكن كـ query parameter
          const separator = initialVideo.includes('?') ? '&' : '?';
          authenticatedVideoURL = `${initialVideo}${separator}token=${encodeURIComponent(token)}`;
        }
      }
      
      setVideoURL(authenticatedVideoURL);
      
      // بدء محاكاة تقدم التحميل
      startLoadingProgress();
    }
  }, [initialVideo]);

  // محاكاة تقدم التحميل للفيديوهات الكبيرة
  const startLoadingProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 5; // زيادة بطيئة
      if (progress >= 90) {
        progress = 90; // توقف عند 90% حتى يتم التحميل الفعلي
      }
      setLoadingProgress(Math.round(progress));
    }, 500);

    // timeout طويل للفيديوهات الكبيرة (3 دقائق)
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIsLoadingVideo(false);
      setVideoError(true);
      console.error("انتهت مهلة تحميل الفيديو (3 دقائق)");
    }, 180000); // 3 دقائق

    setLoadingTimeout(timeout);
    
    // تنظيف عند انتهاء التحميل
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith("video/")) {
        alert("لا يمكن تحميل ملف لا ينتمي للفيديو");
        return;
      }

      // تحديد الحد الأقصى لحجم الملف إلى 80MB
      const maxFileSize = 256 * 1024 * 1024; // 80MB
      if (file.size > maxFileSize) {
        const sizeInMB = Math.round(file.size / (1024 * 1024));
        alert(`❌ فشل في رفع الفيديو!\n\nالسبب: حجم الملف كبير جداً\nحجم الملف المحدد: ${sizeInMB} ميجا بايت\nالحد الأقصى المسموح: 256 ميجا بايت\n\nيرجى اختيار فيديو أصغر أو ضغط الفيديو الحالي.`);
        return;
      }

      // Set video file and URL for preview
      const fileURL = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoURL(fileURL);
      setVideoError(false);
      setIsLoadingVideo(true);
      setLoadingProgress(0);

      // بدء محاكاة تقدم التحميل للملفات الكبيرة
      if (file.size > 80 * 1024 * 1024) { // أكبر من 50MB
        startLoadingProgress();
      }

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

  const handleVideoLoad = () => {
    setIsLoadingVideo(false);
    setVideoError(false);
    setLoadingProgress(100);
    
    // تنظيف timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
  };

  const handleVideoError = (e) => {
    setIsLoadingVideo(false);
    setVideoError(true);
    setLoadingProgress(0);
    
    // تنظيف timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
    
    console.error("خطأ في تحميل الفيديو:", videoURL);
    console.error("تفاصيل الخطأ:", e.target.error);
  };

  const removeCurrentVideo = () => {
    // تنظيف timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
    
    setVideoFile(null);
    setVideoURL(null);
    setVideoError(false);
    setIsLoadingVideo(false);
    setLoadingProgress(0);
    if (onVideoUpload) {
      onVideoUpload(null);
    }
  };

  const retryVideoLoad = () => {
    setVideoError(false);
    setIsLoadingVideo(true);
    setLoadingProgress(0);
    
    if (videoRef.current) {
      videoRef.current.load();
    }
    
    // إعادة بدء تقدم التحميل
    startLoadingProgress();
  };

  // تنظيف الموارد عند إلغاء المكون
  useEffect(() => {
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [loadingTimeout]);

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
      
      {!videoURL ? (
        <div>
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
          <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>
            أو اسحب الملف هنا (حتى 256 ميجا بايت)
          </p>
        </div>
      ) : (
        <div style={{
          marginTop: '20px',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {isLoadingVideo && (
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              zIndex: 2,
              backgroundColor: 'rgba(0,0,0,0.8)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px'
            }}>
              <div style={{
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid rgba(255,255,255,0.3)',
                  borderTop: '4px solid #ffffff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '15px',
                  margin: '0 auto 15px auto'
                }} />
                <p style={{ 
                  margin: '0 0 10px 0', 
                  fontSize: '16px', 
                  fontWeight: '500' 
                }}>
                  جاري تحميل الفيديو...
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  color: '#d1d5db' 
                }}>
                  {loadingProgress}% - يرجى الانتظار
                </p>
              </div>
              
              {/* شريط التقدم */}
              <div style={{
                width: '80%',
                maxWidth: '300px',
                height: '6px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '15px'
              }}>
                <div style={{
                  width: `${loadingProgress}%`,
                  height: '100%',
                  backgroundColor: '#10b981',
                  borderRadius: '3px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
              
              <p style={{ 
                margin: 0, 
                fontSize: '12px', 
                color: '#9ca3af',
                textAlign: 'center',
                maxWidth: '250px'
              }}>
                الفيديوهات الكبيرة قد تحتاج وقت أطول للتحميل
              </p>
            </div>
          )}
          
          {videoError ? (
            <div style={{
              padding: '40px 20px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#dc2626'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#dc2626',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px auto'
                }}>
                  <span style={{ color: 'white', fontSize: '24px' }}>⚠</span>
                </div>
                <p style={{ margin: '0 0 10px 0', fontWeight: '600', fontSize: '16px' }}>
                  فشل في تحميل الفيديو
                </p>
              </div>
              
              <div style={{ marginBottom: '20px', fontSize: '14px' }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>الأسباب المحتملة:</strong>
                </p>
                <ul style={{ margin: '0 0 15px 20px', paddingRight: '0' }}>
                  <li>الفيديو كبير جداً أو تالف</li>
                  <li>انقطاع في الاتصال بالإنترنت</li>
                  <li>انتهت صلاحية رابط الفيديو</li>
                  <li>مشكلة في السيرفر</li>
                </ul>
              </div>
              
              {initialVideo && (
                <p style={{ 
                  margin: '0 0 15px 0', 
                  fontSize: '12px', 
                  wordBreak: 'break-all',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  padding: '8px',
                  borderRadius: '4px'
                }}>
                  <strong>الرابط:</strong> {initialVideo}
                </p>
              )}
              
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                justifyContent: 'center', 
                flexWrap: 'wrap' 
              }}>
                <button
                  onClick={retryVideoLoad}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  إعادة المحاولة
                </button>
                <label 
                  htmlFor="video-upload"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#0062ff',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    border: 'none',
                    fontWeight: '500'
                  }}
                >
                  رفع فيديو جديد
                </label>
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative' }}>
              <video
                ref={videoRef}
                src={videoURL}
                controls
                preload="metadata"
                crossOrigin="anonymous"
                onLoadStart={() => {
                  setIsLoadingVideo(true);
                  setLoadingProgress(0);
                }}
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                onCanPlay={() => {
                  setIsLoadingVideo(false);
                  setLoadingProgress(100);
                }}
                onProgress={(e) => {
                  // تحديث تقدم التحميل الفعلي
                  if (e.target.buffered.length > 0) {
                    const buffered = e.target.buffered.end(0);
                    const duration = e.target.duration;
                    if (duration > 0) {
                      const progress = (buffered / duration) * 100;
                      setLoadingProgress(Math.round(progress));
                    }
                  }
                }}
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  backgroundColor: '#000'
                }}
              />
              
              {/* زر إزالة الفيديو */}
              <button
                onClick={removeCurrentVideo}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(239, 68, 68, 0.9)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
                title="إزالة الفيديو"
              >
                ×
              </button>
              
              {/* معلومات الفيديو */}
              <div style={{
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {initialVideo ? 'فيديو محفوظ في السيرفر' : 'فيديو جديد'}
                  {videoFile && (
                    <span style={{ marginRight: '8px' }}>
                      ({(videoFile.size / (1024 * 1024)).toFixed(1)} MB)
                    </span>
                  )}
                </div>
                <label 
                  htmlFor="video-upload"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#0062ff',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  تغيير الفيديو
                </label>
              </div>
            </div>
          )}
        </div>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default VideoUploader;
