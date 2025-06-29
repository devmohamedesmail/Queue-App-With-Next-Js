import React from 'react'
import { useTranslation } from 'react-i18next'
export default function Dashboard_Card({ icon, title, value, color, link }: { icon: React.ReactNode, title: string, value: string | number, color: string, link?: string }) {
    const { t } = useTranslation()
    return (
        <div

            className={`rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center border border-gray-100 hover:scale-[1.03] transition-all duration-200 ${color}`}
        >
            <div className="mb-3 text-white drop-shadow-lg">{icon}</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
            <div className="text-lg font-semibold text-gray-700 mb-2">{title}</div>
            {link && (
                <a href={link} className="text-main underline text-sm hover:text-main/80 transition-all">{t('view-details', 'View Details')}</a>
            )}
        </div>
    )
}
