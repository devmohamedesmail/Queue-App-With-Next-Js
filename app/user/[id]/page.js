'use client'
import Language_switcher from '@/app/components/commen_components/language_switcher'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { api } from '@/app/config/api';
export default function page({ params }) {

    const [place, setPlace] = useState(null);
    const [qr, setQr] = useState(null)
     const {t,i18n}= useTranslation()





    const fetch_place_qr_code = async () => {
        try {
            const res = await axios.get(`${api.baseUrl}api/v1/places/show/place/qrcode/${params.id}`)
            console.log(res.data)
            setPlace(res.data.place)
            setQr(res.data.qrCodeDataUrl)
        } catch (error) {
            console.error('Error fetching QR code:', error)
        }
    }

    useEffect(() => {
        if (params?.id) {
            fetch_place_qr_code()
        }
    }, [params?.id])

    return (
        <div className="container m-auto px-5">
            <Language_switcher />
            <div className='flex flex-col justify-center items-center h-screen'>
            {place && (
                <div className="mb-4">
                    <h1 className="text-md md:text-2xl text-center font-bold">{i18n.language === "ar" ? place.nameAr : place.nameEn}</h1>
                </div>
            )}
            {qr && (
                <div>
                    <img src={qr} alt="QR Code" className="w-96 h-96" />
                </div>
            )}
            </div>
        </div>
    )
}
