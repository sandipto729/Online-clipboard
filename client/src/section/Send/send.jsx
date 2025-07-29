import React, { useState } from 'react';

import './Styles/send.scss';
import Filesend from './filesend';
import Textsend from './textsend';

const Send = () => {
  const [activeTab, setActiveTab] = useState('text');
  
  const options = [
    { value: 'text', label: 'Text Message', icon: '💬', description: 'Send instant messages' },
    { value: 'file', label: 'File Upload', icon: '📁', description: 'Upload documents & media' }
  ];

  return (
    <div className="send-container">
      {/* Animated background */}
      <div className="background-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>
      
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <div className="tab-header">
          <h1>Choose Your Communication</h1>
          <p>Select how you'd like to share your content</p>
        </div>
        
        <div className="tab-selector">
          <div className={`tab-background ${activeTab === 'file' ? 'tab-background--file' : ''}`}></div>
          {options.map((option, index) => (
            <button
              key={option.value}
              className={`tab-button ${activeTab === option.value ? 'tab-button--active' : ''}`}
              onClick={() => setActiveTab(option.value)}
              style={{ '--index': index }}
            >
              <div className="tab-button__icon">{option.icon}</div>
              <div className="tab-button__content">
                <div className="tab-button__label">{option.label}</div>
                <div className="tab-button__description">{option.description}</div>
              </div>
              <div className="tab-button__indicator"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="content-container">
        <div className="content-wrapper">
          {activeTab === 'text' && <Textsend />}
          {activeTab === 'file' && <Filesend />}
        </div>
      </div>
    </div>
  );
};

export default Send;