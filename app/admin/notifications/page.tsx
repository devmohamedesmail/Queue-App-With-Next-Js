'use client';
import React, { useState, useEffect } from 'react';
import Custom_Page_Title from '@/app/custom/custom_page_title';
import Custom_Input from '@/app/custom/custom_input';
import Custom_Button from '@/app/custom/custom_button';
import axios from 'axios';
import { api } from '@/app/config/api';
import { useTranslation } from 'react-i18next';
import Custom_Spinner from '@/app/custom/custom_spinner';
import Select from 'react-select';
import { toast } from 'react-toastify';

export default function Notifications() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch users for specific notification
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api.baseUrl}api/v1/users`);
        setUsers(res.data.users || []);
      } catch (err) {
        setError(t('common.fetch-error'));
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [t]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const payload = {
        title,
        message,
        userId: selectedUser === 'all' ? null : selectedUser,
      };
      console.log('Sending notification:', payload);
      await axios.post(`${api.baseUrl}api/v1/notifications/send/user`, payload);
      setSuccess(t('notification-sent'));
      setTitle('');
      setMessage('');
      setSelectedUser('all');
      toast.success(t('common.notification-sent'));
    } catch (err) {
      setError(t('common.error-occurred'));
    } finally {
      setLoading(false);
    }
  };

  const userOptions = [
    { value: 'all', label: t('admin.notifications.all-users') || 'All Users' },
    ...users.map((user: any) => ({ value: user._id, label: `${user.name} (${user.email})` })),
  ];

  return (
    <div className=" mx-auto p-6">
      <Custom_Page_Title title={t('admin.notifications.title') || 'Send Notification'} />
      <form onSubmit={handleSend} className="bg-base-100 rounded-xl shadow p-6 space-y-5 mt-6">
        <div>
          <label className="block font-semibold mb-2">{t('admin.notifications.recipient') || 'Recipient'}</label>
          <Select
            options={userOptions}
            value={userOptions.find(opt => opt.value === selectedUser)}
            onChange={opt => setSelectedUser(opt ? (opt as any).value : 'all')}
            isSearchable
            classNamePrefix="react-select"
            className="w-full"
          />
        </div>
        <Custom_Input
          label={t('admin.notifications.title') || 'Title'}
          value={title}
          onChange={e => setTitle(e.target.value)}
          name="title"
          placeholder={t('admin.notifications.title') || 'Enter notification title...'}
        />
        <Custom_Input
          label={t('admin.notifications.message') || 'Message'}
          value={message}
          onChange={e => setMessage(e.target.value)}
          name="message"
          placeholder={t('admin.notifications.message') || 'Type your notification...'}
        />
        <div className="flex justify-end">
          {loading ? <Custom_Spinner /> : <Custom_Button title={t('admin.notifications.send') || 'Send'} type="submit" />}
        </div>
        {success && <div className="text-success font-medium text-center">{success}</div>}
        {error && <div className="text-error font-medium text-center">{error}</div>}
      </form>
    </div>
  );
}
