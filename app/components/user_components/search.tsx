'use client'
import React, { useContext, useState, useEffect } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { PlaceContext } from '@/app/context/place_context';

export default function Search() {
    const { t } = useTranslation();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { places } = useContext(PlaceContext);

    // Filter places based on search query
    useEffect(() => {
        if (searchQuery.trim() && places?.length) {
            const filtered = places.filter((place: any) => {
                const query = searchQuery.toLowerCase();
                return (
                    place.nameEn?.toLowerCase().includes(query) ||
                    place.nameAr?.toLowerCase().includes(query) ||
                    place.addressEn?.toLowerCase().includes(query) ||
                    place.addressAr?.toLowerCase().includes(query) ||
                    place.description?.toLowerCase().includes(query) ||
                    place.services?.some((service: any) => 
                        service.titleEn?.toLowerCase().includes(query) ||
                        service.titleAr?.toLowerCase().includes(query)
                    )
                );
            }).slice(0, 5); // Limit to 5 suggestions
            
            setSearchSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setSearchSuggestions([]);
            setShowSuggestions(false);
        }
    }, [searchQuery, places]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to search results page with query parameter
            router.push(`/user/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (place: any) => {
        setSearchQuery('');
        setShowSuggestions(false);
        // Navigate to place details or search results
        router.push(`/user/search?q=${encodeURIComponent(place.nameEn)}&placeId=${place._id}`);
    };

    const handleInputBlur = () => {
        // Delay hiding suggestions to allow clicking
        setTimeout(() => {
            setIsSearchFocused(false);
            setShowSuggestions(false);
        }, 200);
    };
    return (
        <div className="w-full flex justify-center items-center my-4">
            <form onSubmit={handleSearch} className="w-full md:w-1/2 relative">
                <div className={`relative transition-all  duration-300 ${isSearchFocused ? 'scale-102' : ''}`}>
                    <input
                        type="text"
                        placeholder={t('common.search')}
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={handleInputBlur}
                        className="input h-12 input-bordered w-full pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent rounded-2xl bg-white  transition-all duration-300 text-base"
                    />
                    <AiOutlineSearch
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/60"
                        size={20}
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery('');
                                setShowSuggestions(false);
                            }}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-base-200"
                        >
                            ×
                        </button>
                    )}
                </div>

                {/* Search Suggestions Dropdown */}
                {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-base-200 z-50 max-h-80 overflow-y-auto">
                        <div className="p-2">
                            <div className="text-xs font-semibold text-base-content/60 px-3 py-2 border-b border-base-200">
                                {t('user.search.suggestions') || 'Search Suggestions'}
                            </div>
                            {searchSuggestions.map((place: any, index: number) => (
                                <div
                                    key={place._id || index}
                                    onClick={() => handleSuggestionClick(place)}
                                    className="flex items-center gap-3 p-3 hover:bg-base-100 rounded-xl cursor-pointer transition-colors group"
                                >
                                    {/* Place Image */}
                                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-base-200 flex-shrink-0">
                                        {place.image ? (
                                            <img 
                                                src={place.image} 
                                                alt={place.nameEn} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg className="w-6 h-6 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Place Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-base-content group-hover:text-primary transition-colors">
                                            {place.nameEn}
                                        </div>
                                        <div className="text-sm text-base-content/70 truncate">
                                            {place.addressEn}
                                        </div>
                                        {place.services && place.services.length > 0 && (
                                            <div className="text-xs text-base-content/50 mt-1">
                                                {place.services.length} {t('common.services') || 'services'}
                                            </div>
                                        )}
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className="text-base-content/40 group-hover:text-primary transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
