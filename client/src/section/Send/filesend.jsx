import React, { useState } from 'react';
import styles from './Styles/filesend.module.scss';
import { summaryAPI } from '../../Common';

export default function FileSend() {
  const [file, setFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const MAX_FILE_SIZE_MB = 20;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    const iconMap = {
      pdf: '📄',
      doc: '📝', docx: '📝',
      xls: '📊', xlsx: '📊',
      ppt: '📈', pptx: '📈',
      txt: '📃',
      jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️',
      mp4: '🎥', avi: '🎥', mov: '🎥',
      mp3: '🎵', wav: '🎵',
      zip: '🗜️', rar: '🗜️',
    };
    return iconMap[extension] || '📁';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
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
    setMessage({ text: '', type: '' });
    
    if (!file) return;
    
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setMessage({ 
        text: `File exceeds ${MAX_FILE_SIZE_MB}MB limit. Please choose a smaller file.`, 
        type: 'error' 
      });
      setFile(null);
    } else {
      setFile(file);
      setMessage({ 
        text: `File "${file.name}" selected successfully!`, 
        type: 'success' 
      });
    }
  };

  const removeFile = () => {
    setFile(null);
    setMessage({ text: '', type: '' });
  };

  const handleSend = async () => {
    if (!file) {
      setMessage({ 
        text: 'Please select a file under 20MB.', 
        type: 'error' 
      });
      return;
    }

    setIsUploading(true);
    setMessage({ text: '', type: '' });

    try {
      // Prepare multipart form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileType', 'file');
      
      console.log('Uploading file:', file);
      
      // Upload file to backend
      const response = await fetch(`${summaryAPI.sendFile.url}`, {
        method: summaryAPI.sendFile.methode,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      console.log('✅ Upload response:', result);

      setMessage({ 
        text: `✅ File uploaded successfully! Share this code: ${result.code}`, 
        type: 'success' 
      });
      
      // Auto-clear success message after 2 minutes
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 120000);
      
      setFile(null);
      
    } catch (error) {
      console.error('❌ Upload failed:', error);
      setMessage({ 
        text: '❌ Failed to upload file. Please try again.', 
        type: 'error' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.fileSendContainer}>
      <h2>Send Your File</h2>
      
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}
      
      {file && (
        <div className={styles.fileInfo}>
          <div className={styles.fileIcon}>
            {getFileIcon(file.name)}
          </div>
          <div className={styles.fileDetails}>
            <div className={styles.fileName}>{file.name}</div>
            <div className={styles.fileSize}>{formatFileSize(file.size)}</div>
          </div>
          <button 
            className={styles.removeFile} 
            onClick={removeFile}
            title="Remove file"
          >
            ✕
          </button>
        </div>
      )}
      
      <div
        className={`${styles.dropZone} ${isDragActive ? styles.dragActive : ''} ${file ? styles.hasFile : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {file ? (
          <>
            <p className={styles.fileName}>
              {file.name}
            </p>
            <span>File ready to send</span>
          </>
        ) : (
          <>
            <p>Drag & drop your file here</p>
            <span>or</span>
          </>
        )}
        
        <label className={styles.fileInputLabel}>
          {file ? 'Change File' : 'Browse'}
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept="*/*"
            hidden 
          />
        </label>
      </div>
      
      <button 
        className={styles.sendBtn} 
        onClick={handleSend}
        disabled={!file || isUploading}
      >
        {isUploading ? 'Uploading...' : 'Send File'}
      </button>
    </div>
  );
}