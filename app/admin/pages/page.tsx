'use client'
export const dynamic = 'force-dynamic';


import { DataContext } from '@/app/context/data_context'
import Custom_Page_Title from '@/app/custom/custom_page_title';
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

export default function PagesList() {
    const { t } = useTranslation()
    const { pages } = useContext(DataContext) as { pages: any[] | undefined }
    return (
        <div>
            <Custom_Page_Title title='Pages' />
            {pages && pages.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                    {pages.map((page: any) => (
                        <div key={page._id} className='bg-white shadow rounded-lg p-4'>
                            <div className="flex justify-between items-center">
                                <h2 className='text-lg font-bold'>{page.title_en}</h2>
                                <p>{page.title_ar}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex items-center justify-center h-screen'>
                    <h1 className='text-2xl font-bold'>{t('no_pages')}</h1>
                </div>
            )}
        </div>
    )
}
