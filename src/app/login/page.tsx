"use client";

import React, { useEffect } from 'react';
import './login.css';

const LoginPage = () => {
  useEffect(() => {
    //animacion para el botón
    const button = document.querySelector('.login-button');
    if (button) {
      button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
        button.style.transition = 'transform 0.2s';
      });

      button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
      });
    }

    // Animación para los campos 
    const inputs = document.querySelectorAll('.login-input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.style.boxShadow = '0 0 15px rgba(0, 123, 255, 0.7)'; // Sombra más intensa
        input.style.transition = 'box-shadow 0.3s';
      });

      input.addEventListener('blur', () => {
        input.style.boxShadow = 'none';
      });
    });
  }, []); 

  return (
    <div className="login-container">
      <h2 className="login-title">Sign Up | Log In</h2>
      <form className="login-form">
        <label htmlFor="username" className="login-label">
          Username / Email address
        </label>
        <input type="text" id="username" className="login-input" />

        <label htmlFor="password" className="login-label">
          Password
        </label>
        <input type="password" id="password" className="login-input" />

        <button type="submit" className="login-button">Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
