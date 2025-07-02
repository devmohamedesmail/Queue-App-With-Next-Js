'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
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
import { PlaceContext } from '@/app/context/place_context';
import Subscriber_Drawer from './subscriber_drawer';
import { FiLogOut } from 'react-icons/fi';

function Subscriber_Header() {
    const { t } = useTranslation();
    const { auth, setAuth, logout } = useContext(AuthContext);
    const router = useRouter();
    const { places } = useContext(PlaceContext);
    const [place, setPlace] = useState<any>(null);

    // Find and set the place that matches the user's placeId
    React.useEffect(() => {
        if (places && auth?.user?.placeId) {
            const matchedPlace = places.find((p: any) => p._id === auth.user.placeId);
            setPlace(matchedPlace || null);
            
        }
    }, [places, auth?.user?.placeId]);








    
   const handle_logout = async () => {
        try {
            await logout();
            setAuth(null);
            localStorage.removeItem('user');
            router.push('/');
            toast.success(t('common.logout-success'));
        } catch (error) {
            toast.error(t('common.error-occurred'));
        }
    }; 

    return (
        <header className="bg-white shadow flex items-center justify-between px-6 py-3 sticky top-0 z-40">
            {/* Left: Logo & Main Nav */}
            <div className="flex items-center gap-4">
                <Link href="/subscriber/queues" className="text-main font-bold text-xl tracking-tight hover:underline">
                  
                    <img className='w-12 h-12 rounded-full' src={place?.image} alt={place?.nameEn} />
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
                    <button onClick={handle_logout} className="flex items-center gap-2 btn btn-error btn-sm text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-all">
                        <FiLogOut className="text-lg" />
                        {t('common.logout')}
                    </button>
                </div>
                {/* Mobile Drawer */}
               <Subscriber_Drawer place={place} />
                {/* User Avatar */}
                <div className="ml-2 flex items-center gap-2">
                    <FaUserCircle className="text-main text-2xl" />
                    <span className="font-semibold text-sm text-main hidden md:inline">
                        {auth?.user?.name}
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Subscriber_Header;