import React , { useContext } from 'react'
import { FaBars, FaUserCircle } from 'react-icons/fa'
import { FiUsers, FiSettings, FiBarChart, FiLogOut } from 'react-icons/fi'
import { CiViewTimeline } from 'react-icons/ci'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Language_Switcher from '../commen_components/language_switcher'
import { AuthContext } from '@/app/context/auth_context'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';







export default function Subscriber_Drawer({place}: any) {

 const { auth, setAuth, logout } = useContext(AuthContext);
 const router = useRouter();
const { t } = useTranslation();

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
        <div className="drawer md:hidden">
            <input id="subscriber-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex items-center">
                <label htmlFor="subscriber-drawer" className="btn btn-ghost btn-circle drawer-button">
                    <FaBars size={20} />
                </label>
            </div>
            <div className="drawer-side z-50">
                <label htmlFor="subscriber-drawer" className="drawer-overlay"></label>
                <div className="bg-white min-h-full w-72 flex flex-col shadow-xl">
                    {/* Header with place info */}
                    <div className="px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <img src={place?.image} alt={place?.nameEn} className="w-12 h-12 object-cover rounded-full border-2 border-blue-100" />
                            <div>
                                <h3 className="font-bold text-gray-800">{place?.nameEn}</h3>
                                <p className="text-sm text-gray-500">{t('common.subscriber-panel')}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Navigation Menu */}
                    <nav className="flex-1 px-4 py-6">
                        <ul className="space-y-2">
                            <li>
                                <Link 
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium" 
                                    href="/subscriber/queues"
                                >
                                    <CiViewTimeline className="text-xl" />
                                    {t('common.queues')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium" 
                                    href="/subscriber/setting"
                                >
                                    <FiSettings className="text-xl" />
                                    {t('common.setting')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium" 
                                    href="/subscriber/statistics"
                                >
                                    <FiBarChart className="text-xl" />
                                    {t('common.statistics')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium" 
                                    href="/subscriber/employees"
                                >
                                    <FiUsers className="text-xl" />
                                    {t('common.employees')}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    
                    {/* Footer with language switcher and logout */}
                    <div className="px-4 py-4 border-t border-gray-100">
                        <div className="mb-3">
                            <Language_Switcher />
                        </div>
                        <button 
                            onClick={handle_logout} 
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
                        >
                            <FiLogOut className="text-xl" />
                            {t('common.logout')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
