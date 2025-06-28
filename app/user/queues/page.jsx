'use client'
import Footer from '@/app/components/Footer'
import Mobile_Dock from '@/app/components/Mobile_Dock'
import Navbar from '@/app/components/Navbar'
import React, { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import axios from 'axios'
import { api } from '@/app/config/api'
import { AuthContext } from '@/app/context/AuthContext'
import Queue_skeleton from '@/app/components/skeletons/Queue_skeleton'

function page() {
    const { t, i18n } = useTranslation();
    const [queues, setQueues] = useState(null);
    const { auth } = useContext(AuthContext)




    const fetch_queues = async (userId) => {
        try {
            const response = await axios.get(`${api.baseUrl}api/v1/queues/user/queues/${userId}`)
            console.log(response.data)

            if (response.data.queues.length > 0) {
                setQueues(response.data.queues)
                
            } else {
                setQueues([])
            }
        } catch (error) {
            console.log("Error fetching queues",error)
        }
    }




    useEffect(() => {
        const userId = auth?.user?.user?._id;
        if (userId) {
            fetch_queues(userId);
        }
    }, [auth]);


    return (
        <div>
            <Navbar />

            <div className="container m-auto px-5 my-10">

                <h1 className='text-center my-10 font-bold text-xl'>{t('queues')}</h1>

                {queues && queues.length > 0 ? (
                    <div className='flex flex-col justify-center items-center my-10'>
                        <h3 className='font-bold text-md'>{t('your-queues')}</h3>
                        <h3>{queues.length}</h3>
                    </div>) : (

                    <>
                    </>)
                }


              




                {queues ? (
                    <>
                        {queues && queues.length > 0 ? (

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                                {queues.map((queue,index) => (
                                    <div key={index} className="bg-white shadow rounded-lg p-0 overflow-hidden">

                                        <div className="flex flex-col justify-center items-center bg-green-600 py-4">
                                            <h4 className='font-bold text-2xl text-white'>{t('ahead-of-you')}</h4>
                                            <h2 className="text-lg font-bold text-white">{queue.aheadOfYou > 0 ? queue.aheadOfYou : t('no-one')}</h2>
                                        </div>

                                        <div className="flex justify-between px-4 py-2">
                                            <div className='flex flex-col justify-center items-center'>
                                                <h4>{t('your-queue')}</h4>
                                                <h2 className="text-lg font-bold">{queue.queue.queue}</h2>
                                            </div>
                                            <div className='flex flex-col justify-center items-center'>
                                                <h4>{t('now-serving')}</h4>
                                                <h2 className="text-lg font-bold">{queue.nowServingQueue ? queue.nowServingQueue : '---'}</h2>
                                            </div>
                                        </div>
                                        <div className='flex flex-col  justify-center items-center p-2'>
                                            <h4>{t('estimated-time')}</h4>
                                            <h2 className="text-lg font-bold">{queue.estimatedTime}</h2>
                                        </div>
                                    </div>
                                ))}


                            </div>) : (
                                <div className="flex flex-col justify-center items-center">
                                    <img src="/images/queue.png" className="w-32" />
                                    <p className='text-center text-xl mt-5'>{t('no-queues-today')}</p>
                                </div>
                        )}
                    </>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <Queue_skeleton />
                        <Queue_skeleton />
                        <Queue_skeleton />
                        <Queue_skeleton />
                        <Queue_skeleton />
                        <Queue_skeleton />
                        <Queue_skeleton />
                        <Queue_skeleton />
                        <Queue_skeleton />
                        <Queue_skeleton />
                        <Queue_skeleton />
                    </div>)}








            </div>



            <Footer />
            <Mobile_Dock />
        </div>
    )
}

export default page