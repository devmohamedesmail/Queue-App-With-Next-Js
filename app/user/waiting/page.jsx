'use client'


import { api } from '@/app/config/api'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AuthContext } from '@/app/context/auth_context'
import { PlaceContext } from '@/app/context/place_context'

export default function page({ searchParams }) {
  const { auth } = useContext(AuthContext)
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [waiting_list, setWaiting_list] = useState(null)
  const { t } = useTranslation()
  const [place, setPlace] = useState(null)
  const { places } = useContext(PlaceContext)
  const [estimatedTime, setEstimatedTime] = useState(0)
  const totalEstimatedTime = estimatedTime * (waiting_list?.length || 0)
 





useEffect(() => {
  console.log("searchParams", searchParams)
  if (!searchParams?.placeId || !searchParams?.serviceId) {
    alert("الرابط غير مكتمل، لا يوجد placeId أو serviceId")
  }
}, [searchParams])




  const handle_book_now = async () => {

    try {
      if (auth) {
        try {
          setLoading(true)
          const res = await axios.post(`${api.baseUrl}api/v1/queues/book/new/queue/${auth.user.user._id}/${searchParams.placeId}/${searchParams.serviceId}`)
          console.log("res", res)
          if (res.status === 201) {
            setLoading(false)
            toast.success(t('queue-booked-success'))
            router.push('/pages/user/queues')

          }
          setLoading(false)
        } catch (error) {
          console.log(error)
          setLoading(false)
        } finally {
          setLoading(false)
        }

      } else {
        router.push('/auth/login')
      }
    } catch (error) {
      console.log(error)
    }

  }



  const fetch_waiting_queues = async () => {
    try {
      const response = await axios.get(`${api.baseUrl}api/v1/queues/all/queue/${searchParams.placeId}/${searchParams.serviceId}`)
      setWaiting_list(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetch_waiting_queues()
  }, [])




  useEffect(() => {
    if (places && searchParams?.placeId) {
      const matchedPlace = places.find(p => p._id === searchParams.placeId)
      setPlace(matchedPlace)

      if (matchedPlace) {
        // تحقق إذا كان المكان يحتوي على خدمات
        if (matchedPlace.services && matchedPlace.services.length > 0 && searchParams?.serviceId) {
          const matchedService = matchedPlace.services.find(s => s._id === searchParams.serviceId)
          if (matchedService && matchedService.estimateTime) {
            setEstimatedTime(matchedService.estimateTime)
          } else {
            // احتياطي: استخدم وقت المكان
            setEstimatedTime(matchedPlace.estimateTime || 0)
          }
        } else {
          // لا يوجد خدمات: استخدم وقت المكان
          setEstimatedTime(matchedPlace.estimateTime || 0)
        }
      }
    }
  }, [places, searchParams.placeId, searchParams.serviceId])



  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold mb-4" style={{ color: 'var(--color-main)' }}>
              {t('waiting-list')}
            </h1>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'var(--color-second)' }}>
              <span className="text-2xl font-bold" style={{ color: 'var(--color-main)' }}>
                {waiting_list && waiting_list.length > 0 ? waiting_list.length : '0'}
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              {waiting_list && waiting_list.length > 0 ? t('people-ahead', 'people ahead of you') : t('no-waiting')}
            </p>
          </div>

          {/* Estimated Time */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">{t('estimated-time')}</span>
              <div className="text-right">
                {totalEstimatedTime > 0 ? (
                  <div>
                    <span className="text-2xl font-bold" style={{ color: 'var(--color-main)' }}>
                      {totalEstimatedTime}
                    </span>
                    <span className="text-gray-600 ml-1">{t('minutes')}</span>
                  </div>
                ) : (
                  <span className="text-gray-600">{t('no-waiting-time')}</span>
                )}
              </div>
            </div>
          </div>

          {/* Book Button */}
          <div className="text-center">
            {loading ? (
              <div className="flex justify-center py-4">
                <Custom_spinner />
              </div>
            ) : (
              <button 
                onClick={() => handle_book_now()} 
                className="w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--color-main)', 
                  color: 'white',
                  border: 'none'
                }}
              >
                {t('book-queue')}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
