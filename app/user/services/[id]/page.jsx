'use client'
import React, { useEffect, useState } from 'react'
import { api } from '@/app/config/api';
import axios from 'axios';
import Service_Item from '@/app/items/service_item';
import { useTranslation } from 'react-i18next';




export default function Place_Srvices({ params }) {
    const { id } = params;
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const { t } = useTranslation()




    const fetch_place_services = async () => {
        try {
            const response = await axios.get(`${api.baseUrl}api/v1/services/place/services/${id}`);
            setServices(response.data.services);
        } catch (err) {
            console.log("Error fetching services", err);
            setError(t('service-fetch-error', 'Failed to load services. Please try again later.'));
        }
    }


    useEffect(() => {
        fetch_place_services();
    }, []);

    return (
        <div>


            {error && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
                        <h3 className="text-lg font-bold mb-4 text-red-600">{t('error', 'Error')}</h3>
                        <p className="mb-6 text-gray-700">{error}</p>
                        <button
                            className="px-6 py-2 bg-yellow-400 text-gray-900 rounded font-semibold hover:bg-yellow-500 transition"
                            onClick={() => {
                                setError(null);
                                fetch_place_services();
                            }}
                        >
                            {t('close', 'Close')}
                        </button>
                    </div>
                </div>
            )}

            <div className="container m-auto px-5 my-10">
                <h2 className="text-center text-xl md:text-3xl font-extrabold mb-8 tracking-tight text-main drop-shadow-sm flex items-center justify-center gap-3">
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="inline-block text-yellow-400"><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l-1.41-1.41M6.34 6.34L4.93 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {t('select-your-service')}
                </h2>
                {services && services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map((service, index) => (

                            <Service_Item key={index} service={service} index={index} />

                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex w-52 flex-col gap-4">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div><div className="flex w-52 flex-col gap-4">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}
