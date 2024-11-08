"use client"

import React from 'react';
import CustomTextField from '@/components/CustomTextField';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function LoginPage() {
  const [selected, setSelected] = useState("login");

  return (
    <div className="max-w-md p-8 mx-auto mt-10 border-1 border-black rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-10 text-center">
        <button
            onClick={() => setSelected("login")}
            className={`mr-4 ${selected === 'login' ? 'text-green-400' : 'text-gray-400'}`}
          >
            Log In
        </button>
        <button
          onClick={() => setSelected("signup")}
          className={`ml-4 ${selected === 'signup' ? 'text-green-400' : 'text-gray-400'}`}
        >
          Sign Up
        </button>
      </h2>

      {selected == "login" && (
        <>
          <CustomTextField label="Username" placeholder="@johndoe"/>
          <CustomTextField label="Password" placeholder="*********" />
          <Button className="w-full font-bold rounded-md py-3 mt-6 bg-green-400 text-white">
            Log In
          </Button>
        </>
      )}

      {selected == "signup" && (
        <>
          <CustomTextField label="Username" placeholder="@johndoe"/>
          <CustomTextField label="Password" placeholder="*********" />
          <CustomTextField label="Confirm Password" placeholder="*********" />
          <Button className="w-full font-bold rounded-md py-3 mt-6 bg-green-400 text-white">
            Sign Up
          </Button>
        </>
      )}
    </div>
)};