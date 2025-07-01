'use client';
import React, { useContext } from 'react'
import { api } from '../config/api'
import Link from 'next/link'
import { FaLocationArrow } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { BsQrCode } from "react-icons/bs";

export default function Place_Item({ place }: { place: any }) {




  const { t } = useTranslation();
  return (
    <div className="rounded-xl bg-white shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          src={place?.image }
          alt={place?.nameEn || 'Place'}
        />
        <Link href={`/user/${place?._id || ''}`} className="absolute top-2 right-2 bg-black rounded-full p-2">
          <BsQrCode color="white" size={22} />
        </Link>
      </div>
      <div className="flex flex-col items-center p-5">
        <h2 className="text-sm md:text-lg font-semibold text-gray-800 text-center mb-2 text-sm h-18">{place?.nameEn || t('no-name')}</h2>
        <p className="text-gray-500 text-sm text-center mb-4 text-xs h-18">{place?.addressEn || t('no-address')}</p>
        <div className="flex w-full gap-2">
          <Link
            className="flex-1 text-xs flex items-center justify-center gap-2 py-2 rounded-lg bg-main text-white font-semibold shadow hover:from-blue-600 hover:to-indigo-700 transition"
            href={`/user/services/${place?._id || ''}`}
          >
            {t('common.view-services')}
          </Link>
          <Link
            className="flex items-center justify-center w-12 h-12 rounded-lg bg-second shadow hover:from-green-600 hover:to-emerald-700 transition"
            href={place?.locationlink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            title={t('location')}
          >
            <FaLocationArrow color="white" size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
