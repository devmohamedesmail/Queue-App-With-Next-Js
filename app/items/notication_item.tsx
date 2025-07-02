import React from 'react'
import { FiBell } from 'react-icons/fi';
export default function Notication_Item({ n }: { n: any }) {
    return (
        <li
            key={n.id}
            className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition flex items-start gap-3 group"
        >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 group-hover:bg-blue-200 transition">
                <FiBell className="text-blue-500 text-xl" />
            </span>
            <div className="flex-1 min-w-0">
                <span className="block text-base font-semibold text-gray-800 truncate">
                    {n.title || n.message}
                </span>
                <span className="block text-xs text-gray-400 mt-1">
                    {n.time || ''}
                </span>
            </div>
        </li>
    )
}
