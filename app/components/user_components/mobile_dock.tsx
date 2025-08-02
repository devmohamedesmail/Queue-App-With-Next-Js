'use client';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { IoHomeOutline, IoHome } from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa6';
import { HiOutlineQueueList, HiQueueList } from 'react-icons/hi2';
import { AuthContext } from '@/app/context/auth_context';


function Mobile_Dock() {
    const { t } = useTranslation();
    const { auth } = useContext(AuthContext);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
                <div className="mx-4 mb-4 h-16 bg-white/10 backdrop-blur-sm rounded-2xl" />
            </div>
        );
    }

    const navItems = [
        {
            href: '/',
            icon: IoHomeOutline,
            activeIcon: IoHome,
            label: t('user.home') || 'Home',
            color: 'blue',
            isActive: pathname === '/'
        },
        {
            href: auth ? '/user/queues' : '/auth/login',
            icon: HiOutlineQueueList,
            activeIcon: HiQueueList,
            label: t('user.my-queues') || 'My Queues',
            color: 'emerald',
            isActive: pathname?.includes('/user/queues')
        },
        {
            href: auth ? '/user/profile' : '/auth/login',
            icon: FiUser,
            activeIcon: FaUser,
            label: t('user.account') || 'Account',
            color: 'purple',
            isActive: pathname?.includes('/user/profile')
        }
    ];

    return (
        <>
            {/* Backdrop blur overlay */}
            <div className="fixed bottom-0 left-0 right-0 z-40 h-20 bg-gradient-to-t from-black/5 to-transparent pointer-events-none md:hidden" />
            
            {/* Main Mobile Dock */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
                <div className="mx-4 mb-4">
                    {/* Glassmorphism container */}
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                        {/* Gradient background overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5" />
                        
                        {/* Navigation items */}
                        <div className="relative flex justify-around items-center px-2 py-3">
                            {navItems.map((item, index) => {
                                const IconComponent = item.isActive ? item.activeIcon : item.icon;
                                const colorClasses = {
                                    blue: {
                                        text: 'text-blue-600',
                                        bg: 'bg-blue-100',
                                        shadow: 'shadow-blue-200/50',
                                        glow: 'shadow-blue-400/30'
                                    },
                                    emerald: {
                                        text: 'text-emerald-600',
                                        bg: 'bg-emerald-100',
                                        shadow: 'shadow-emerald-200/50',
                                        glow: 'shadow-emerald-400/30'
                                    },
                                    purple: {
                                        text: 'text-purple-600',
                                        bg: 'bg-purple-100',
                                        shadow: 'shadow-purple-200/50',
                                        glow: 'shadow-purple-400/30'
                                    }
                                };

                                const colors = colorClasses[item.color as keyof typeof colorClasses];

                                return (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="group relative flex flex-col items-center justify-center min-w-[70px] py-2 px-3 rounded-xl transition-all duration-300 hover:scale-105"
                                    >
                                        {/* Active indicator background */}
                                        {item.isActive && (
                                            <div className={`absolute inset-0 ${colors.bg} rounded-xl ${colors.shadow} shadow-lg scale-100 transition-all duration-300`} />
                                        )}

                                        {/* Icon container */}
                                        <div className="relative flex items-center justify-center mb-1">
                                            {/* Glow effect for active item */}
                                            {item.isActive && (
                                                <div className={`absolute inset-0 ${colors.bg} rounded-full blur-md opacity-50 scale-150`} />
                                            )}
                                            
                                            <IconComponent 
                                                size={24} 
                                                className={`relative transition-all duration-300 ${
                                                    item.isActive 
                                                        ? `${colors.text} scale-110` 
                                                        : 'text-base-content/60 group-hover:text-base-content group-hover:scale-110'
                                                }`}
                                            />

                                            {/* Floating notification dot (optional) */}
                                            {item.href.includes('queues') && auth && (
                                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                            )}
                                        </div>

                                        {/* Label */}
                                        <span className={`relative text-xs font-medium transition-all duration-300 ${
                                            item.isActive 
                                                ? `${colors.text} font-semibold` 
                                                : 'text-base-content/60 group-hover:text-base-content'
                                        }`}>
                                            {item.label}
                                        </span>

                                        {/* Hover effect overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Decorative bottom border */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-t-full opacity-60" />
                    </div>

                    {/* iPhone-style home indicator */}
                    <div className="flex justify-center pt-2 pb-1">
                        <div className="w-32 h-1 bg-base-content/20 rounded-full" />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Mobile_Dock;