import React, { useState, useEffect } from 'react';
import './Styles/retrievestyle.scss';
import axios from 'axios';
import { summaryAPI } from '../../Common';

const Retrieve = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${summaryAPI.receiveFile.url}`);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // <-- fixed dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedCode = code.trim();

    if (!cleanedCode) {
      setError('Please enter a retrieve code.');
      setResult(null);
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/retrieve', { code: cleanedCode });
      const json = res.data;

      if (res.status === 200 && json.fileType === 'text') {
        setError('');
        setFileType('text');
        setResult(json.text);
        setCode('');
      } else if (json.fileType === 'file') {
        setFileType('file');
        setResult(json.fileUrl);
        setCode('');
      } else {
        setError(res.data.message || 'Invalid code.');
        setResult(null);
      }
    } catch (err) {
      setError('Server error. Please try again later.');
      setResult(null);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (fileType === 'text') {
      return (
        <div className="result-box">
          <h3>Retrieved Text:</h3>
          <p>{result}</p>
        </div>
      );
    } else if (fileType === 'file') {
      return (
        <div className="result-box">
          <h3>Retrieved File:</h3>
          <a href={result} download>
            Download File
          </a>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="retrieve-container">
      <h2>Retrieve Clipboard Data</h2>
      <form onSubmit={handleSubmit} className="retrieve-form">
        <input
          type="text"
          placeholder="Enter your retrieve code"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
        />
        <button type="submit">Retrieve</button>
      </form>

      {error && <p className="error">{error}</p>}
      {renderResult()}
    </div>
  );
};

export default Retrieve;
