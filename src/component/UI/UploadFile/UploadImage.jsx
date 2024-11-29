import { Delete, Image } from '@mui/icons-material';
import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';
import { Button } from 'rsuite';

const UploadImage = ({currentImage,onChange}) => {
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(currentImage);
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      onChange(file)
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
    <div>
         {!currentImage ? (
                        <div
                        className="d-flex flex-column align-items-center gap-3 p-3 border border-dashed rounded hover-shadow"
                        style={{ maxWidth: '8rem',maxHeight: '24rem', transition: 'box-shadow 0.3s ease' }}
                      >
                        <div className="w-100">
                          <label className="d-flex align-items-center justify-content-center cursor-pointer p-2 rounded hover-bg-light">
                            <Image style={{ width: '1.7rem', height: '1.7rem', color: '#667' }} />
                            <input
                              type="file"
                              className="d-none"
                              onChange={handleImageChange}
                              accept="image/*"

                            />
                          </label>
                        </div>
                      </div>
                      ) : (
                        <div className="position-relative">
                          <img
                            src={preview}
                            alt=" preview"
                            // className=" position-absolute w-100 h-auto rounded-lg shadow-sm"
                            style={{ height: "70px",width:"70px" }}
                          />
                          <Button
                            appearance="primary"
                            size="icon"
                            color="red"
                            className="position-absolute p-2"
style={{ transform: 'translate(50%, 125%)' }}
                            onClick={handleRemove}
                          >
                            {/* <X className="h-4 w-4" /> */}
                            <Delete style={{
                                width: "1.2rem",
                                height: "1.2rem",
                            }} />
                          </Button>
                        </div>
                      )}

                      {error && (
                        <Alert type="error">
                        <Alert.Heading>حدث خطا</Alert.Heading>
                        <p>{error}</p>
                      </Alert>

                      )}
    </div>
  )
}

export default UploadImage