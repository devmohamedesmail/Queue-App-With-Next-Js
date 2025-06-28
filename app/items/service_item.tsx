'use client'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { MdMiscellaneousServices } from 'react-icons/md';
import { FaChevronRight } from 'react-icons/fa';

export default function Service_Item({ service, index }: any) {
    const { t, i18n } = useTranslation();
    return (
        <div className="relative bg-white border border-gray-200 shadow-lg rounded-2xl p-6 flex flex-col items-center group transition-transform hover:scale-105 hover:shadow-xl duration-300 overflow-hidden">
            {/* Service Icon and Number */}
            <div className="flex items-center gap-3 mb-4">
                <span className="bg-main text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow">
                    <MdMiscellaneousServices />
                </span>
                <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
            </div>
            {/* Service Name & Description */}
            <div className="flex flex-col items-center w-full mb-4">
                <span className="text-xl font-bold mb-1 text-center truncate w-full text-main group-hover:text-main/80 transition-colors">
                    {i18n.language === 'ar' ? service.nameAr : service.nameEn}
                </span>
                {(service.descriptionEn || service.descriptionAr) && (
                    <span className="text-sm text-center w-full mb-2 text-gray-600">
                        {i18n.language === 'ar' ? service.descriptionAr : service.descriptionEn}
                    </span>
                )}
            </div>
            {/* Call to Action */}
            <div className="flex justify-center items-center w-full mt-4">
                <Link
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-main text-white font-semibold w-full text-center shadow hover:bg-main/90 border-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
                    href={{
                        pathname: '/user/waiting',
                        query: { placeId: service.placeId, serviceId: service._id }
                    }}
                >
                    {t('select-this-service', 'Select this service')}
                    <FaChevronRight />
                </Link>
            </div>
        </div>
    )
}
