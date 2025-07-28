import React, { useState } from 'react'
import File from './retrievefile'
import Text from './retrievetext'
import './Styles/retrievestyle.scss'

const Retrieve = () => {
  const [code, setCode] = useState('')
  const [showComponent, setShowComponent] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const cleanedCode = code.trim()

    if (cleanedCode.includes('1')) {
      setShowComponent('text')
      setError('')
    } else if (cleanedCode.includes('2')) {
      setShowComponent('file')
      setError('')
    } else {
      setShowComponent(null)
      setError('Code must include 1 for Text or 2 for File retrieval.')
    }
  }

  return (
    <div className="retrieve-container">
      <h2>Retrieve Clipboard Data</h2>
      <form onSubmit={handleSubmit} className="retrieve-form">
        <input
          type="text"
          placeholder="Enter your retrieve code"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} // digits only
        />
        <button type="submit">Retrieve</button>
      </form>

      {error && <p className="error">{error}</p>}

      {showComponent === 'text' && <Text />}
      {showComponent === 'file' && <File />}
    </div>
  )
}

export default Retrieve
