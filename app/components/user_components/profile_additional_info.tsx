'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Profile_Additional_Info({ isEditing, setEditedProfile, editedProfile, auth }: any) {

    const { t } = useTranslation()
    console.log(auth)
  return (
     <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-base-content flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {t('user.profile.additional-info') || 'Additional Information'}
                </h3>

                <div className="space-y-4">
                  {/* Location */}
                  <div className="bg-base-100/80 rounded-xl p-4 border border-base-200">
                    <label className="block text-sm font-semibold text-base-content/70 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {t('user.profile.location') || 'Location'}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                        className="input input-bordered w-full bg-white"
                        placeholder={t('user.profile.location-placeholder') || 'Enter your location'}
                      />
                    ) : (
                      <div className="text-base-content font-medium">
                        {auth?.user?.location || t('common.not-provided') || 'Not provided'}
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="bg-base-100/80 rounded-xl p-4 border border-base-200">
                    <label className="block text-sm font-semibold text-base-content/70 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {t('user.profile.bio') || 'Bio'}
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                        className="textarea textarea-bordered w-full h-24 bg-white"
                        placeholder={t('user.profile.bio-placeholder') || 'Tell us about yourself...'}
                      />
                    ) : (
                      <div className="text-base-content font-medium min-h-[3rem]">
                        {auth?.user?.bio || t('user.profile.no-bio') || 'No bio provided'}
                      </div>
                    )}
                  </div>

                  {/* Member Since */}
                  <div className="bg-base-100/80 rounded-xl p-4 border border-base-200">
                    <label className="block text-sm font-semibold text-base-content/70 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {t('user.profile.member-since') || 'Member Since'}
                    </label>
                    <div className="text-base-content font-medium">
                      {auth?.user?.createdAt 
                        ? new Date(auth.user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : t('common.not-available') || 'Not available'
                      }
                    </div>
                  </div>
                </div>
              </div>
  )
}
