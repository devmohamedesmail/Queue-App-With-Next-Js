'use client'
import React, { useContext, useEffect, useState } from 'react'
import Place_skeleton from '../components/skeletons/Place_skeleton';
import Place_Item from '../items/place_item';
import { PlaceContext } from '../context/place_context';
import { useTranslation } from 'react-i18next';

export default function Place_Section() {
    const { places }: any = useContext(PlaceContext);
    const { t } = useTranslation();
  




    return (
        <div className='container m-auto px-5 my-10'>
            <h6 className='font-bold mb-5 text-2xl'>{t('places')}</h6>
            {places ? (<>
                {places && places.length > 0 ? (<div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                    {places && places.length > 0 && places.map((place: any, index: number) => (
                        <Place_Item key={index} place={place} />

                    ))}
                </div>) : (<p>{t('no-places')}</p>)}
            </>) : (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                    <Place_skeleton />
                    <Place_skeleton />
                    <Place_skeleton />
                    <Place_skeleton />
                    <Place_skeleton />
                    <Place_skeleton />
                    <Place_skeleton />
                </div>
            )}
        </div>
    )
}
