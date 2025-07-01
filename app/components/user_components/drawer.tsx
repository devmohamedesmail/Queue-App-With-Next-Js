import React, { useContext } from 'react'
import Link from 'next/link'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineDashboard, AiOutlineLogout, AiOutlineUserSwitch } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { useTranslation } from 'react-i18next';
import { AuthContext } from '@/app/context/auth_context';
import i18n from '../../../i18n';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Drawer_Home_Item from './drawer_home_item';
import Language_Switcher from '../commen_components/language_switcher';
import { IoMdTime } from "react-icons/io";

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
            <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer-4" className="drawer-button btn bg-main text-white btn-ghost">
                        <span className="sr-only">Open menu</span>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <Drawer_Home_Item title={t('user.home')} href='/' icon={<IoHomeOutline />} className='mb-2' />
                        <Drawer_Home_Item title={t('user.my-queues')} href={`${auth ? '/user/queues' : '/auth/login'}`} icon={<IoMdTime />} className='mb-2' />

                        <li className="mb-2">
                            <Language_Switcher />
                        </li>
                        {auth ? (
                            <>


                                {auth?.user?.role === 'user' && (
                                    <li>
                                        <Link href="/user/profile" className="flex items-center gap-3 justify-center bg-main py-3 text-white  rounded-lg transition-colors">
                                            <CiUser size={18} />
                                            <span>{t('user.account')}</span>
                                        </Link>
                                    </li>
                                )}




                                {auth?.user?.role === 'admin' && (
                                    <li>
                                        <Link href="/admin" className="flex items-center gap-3 justify-center bg-main py-3 text-white  rounded-lg transition-colors">
                                            <AiOutlineDashboard size={18} />
                                            <span>{t('user.dashboard')}</span>
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <button
                                        onClick={handle_logout}
                                        className="flex items-center justify-center py-3 my-2 gap-3 bg-red-600 hover:text-error-content rounded-lg transition-colors w-full"
                                    >
                                        <AiOutlineLogout size={18} color='white' />
                                        <span className='text-white'>{t('user.logout')}</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link
                                    href="/auth/login"
                                    className="btn py-3 bg-main outline-none border-none text-white rounded-lg hover:btn-primary-focus transition-colors w-full"
                                >
                                    <AiOutlineUserSwitch size={16} />
                                    {t('user.login-register')}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
