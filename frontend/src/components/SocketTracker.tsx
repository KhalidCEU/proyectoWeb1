"use client"

import { useEffect } from 'react';
import { io } from 'socket.io-client';

export function SocketTracker() {
    useEffect(() => {
        const socket = io('http://localhost:8080');
        return () => {
            socket.disconnect();
        };
    }, []);

    return null;
}