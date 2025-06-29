"use client";
import { api } from "@/app/config/api";
import { AuthContext } from "@/app/context/auth_context";
import axios from "axios";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";
import { useTranslation } from 'react-i18next';
import Custom_Spinner from '@/app/custom/custom_spinner';
import { MdBarChart } from 'react-icons/md';

function Statistics_Page() {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);
  const [queues, setQueues] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch_queues_for_place = async (placeId: string) => {
    try {
      setLoading(true);
      const res = await axios.get(`${api.baseUrl}api/v1/fetch/queues/place/${placeId}`);
      setQueues(res.data.data);
    } catch (error) {
      setQueues([]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const placeId = auth?.user?.user?.placeId;
    if (placeId) {
      fetch_queues_for_place(placeId);
    }
  }, [auth]);

  // Daily chart data
  const dailyData = useMemo(() => {
    const counts: Record<string, number> = {};
    if (Array.isArray(queues)) {
      queues.forEach(queue => {
        const date = moment(queue.createdAt).format("YYYY-MM-DD");
        counts[date] = (counts[date] || 0) + 1;
      });
    }
    return Object.entries(counts).map(([date, count]) => ({
      name: date,
      queues: count
    }));
  }, [queues]);

  // Employee chart data
  const employeeData = useMemo(() => {
    const counts: Record<string, number> = {};
    if (Array.isArray(queues)) {
      queues.forEach(queue => {
        const employeeName = queue.employee?.name || t('unknown', 'Unknown');
        counts[employeeName] = (counts[employeeName] || 0) + 1;
      });
    }
    return Object.entries(counts).map(([name, count]) => ({
      name,
      queues: count
    }));
  }, [queues, t]);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex flex-col items-center mb-8">
        <div className="text-main text-5xl mb-2">
          <MdBarChart />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('subscriber.statistics.title')}</h1>
        <p className="text-gray-500 text-center max-w-xl mb-2">{t('subscriber.statistics.statistics-desc', 'Track your queue activity and employee performance below.')}</p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Custom_Spinner />
        </div>
      ) : (
        <>
          <div className="bg-white/90 rounded-2xl shadow-lg p-6 mb-10 border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-main">{t('daily-queues', 'Queues per Day')}</h2>
            {dailyData.length === 0 ? (
              <div className="text-center text-gray-400 py-10">{t('no-queue-data', 'No queue data available.')}</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="queues" fill="#862877" name={t('queues', 'Queues')} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-main">{t('employee-queues', 'Queues per Employee')}</h2>
            {employeeData.length === 0 ? (
              <div className="text-center text-gray-400 py-10">{t('no-employee-queue-data', 'No employee queue data available.')}</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={employeeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="queues" fill="#10b981" name={t('queues', 'Queues')} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Statistics_Page;