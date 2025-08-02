'use client'
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import i18n from '../../../i18n';
import { AuthContext } from '@/app/context/auth_context'
import Search from './search';
import Drawer from './drawer';
import Notification_Section from './notification_section';
import Logo from '../commen_components/logo';
import { MdLanguage } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import UserMenu from './user_menu';


function Navbar() {
    const { auth, setAuth, logout }: any = useContext(AuthContext)
    const { t } = useTranslation()
    const router = useRouter()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <nav className="navbar bg-base-100 shadow-sm border-b border-base-200 px-4 lg:px-8 min-h-[64px]" />;

   




    const handle_toggle_lang = () => {
        const newLocale = localStorage.getItem('i18nextLng') === 'en' ? 'ar' : 'en';
        localStorage.setItem('i18nextLng', newLocale);
        window.location.reload();
    }







    return (
        <>
            <nav className="navbar bg-base-100 shadow-sm border-b border-base-200 px-4 lg:px-8 min-h-[60px]">
                {/* Logo Section */}
                <div className="flex-1">
                    <Logo />
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
                    <div className="tooltip tooltip-bottom" data-tip={t('change-language')}>
                        <button
                            onClick={handle_toggle_lang}
                            className="bg-gray-100 text-black flex items-center gap-2 px-4 py-3 rounded-full border border-base-200 transition-colors min-w-[90px] justify-center"
                        >
                            <MdLanguage />
                            <span className="font-semibold text-base text-xs capitalize">
                                {i18n.language === 'en' ? 'English' : 'العربية'}
                            </span>
                        </button>
                    </div>
                    {auth ? (
                    //    <div className="dropdown dropdown-end">
                    //         <div
                    //             tabIndex={0}
                    //             role="button"
                    //             className="btn btn-ghost btn-circle   avatar hover:bg-base-200 transition-colors"
                    //         >
                    //             <div className="w-8 rounded-full ring-2 ring-gray-300 ring-offset-2 ring-offset-base-100">
                    //                 {auth?.user?.user?.avatar ? (
                    //                     <img
                    //                         src={auth.user.avatar}
                    //                         alt="Avatar"
                    //                         className="w-full h-full object-cover"
                    //                     />
                    //                 ) : (
                    //                     <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    //                         <AiOutlineUser size={16} color='#000' />
                    //                     </div>
                    //                 )}
                                    
                    //             </div>
                    //         </div>
                    //         <ul
                    //             tabIndex={0}
                    //             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-64 p-3 shadow-xl border border-base-200"
                    //         >
                    //             {/* User Info Header */}
                    //             <li className="menu-title px-3 py-2  border-b border-base-200 mb-2">
                    //                 <div className="flex flex-col">
                    //                     <div className='flex items-center gap-2 mb-2'>
                    //                         <p><MdAccountCircle size={18} color='#000' /></p>
                    //                         <p className='text-black'>{auth?.user?.name}</p>
                    //                     </div>
                    //                     <div className='flex items-center gap-2 mb-2'>
                    //                         <p><MdOutlineEmail size={18} color='#000' /></p>
                    //                         <p className='text-black'>{auth?.user?.email}</p>
                    //                     </div>


                    //                 </div>
                    //             </li>

                    //             {/* Menu Items */}

                    //             {auth?.user?.role === 'user' && (
                    //                 <li>
                    //                     <Link
                    //                         href="/user/profile"
                    //                         className="flex items-center gap-3  rounded-lg transition-colors bg-main py-3 text-white hover:bg-main/90"
                    //                     >
                    //                         <CiUser size={18} />
                    //                         <span>{t('account')}</span>
                    //                     </Link>
                    //                 </li>
                    //             )}

                    //             {auth?.user?.role === 'admin' && (
                    //                 <li>
                    //                     <Link
                    //                         href="/pages/admin/"
                    //                         className="flex items-center gap-3 hover:bg-base-200 rounded-lg transition-colors bg-main py-3 text-white hover:bg-main/90"
                    //                     >
                    //                         <AiOutlineDashboard size={18} />
                    //                         <span>{t('dashboard')}</span>
                    //                     </Link>
                    //                 </li>
                    //             )}
                    //             {auth?.user?.role === 'subscriber' && (
                    //                 <li>
                    //                     <Link
                    //                         href="/pages/subscriber/"
                    //                         className="flex items-center gap-3 hover:bg-base-200 rounded-lg transition-colors bg-main py-3 text-white hover:bg-main/90"
                    //                     >
                    //                         <AiOutlineDashboard size={18} />
                    //                         <span>{t('dashboard')}</span>
                    //                     </Link>
                    //                 </li>
                    //             )}

                    //             <li className="border-t border-base-200 mt-2 pt-2">
                    //                 <button
                    //                     onClick={handle_logout}
                    //                     className="flex items-center gap-3 bg-red-600 py-3 text-white rounded-lg transition-colors w-full"
                    //                 >
                    //                     <AiOutlineLogout size={18} />
                    //                     <span>{t('common.logout')}</span>
                    //                 </button>
                    //             </li>
                    //         </ul>
                    //     </div>
                    <UserMenu auth={auth} t={t} router={router} logout={logout} setAuth={setAuth} />
                    ) : (
                        <Link
                            href="/auth/login"
                            className="flex items-center bg-gray-100 py-2 px-3 rounded-lg"
                        >
                         
                            <span className='text-sm'>{t('common.login')}</span>
                            <IoMdArrowDropright />
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