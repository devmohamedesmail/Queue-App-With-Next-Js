'use client'
import React, { useContext } from 'react'
import { PlaceContext } from '../../context/place_context'
import { AuthContext } from '../../context/auth_context'
import { useTranslation } from 'react-i18next'
import { CiUser } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Language_switcher from '../commen_components/language_switcher'
function Admin_header({ isSidebarOpen, setIsSidebarOpen }) {



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
                    className="btn btn-ghost btn-square md:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <span className="text-xl">☰</span>
                </button>
                <span className="text-xl font-bold">
                    {settings?.nameEn}
                </span>
            </div>

            <div className="flex gap-2 items-center">
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-24 md:w-auto"
                />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <AiOutlineUser size={20} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
                    >
                        <li><a href="">{auth?.user?.user?.name}</a></li>
                        <li><a><button onClick={() => handle_logout()}>{t('logout')}</button></a></li>
                        <Language_switcher />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Admin_header