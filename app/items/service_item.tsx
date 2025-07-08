'use client'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { MdMiscellaneousServices, MdAccessTime, MdPeople, MdStar } from 'react-icons/md';
import { FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function Service_Item({ service, index }: any) {
    const { t, i18n } = useTranslation();
    
    // Mock data for demonstration - in real app, this would come from the service object
    const estimatedTime = service.estimatedTime || '15-20 min';
    const currentQueue = service.currentQueue || Math.floor(Math.random() * 15) + 1;
    const rating = service.rating || (4.2 + Math.random() * 0.8);
    const isPopular = index < 2; // Mark first 2 services as popular
    
    return (
        <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-3xl p-6 flex flex-col group transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:bg-white/90 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
            
            {/* Popular Badge */}
            {isPopular && (
                <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <HiSparkles className="w-3 h-3" />
                        {t('common.popular', 'Popular')}
                    </div>
                </div>
            )}
            
            {/* Service Number Badge */}
            <div className="absolute top-4 left-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg z-10">
                {index + 1}
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
                {/* Service Icon */}
                <div className="flex justify-center mb-6 mt-4">
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl w-16 h-16 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
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
                    
                    {/* Service Stats */}
                    <div className="grid grid-cols-3 gap-3 w-full mb-4">
                        {/* Queue Status */}
                        <div className="bg-gray-50 rounded-xl p-3 text-center group-hover:bg-gray-100 transition-all duration-300">
                            <MdPeople className="text-blue-600 text-lg mx-auto mb-1" />
                            <div className="text-xs font-semibold text-gray-800">{currentQueue}</div>
                            <div className="text-xs text-gray-500">{t('common.in-queue', 'in queue')}</div>
                        </div>
                        
                        {/* Estimated Time */}
                        <div className="bg-gray-50 rounded-xl p-3 text-center group-hover:bg-gray-100 transition-all duration-300">
                            <MdAccessTime className="text-purple-600 text-lg mx-auto mb-1" />
                            <div className="text-xs font-semibold text-gray-800">{estimatedTime}</div>
                            <div className="text-xs text-gray-500">{t('common.wait-time', 'wait time')}</div>
                        </div>
                        
                        {/* Rating */}
                        <div className="bg-gray-50 rounded-xl p-3 text-center group-hover:bg-gray-100 transition-all duration-300">
                            <MdStar className="text-yellow-500 text-lg mx-auto mb-1" />
                            <div className="text-xs font-semibold text-gray-800">{rating.toFixed(1)}</div>
                            <div className="text-xs text-gray-500">{t('common.rating', 'rating')}</div>
                        </div>
                    </div>
                </div>
                
                {/* Call to Action */}
                <div className="mt-auto">
                    <Link
                        className="group/btn relative flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold w-full text-center shadow-lg hover:shadow-xl border-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden"
                        href={{
                            pathname: '/user/waiting',
                            query: { placeId: service.placeId, serviceId: service._id }
                        }}
                    >
                        {/* Button Background Animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-all duration-300"></div>
                        
                        <span className="relative z-10 flex items-center gap-2">
                            {t('user.select-this-service', 'Select this service')}
                            <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </span>
                        
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out"></div>
                    </Link>
                </div>
            </div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute top-8 right-8 w-2 h-2 bg-blue-400 rounded-full group-hover:scale-150 group-hover:bg-blue-600 transition-all duration-500"></div>
            <div className="absolute bottom-12 left-8 w-1 h-1 bg-purple-400 rounded-full group-hover:scale-200 group-hover:bg-purple-600 transition-all duration-700"></div>
        </div>
    )
}
