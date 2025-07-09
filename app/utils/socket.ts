// utils/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io('http://localhost:3000', {
      transports: ['websocket'],
      autoConnect: true
    });

    socket.on('connect', () => {
      console.log('🔗 Connected to server with ID:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
    });

    socket.on('connect_error', (error: Error) => {
      console.error('❌ Connection error:', error);
    });
  }
  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    console.warn('⚠️ Socket not initialized. Call initializeSocket() first.');
    return initializeSocket();
  }
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('🔌 Socket disconnected and cleared');
  }
};

export const joinUserRoom = (userId: string | number): void => {
  const socket = getSocket();
  if (socket && socket.connected && userId) {
    socket.emit('join_user_room', { userId });
    console.log(`📨 Joining room for user: ${userId}`);
  } else {
    console.warn('⚠️ Cannot join room: socket not connected or no userId');
  }
};