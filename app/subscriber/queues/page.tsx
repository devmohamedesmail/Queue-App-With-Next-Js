'use client'
import { AuthContext } from '@/app/context/auth_context'
import { PlaceContext } from '@/app/context/place_context'
import Link from 'next/link'
import React, { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Custom_Spinner from '@/app/custom/custom_spinner'
import { CiViewTimeline } from "react-icons/ci";
import Custom_Page_Title from '@/app/custom/custom_page_title'

function Place_Services() {
  const [place, setPlace] = useState<any>(null)
  const { auth } = useContext(AuthContext)
  const { places } = useContext(PlaceContext)
  const { t, i18n } = useTranslation()

  useEffect(() => {

    if (auth?.user?.user?.placeId && places?.length) {
      const place = places.find((place) => place._id === auth.user.user.placeId);
      if (place) {
        setPlace(place);
      }
    }
  }, [auth, places])





  return (
    <div className='container mx-auto px-5 my-10'>
      <Custom_Page_Title title={t('common.services')} />

      <div className='my-10'>
        {place && place.services && place.services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {place.services.map((service: any, index: number) => (
              <Link
                href={{
                  pathname: '/subscriber/queues/queues',
                  query: { placeId: place._id, serviceId: service._id }
                }}
                key={index}
                className="group bg-white/90 border border-gray-200 hover:border-main hover:shadow-xl transition-all duration-200 flex flex-col items-center rounded-2xl p-6 mb-4 cursor-pointer relative overflow-hidden shadow-md"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-main/10 text-main mb-4 text-3xl group-hover:bg-main group-hover:text-white transition-all duration-200">
                  <CiViewTimeline />
                </div>
                <h2 className="text-xl font-bold mb-2 text-center group-hover:text-main transition-colors duration-200">
                  
                    { service.nameAr }
                </h2>
                <p className="text-gray-500 text-center mb-2 line-clamp-2">
                  { service.nameEn} 
                </p>
             
              </Link>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-64'>
            <Custom_Spinner />
          </div>
        )}
      </div>
    </div>
  )
}

export default Place_Services