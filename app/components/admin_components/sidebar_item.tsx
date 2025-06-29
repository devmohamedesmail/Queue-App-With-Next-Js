import React from 'react'
import { IoChevronForwardSharp } from "react-icons/io5";
import Link from 'next/link'

export default function Sidebar_Item({ icon, title, link , target , ...props }: { icon: React.ReactNode, title: string, link: string , target?: string }) {
    return (
        <li className="group flex items-center justify-between gap-2 p-2 md:p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mb-2 transition-all duration-200 cursor-pointer hover:bg-main/95 hover:shadow-2xl hover:scale-[1.03]">
            <Link href={link} target={target} className="flex items-center flex-1 gap-4 text-white group-hover:text-yellow-200 transition-colors duration-200">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-main/20 group-hover:bg-yellow-300/80 text-main group-hover:text-main text-2xl shadow-sm transition-all duration-200">
                    {icon}
                </span>
                <span className="font-bold text-base md:text-sm tracking-wide drop-shadow-sm">
                    {title}
                </span>
            </Link>
            <IoChevronForwardSharp className="text-xl text-white/70 group-hover:text-yellow-200 ml-2 transition-all duration-200 translate-x-0 group-hover:translate-x-1" />
        </li>
    )
}
