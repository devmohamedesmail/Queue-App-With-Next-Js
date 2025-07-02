'use client'
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import { AiOutlineUser, AiOutlineSearch, AiOutlineGlobal, AiOutlineLogout, AiOutlineDashboard, AiOutlineUserSwitch } from "react-icons/ai";
import { HiOutlineTranslate } from "react-icons/hi";
import { api } from '../../config/api';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CiUser } from "react-icons/ci";
import i18n from '../../../i18n';
import { AuthContext } from '@/app/context/auth_context'
import { DataContext } from '@/app/context/data_context';
import Search from './search';
import Drawer_Home_Item from './drawer_home_item';
import { IoHomeOutline } from "react-icons/io5";
import Drawer from './drawer';
import Notification_Section from './notification_section';

function Navbar() {

    const { settings }: any = useContext(DataContext)
    const { auth, setAuth, logout }: any = useContext(AuthContext)
    const { t } = useTranslation()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <nav className="navbar bg-base-100 shadow-sm border-b border-base-200 px-4 lg:px-8 min-h-[64px]" />;

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




    const handle_toggle_lang = () => {
        const newLocale = localStorage.getItem('i18nextLng') === 'en' ? 'ar' : 'en';
        localStorage.setItem('i18nextLng', newLocale);
        window.location.reload();
    }







    return (
        <>
            <nav className="navbar bg-base-100 shadow-sm border-b border-base-200 px-4 lg:px-8 min-h-[64px]">
                {/* Logo Section */}
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl hover:bg-transparent">
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="w-10 h-10 rounded-lg overflow-hidden">
                                    <img
                                        className='w-full h-full object-cover'
                                        src={`${settings?.logo}`}
                                        alt={settings?.nameEn}
                                    />
                                </div>
                            </div>
                            <span className="font-bold text-main hidden sm:block">
                                {settings?.nameEn || 'Queue App'}
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Search Bar (hidden on small screens, show on md+) */}
                <div className="hidden md:block flex-1">
                    <div className="flex justify-center">
                        <Search />
                    </div>
                </div>
                <Notification_Section />
                {/* Language Toggle and User Menu (hidden on small screens, show on md+) */}
                <div className="hidden md:flex items-center gap-2">
                    <div className="tooltip tooltip-bottom" data-tip={t('change-language') || 'Change Language'}>
                        <button
                            onClick={handle_toggle_lang}
                            className="btn btn-dark bg-main text-white flex items-center gap-2 px-4 py-2 rounded-full border border-base-200 hover:bg-second transition-colors min-w-[90px] justify-center"
                        >
                            <span className="font-semibold text-base text-xs capitalize">
                                {i18n.language === 'en' ? 'English' : 'العربية'}
                            </span>
                        </button>
                    </div>
                    {auth ? (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle border-main avatar hover:bg-base-200 transition-colors"
                            >
                                <div className="w-8 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                                    {auth?.user?.user?.avatar ? (
                                        <img
                                            src={auth.user.user.avatar}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-main flex items-center justify-center">
                                            <AiOutlineUser size={16} className="text-primary-content" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-64 p-3 shadow-xl border border-base-200"
                            >
                                {/* User Info Header */}
                                <li className="menu-title px-3 py-2 bg-main border-b border-base-200 mb-2">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm text-white">{auth?.user?.user?.name || 'User'}</span>
                                        <span className="text-xs text-base-content/60 truncate text-white">{auth?.user?.user?.email}</span>
                                    </div>
                                </li>

                                {/* Menu Items */}
                               
                                 {auth?.user?.user?.role === 'user' && (
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

                                {auth?.user?.user?.role === 'admin' && (
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
                    ) : (
                        <Link
                            href="/auth/login"
                            className="btn btn-primary bg-main outline-none border-none btn-sm rounded-full w-12 h-12 p-0 hover:btn-primary-focus transition-colors"
                        >
                            <AiOutlineUserSwitch size={16} />
                            
                        </Link>
                    )}
                </div>

                {/* Drawer for small screens */}
               <Drawer />
            </nav>
            {/* Search bar for small screens (below navbar) */}
            <div className="block md:hidden w-full px-4">
                <Search />
            </div>
        </>
    )
}

export default Navbar