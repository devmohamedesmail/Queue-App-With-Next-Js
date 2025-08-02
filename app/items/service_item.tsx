'use client'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { MdMiscellaneousServices } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa';


export default function Service_Item({ service, index }: any) {
    const { t, i18n } = useTranslation();
  
    
    return (
        <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-3xl p-6 flex flex-col group transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:bg-white/90 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
            
            
            {/* Service Number Badge */}
            <div className="absolute top-4 left-4 bg-gradient-to-br from-main to-main/80 text-white rounded-xl w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg z-10">
                {index + 1}
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
                {/* Service Icon */}
                <div className="flex justify-center mb-6 mt-4">
                    <div className="relative">
                        <div className="bg-gradient-to-br from-main to-main/70 rounded-2xl w-16 h-16 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                            <MdMiscellaneousServices className="text-white text-3xl" /> 
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition-all duration-300 blur-sm"></div>
                    </div>
                </div>
                
                {/* Service Info */}
                <div className="flex flex-col items-center text-center mb-6 flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {i18n.language === 'ar' ? service.nameAr : service.nameEn}
                    </h3>
                    
                    {(service.descriptionEn || service.descriptionAr) && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                            {i18n.language === 'ar' ? service.descriptionAr : service.descriptionEn}
                        </p>
                    )}
                </div>
                
                {/* Call to Action */}
                <div className="mt-auto">
                    <Link
                        className="group/btn relative flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-main to-main/80 text-white font-bold w-full text-center shadow-lg hover:shadow-xl border-none transition-all duration-300  overflow-hidden"
                        href={{
                            pathname: '/user/waiting',
                            query: { placeId: service.placeId, serviceId: service._id }
                        }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {t('user.select-this-service', 'Select this service')}
                            <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
