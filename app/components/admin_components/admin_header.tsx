'use client'
import React, { useContext } from 'react'
import { PlaceContext } from '../../context/place_context'
import { useTranslation } from 'react-i18next'
import { AiOutlineUser } from "react-icons/ai";
import { FiUser, FiMail, FiLogOut } from "react-icons/fi";
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
           
            toast.success(t('common.logout-success'));
        } catch (error) {
            toast.success(t('common.error-occurred'));
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
                        className="menu menu-sm dropdown-content bg-white rounded-2xl mt-3 w-72 p-0 shadow-xl border border-gray-100 z-50"
                    >
                        <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <FiUser className="text-blue-600 text-xl" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{auth?.user?.name}</p>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <FiMail className="text-xs" />
                                        <p>{auth?.user?.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-2">
                            <button 
                                className='flex items-center gap-3 w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition font-semibold' 
                                onClick={() => handle_logout()}
                            >
                                <FiLogOut className="text-xl" />
                                {t('user.logout')}
                            </button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Admin_Header