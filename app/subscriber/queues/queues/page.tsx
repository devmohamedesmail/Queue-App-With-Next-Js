'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { api } from '@/app/config/api';
import axios from 'axios';
import { FaPlay } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { AuthContext } from '@/app/context/auth_context';
import Custom_Spinner from '@/app/custom/custom_spinner';
import No_Queues from '@/app/components/subscriber_components/no_queues';

function Place_Queues({ searchParams }:any) {
  const { t } = useTranslation();
  const [waitingList, setWaitingList] = useState<any[] | null>(null)
  const { auth } = useContext(AuthContext)

  const fetch_all_waiting_list = async () => {
    try {
      const response = await axios.get(`${api.baseUrl}api/v1/queues/all/queue/${searchParams.placeId}/${searchParams.serviceId}`)
      console.log(response.data)
      setWaitingList(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetch_all_waiting_list()
  }, [])


  const handle_active_queue = async (item:any) => {


    try {
      const res = await axios.get(`${api.baseUrl}api/v1/queues/active/queue/${item._id}/${auth.user.user._id}`);

      if (res.status === 200) {
        const audio = new Audio('/assets/sound.mp3')
        audio.play()
        fetch_all_waiting_list()
      }

    } catch (error) {
      console.log(error)
    }





  }




  return (
    <div className="my-10">
      <h4 className="text-center font-bold text-xl">{t('subscriber.queues.waiting-list')}</h4>

      <div>
        {waitingList === null ? (
          <div className="grid grid-cols-1">
            <Custom_Spinner />
          </div>
        ) : waitingList.length === 0 ? (
         
          <No_Queues />
        ) : (
          waitingList.map((item:any, index:number) => (
            <div key={index} className="bg-white shadow p-4 rounded mb-3 flex justify-between items-center">
              <div className="flex flex-col items-center">
                <h5 className="font-bold"> Queue # - {item.queue}</h5>
                <p className={`${item.status === 'waiting' ? 'text-green-600' : 'text-red-600'}`}>{t('status')}: {item.status}</p>
              </div>
              <div className="flex items-center">
                <button onClick={() => handle_active_queue(item)} className='btn btn-gost bg-green-600'><FaPlay color='white' /></button>
                <button className='btn btn-gost bg-red-600'><TiCancel color="white" /></button>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default Place_Queues