import React, { useState, useRef, useEffect, useContext } from 'react';
import { FiBell } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import io from 'socket.io-client';
import { api } from '@/app/config/api';
import { AuthContext } from '@/app/context/auth_context';
import Notication_Item from '@/app/items/notication_item';


export default function Notification_Section() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const { auth } = useContext(AuthContext);

  // Prevent errors if auth or auth.user is null
  const userId = auth?.user?._id;
  const SOCKET_URL = "http://localhost:3000";
  // Fetch notifications from backend on mount
  useEffect(() => {
    async function fetchNotifications() {
      if (!userId) return;
      try {
        const res = await axios.get(`${api.baseUrl}api/v1/notifications/user/${userId}`);
        setNotifications(res.data.notifications || []);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    }
    fetchNotifications();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    
    console.log('Connecting to socket for user:', userId);
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      forceNew: true,
    });

    socket.on('connect', () => {
      console.log('Socket connected successfully');
      socket.emit('join_room', `user_${userId}`);
      console.log('Joined room:', `user_${userId}`);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Listen for queue activation and other status changes from active_queue_by_employee
    socket.on('queue_status_change', (data) => {
      console.log('Queue status change received:', data);
      // Only notify if this is for the current user and status is active
      if (data.status === 'active') {
        console.log('Adding queue activation notification');
        setNotifications((prev) => [
          {
            ...data,
            title: t('user.queue-activated-title') || 'Queue Activated!',
            body: data.message || t('user.queue-activated-body') || 'Your turn! Please proceed to the service counter',
            time: t('admin.notifications.now') || 'now',
            id: Date.now(),
            _id: Date.now(), // Add _id for the key
            type: 'queue_activation',
            employee: data.employee,
          },
          ...prev,
        ]);
        
        // Optional: Play notification sound
        try {
          const audio = new Audio('/assets/notification.mp3');
          audio.play().catch(e => console.log('Audio play failed:', e));
        } catch (e) {
          console.log('Audio not available');
        }
      }
      // Handle other queue statuses if needed
      else if (data.status === 'cancelled') {
        console.log('Adding queue cancellation notification');
        setNotifications((prev) => [
          {
            ...data,
            title: t('user.queue-cancelled-title') || 'Queue Cancelled',
            body: data.message || t('user.queue-cancelled-body') || 'Your queue has been cancelled',
            time: t('admin.notifications.now') || 'now',
            id: Date.now(),
            _id: Date.now(), // Add _id for the key
            type: 'queue_cancellation',
          },
          ...prev,
        ]);
      }
    });

    // Listen for queue position updates
    socket.on('queue_update', (data) => {
      console.log('Queue update received:', data);
      if (data.type === 'position_update') {
        console.log('Adding position update notification');
        setNotifications((prev) => [
          {
            title: t('user.queue-position-updated') || 'Queue Position Updated',
            body: data.message || t('user.queue-position-updated-body') || 'Queue positions have been updated',
            time: t('admin.notifications.now') || 'now',
            id: Date.now(),
            _id: Date.now(), // Add _id for the key
            type: 'position_update',
          },
          ...prev,
        ]);
      }
    });

    // Listen for generic notifications if your backend emits them
    socket.on('notification', (data) => {
      console.log('Generic notification received:', data);
      setNotifications((prev) => [
        { ...data, time: t('admin.notifications.now') || 'now', id: Date.now(), _id: data._id || Date.now() },
        ...prev,
      ]);
    });

    // Test connection - remove this after debugging
    socket.on('test', (data) => {
      console.log('Test event received:', data);
    });

    return () => {
      console.log('Cleaning up socket connection');
      socket.emit('leave_room', `user_${userId}`);
      socket.disconnect();
    };
  }, [userId, t]);





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

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Notifications"
        className="p-2 rounded-full mx-3 bg-white/70 hover:bg-white shadow-md transition flex items-center justify-center"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FiBell className="text-xl text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-xs bg-white/80 backdrop-blur-lg shadow-xl rounded-xl z-50 overflow-hidden animate-fade-in border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-700 bg-white/60 flex justify-between items-center">
            <span>{t('user.notification')}</span>
            {/* Debug info - remove after testing */}
            <span className="text-xs bg-blue-100 px-2 py-1 rounded">
              User: {userId ? userId.slice(-4) : 'None'}
            </span>
          </div>
          <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <li className="py-8 flex flex-col items-center justify-center text-gray-400">
                <FiBell className="text-4xl mb-2" />
                <span>{t('user.no-notifications')}</span>
                {/* Debug info - remove after testing */}
                <div className="text-xs mt-2 text-center">
                  <p>Socket URL: {SOCKET_URL}</p>
                  <p>Room: user_{userId ? userId.slice(-4) : 'None'}</p>
                </div>
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
