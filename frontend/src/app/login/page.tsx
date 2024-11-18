'use client'

import React, { useEffect } from 'react';
import CustomTextField from '@/components/CustomTextField';
import { Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthService } from '@/services';

export default function LoginPage() {
  const [selected, setSelected] = useState("login");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const authService = useAuthService();
  const router = useRouter();

  const handleAuth = async () => {
    setIsLoading(true);

    try {
      const response = selected === "login"
        ? await authService.login(username, password)
        : await authService.register(username, password, confirmedPassword);

      if (response && response.status === "success") {
          setIsLoading(false);
          router.push('/');
      } else {
          setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error on login', error);
    } finally {
      setIsLoading(false);
    }
  }

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
          <CustomTextField
            label="Username" placeholder="@johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <CustomTextField
            label="Password" placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isPassword
          />
          <Button
            className="w-full font-bold rounded-md py-3 mt-6 bg-green-400 text-white"
            onClick={handleAuth}
            disabled={isLoading}
          >
            { isLoading ? <CircularProgress size={24} color='inherit'/> : 'Log In' }
          </Button>
        </>
      )}

      {selected == "signup" && (
        <>
          <CustomTextField
            label="Username" placeholder="@johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <CustomTextField
            label="Password" placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isPassword
          />
          <CustomTextField
            label="Confirm Password" placeholder="*********"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            isPassword
          />
          <Button
            className="w-full font-bold rounded-md py-3 mt-6 bg-green-400 text-white"
            onClick={handleAuth}
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </>
      )}
    </div>
)};