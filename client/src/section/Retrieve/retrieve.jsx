import React, { useState } from 'react'
import './Styles/retrievestyle.scss'
import axios from 'axios'

const Retrieve = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const cleanedCode = code.trim()

    if (!cleanedCode) {
      setError('Please enter a retrieve code.')
      setResult(null)
      return
    }

    try {
      const res = await axios.post('http://localhost:3000/api/retrieve', { code: cleanedCode })

      if (res.data.success) {
        setError('')
        setResult(res.data)
      } else {
        setError(res.data.message || 'Invalid code.')
        setResult(null)
      }
    } catch (err) {
      setError('Server error. Please try again later.')
      setResult(null)
    }
  }

  const renderResult = () => {
    if (!result) return null

    if (result.type === 'text') {
      return <div className="result-box"><h3>Retrieved Text:</h3><p>{result.data}</p></div>
    } else if (result.type === 'file') {
      const blob = b64toBlob(result.data, result.mimetype)
      const url = URL.createObjectURL(blob)

      return (
        <div className="result-box">
          <h3>Retrieved File:</h3>
          <a href={url} download={result.filename || 'downloaded_file'} target="_blank" rel="noopener noreferrer">
            Download {result.filename}
          </a>
        </div>
      )
    }
    return null
  }

  // Helper function to convert base64 to Blob
  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)
      const byteNumbers = new Array(slice.length).fill(0).map((_, i) => slice.charCodeAt(i))
      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, { type: contentType })
  }

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
  )
}

export default Retrieve
