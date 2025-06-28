'use client'

import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../../context/DataContext'
import { useTranslation } from 'react-i18next'
import parse from 'html-react-parser'
import Loader from '../../../../components/loader.jsx'


function Page({ params }) {
    const { pages } = useContext(DataContext);
    const { i18n } = useTranslation();
    const [page, setPage] = useState(null)

    // const page = pages.find(p => p._id === params.id);


    useEffect(() => {
        if (pages && params.id) {
            const found = pages.find(p => p._id === params.id);
            setPage(found || null);
        }
    }, [])







    return (



        <div>
            {/* <Navbar /> */}
            {page && pages ? (
                <div className="container m-auto px-5 my-10">
                    <h5 className='bg-gray-100 text-center font-bold text-2xl py-10 mb-3'> {i18n.language === "ar" ? page.title_ar : page.title_en}</h5>
                    
                    {
                       i18n.language === "ar" ? <p className='text-right '>{parse(page.content_ar)}</p> : <p>{parse(page.content_en)}</p>
                    }
                </div>
            ) : (
                <Loader />
            )}


            {/* <Footer /> */}
            {/* <Mobile_Dock /> */}
        </div>



    );
}

export default Page;
