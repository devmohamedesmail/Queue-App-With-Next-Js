'use client'
import React, { useState } from 'react'
import { HiOutlineTranslate } from "react-icons/hi";
import {  AiOutlineSearch } from "react-icons/ai";
import { useTranslation } from 'react-i18next';

export default function Search() {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Implement search functionality here
            console.log('Searching for:', searchQuery);
            // You can navigate to search results or filter content
        }
    };
    return (
        <div className="w-full flex justify-center items-center my-4">
            <form onSubmit={handleSearch} className="w-full md:w-1/2">
                <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                    <input
                        type="text"
                        placeholder={t('search') || 'Search...'}
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="input h-12 input-bordered w-full pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent rounded-full bg-base-200 hover:bg-base-300 transition-colors"
                    />
                    <AiOutlineSearch
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60"
                        size={18}
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content"
                        >
                            ×
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
