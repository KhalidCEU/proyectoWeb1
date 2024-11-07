"use client";

import React, { useState, useEffect } from 'react';

const UserSettings = () => {
  const [username, setUsername] = useState(''); 

  useEffect(() => {
    
    const button = document.querySelector('.user-settings-button');
    if (button) {
      button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
        button.style.transition = 'transform 0.2s';
      });

      button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
      });
    }

    
    const inputs = document.querySelectorAll('.user-settings-input');
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
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-8">
      <div className="w-24 h-24 mb-4 mx-auto">
        <img src="/elon.png" alt="User Avatar" className="rounded-full" />
      </div>
      <div className="w-full mb-4">
        <label className="block text-lg font-semibold mb-2">Name</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded-md user-settings-input"
          placeholder="Your Name"
        />
      </div>
      <div className="w-full mb-4">
        <label className="block text-lg font-semibold mb-2">Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-400 rounded-md user-settings-input"
        />
      </div>
      <div className="w-full mb-4">
        <label className="block text-lg font-semibold mb-2">Confirm Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-400 rounded-md user-settings-input"
        />
      </div>
      <button className="user-settings-button w-full bg-red-500 text-white p-2 rounded-md mt-4">
        Delete account
      </button>
    </div>
  );

};

export default UserSettings;
