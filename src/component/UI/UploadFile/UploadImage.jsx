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
      setError("لا يجب ان يتجاوز حجم الملف 2MB");
      return;
    }
  };

  const handleRemove = () => {
    onChange("");
    setError("");
  };
  return (
    <>
      <label className="!flex items-center justify-center m-0 cursor-pointer border border-gray-200 hover:bg-gray-100 transition rounded-md p-2 h-24 w-32">
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover cursor-pointer rounded-md"
          />
        ) : (
          <Image className="!w-7 !h-7 cursor-pointer" />
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
        <Alert type="error">
          <Alert.Heading>حدث خطا</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
    </>
  );
};

export default UploadImage;
