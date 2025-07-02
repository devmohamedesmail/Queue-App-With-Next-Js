'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'next/navigation'
import { api } from '@/app/config/api';
import axios from 'axios';
import { FaPlay } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { AuthContext } from '@/app/context/auth_context';
import Custom_Spinner from '@/app/custom/custom_spinner';
import No_Queues from '@/app/components/subscriber_components/no_queues';

function Place_Queues(props: any) {
  const { t } = useTranslation();
  const [waitingList, setWaitingList] = useState<any[] | null>(null);
  const [mounted, setMounted] = useState(false);
  const { auth } = useContext(AuthContext);
  
  // Properly handle searchParams to avoid hydration issues
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

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, [])


  const fetch_all_waiting_list = async () => {
    if (!searchParams.placeId || !searchParams.serviceId) return;
    
    try {
      const response = await axios.get(`${api.baseUrl}api/v1/queues/all/queue/${searchParams.placeId}/${searchParams.serviceId}`)
      console.log(response.data)
      // Handle different possible response structures
      if (Array.isArray(response.data)) {
        setWaitingList(response.data);
      } else if (response.data.waitingQueues && Array.isArray(response.data.waitingQueues)) {
        setWaitingList(response.data.waitingQueues);
      } else if (response.data.queues && Array.isArray(response.data.queues)) {
        setWaitingList(response.data.queues);
      } else {
        setWaitingList([]);
      }
    } catch (error) {
      console.log(error)
      setWaitingList([]);
    }
  }

  useEffect(() => {
    if (mounted && searchParams.placeId && searchParams.serviceId) {
      fetch_all_waiting_list()
    }
  }, [mounted, searchParams.placeId, searchParams.serviceId])


  const handle_active_queue = async (item:any) => {


    try {
      const res = await axios.get(`${api.baseUrl}api/v1/queues/active/queue/${item._id}/${auth?.user?._id}`);

      if (res.status === 200) {
        const audio = new Audio('/assets/sound.mp3')
        audio.play()
        fetch_all_waiting_list()
      }

    } catch (error) {
      console.log(error)
    }
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10">
        <div className="container mx-auto px-6">
          <h4 className="text-center font-extrabold text-3xl text-blue-700 mb-8 drop-shadow-sm">
            Loading...
          </h4>
          <div className="flex justify-center items-center min-h-[200px]">
            <Custom_Spinner />
          </div>
        </div>
      </div>
    );
  }




  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10">
      <div className="container mx-auto px-6">
        <h4 className="text-center font-extrabold text-3xl text-blue-700 mb-8 drop-shadow-sm">
          {t('subscriber.queues.waiting-list')}
        </h4>

        <div className="max-w-4xl mx-auto">
          {waitingList === null ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Custom_Spinner />
            </div>
          ) : waitingList.length === 0 ? (
            <No_Queues />
          ) : (
            <div className="grid gap-4">
              {waitingList.map((item:any, index:number) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-blue-100 flex justify-between items-center hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">#{item.queue}</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-lg text-gray-800">Queue #{item.queue}</h5>
                      <p className={`text-sm font-medium ${item.status === 'waiting' ? 'text-green-600' : 'text-red-600'}`}>
                        {t('common.status')}: {item.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handle_active_queue(item)} 
                      className="flex items-center justify-center w-12 h-12 bg-green-600 hover:bg-green-700 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
                      title={t('common.activate')}
                    >
                      <FaPlay className="text-white text-lg" />
                    </button>
                    <button 
                      className="flex items-center justify-center w-12 h-12 bg-red-600 hover:bg-red-700 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
                      title={t('common.cancel')}
                    >
                      <TiCancel className="text-white text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Place_Queues