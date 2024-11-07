"use client";

import React, { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    // Animación para el botón
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

    // Animación para los campos de entrada
    const inputs = document.querySelectorAll('.login-input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.style.boxShadow = '0 0 15px rgba(0, 123, 255, 0.7)'; 
        input.style.transition = 'box-shadow 0.3s';
      });

      input.addEventListener('blur', () => {
        input.style.boxShadow = 'none';
      });
    });
  }, []);

  return (
    <div className="w-[400px] p-8 border-2 border-black rounded-lg bg-gray-300 shadow-lg mx-auto mt-10 transform -translate-y-1/2 absolute top-1/2 left-1/2 -translate-x-1/2">
      <h2 className="text-2xl text-[#151549] font-semibold mb-6 text-center relative">
        Sign Up | Log In
        <span className="block w-4/5 h-2 bg-[#1a1a40] mx-auto mt-2 mb-6"></span>
      </h2>
      <form className="flex flex-col items-center w-full">
        <label htmlFor="username" className="w-full text-left mb-4 text-[#1e3a8a]">Username / Email address</label>
        <input type="text" id="username" className="login-input w-full p-2 mb-8 border border-gray-400 rounded-md text-gray-800 bg-gray-100 focus:outline-none" />

        <label htmlFor="password" className="w-full text-left mb-4 text-[#1e3a8a]">Password</label>
        <input type="password" id="password" className="login-input w-full p-2 mb-8 border border-gray-400 rounded-md text-gray-800 bg-gray-100 focus:outline-none" />

        <button type="submit" className="login-button w-full py-3 bg-[#28a745] text-[#1e3a8a] font-bold rounded-md hover:bg-blue-500 transition-colors">Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
