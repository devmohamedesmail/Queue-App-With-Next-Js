// hooks/useNotifications.ts
import { useState, useEffect } from 'react';
import { getSocket, joinUserRoom } from '../utils/socket';

// Notification interface
interface Notification {
  id: string | number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: string;
}

// Socket event data interfaces
interface RoomJoinedData {
  userId: string | number;
  room: string;
  message?: string;
}

interface SendMessageData {
  title: string;
  message: string;
  notification: {
    id: string | number;
    createdAt: string;
    type: string;
  };
}

interface NotificationData {
  data: {
    id: string | number;
    title: string;
    message: string;
    type: string;
  };
  timestamp: string;
}

interface SystemAnnouncementData {
  data: {
    title: string;
    message: string;
  };
}

export const useNotifications = (userId: string | number | null | undefined) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [roomJoined, setRoomJoined] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) {
      console.warn('⚠️ No userId provided to useNotifications');
      return;
    }

    const socket = getSocket();

    // Connection handlers
    const handleConnect = () => {
      console.log('✅ Socket connected');
      setIsConnected(true);
      joinUserRoom(userId);
    };

    const handleDisconnect = () => {
      console.log('❌ Socket disconnected');
      setIsConnected(false);
      setRoomJoined(false);
    };

    // Room join confirmation
    const handleRoomJoined = (data: RoomJoinedData) => {
      console.log('✅ User room joined:', data);
      setRoomJoined(true);
    };

    // Listen for send_message events (your main notification event)
    const handleSendMessage = (data: SendMessageData) => {
      console.log('📧 Received send_message:', data);
      
      // Add notification to state
      const newNotification: Notification = {
        id: data.notification.id,
        title: data.title,
        message: data.message,
        timestamp: data.notification.createdAt,
        read: false,
        type: data.notification.type
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      
      // Show alert (your current implementation)
      alert(`New message from ${data.title}: ${data.message}`);
    };

    // Listen for standard notification events
    const handleNotification = (data: NotificationData) => {
      console.log('🔔 Received notification:', data);
      
      const newNotification: Notification = {
        id: data.data.id,
        title: data.data.title,
        message: data.data.message,
        timestamp: data.timestamp,
        read: false,
        type: data.data.type
      };
      
      setNotifications(prev => [newNotification, ...prev]);
    };

    // Listen for system announcements
    const handleSystemAnnouncement = (data: SystemAnnouncementData) => {
      console.log('📢 Received system announcement:', data);
      alert(`System Announcement: ${data.data.title} - ${data.data.message}`);
    };

    // Set up event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('user_room_joined', handleRoomJoined);
    socket.on('send_message', handleSendMessage);
    socket.on('notification', handleNotification);
    socket.on('system_announcement', handleSystemAnnouncement);

    // If already connected, join room immediately
    if (socket.connected) {
      handleConnect();
    }

    // Cleanup
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('user_room_joined', handleRoomJoined);
      socket.off('send_message', handleSendMessage);
      socket.off('notification', handleNotification);
      socket.off('system_announcement', handleSystemAnnouncement);
    };
  }, [userId]);

  const markAsRead = (notificationId: string | number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    isConnected,
    roomJoined,
    markAsRead,
    clearAll
  };
};