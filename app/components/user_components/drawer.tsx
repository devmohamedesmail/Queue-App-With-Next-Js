import React, { useContext } from 'react'
import Link from 'next/link'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineDashboard, AiOutlineLogout, AiOutlineUserSwitch } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { useTranslation } from 'react-i18next';
import { AuthContext } from '@/app/context/auth_context';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Drawer_Home_Item from './drawer_home_item';
import Language_Switcher from '../commen_components/language_switcher';
import { IoMdTime } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import Logo from '../commen_components/logo';

export default function Drawer() {

    const { t } = useTranslation();
    const { auth, setAuth, logout } = useContext(AuthContext);
    const router = useRouter();


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
        <div className="md:hidden flex-none">
            <div className="drawer drawer-end ">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer-4" className="drawer-button   w-10 h-10 p-0 text-black ">
                        <span className="sr-only"></span>
                        <FaBars size={24} />
                       
                    </label>
                </div>
                <div className="drawer-side z-[9999]">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu z-50 bg-base-200 relative text-base-content min-h-full w-80 p-4">
                        
                        <div className='flex items-center justify-center mb-4'>
                             <Logo />
                        </div>
                        <Drawer_Home_Item title={t('user.home')} href='/' icon={<IoHomeOutline />} className='mb-2' />
                        <Drawer_Home_Item title={t('user.my-queues')} href={`${auth ? '/user/queues' : '/auth/login'}`} icon={<IoMdTime />} className='mb-2' />

                        <div className=' w-full  absolute bottom-0 right-0 left-0 p-4 bg-base-200 rounded-t-lg'>

                            <div className='mb-2'>
                                <Language_Switcher />
                            </div>
                            {auth ? (
                                <>
                                    {auth?.user?.role === 'user' && (
                                        <Link href="/user/profile" className="flex items-center gap-3 justify-center bg-main py-3 text-white  rounded-lg transition-colors">
                                            <CiUser size={18} />
                                            <span>{t('user.account')}</span>
                                        </Link>
                                    )}




                                    {auth?.user?.role === 'admin' && (
                                        <Link href="/admin" className="flex items-center gap-3 justify-center mx-auto bg-main py-3 text-white  rounded-lg transition-colors">
                                            <AiOutlineDashboard size={18} />
                                            <span>{t('user.dashboard')}</span>
                                        </Link>
                                    )}
                                    <button
                                        onClick={handle_logout}
                                        className="flex items-center justify-center py-3 my-2 gap-3 bg-red-600 hover:text-error-content rounded-lg transition-colors w-full"
                                    >
                                        <AiOutlineLogout size={18} color='white' />
                                        <span className='text-white'>{t('user.logout')}</span>
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/auth/login"
                                    className="btn py-3 bg-main outline-none border-none text-white rounded-lg hover:btn-primary-focus transition-colors w-full"
                                >
                                    <AiOutlineUserSwitch size={16} />
                                    {t('user.login-register')}
                                </Link>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}
