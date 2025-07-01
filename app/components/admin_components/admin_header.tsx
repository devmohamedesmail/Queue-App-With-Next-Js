'use client'
import React, { useContext } from 'react'
import { PlaceContext } from '../../context/place_context'
import { useTranslation } from 'react-i18next'
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Language_switcher from '../commen_components/language_switcher'
import { AuthContext} from '@/app/context/auth_context'

function Admin_Header({ isSidebarOpen, setIsSidebarOpen }:any) {



    const { settings }:any = useContext(PlaceContext)
    const { auth, setAuth, login, register, logout }:any = useContext(AuthContext)
    const { t } = useTranslation()
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
        <div className="navbar bg-base-100 shadow-sm px-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <button
                    className="btn bg-main text-white btn-square md:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <span className="text-xl">☰</span>
                </button>
                <span className="text-xl font-bold">
                    {settings?.nameEn}
                </span>
            </div>

            <div className="flex gap-2 items-center">
                <Language_switcher />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <AiOutlineUser size={20} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
                    >
                        <li><a href="">{auth?.user?.user?.name}</a></li>
                       <button className='bg-red-600 text-white w-full py-3 hover:bg-red-700 hover:cursor-pointer' onClick={() => handle_logout()}>{t('user.logout')}</button>
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Admin_Header