import React from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function Custom_Section_Title({ title = '' }: { title?: string }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';



  if (!title) return null;
  return (
    <div
      className={`flex items-center gap-2 mb-8 ${i18n.language === 'ar' ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-200 to-blue-50 shadow">
        {isRTL ? (
          <FiChevronLeft className="text-blue-600 text-2xl" />
        ) : (
          <FiChevronRight className="text-blue-600 text-2xl" />
        )}
      </span>
      <h2 className="text-md md:text-xl  text-gray-800 tracking-tight drop-shadow-sm">
        {title}
      </h2>
      <div className={`flex-1 border-b-2 border-blue-100 ${isRTL ? 'mr-4' : 'ml-4'}`} />
    </div>
  );
}
