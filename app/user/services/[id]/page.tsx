'use client'
import React, { useEffect, useState, use } from 'react'
import { api } from '@/app/config/api';
import axios from 'axios';
import Service_Item from '@/app/items/service_item';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Place_Services({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t, i18n } = useTranslation();
    const router = useRouter();

    const fetch_place_services = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${api.baseUrl}api/v1/services/place/services/${id}`);
            setServices(response.data.services);
        } catch (err) {
            toast.error(t('common.error-occurred', 'An error occurred while fetching services.'));
            setError(err as any);
            console.log('Error fetching place services:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch_place_services();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-50 to-base-200">
                {/* Header Skeleton */}
                <div className="bg-white/80 backdrop-blur-sm shadow-lg">
                    <div className="container mx-auto px-4 py-6">
                        <div className="skeleton h-8 w-48 mb-4"></div>
                        <div className="skeleton h-4 w-64"></div>
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="container mx-auto px-4 py-8">
                    <div className="skeleton h-12 w-80 mx-auto mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="skeleton h-16 w-16 rounded-full mx-auto mb-4"></div>
                                <div className="skeleton h-6 w-32 mx-auto mb-2"></div>
                                <div className="skeleton h-4 w-full mb-4"></div>
                                <div className="skeleton h-10 w-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-50 to-base-200">
            {/* Error Modal */}
            {error && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 text-center">
                        <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-error">{t('common.error', 'Error')}</h3>
                        <p className="mb-6 text-base-content/70">{t('common.error-occurred', 'An error occurred while loading services.')}</p>
                        <div className="flex gap-3 justify-center">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setError(null);
                                    fetch_place_services();
                                }}
                            >
                                {t('common.retry', 'Retry')}
                            </button>
                            <button
                                className="btn btn-ghost"
                                onClick={() => router.back()}
                            >
                                {t('common.back', 'Back')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-30">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => router.back()}
                            className="btn btn-ghost btn-circle hover:bg-primary/10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-base-content">
                                {t('common.services', 'Services')}
                            </h1>
                            <p className="text-base-content/60 mt-1">
                                {t('user.services.choose-desc', 'Choose from our available services to join the queue and get served efficiently.')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
                        {t('common.select-your-service', 'Select Your Service')}
                    </h2>
                    <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
                        {t('user.services.choose-desc', 'Choose from our available services to join the queue and get served efficiently.')}
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Services Grid */}
                {services && services.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {services.map((service: any, index) => (
                                <Service_Item key={service._id || index} service={service} index={index} />
                            ))}
                        </div>
                        
                        {/* Additional Info */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
                            <div className="flex items-center justify-center gap-2 text-base-content/60 mb-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium">
                                    {t('user.services.total-services', 'Total Services Available')}: {services.length}
                                </span>
                            </div>
                            <p className="text-xs text-base-content/50">
                                {t('user.services.queue-info', 'Join the queue for any service and track your position in real-time.')}
                            </p>
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-base-content mb-3">
                            {t('user.services.no-services', 'No Services Available')}
                        </h3>
                        <p className="text-base-content/60 mb-6 max-w-md mx-auto">
                            {t('user.services.no-services-desc', 'This location currently has no services available. Please check back later or contact the location directly.')}
                        </p>
                        <button
                            onClick={() => router.back()}
                            className="btn btn-primary"
                        >
                            {t('common.back', 'Go Back')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
