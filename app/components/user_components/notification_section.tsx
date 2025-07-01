import React, { useState, useRef, useEffect, useContext } from 'react';
import { FiBell } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import io from 'socket.io-client';
import { api } from '@/app/config/api';
import { AuthContext } from '@/app/context/auth_context';

export default function Notification_Section() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);
   const { auth } = useContext(AuthContext); // Assuming you have AuthContext to get user info
  // Fetch notifications from backend on mount
 useEffect(() => {
  async function fetchNotifications() {
    if (!auth?.user?._id) return;

    try {
      const res = await axios.get(`${api.baseUrl}api/v1/notifications/user/${auth?.user?._id}`);
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  }
  fetchNotifications();
}, [auth.userId])



useEffect(() => {
  const socket = io('http://localhost:3000', {
  transports: ['websocket'], // يجبر على استخدام WebSocket مباشرة بدل polling
});

  if (auth.user._id) {
    // ✅ لا تضف prefix `user_`
    socket.emit('join_room', `user_${auth.user._id}`);
  }

  socket.on('notification', (data) => {
    setNotifications((prev) => [
      { ...data, time: t('admin.notifications.now') || 'now', id: Date.now() },
      ...prev,
    ]);
  });

  return () => {
    if (auth.user._id) {
      socket.emit('leave_room', auth.user._id); // أو مع رابط الباكند
    }
    socket.disconnect();
  };
}, [auth.user._id, t]);







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
        className="p-2 rounded-full bg-white/70 hover:bg-white shadow-md transition flex items-center justify-center"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FiBell className="text-2xl text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-xs bg-white/80 backdrop-blur-lg shadow-xl rounded-xl z-50 overflow-hidden animate-fade-in border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-700 bg-white/60">
            {t('admin.notifications.title') || 'Notifications'}
          </div>
          <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <li className="py-8 flex flex-col items-center justify-center text-gray-400">
                <FiBell className="text-4xl mb-2" />
                <span>{t('admin.notifications.no-notifications') || 'No notifications'}</span>
              </li>
            ) : (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition flex flex-col gap-1"
                >
                  <span className="text-sm text-gray-800">{n.title || n.message}</span>
                  <span className="text-xs text-gray-400">{n.time || ''}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
