'use client';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoHomeOutline } from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';
import { FaPeopleGroup } from 'react-icons/fa6';
import { AuthContext } from '@/app/context/auth_context';


function Mobile_Dock() {
    const { t } = useTranslation();
    const { auth } = useContext(AuthContext);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 shadow-2xl rounded-t-2xl py-2 px-4 md:hidden min-h-[64px]" />;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-white/90 shadow-2xl rounded-t-2xl py-2 px-4 md:hidden backdrop-blur-lg border-t border-gray-200 animate-fade-in">
            <Link href="/" className="flex flex-col items-center group transition-all hover:text-blue-600">
                <IoHomeOutline size={28} className="mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold group-hover:text-blue-600">{t('home')}</span>
            </Link>
            <Link
                href={auth ? '/pages/user/queues' : '/pages/auth/login'}
                className="flex flex-col items-center group transition-all hover:text-green-600"
            >
                <FaPeopleGroup size={28} className="mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold group-hover:text-green-600">{t('my-queues')}</span>
            </Link>
            <Link
                href={auth ? '/pages/user/profile' : '/pages/auth/login'}
                className="flex flex-col items-center group transition-all hover:text-purple-600"
            >
                <FiUser size={28} className="mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold group-hover:text-purple-600">{t('account')}</span>
            </Link>
        </nav>
    );
}

export default Mobile_Dock;