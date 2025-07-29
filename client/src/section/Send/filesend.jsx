import React, { useState } from 'react';
import './Styles/filesend.scss';


export default function FileSend() {
  const [file, setFile] = useState(null);
  const MAX_FILE_SIZE_MB = 20;

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (file) => {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert('File exceeds 20MB limit.');
      setFile(null);
    } else {
      setFile(file);
    }
  };

 const handleSend = async () => {
  if (!file) {
    alert('Please select a file under 20MB.');
    return;
  }

  try {
    // Prepare multipart form data
    const formData = new FormData();
    formData.append('file', file); // backend expects field name 'file'
    formData.append('fileType', 'file');
    console.log('Uploading file:', file);
    // Upload file to backend
    const response = await fetch('http://localhost:8000/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const result = await response.json(); // result contains { code }
    console.log('✅ Upload response:', result);

    alert(`✅ File uploaded! Share this code: ${result.code}`);
    setFile(null);
  } catch (error) {
    console.error('❌ Upload failed:', error);
    alert('Failed to upload file.');
  }
};


  return (
    <div className="file-send-container">
      <h2>Send Your File</h2>
      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>{file ? file.name : 'Drag & drop your file here'}</p>
        <span>or</span>
        <label className="file-input-label">
          Browse
          <input type="file" onChange={handleFileChange} hidden />
        </label>
      </div>
      <button className="send-btn" onClick={handleSend}>
        Send File
      </button>
    </div>
  );
}
