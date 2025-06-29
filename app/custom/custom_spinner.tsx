import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Custom_Spinner() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Animated queue dots */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-main rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="absolute left-2/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-main rounded-full animate-bounce"></div>
        {/* Spinning border */}
        <div className="absolute inset-0 rounded-full border-4 border-main border-t-yellow-400 animate-spin"></div>
        {/* Center icon */}
        <svg className="w-8 h-8 text-main z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m0-5V3m-8 9v6a2 2 0 002 2h4a2 2 0 002-2v-6" />
        </svg>
      </div>
      <span className="mt-4 text-main font-bold text-lg animate-pulse"> {t('common.loading')}</span>
    </div>
  );
}
