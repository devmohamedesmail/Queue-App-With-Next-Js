'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AuthContext } from '@/app/context/auth_context';
import Language_Switcher from '../commen_components/language_switcher';
import Navbar_Header_Item from './navbar_header_item';
import { CiViewTimeline } from "react-icons/ci";
import { IoSettings } from "react-icons/io5";
import { FcStatistics } from "react-icons/fc";
import { FaUsers } from "react-icons/fa6";

function Subscriber_Header() {
    const { t } = useTranslation();
    const { auth, setAuth, logout } = useContext(AuthContext);
    const router = useRouter();

    const handle_logout = async () => {
        try {
            await logout();
            setAuth(null);
            localStorage.removeItem('user');
            router.push('/');
            toast.success(t('logout-success'));
        } catch (error) {
            console.log('Logout error:', error);
        }
    };

    return (
        <header className="bg-white shadow flex items-center justify-between px-6 py-3 sticky top-0 z-40">
            {/* Left: Logo & Main Nav */}
            <div className="flex items-center gap-4">
                <Link href="/subscriber/queues" className="text-main font-bold text-xl tracking-tight hover:underline">
                    Q-Subscriber
                </Link>
                <nav className="hidden md:flex gap-2">
                    <Navbar_Header_Item icon={<CiViewTimeline />} title={t('common.queues')} href="/subscriber/queues" />
                    <Navbar_Header_Item icon={<IoSettings />} title={t('common.setting')} href="/subscriber/setting" />
                    <Navbar_Header_Item icon={<FcStatistics />} title={t('common.statistics')} href="/subscriber/statistics" />
                    <Navbar_Header_Item icon={<FaUsers />} title={t('common.employees')} href="/subscriber/employees" />
                    
               
                 
                </nav>
            </div>
            {/* Right: User & Drawer */}
            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2">
                    <Language_Switcher />
                    <button onClick={handle_logout} className="btn btn-error btn-sm text-white">
                        {t('logout')}
                    </button>
                </div>
                {/* Mobile Drawer */}
                <div className="drawer md:hidden">
                    <input id="subscriber-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex items-center">
                        <label htmlFor="subscriber-drawer" className="btn btn-ghost btn-circle drawer-button">
                            <FaBars size={20} />
                        </label>
                    </div>
                    <div className="drawer-side z-50">
                        <label htmlFor="subscriber-drawer" className="drawer-overlay"></label>
                        <ul className="menu bg-base-100 text-base-content min-h-full w-72 p-4">
                            <li><Link className="btn btn-ghost my-1" href="/subscriber/queues">{t('queues')}</Link></li>
                            <li><Link className="btn btn-ghost my-1" href="/subscriber/setting">{t('setting')}</Link></li>
                            <li><Link className="btn btn-ghost my-1" href="/subscriber/statistics">{t('statistics')}</Link></li>
                            <li><Link className="btn btn-ghost my-1" href="/subscriber/employees">{t('employees')}</Link></li>
                            <li className="mt-4"><Language_Switcher /></li>
                            <li><button onClick={handle_logout} className="btn btn-error w-full text-white mt-2">{t('logout')}</button></li>
                        </ul>
                    </div>
                </div>
                {/* User Avatar */}
                <div className="ml-2 flex items-center gap-2">
                    <FaUserCircle className="text-main text-2xl" />
                    <span className="font-semibold text-sm text-main hidden md:inline">
                        {auth?.user?.user?.name || t('subscriberr')}
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Subscriber_Header;