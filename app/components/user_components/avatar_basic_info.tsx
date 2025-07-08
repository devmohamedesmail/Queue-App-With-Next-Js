'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Avatar_Basic_Info({ auth }: any) {
    const { t } = useTranslation()



    const getInitials = (name: string) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'
    }

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 mb-8">
            <div className="relative">
                <div className="w-40 h-40 rounded-full bg-white shadow-2xl ring-4 ring-white flex items-center justify-center overflow-hidden">
                    {auth?.user?.avatar ? (
                        <img
                            src={auth.user.user.avatar}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-5xl font-bold text-primary">
                            {getInitials(auth?.user?.name || '')}
                            
                        </span>
                    )}
                </div>
                <button className="absolute bottom-3 right-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/80 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">
                    {auth?.user?.name || 'User'}
                </h2>
                <p className="text-black mb-3 text-lg">{auth?.user?.email}</p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                    <span className="badge badge-primary badge-lg">
                        {auth?.user?.role }
                    </span>
                    <span className="badge badge-outline badge-lg">
                        {t('user.profile.active-member') || 'Active Member'}
                    </span>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-xl border border-primary/20">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-base-content/60">{t('user.profile.queues-joined') || 'Queues Joined'}</div>
                </div>
                <div className="text-center p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                    <div className="text-2xl font-bold text-secondary">3</div>
                    <div className="text-sm text-base-content/60">{t('user.profile.active-queues') || 'Active Queues'}</div>
                </div>
            </div>
        </div>
    )
}
