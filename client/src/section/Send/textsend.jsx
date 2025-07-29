import React, { useState } from 'react';
import './Styles/textsend.scss';

const TextSend = () => {
  const [message, setMessage] = useState('');

  const handleSend = async() => {
    if (message.trim()) {
      try
      {
     
    
      const res =await fetch('http://localhost:8000/api/sendfile', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "text": message,"fileType": "text" })
      })
      console.log(res)
      const data = await res.json();
      const code = data.code

     console.log(data);
      if(code){
        alert(`Message sent successfully.:-${data.code}`);
      }
      else{

        alert('Failed to send message.');
      }
   
    }
    catch(err){
      console.log(err);
      alert('Failed to send message.');
    }
    finally{
      setMessage('');
    }
      
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
          onChange={(e) =>{ console.log(e.target.value);setMessage(e.target.value)}}
          rows={6}
        />

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default TextSend;
