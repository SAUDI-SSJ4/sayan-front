import React, { useState } from 'react';
import axios from 'axios';

const TestPage = () => {
  const [files, setFiles] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
    setUploadTime(null);
    setResponse(null);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!files || files.length === 0) {
      setError('Please select at least one file to upload.');
      return;
    }

    const formData = new FormData();
    // Append all selected files to the form data
    Array.from(files).forEach((file) => {
      formData.append('video', file);
    });

    const startTime = Date.now();

    try {
      const res = await axios.post('http://localhost:8000/api/v2/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const endTime = Date.now();
      setUploadTime((endTime - startTime) / 1000); // Convert to seconds
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'An error occurred during the upload.');
      setUploadTime(null);
      setResponse(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Test Multiple Video Upload</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select videos:</label>
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept="video/*" 
            multiple
            className="border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>

      {uploadTime && (
        <div className="mt-4 text-green-600">
          <p>Upload completed in {uploadTime} seconds.</p>
        </div>
      )}

      {response && (
        <div className="mt-4 text-green-600">
          <p>Response: {JSON.stringify(response)}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-600">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default TestPage;
