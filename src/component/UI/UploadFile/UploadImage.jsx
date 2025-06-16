import { Delete, Image } from "@mui/icons-material";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Button } from "rsuite";

const UploadImage = ({ currentImage, onChange, ...rest }) => {
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(currentImage);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    onChange(file);
    setError("");
    setPreview(URL.createObjectURL(file));
    if (!file) {
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("الرجاء رفع الملف بصيغة الصورة");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setError(`حجم الصورة كبير جداً (${sizeInMB} ميجا). الحد الأقصى المسموح للأدوات التفاعلية هو 2 ميجابايت فقط.`);
      return;
    }
  };

  const handleRemove = () => {
    onChange("");
    setError("");
    setPreview(null);
  };

  return (
    <div className="upload-image-container">
      {/* ملاحظة مهمة عن حد الحجم */}
      <div 
        className="mb-2 p-2 rounded"
        style={{
          backgroundColor: '#fff8e1',
          border: '1px solid #ffcc02',
          fontSize: '11px',
          color: '#f57c00',
          textAlign: 'center'
        }}
      >
        ⚠️ <strong>ملاحظة مهمة:</strong> أقصى حجم للصور في الأدوات التفاعلية هو <strong>2 ميجابايت فقط</strong>
      </div>

      <label className="!flex items-center justify-center m-0 cursor-pointer border border-gray-200 hover:bg-gray-100 transition rounded-md p-2 h-24 w-32 relative group">
        {preview ? (
          <>
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover cursor-pointer rounded-md"
            />
            {/* زر الحذف */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ fontSize: '10px' }}
            >
              ×
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <Image className="!w-7 !h-7 cursor-pointer mb-1" />
            <span style={{ fontSize: '10px', textAlign: 'center' }}>
              اختر صورة
              <br />
              (حتى 2MB)
            </span>
          </div>
        )}
        <input
          type="file"
          className="d-none"
          onChange={handleImageChange}
          accept="image/*"
          {...rest}
        />
      </label>

      {error && (
        <Alert 
          variant="danger" 
          className="mt-2 p-2"
          style={{ fontSize: '12px', marginBottom: '0' }}
        >
          <Alert.Heading style={{ fontSize: '13px', marginBottom: '4px' }}>
            ❌ خطأ في رفع الصورة
          </Alert.Heading>
          <p style={{ margin: 0, lineHeight: '1.3' }}>{error}</p>
        </Alert>
      )}
      
      {preview && !error && (
        <div 
          className="mt-2 p-2 rounded text-center"
          style={{
            backgroundColor: '#e8f5e8',
            border: '1px solid #4caf50',
            fontSize: '11px',
            color: '#2e7d32'
          }}
        >
          ✅ تم تحميل الصورة بنجاح
        </div>
      )}
    </div>
  );
};

export default UploadImage;
