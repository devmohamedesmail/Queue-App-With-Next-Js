'use client';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { FiBell } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import io, { Socket } from 'socket.io-client';
import { api } from '@/app/config/api';
import { AuthContext } from '@/app/context/auth_context';
import Notication_Item from '@/app/items/notication_item';
import { useNotifications } from '@/app/hooks/useNotifications';


function Notification_Section() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { auth } = useContext(AuthContext);
  const userId = auth?.user?._id;


  // const SOCKET_URL = "http://localhost:3000";
  const SOCKET_URL = api.baseUrl;

  // Fetch notifications from backend on mount
  useEffect(() => {
    async function fetchNotifications() {
      if (!userId) return;
      try {

        const res = await axios.get(`${api.baseUrl}api/v1/notifications/user/${userId}`);
        if (res.data && res.data.notifications) {
          setNotifications(res.data.notifications);
          console.log('Fetched notifications:', res.data.notifications);
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    }
    fetchNotifications();
  }, [userId]);



  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);



  // Socket connection effect
  useEffect(() => {
    if (!userId) return;

    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5
    });

    socket.on("connect", () => {
      
      setIsConnected(true);
      socket.emit("join_user_room", { userId });
    
    });

    socket.on("send_notification_user", (data) => {
      setNotifications((prev) => [data.notification, ...prev]);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);






  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Notifications"
        className="p-2 rounded-full mx-3 bg-white/70 hover:bg-white shadow-md transition flex items-center justify-center relative"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FiBell className="text-xl text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
        {/* Connection status indicator */}
        <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-xs bg-white/90 backdrop-blur-lg shadow-xl rounded-xl z-50 overflow-hidden animate-fade-in border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-700 bg-white/60 flex justify-between items-center">
            <span>{t('user.notification')}</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-xs text-gray-500">
                {isConnected ? 'Live' : 'Offline'}
              </span>
              {/* Test button for debugging */}

            </div>
          </div>
          <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <li className="py-8 flex flex-col items-center justify-center text-gray-400">
                <FiBell className="text-4xl mb-2" />
                <span className="text-center px-4">{t('user.no-notifications')}</span>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  User ID: {userId?.slice(-4)}
                </p>
                <p className="text-xs text-gray-400 text-center">
                  {isConnected ? 'Connected - waiting for notifications' : 'Connecting...'}
                </p>
              </li>
            ) : (
              notifications.map((n) => (
                <Notication_Item n={n} key={n._id || n.id} />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// Export as dynamic import to prevent SSR
import dynamic from 'next/dynamic';

const Notification_Section_Dynamic = dynamic(() => Promise.resolve(Notification_Section), {
  ssr: false,
  loading: () => null
});

export default Notification_Section_Dynamic;
