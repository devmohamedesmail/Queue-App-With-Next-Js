'use client'
import React, { useContext, useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { PlaceContext } from '@/app/context/place_context'
import Navbar from '@/app/components/user_components/navbar'
import Footer from '@/app/components/user_components/footer'
import Mobile_Dock from '@/app/components/user_components/mobile_dock'
import Link from 'next/link'

function SearchResults() {
    const { t } = useTranslation()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { places } = useContext(PlaceContext)
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const query = searchParams.get('q') || ''
        const placeId = searchParams.get('placeId')
        setSearchQuery(query)

        if (places?.length) {
            let filtered: any[] = []

            if (placeId) {
                // If specific place ID is provided, show that place
                const specificPlace = places.find((place: any) => place._id === placeId)
                if (specificPlace) {
                    filtered = [specificPlace]
                }
            }

            if (query.trim()) {
                const queryLower = query.toLowerCase()
                filtered = places.filter((place: any) => {
                    return (
                        place.nameEn?.toLowerCase().includes(queryLower) ||
                        place.nameAr?.toLowerCase().includes(queryLower) ||
                        place.addressEn?.toLowerCase().includes(queryLower) ||
                        place.addressAr?.toLowerCase().includes(queryLower) ||
                        place.description?.toLowerCase().includes(queryLower) ||
                        place.services?.some((service: any) => 
                            service.titleEn?.toLowerCase().includes(queryLower) ||
                            service.titleAr?.toLowerCase().includes(queryLower)
                        )
                    )
                })
            }

            setSearchResults(filtered)
        }
        setLoading(false)
    }, [searchParams, places])

    const handleNewSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newQuery = formData.get('search') as string
        if (newQuery.trim()) {
            router.push(`/user/search?q=${encodeURIComponent(newQuery.trim())}`)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
                    <p className="text-base-content/60">{t('common.loading') || 'Loading...'}</p>
                </div>
            </div>
        )
    }

    return (
        <>   
            {/* Search Header */}
            <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-6">
                            {t('user.search.title') || 'Search Results'}
                        </h1>
                        
                        {/* Search Form */}
                        <form onSubmit={handleNewSearch} className="w-full max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="search"
                                    defaultValue={searchQuery}
                                    placeholder={t('user.search.placeholder') || 'Search places, services, addresses...'}
                                    className="input h-14 input-bordered w-full pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-2xl bg-white shadow-lg text-base"
                                />
                                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-primary btn-sm rounded-xl"
                                >
                                    {t('user.search.search-btn') || 'Search'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-12 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Results Header */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-base-content">
                                    {searchQuery ? (
                                        <>
                                            {t('user.search.results-for') || 'Results for'} "{searchQuery}"
                                        </>
                                    ) : (
                                        t('user.search.all-results') || 'All Results'
                                    )}
                                </h2>
                                <div className="text-base-content/60">
                                    {searchResults.length} {t('user.search.results-found') || 'results found'}
                                </div>
                            </div>
                            
                            {searchQuery && (
                                <div className="flex items-center gap-2 text-sm text-base-content/60">
                                    <Link href="/" className="hover:text-primary transition-colors">
                                        {t('user.home') || 'Home'}
                                    </Link>
                                    <span>/</span>
                                    <span>{t('user.search.title') || 'Search'}</span>
                                    <span>/</span>
                                    <span className="text-base-content">{searchQuery}</span>
                                </div>
                            )}
                        </div>

                        {/* Results Grid */}
                        {searchResults.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {searchResults.map((place: any, index: number) => (
                                    <div
                                        key={place._id || index}
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                                    >
                                        {/* Place Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            {place.image ? (
                                                <img 
                                                    src={place.image} 
                                                    alt={place.nameEn} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                                    <svg className="w-16 h-16 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                </div>
                                            )}
                                            
                                            {/* Services Badge */}
                                            {place.services && place.services.length > 0 && (
                                                <div className="absolute top-3 right-3 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    {place.services.length} {t('common.services') || 'services'}
                                                </div>
                                            )}
                                        </div>

                                        {/* Place Info */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors">
                                                {place.nameEn}
                                            </h3>
                                            
                                            <div className="flex items-start gap-2 mb-3">
                                                <svg className="w-4 h-4 text-base-content/60 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-sm text-base-content/70 leading-relaxed">
                                                    {place.addressEn}
                                                </span>
                                            </div>

                                            {place.description && (
                                                <p className="text-sm text-base-content/60 mb-4 line-clamp-2">
                                                    {place.description}
                                                </p>
                                            )}

                                            {/* Services Preview */}
                                            {place.services && place.services.length > 0 && (
                                                <div className="mb-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {place.services.slice(0, 2).map((service: any, serviceIndex: number) => (
                                                            <span 
                                                                key={serviceIndex}
                                                                className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full"
                                                            >
                                                                {service.titleEn}
                                                            </span>
                                                        ))}
                                                        {place.services.length > 2 && (
                                                            <span className="text-xs bg-base-200 text-base-content/60 px-2 py-1 rounded-full">
                                                                +{place.services.length - 2} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 pt-4 border-t border-base-200">
                                                <Link
                                                    href={`/user/services/${place._id}`}
                                                    className="btn btn-primary btn-sm flex-1"
                                                >
                                                    {t('user.search.view-services') || 'View Services'}
                                                </Link>
                                                {place.locationlink && (
                                                    <a
                                                        href={place.locationlink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline btn-sm"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* No Results */
                            <div className="text-center py-16">
                                <div className="max-w-md mx-auto">
                                    <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-12 h-12 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-base-content mb-2">
                                        {t('user.search.no-results') || 'No results found'}
                                    </h3>
                                    <p className="text-base-content/60 mb-6">
                                        {searchQuery ? (
                                            <>
                                                {t('user.search.no-results-for') || 'We couldn\'t find any places matching'} "{searchQuery}". {t('user.search.try-different') || 'Try a different search term.'}
                                            </>
                                        ) : (
                                            t('user.search.no-results-general') || 'Try searching for places, services, or addresses.'
                                        )}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <Link href="/" className="btn btn-primary">
                                            {t('user.search.back-home') || 'Back to Home'}
                                        </Link>
                                        <button
                                            onClick={() => {
                                                const input = document.querySelector('input[name="search"]') as HTMLInputElement
                                                if (input) {
                                                    input.value = ''
                                                    input.focus()
                                                }
                                            }}
                                            className="btn btn-outline"
                                        >
                                            {t('user.search.new-search') || 'New Search'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

        </>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        }>
            <SearchResults />
        </Suspense>
    )
}
