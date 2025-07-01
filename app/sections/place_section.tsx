'use client'
import React, { useContext, useEffect, useState } from 'react'
import Place_Item from '../items/place_item';
import { PlaceContext } from '../context/place_context';
import { useTranslation } from 'react-i18next';
import Custom_Section_Title from '../custom/custom_section_title';

export default function Place_Section() {
    const { places }: any = useContext(PlaceContext);
    const { t } = useTranslation();





    return (
        <div className='container m-auto px-5 my-10'>
            
            <Custom_Section_Title title={t('common.browse-places')} />
            {places ? (<>
                {places && places.length > 0 ? (<div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                    {places && places.length > 0 && places.map((place: any, index: number) => (
                        <Place_Item key={index} place={place} />

                    ))}
                </div>) : (<p>{t('no-places')}</p>)}
            </>) : (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
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
                    </div><div className="flex w-52 flex-col gap-4">
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
    )
}
