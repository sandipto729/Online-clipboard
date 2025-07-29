import React, { useState } from 'react';
import styles from './Styles/send.module.scss';
import Filesend from './filesend';
import Textsend from './textsend';

const Send = () => {
  const [activeTab, setActiveTab] = useState('text');
  
  const options = [
    { value: 'text', label: 'Text Message', icon: '💬', description: 'Send instant messages' },
    { value: 'file', label: 'File Upload', icon: '📁', description: 'Upload documents & media' }
  ];

  return (
    <div className={styles.sendContainer}>
      {/* Minimal background elements */}
      <div className={styles.backgroundElements}>
        <div className={`${styles.floatingCircle} ${styles.circle1}`}></div>
        <div className={`${styles.floatingCircle} ${styles.circle2}`}></div>
        <div className={`${styles.floatingCircle} ${styles.circle3}`}></div>
      </div>
      
      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        <div className={styles.tabHeader}>
          <h1>Choose Your Communication</h1>
          <p>Select how you'd like to share your content</p>
        </div>
        
        <div className={styles.tabSelector}>
          <div className={`${styles.tabBackground} ${activeTab === 'file' ? styles.tabBackgroundFile : ''}`}></div>
          {options.map((option, index) => (
            <button
              key={option.value}
              className={`${styles.tabButton} ${activeTab === option.value ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab(option.value)}
            >
              <div className={styles.tabButton__icon}>{option.icon}</div>
              <div className={styles.tabButton__content}>
                <div className={styles.tabButton__label}>{option.label}</div>
                <div className={styles.tabButton__description}>{option.description}</div>
              </div>
              <div className={styles.tabButton__indicator}></div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          {activeTab === 'text' && <Textsend />}
          {activeTab === 'file' && <Filesend />}
        </div>
      </div>
    </div>
  );
};

export default Send;