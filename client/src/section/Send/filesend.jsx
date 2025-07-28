import React, { useState } from 'react';
import './Styles/filesend.scss';
import uploadFile  from '../../helper/azure_blob.js';
import axios from 'axios';

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
      // Upload file and get URL
      const fileUrl = await uploadFile('checkfile', file); // use 'uploads' as container
      const data={
        fileType: 'file',
        fileUrl: fileUrl,
      }
      console.log(data);
      alert('✅ File uploaded and sent to backend!');
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
