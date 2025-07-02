'use client'

import React, { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import axios from 'axios'
import { api } from '@/app/config/api'
import { AuthContext } from '@/app/context/auth_context'
import Custom_Spinner from '@/app/custom/custom_spinner';
import { FiUsers, FiClock, FiHash } from 'react-icons/fi';
import { toast } from 'react-toastify';


function UserQueues() {
    const { t, i18n } = useTranslation();
    const [queues, setQueues] = useState<any[] | null>(null);
    const { auth } = useContext(AuthContext);

    const fetch_queues = async (userId: string) => {
        try {
            const response = await axios.get(`${api.baseUrl}api/v1/queues/user/queues/${userId}`);
            if (response.data.queues && response.data.queues.length > 0) {
                setQueues(response.data.queues);
            } else {
                setQueues([]);
            }
        } catch (error) {
            toast.error(t('common.error-occurred'));
            setQueues([]);
            
        }
    };

    useEffect(() => {
        const userId = auth?.user?._id;
        if (userId) {
            fetch_queues(userId);
        } else {
            setQueues([]);
        }
    }, [auth]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10">
            <div className="container m-auto px-5">
                <h1 className="text-center my-10 font-extrabold text-3xl text-main drop-shadow-sm">
                    {t('user.my-queues')}
                </h1>

                {queues && queues.length > 0 && (
                    <div className="flex flex-col justify-center items-center my-10">
                        <div className="flex items-center gap-3 mb-2">
                            <FiUsers className="text-2xl text-main" />
                            <h3 className="font-bold text-lg text-main">{t('user.your-queues')}</h3>
                        </div>
                        <h3 className="text-2xl font-bold text-main bg-blue-100 rounded-full px-6 py-2 shadow">
                            {queues.length}
                        </h3>
                    </div>
                )}

                {queues ? (
                    <>
                        {queues && queues.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {queues.map((queue, index) => (
                                    <div key={index} className="bg-white/90 shadow-xl rounded-2xl overflow-hidden border border-blue-100 flex flex-col">
                                        <div className="flex flex-col justify-center items-center bg-gradient-to-tr from-main to-main/90 py-5">
                                            <h4 className="font-bold text-lg text-white flex items-center gap-2">
                                                <FiUsers className="text-xl" /> {t('user.people-ahead')}
                                            </h4>
                                            <h2 className="text-2xl font-bold text-white mt-1">
                                                {queue.aheadOfYou > 0 ? queue.aheadOfYou : t('user.no-waiting')}
                                            </h2>
                                        </div>
                                        <div className="flex justify-between px-6 py-4 bg-blue-50">
                                            <div className="flex flex-col items-center">
                                                <h4 className="text-main font-semibold flex items-center gap-1"><FiHash />{t('user.your-queue-number')}</h4>
                                                <h2 className="text-lg font-bold text-main">{queue.queue.queue}</h2>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <h4 className="text-main font-semibold flex items-center gap-1"><FiUsers />{t('user.now-serving')}</h4>
                                                <h2 className="text-lg font-bold text-main">{queue.nowServingQueue ? queue.nowServingQueue : '---'}</h2>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center p-4 bg-blue-50 border-t border-blue-100">
                                            <h4 className="text-main font-semibold flex items-center gap-1"><FiClock />{t('user.estimated-time')}</h4>
                                            <h2 className="text-lg font-bold text-main">{queue.estimatedTime}</h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col justify-center items-center mt-16">
                                <span className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 mb-6">
                                    <FiUsers className="text-5xl text-blue-400" />
                                </span>
                                <p className="text-center text-xl text-blue-700 font-semibold">{t('user.no-queues-today')}</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <Custom_Spinner />
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserQueues