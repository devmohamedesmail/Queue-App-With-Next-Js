'use client'

import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { MdPlace, MdPeople, MdQueue, MdOutlineBarChart, MdOutlineSupervisorAccount } from "react-icons/md";
import Custom_Page_Title from '../custom/custom_page_title';
import Dashboard_Card from '../components/admin_components/dashboard_card';
import { PlaceContext } from '../context/place_context';
function Dashboard() {
  const { t } = useTranslation();
  const {places}=useContext(PlaceContext)
  // Example static data (replace with dynamic later)
  const stats = [
    {
      title: t('places', 'Places'),
      value: 12,
      icon: <MdPlace size={32} />,
      color: 'bg-gradient-to-tr from-main/80 to-main/40',
    },
    {
      title: t('users', 'Users'),
      value: 150,
      icon: <MdPeople size={32} />,
      color: 'bg-gradient-to-tr from-green-400/80 to-green-200/40',
    },
    {
      title: t('queues', 'Queues'),
      value: 87,
      icon: <MdQueue size={32} />,
      color: 'bg-gradient-to-tr from-yellow-400/80 to-yellow-200/40',
    },
    {
      title: t('admins', 'Admins'),
      value: 3,
      icon: <MdOutlineSupervisorAccount size={32} />,
      color: 'bg-gradient-to-tr from-blue-400/80 to-blue-200/40',
    },
    {
      title: t('statistics', 'Statistics'),
      value: 'View',
      icon: <MdOutlineBarChart size={32} />,
      color: 'bg-gradient-to-tr from-purple-400/80 to-purple-200/40',
      link: '/admin/statistics',
    },
  ];

  return (
    <div className="min-h-screen  to-white py-10 px-4">
      <Custom_Page_Title title={t('dashboard', 'Dashboard')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">




        <Dashboard_Card
          title={t('admin.sidebar.places')}
          value={places?.length || 0}
          icon={<MdPlace size={32} />}
          color='bg-gradient-to-tr from-purple-400/80 to-purple-200/40'
          link='/admin/places'

        />











        {stats.map((stat, idx) => (
          <div
            key={stat.title}
            className={`rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center border border-gray-100 hover:scale-[1.03] transition-all duration-200 ${stat.color}`}
          >
            <div className="mb-3 text-white drop-shadow-lg">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-lg font-semibold text-gray-700 mb-2">{stat.title}</div>
            {stat.link && (
              <a href={stat.link} className="text-main underline text-sm hover:text-main/80 transition-all">{t('view-details', 'View Details')}</a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard