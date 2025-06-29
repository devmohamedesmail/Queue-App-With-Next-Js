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
                <div className="tooltip tooltip-bottom" data-tip={t('change-language') || 'Change Language'}>
                    <button
                        onClick={handle_toggle_lang}
                        className="btn btn-dark bg-main text-white flex items-center gap-2 px-4 py-2 rounded-full border border-base-200 hover:bg-second transition-colors min-w-[90px] justify-center"
                    >

                        <span className="font-semibold text-base text-xs capitalize">
                            {i18n.language === 'en' ? 'English' : 'العربية'}
                        </span>
                    </button>
                </div>
            </div>
    )
}

export default Language_Switcher