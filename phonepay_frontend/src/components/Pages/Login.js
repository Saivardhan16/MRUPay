import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../../services/api";

import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phoneNumber: '',
    pin: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(e) {
  e.preventDefault();

  API.post("/users/login", {
    phoneNumber: formData.phoneNumber,
    pin: formData.pin
  })
  .then(res => {
    localStorage.setItem("user", JSON.stringify(res.data.data));
    navigate("/dashboard");
  })
  .catch(() => alert("Invalid login"));
}

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="app-title">PhonePay</h1>
        <p className="college">Malla Reddy College of Engineering</p>

        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phone number"
            onChange={handleChange}
            required
          />

          <label>PIN</label>
          <input
            type="password"
            name="pin"
            placeholder="Enter your 4-digit PIN"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Don’t have an account? <span onClick={() => navigate('/register')}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;