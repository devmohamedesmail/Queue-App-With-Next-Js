'use client'
import { api } from '@/app/config/api'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AuthContext } from '@/app/context/auth_context'
import Custom_Spinner from '@/app/custom/custom_spinner'
import { FiUsers, FiClock, FiHash, FiCheckCircle } from 'react-icons/fi';


export default function Waiting_Queues(props: any) {
  const searchParamsHook = typeof window !== 'undefined' ? useSearchParams() : null;
  const searchParams = React.useMemo(() => {
    if (searchParamsHook && typeof searchParamsHook.get === 'function') {
      return {
        placeId: searchParamsHook.get('placeId'),
        serviceId: searchParamsHook.get('serviceId'),
      };
    }
    return props.searchParams || {};
  }, [searchParamsHook, props.searchParams]);

  const { auth } = useContext(AuthContext)
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [waiting_list, setWaiting_list] = useState<any>(null)
  const { t } = useTranslation()

  
//  console.log("Auth", auth?.user?.user._id)
console.log(auth.user._id)


  const handle_book_now = async () => {

    try {
      if (auth) {
        try {
          setLoading(true)
          const res = await axios.post(`${api.baseUrl}api/v1/queues/book/new/queue/${auth.user._id}/${searchParams.placeId}/${searchParams.serviceId}`)
          
          if (res.status === 201) {
            setLoading(false)
            toast.success(t('user.queue-booked-success'))
            router.push('/user/queues')

          }
          setLoading(false)
        } catch (error) {
          toast.error(t('common.error-occurred'))
          setLoading(false)
          console.log("Error booking queue", error)
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






  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white/90 shadow-2xl rounded-3xl p-8 border border-gray-100 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold mb-2 text-main drop-shadow-sm">
              {t('user.waiting-list')}
            </h1>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 bg-gradient-to-tr from-blue-200 to-blue-50 shadow">
              <FiUsers className="text-3xl text-main" />
              <span className="text-3xl font-bold ml-2 text-main">
                {waiting_list && waiting_list.waitingQueues && waiting_list.waitingQueues.length > 0 ? waiting_list.waitingQueues.length : '0'}
              </span>
            </div>
            <p className="text-gray-500 text-base font-medium">
              {waiting_list && waiting_list.waitingQueues && waiting_list.waitingQueues.length > 0 ? t('user.people-ahead') : t('user.no-waiting')}
            </p>
          </div>

          {/* Estimated Time */}
          <div className="bg-main/5 rounded-xl p-6 mb-6 flex items-center gap-4 shadow-sm">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
              <FiClock className="text-xl text-main" />
            </span>
            <div className="flex-1">
              <span className="block text-gray-700 font-semibold">{t('user.estimated-time')}</span>
              <span className="block text-main text-lg font-bold">{waiting_list?.estimatedTimeStr || '-'}</span>
            </div>
          </div>

          {/* Last Queue Number */}
          <div className="bg-main/5 rounded-xl p-6 mb-8 flex items-center gap-4 shadow-sm">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
              <FiHash className="text-xl text-main" />
            </span>
            <div className="flex-1">
              <span className="block text-gray-700 font-semibold">{t('user.last-queue-number')}</span>
              <span className="block text-blue-700 text-lg font-bold">{waiting_list?.lastWaitingQueue || '-'}</span>
            </div>
          </div>

          {/* Book Button */}
          <div className="text-center">
            {loading ? (
              <div className="flex justify-center py-4">
                <Custom_Spinner />
              </div>
            ) : (
              <button
                onClick={handle_book_now}
                className="w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 bg-gradient-to-tr from-main to-main/90"
                style={{ color: 'white', border: 'none' }}
              >
                <FiCheckCircle className="text-2xl" />
                {t('user.book-queue')}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
