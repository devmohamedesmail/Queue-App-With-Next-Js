'use client'
import React from 'react'
import { useTranslation } from 'react-i18next';

function Language_Switcher() {
    const { t, i18n } = useTranslation()

    const handle_toggle_lang = () => {
        const newLocale = localStorage.getItem('i18nextLng') === 'en' ? 'ar' : 'en';
        localStorage.setItem('i18nextLng', newLocale);
        window.location.reload();
    }

    return (
        <div className="flex-none mx-2">
            <button
                onClick={handle_toggle_lang}
                className="relative flex items-center gap-3 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl group"
                aria-label={`Switch to ${i18n.language === 'en' ? 'Arabic' : 'English'}`}
            >
                {/* Language Toggle Container */}
                <div className="flex items-center gap-2">
                    {/* Current Language Flag and Text */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg">
                            {i18n.language === 'en' ? '🇺🇸' : '🇸🇦'}
                        </span>
                        <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                            {i18n.language === 'en' ? 'EN' : 'عر'}
                        </span>
                    </div>
                    
                    {/* Toggle Arrow */}
                    <div className="flex items-center">
                        <svg 
                            className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d={i18n.language === 'en' ? "M13 7l5 5m0 0l-5 5m5-5H6" : "M11 17l-5-5m0 0l5-5m-5 5h12"} 
                            />
                        </svg>
                    </div>
                    
                    {/* Next Language Preview */}
                    <div className="flex items-center gap-2 opacity-60 group-hover:opacity-80 transition-opacity duration-200">
                        <span className="text-sm">
                            {i18n.language === 'en' ? '🇸🇦' : '🇺🇸'}
                        </span>
                        <span className="font-medium text-xs text-gray-600 dark:text-gray-400">
                            {i18n.language === 'en' ? 'عر' : 'EN'}
                        </span>
                    </div>
                </div>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </button>
        </div>
    )
}

export default Language_Switcher