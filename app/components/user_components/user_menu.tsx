import React from 'react'
import { AiOutlineUser, AiOutlineLogout, AiOutlineDashboard } from "react-icons/ai";
import {  MdOutlineEmail } from "react-icons/md";
import Link from 'next/link';
import { CiUser } from "react-icons/ci";
import { toast } from 'react-toastify';
import { LuUserRound } from "react-icons/lu";

export default function UserMenu({ auth, t, logout, setAuth, router }: any) {


    const handle_logout = async () => {
        try {
            await logout();
            setAuth(null);
            localStorage.removeItem('user');
            router.push('/')
            toast.success(t('common.logout-success'));
        } catch (error) {
            toast.error(t('common.error-occurred'));

        }
    }
    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle   avatar hover:bg-base-200 transition-colors"
            >
                <div className="w-8 rounded-full ring-2 ring-gray-300 ring-offset-2 ring-offset-base-100">
                    {auth?.user?.user?.avatar ? (
                        <img
                            src={auth.user.avatar}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                            <AiOutlineUser size={16} color='#000' />
                        </div>
                    )}

                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-64 p-3 shadow-sm border border-base-200"
            >
                {/* User Info Header */}
                <li className="menu-title px-3 py-2  border-b border-base-200 mb-2">
                    <div className="flex flex-col">
                        <div className='flex items-center gap-2 mb-2'>
                            {/* <p><MdAccountCircle size={18} color='#000' /></p> */}
                            <LuUserRound size={18} color='#000' />
                            <p className='text-black text-sm'>{auth?.user?.name}</p>
                        </div>
                        <div className='flex items-center gap-2 mb-2'>
                            <p><MdOutlineEmail size={18} color='#000' /></p>
                            <p className='text-black'>{auth?.user?.email}</p>
                        </div>


                    </div>
                </li>

                {/* Menu Items */}

                {auth?.user?.role === 'user' && (
                    <li>
                        <Link
                            href="/user/profile"
                            className="flex items-center gap-3  rounded-lg transition-colors bg-main py-3 text-white hover:bg-main/90"
                        >
                            <CiUser size={18} />
                            <span>{t('account')}</span>
                        </Link>
                    </li>
                )}

                {auth?.user?.role === 'admin' && (
                    <li>
                        <Link
                            href="/pages/admin/"
                            className="flex items-center gap-3 hover:bg-base-200 rounded-lg transition-colors bg-main py-3 text-white hover:bg-main/90"
                        >
                            <AiOutlineDashboard size={18} />
                            <span>{t('dashboard')}</span>
                        </Link>
                    </li>
                )}
                {auth?.user?.role === 'subscriber' && (
                    <li>
                        <Link
                            href="/pages/subscriber/"
                            className="flex items-center gap-3 hover:bg-base-200 rounded-lg transition-colors bg-main py-3 text-white hover:bg-main/90"
                        >
                            <AiOutlineDashboard size={18} />
                            <span>{t('dashboard')}</span>
                        </Link>
                    </li>
                )}

                <li className="border-t border-base-200 mt-2 pt-2">
                    <button
                        onClick={handle_logout}
                        className="flex items-center gap-3 bg-red-600 py-3 text-white rounded-lg transition-colors w-full"
                    >
                        <AiOutlineLogout size={18} />
                        <span>{t('common.logout')}</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}
