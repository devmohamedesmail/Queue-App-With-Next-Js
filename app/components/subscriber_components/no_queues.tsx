import React from 'react'
import { MdOutlineHourglassEmpty } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

export default function No_Queues() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white/80 rounded-2xl shadow-md border border-gray-100">
      <div className="text-main mb-4 text-6xl">
        <MdOutlineHourglassEmpty />
      </div>
      <h2 className="text-xl font-bold mb-2 text-gray-700">{t('subscriber.queues.no-queues')}</h2>
      <p className="text-gray-500 text-center max-w-xs">
        {t('subscriber.queues.no-queues-desc')}
      </p>
    </div>
  )
}
