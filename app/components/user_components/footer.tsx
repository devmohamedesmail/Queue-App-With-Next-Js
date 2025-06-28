'use client'
import React, { useContext } from 'react'

import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { api } from '../../config/api';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FiChevronRight, FiLink } from "react-icons/fi";
import { DataContext } from '@/app/context/data_context';


export default function Footer() {
  

    const { t, i18n } = useTranslation();
    const { settings }:any = useContext(DataContext)



    return (
        <footer className="w-full bg-gray-950 text-white py-14 px-4 md:px-0">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
                {/* Brand & Mission */}
                <div className="flex flex-col items-start gap-4 md:col-span-2">
                    <img src={settings?.logo} alt={settings?.nameEn} className="w-20 h-20 object-contain bg-white rounded-full shadow-lg p-2" />
                    <span className="text-2xl font-extrabold tracking-wide drop-shadow">{settings?.nameEn}</span>
                    <span className="text-sm opacity-80 italic mb-2">{i18n.language === 'ar' ? settings?.descriptionAr : settings?.descriptionEn}</span>
                    <p className="text-xs text-gray-400 mt-2">Empowering your business with seamless queue management and a better customer experience.</p>
                </div>
                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 uppercase tracking-wider">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:underline hover:text-yellow-400 transition">Home</Link></li>
                        <li><Link href="/user/about" className="hover:underline hover:text-yellow-400 transition">About Us</Link></li>
                        <li><Link href="/user/privacy" className="hover:underline hover:text-yellow-400 transition">Privacy Policy</Link></li>
                        <li><Link href="/user/faq" className="hover:underline hover:text-yellow-400 transition">FAQ</Link></li>
                    </ul>
                </div>
                {/* Help & Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 uppercase tracking-wider">Help & Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/user/helpcenter" className="hover:underline hover:text-yellow-400 transition">Help Center</Link></li>
                        <li><Link href="/user/support" className="hover:underline hover:text-yellow-400 transition">Support</Link></li>
                        <li><Link href="/user/contact" className="hover:underline hover:text-yellow-400 transition">Contact Us</Link></li>
                        <li><Link href="/user/terms" className="hover:underline hover:text-yellow-400 transition">Terms of Service</Link></li>
                    </ul>
                </div>
                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 uppercase tracking-wider">Contact</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><MdOutlineMailOutline className="text-xl text-yellow-400" /> <span>{settings?.email}</span></li>
                        <li className="flex items-center gap-2"><FaPhone className="text-xl text-yellow-400" /> <span>{settings?.phone}</span></li>
                        <li className="flex items-center gap-2"><IoLocationOutline className="text-xl text-yellow-400" /> <span>{settings?.address}</span></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-12 border-t border-gray-800 pt-6 text-xs text-gray-500">
                <span>© 2025 Q me. All rights reserved.</span>
                <span className="mt-2 md:mt-0">Made with <span className="text-yellow-400">♥</span> by the Q me Team</span>
            </div>
        </footer>
    )
}
