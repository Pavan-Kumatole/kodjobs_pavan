import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    dob: ''
  });
  const [error, setError] = useState('');

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password || !formData.email || !formData.dob) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('/api/signup', {
        ...formData,
        age: calculateAge(formData.dob)
      });

      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error during signup');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-right">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Sign Up</h2>
          {error && <div className="error-message">{error}</div>}
          
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({...formData, dob: e.target.value})}
          />
          
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;