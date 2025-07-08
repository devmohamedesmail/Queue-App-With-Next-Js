'use client'
import { api } from '@/app/config/api'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AuthContext } from '@/app/context/auth_context'
import Custom_Spinner from '@/app/custom/custom_spinner'
import { FiUsers, FiClock, FiHash, FiCheckCircle, FiArrowLeft, FiMapPin } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import { MdQueryBuilder, MdPeople, MdLocationOn } from 'react-icons/md';


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

  



  const handle_book_now = async () => {

    try {
      if (auth) {
        try {
          setLoading(true)
          const res = await axios.post(`${api.baseUrl}api/v1/queues/book/new/queue/${auth?.user?._id}/${searchParams.placeId}/${searchParams.serviceId}`)
          
          if (res.status === 201) {
            setLoading(false)
            toast.success(t('user.queue-booked-success'))
            router.push('/user/queues')

          }
          setLoading(false)
        } catch (error) {
          toast.error(t('common.error-occurred'))
          setLoading(false)
         
        } finally {
          setLoading(false)
        }

      } else {
        router.push('/auth/login')
      }
    } catch (error) {
      toast.error(t('common.error-occurred'))
    }

  }




   const fetch_waiting_queues = async () => {
    try {
      const response = await axios.get(`${api.baseUrl}api/v1/queues/all/queue/${searchParams.placeId}/${searchParams.serviceId}`)
      setWaiting_list(response.data)
    } catch (error) {
      toast.error(t('common.error-occurred'))
    }
  }

  useEffect(() => {
    fetch_waiting_queues()
  }, [])






  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 group"
          >
            <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">{t('common.back', 'Back')}</span>
          </button>

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <HiSparkles className="w-4 h-4" />
              </div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-white/30 rounded-full"></div>
              
              <div className="text-center relative z-10">
                <h1 className="text-3xl font-bold mb-2">
                  {t('user.waiting-list')}
                </h1>
                <p className="text-blue-100 text-sm font-medium">
                  {t('user.services.queue-info', 'Join the queue and track your position in real-time')}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Queue Status */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl opacity-0 hover:opacity-100 transition-all duration-300 blur-sm"></div>
                    <div className="relative z-10 text-center">
                      <MdPeople className="text-3xl text-white mb-1" />
                      <span className="text-2xl font-bold text-white">
                        {waiting_list && waiting_list.waitingQueues && waiting_list.waitingQueues.length > 0 
                          ? waiting_list.waitingQueues.length 
                          : '0'
                        }
                      </span>
                    </div>
                  </div>
                  {/* Floating indicator */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {waiting_list && waiting_list.waitingQueues && waiting_list.waitingQueues.length > 0 
                    ? t('user.people-ahead') 
                    : t('user.no-waiting')
                  }
                </h2>
                <p className="text-gray-500 text-sm">
                  {waiting_list && waiting_list.waitingQueues && waiting_list.waitingQueues.length > 0 
                    ? 'You\'ll be notified when it\'s your turn'
                    : 'Perfect timing! No wait required'
                  }
                </p>
              </div>

              {/* Stats Cards */}
              <div className="space-y-4 mb-8">
                {/* Estimated Time Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100/50 group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MdQueryBuilder className="text-2xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1">{t('user.estimated-time')}</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {waiting_list?.estimatedTimeStr || 'Calculating...'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Average wait time</p>
                    </div>
                  </div>
                </div>

                {/* Queue Number Card */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100/50 group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FiHash className="text-2xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1">{t('user.last-queue-number')}</h3>
                      <p className="text-2xl font-bold text-purple-600">
                        #{waiting_list?.lastWaitingQueue || '---'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Currently serving</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                {loading ? (
                  <div className="w-full py-6 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Custom_Spinner />
                  </div>
                ) : (
                  <button
                    onClick={handle_book_now}
                    className="group relative w-full py-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden"
                  >
                    {/* Button background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    
                    {/* Button content */}
                    <div className="relative z-10 flex items-center gap-3">
                      <FiCheckCircle className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                      <span>{t('user.book-queue')}</span>
                    </div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out"></div>
                  </button>
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live queue updates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              You'll receive a notification when it's almost your turn
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
