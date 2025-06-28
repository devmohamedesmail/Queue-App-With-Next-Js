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


function Navbar() {

    const { settings }: any = useContext(DataContext)
    const { auth, setAuth, login, register, logout }: any = useContext(AuthContext)
    const { t } = useTranslation()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchFocused, setIsSearchFocused] = useState(false)
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
            toast.success(t('logout-success'));
        } catch (error) {
            console.log("Logout error:", error);
        }
    }




    const handle_toggle_lang = () => {
        const newLocale = localStorage.getItem('i18nextLng') === 'en' ? 'ar' : 'en';
        localStorage.setItem('i18nextLng', newLocale);
        window.location.reload();
    }

    const handleSearch = (e: any) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Implement search functionality here
            console.log('Searching for:', searchQuery);
            // You can navigate to search results or filter content
        }
    }





    return (
        <nav className="navbar bg-base-100 shadow-sm  border-b border-base-200 px-4 lg:px-8">
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

            {/* Search Bar */}
            <div className="flex-none mx-4">
                <form onSubmit={handleSearch} className="relative">
                    <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                        <input
                            type="text"
                            placeholder={t('search') || 'Search...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className="input input-bordered w-54 md:w-80 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-full bg-base-200 hover:bg-base-300 transition-colors"
                        />
                        <AiOutlineSearch
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60"
                            size={18}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Language Toggle */}
            <div className="flex-none mx-2">
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
            </div>

            {/* User Menu */}
            {auth ? (
                <div className="flex-none">
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
                            <li className="menu-title px-3 py-2 border-b border-base-200 mb-2">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">{auth?.user?.user?.name || 'User'}</span>
                                    <span className="text-xs text-base-content/60 truncate">{auth?.user?.user?.email}</span>
                                </div>
                            </li>

                            {/* Menu Items */}
                            <li>
                                <Link
                                    href="/user/profile"
                                    className="flex items-center gap-3 hover:bg-base-200 rounded-lg transition-colors"
                                >
                                    <CiUser size={18} />
                                    <span>{t('account')}</span>
                                </Link>
                            </li>

                            {auth?.user?.user?.role === 'admin' && (
                                <li>
                                    <Link
                                        href="/pages/admin/"
                                        className="flex items-center gap-3 hover:bg-base-200 rounded-lg transition-colors"
                                    >
                                        <AiOutlineDashboard size={18} />
                                        <span>{t('dashboard')}</span>
                                    </Link>
                                </li>
                            )}

                            <li className="border-t border-base-200 mt-2 pt-2">
                                <button
                                    onClick={handle_logout}
                                    className="flex items-center gap-3 hover:bg-error hover:text-error-content rounded-lg transition-colors w-full"
                                >
                                    <AiOutlineLogout size={18} />
                                    <span>{t('logout')}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <Link
                    href="/auth/login"
                    className="btn btn-primary bg-main outline-none border-none btn-sm rounded-lg mb-2 hover:btn-primary-focus transition-colors"
                >
                    <AiOutlineUserSwitch size={16} />
                    {/* {t('login-register')} */}
                </Link>
            )}
        </nav>
    )
}

export default Navbar