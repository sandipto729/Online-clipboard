import React, { useState, useCallback, useMemo } from 'react';
import styles from './Styles/textsend.module.scss';
import { summaryAPI } from '../../Common';

const TextSend = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ text: '', type: '' });

  // Constants
  const MAX_CHARACTERS = 5000;
  const WARNING_THRESHOLD = 4500;

  // Memoized calculations
  const textStats = useMemo(() => {
    const words = message.trim() ? message.trim().split(/\s+/).length : 0;
    const characters = message.length;
    const lines = message.split('\n').length;
    
    return { words, characters, lines };
  }, [message]);

  // Quick action templates
  const quickActions = [
    { label: 'Clear', action: () => setMessage('') },
    { label: 'Sample Text', action: () => setMessage('Hello! This is a sample message to test the clipboard sharing feature.') },
  ];

  const handleMessageChange = useCallback((e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARACTERS) {
      setMessage(value);
      setNotification({ text: '', type: '' }); // Clear notifications when typing
    }
  }, []);

  const showNotification = useCallback((text, type) => {
    setNotification({ text, type });
    // Auto-clear success messages after 2 minutes (120 seconds)
    if (type === 'success') {
      setTimeout(() => {
        setNotification({ text: '', type: '' });
      }, 120000);
    }
  }, []);

  const handleSend = async () => {
    const trimmedMessage = message.trim();
    
    if (!trimmedMessage) {
      showNotification('Please enter a message before sending.', 'warning');
      return;
    }

    if (trimmedMessage.length < 3) {
      showNotification('Message must be at least 3 characters long.', 'warning');
      return;
    }

    setIsLoading(true);
    setNotification({ text: '', type: '' });

    try {
      const response = await fetch(`${summaryAPI.sendFile.url}`, {
        method: summaryAPI.sendFile.methode,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          "text": trimmedMessage,
          "fileType": "text" 
        })
      });

      console.log('Response:', response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.code) {
        showNotification(`✅ Message sent successfully! Share this code: ${data.code}`, 'success');
        setMessage(''); // Clear message on success
      } else {
        throw new Error('No code received from server');
      }

    } catch (error) {
      console.error('Send error:', error);
      showNotification('❌ Failed to send message. Please check your connection and try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = useCallback((e) => {
    // Send on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }, [message]);

  const getCharacterCounterClass = () => {
    if (textStats.characters >= MAX_CHARACTERS) return styles.danger;
    if (textStats.characters >= WARNING_THRESHOLD) return styles.warning;
    return '';
  };

  return (
    <div className={styles.textSendContainer}>
      <h2>Send a Message</h2>
      
      {notification.text && (
        <div className={`${styles.messageDisplay} ${styles[notification.type]}`}>
          {notification.text}
        </div>
      )}

      {message && (
        <div className={styles.textStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{textStats.words}</span>
            <span className={styles.statLabel}>Words</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{textStats.characters}</span>
            <span className={styles.statLabel}>Characters</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{textStats.lines}</span>
            <span className={styles.statLabel}>Lines</span>
          </div>
        </div>
      )}

      <div className={styles.quickActions}>
        {quickActions.map((action, index) => (
          <button
            key={index}
            className={styles.quickActionBtn}
            onClick={action.action}
            disabled={isLoading}
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className={styles.textBox}>
        <div style={{ position: 'relative' }}>
          <textarea
            id="message"
            name="message"
            className={styles.messageTextarea}
            placeholder="Type your message here... (Ctrl+Enter to send)"
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            rows={6}
            disabled={isLoading}
            maxLength={MAX_CHARACTERS}
            aria-describedby="char-count"
          />
          
          {message && (
            <div 
              id="char-count"
              className={`${styles.characterCounter} ${getCharacterCounterClass()}`}
            >
              {textStats.characters}/{MAX_CHARACTERS}
            </div>
          )}
        </div>

        <button 
          className={styles.sendButton}
          onClick={handleSend}
          disabled={!message.trim() || isLoading || textStats.characters > MAX_CHARACTERS}
        >
          {isLoading ? (
            <>
              <div className={styles.loadingSpinner}></div>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </div>
    </div>
  );
};

export default TextSend;