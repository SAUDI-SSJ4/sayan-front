import React, { useState } from "react";
import defaultCourseImage from "../../../../assets/images/img.png";
import { FiUpload, FiImage, FiAlertCircle, FiInfo } from "react-icons/fi";

function CourseImageUpload({
  image,
  onImageChange,
  fileInputRef,
  error,
  touched,
  courseImage,
}) {
  const [imageError, setImageError] = useState("");
  
  // Maximum image size (5MB)
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  
  const imageSrc = image
    ? URL.createObjectURL(image)
    : courseImage
    ? courseImage
    : defaultCourseImage;
    
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size
      if (file.size > MAX_IMAGE_SIZE) {
        setImageError(`حجم الصورة يتجاوز الحد الأقصى (5 ميجابايت). الحجم الحالي: ${(file.size / (1024 * 1024)).toFixed(2)} ميجابايت`);
        e.target.value = null;
        return;
      }
      
      // Check file type
      if (!file.type.match('image.*')) {
        setImageError("يرجى اختيار ملف صورة صالح");
        e.target.value = null;
        return;
      }
      
      setImageError("");
      onImageChange(e);
    }
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div 
        className="card-img-top position-relative"
        style={{ 
          height: "250px", 
          overflow: "hidden",
          backgroundColor: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img
          src={imageSrc}
          alt="صورة المادة"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            display: "block"
          }}
        />
        {(!image && !courseImage) && (
          <div className="position-absolute" style={{ opacity: 0.6 }}>
            <FiImage size={64} color="#94a3b8" />
          </div>
        )}
      </div>
      <div className="card-body bg-white p-3">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        
        {/* ملاحظة النسبة المفضلة */}
        <div 
          className="alert alert-info p-2 mb-3 d-flex align-items-start"
          style={{ 
            backgroundColor: '#e6f3ff', 
            border: '1px solid #b3d9ff', 
            borderRadius: '8px',
            fontSize: '12px',
            lineHeight: '1.4'
          }}
        >
          <FiInfo 
            className="me-2 mt-1 flex-shrink-0" 
            size={14} 
            style={{ color: '#0066cc' }}
          />
          <div style={{ color: '#004080' }}>
            • استخدم نسبة العرض للارتفاع <strong>22:15</strong>
            • حد أقصى: 5 ميجابايت
          </div>
        </div>
        
        <div className="d-flex flex-column gap-2">
          <button
            type="button"
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center py-2"
            onClick={() => fileInputRef.current.click()}
            style={{ fontSize: '14px', borderRadius: '6px' }}
          >
            <FiUpload className="me-2" size={16} />
            {(image || courseImage) ? "تغيير الصورة" : "رفع صورة المادة"}
          </button>
          
          {(image || courseImage) && (
            <div className="d-flex align-items-center mt-1">
              <div className="bg-success bg-opacity-10 text-success rounded-pill px-2 py-1 d-inline-flex align-items-center" style={{ fontSize: '12px' }}>
                <span className="me-1 rounded-circle bg-success" style={{ width: '6px', height: '6px' }}></span>
                تم تحميل الصورة
              </div>
            </div>
          )}
          
          {imageError && (
            <div className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '12px' }}>
              <FiAlertCircle className="me-1" size={14} />
              {imageError}
            </div>
          )}
          
          {touched && error && !imageError && (
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

export default CourseImageUpload;
