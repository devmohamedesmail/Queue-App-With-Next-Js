import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Profile_Quick_Actions({logout}: any) {
    const { t } = useTranslation()
    const router = useRouter()
    



    const signOut = async () =>{
       await logout()
         router.push('/')

    }
  return (
      <div className="border-t border-base-200 pt-8">
              <h3 className="text-xl font-semibold text-base-content mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t('user.profile.quick-actions') || 'Quick Actions'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="btn btn-ghost justify-start gap-3 h-auto py-4 flex-col sm:flex-row">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <span className="text-sm">{t('user.profile.download-data') || 'Download Data'}</span>
                </button>
                <button className="btn btn-ghost justify-start gap-3 h-auto py-4 flex-col sm:flex-row">
                  <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-sm">{t('user.profile.privacy-settings') || 'Privacy Settings'}</span>
                </button>
                <button className="btn btn-ghost justify-start gap-3 h-auto py-4 flex-col sm:flex-row">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a1 1 0 011-1h3a1 1 0 011 1v5z" />
                    </svg>
                  </div>
                  <span className="text-sm">{t('user.profile.export-profile') || 'Export Profile'}</span>
                </button>
                <button onClick={() => signOut()} className="btn btn-ghost justify-start gap-3 h-auto py-4 flex-col sm:flex-row text-error">
                  <div className="w-8 h-8 bg-error/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <span className="text-sm">{t('common.sign-out') || 'Sign Out'}</span>
                </button>
              </div>
            </div>
  )
}
