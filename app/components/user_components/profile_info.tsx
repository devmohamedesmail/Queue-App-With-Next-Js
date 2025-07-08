import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Profile_Info({ isEditing, setEditedProfile, editedProfile, auth }: any) {
    const { t } = useTranslation()
  return (
     <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-base-content flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  {t('user.profile.personal-info') || 'Personal Information'}
                </h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="bg-base-100/80 rounded-xl p-4 border border-base-200">
                    <label className="block text-sm font-semibold text-base-content/70 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {t('common.name') || 'Full Name'}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                        className="input input-bordered w-full bg-white"
                        placeholder={t('user.profile.name-placeholder') || 'Enter your full name'}
                      />
                    ) : (
                      <div className="text-base-content font-medium">
                        {auth?.user?.name || t('common.not-provided') || 'Not provided'}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="bg-base-100/80 rounded-xl p-4 border border-base-200">
                    <label className="block text-sm font-semibold text-base-content/70 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {t('common.email') || 'Email Address'}
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                        className="input input-bordered w-full bg-white"
                        placeholder={t('user.profile.email-placeholder') || 'Enter your email'}
                      />
                    ) : (
                      <div className="text-base-content font-medium">
                        {auth?.user?.email || t('common.not-provided') || 'Not provided'}
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="bg-base-100/80 rounded-xl p-4 border border-base-200">
                    <label className="block text-sm font-semibold text-base-content/70 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {t('user.profile.phone') || 'Phone Number'}
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                        className="input input-bordered w-full bg-white"
                        placeholder={t('user.profile.phone-placeholder') || 'Enter your phone number'}
                      />
                    ) : (
                      <div className="text-base-content font-medium">
                        {auth?.user?.phone || t('common.not-provided') || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
  )
}
