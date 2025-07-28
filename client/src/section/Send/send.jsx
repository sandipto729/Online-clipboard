import React from 'react'
import Filesend from './filesend'
import Textsend from './textsend'

const send = () => {
    const [activeTab, setActiveTab] = React.useState('text');
    const options = [
        { value: 'text', label: 'Text' },
        { value: 'file', label: 'File' }
    ];
  return (
    <>
      {options.map((item) => (
        <div key={item.value}>
          <label>{item.label}</label>
          <input
            type="radio"
            value={item.value}
            checked={activeTab === item.value}
            onChange={(e) => setActiveTab(e.target.value)}
          />
        </div>
      ))}
      <div>
        {activeTab === 'text' && <Textsend />}
        {activeTab === 'file' && <Filesend />}
      </div>
    </>
 
  )
}

export default send