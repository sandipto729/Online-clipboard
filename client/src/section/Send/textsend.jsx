import React, { useState } from 'react';
import './Styles/textsend.scss';

const TextSend = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      alert(`Sending: ${message}`);
      setMessage('');
    } else {
      alert('Please enter a message.');
    }
  };

  return (
    <div className="text-send-container">
      <h2>Send a Message</h2>
      <div className="text-box">
        <textarea
          id="message"
          name="message"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
        />

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default TextSend;
