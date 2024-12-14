import React, { useState } from 'react';
import axios from 'axios';
import { ButtonSpinner } from "../src/component/UI/Buttons/ButtonSpinner";
import { Spinner } from 'react-bootstrap';
import { SubmitButton } from './utils/styles';
function TestPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isPending, setIsPending] = useState(false);



  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadProgress(0); // Reset progress on file change
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      setIsPending(true);
      const response = await axios.post('http://localhost:8000/api/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      console.log(response);

      if (response.data.success) {
        setUploadStatus('File uploaded successfully!');
      } else {
        setUploadStatus('File upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('An error occurred while uploading the file.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">File Upload</h1>
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 w-full"
        />
      </div>


      <SubmitButton onClick={handleUpload}>
        {isPending && <Spinner />}
        <span> Upload</span>
      </SubmitButton>




      {uploadProgress > 0 && (
        <div className="mt-4">
          <p>Uploading: {uploadProgress}%</p>
          <progress value={uploadProgress} max="100" className="w-full"></progress>
        </div>
      )}

      {uploadStatus && (
        <div className="mt-4 text-sm">
          <p
            className={
              uploadStatus.includes('success')
                ? 'text-green-500'
                : 'text-red-500'
            }
          >
            {uploadStatus}
          </p>
        </div>
      )}
    </div>
  );
}

export default TestPage;
