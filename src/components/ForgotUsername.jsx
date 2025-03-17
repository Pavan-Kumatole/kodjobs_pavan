import React, { useState } from 'react';
import axios from '../utils/axios';

const ForgotUsername = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      const response = await axios.post('/api/forgot-username', { email });
      
      if (response.data.success) {
        setMessage('Username has been sent to your email');
        setError('');
      }
    } catch (error) {
      setError('Email not found. Please check or sign up first.');
      setMessage('');
    }
  };

  return (
    <div className="forgot-container">
      <form onSubmit={handleSubmit} className="forgot-form">
        <h2>Forgot Username</h2>
        
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <button type="submit">Get Username</button>
      </form>
    </div>
  );
};

export default ForgotUsername;