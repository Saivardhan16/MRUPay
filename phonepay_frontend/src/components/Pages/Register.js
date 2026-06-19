import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../../services/api";

import './Register.css';

function Registration() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    upiId: '',
    pin: '',
    confirmPin: ''
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

  if (formData.pin !== formData.confirmPin) {
    alert("PINs do not match");
    return;
  }

  API.post("/users/register", {
    name: formData.fullName,
    phoneNumber: formData.phoneNumber,
    email: formData.email,
    upiId: formData.upiId,
    pin: formData.pin
  })
  .then(() => {
    alert("Registration successful");
    navigate("/login");
  })
  .catch(err => {
    alert(err.response?.data?.message || "Registration failed");
  });
}

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">PhonePe</h1>
        <p className="subtitle">Malla Reddy College of Engineering</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="upiId"
            placeholder="UPI ID"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="pin"
            placeholder="Set PIN"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPin"
            placeholder="Confirm PIN"
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>


        <p className="login-link">
             Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>

      </div>
    </div>
  );
}

export default Registration;