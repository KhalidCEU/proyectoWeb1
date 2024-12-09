"use client"

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocketIO = () => {
  const [userCount, setUserCount] = useState(0);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {

    if (!socketRef.current) {
      console.log('[Socket] Creating new connection');
      socketRef.current = io('http://localhost:8080', {
        withCredentials: true,
        transports: ['websocket', 'polling']
      });
    }

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('[Socket] Connected with ID:', socket.id);
    });

    socket.on('userCount', (count: number) => {
      console.log('[Socket] Received new user count:', count);
      setUserCount(count);
    });

    socket.on('disconnect', () => {
      console.log('[Socket] Disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('[Socket] Connection error:', error);
    });

    return () => {
      console.log('[Socket] Cleaning up connection');
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return { userCount };
};
