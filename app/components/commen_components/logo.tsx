import React, { useContext } from 'react'
import Link from 'next/link'
import { DataContext } from '@/app/context/data_context'

export default function Logo() {

    const { settings }: any = useContext(DataContext)
    return (
        <Link  href="/" className='flex items-center' >
            <div>
                <img src={settings?.logo} alt={settings?.nameEn} className='w-16 h-16 object-contain bg-white rounded-full  p-2' />
            </div>
            <p className='font-bold text-main'>{settings?.nameEn}</p>
        </Link>
    )
}
