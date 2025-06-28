'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FaBars } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Language_switcher from './Language_switcher';


function Subscriber_header() {
    const { t } = useTranslation();


    const { auth, setAuth, login, register, logout } = useContext(AuthContext);
    const router = useRouter()





    const handle_logout = async () => {
        try {
            await logout();
            setAuth(null);
            localStorage.removeItem('user');
            router.push('/')
            console.log("logout")
            toast.success(t('logout-success'));
        } catch (error) {
            console.log("Logout error:", error);
        }
    }





    return (
        <div className='flex justify-between items-center bg-gray-200 p-4'>
            <div className='flex-1'>
                <Link className='btn btn-neutral mx-1 shadow-none ' href="/pages/subscriber/queues" >{t('queues')}</Link>
                <Link className='btn btn-neutral mx-1 shadow-none' href="/pages/subscriber/setting" >{t('setting')}</Link>
                <Link className='btn btn-neutral mx-1 shadow-none' href="/pages/subscriber/statistics" >{t('statistics')}</Link>
                <Link className='btn btn-neutral mx-1 shadow-none' href="/pages/subscriber/employees" >{t('employees')}</Link>
                
            </div>


            <div className="drawer w-12 bg-black">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn btn-neutral btn-outline drawer-button"><FaBars color='white' /></label>
                    
                </div>
              
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <Link className='btn btn-neutral mx-1 my-1 shadow-none' href="/pages/subscriber/queues" >{t('queues')}</Link>
                        <Link className='btn btn-neutral mx-1 my-1 shadow-none' href="/pages/subscriber/setting" >{t('setting')}</Link>
                        <Link className='btn btn-neutral mx-1 my-1 shadow-none' href="/pages/subscriber/statistics" >{t('statistics')}</Link>
                        <Link className='btn btn-neutral mx-1 my-1 shadow-none' href="/pages/subscriber/employees" >{t('employees')}</Link>





                        <div className='bottom-0 absolute right-0 left-0'>
                              <Language_switcher />
                            <button onClick={() => handle_logout()} className='btn btn-neutral mx-1 my-1 shadow-none w-full'>{t('logout')}</button>
                        </div>


                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Subscriber_header