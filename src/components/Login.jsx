import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const response = await axios.post('/api/login', credentials);
      if (response.data.success) {
        localStorage.setItem('userId', response.data.userId);
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Invalid credentials. Please enter correctly.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
          />
          
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
          
          <button type="submit">Login</button>
          
          <div className="forgot-links">
            <Link to="/forgot-username">Forgot Username</Link>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;