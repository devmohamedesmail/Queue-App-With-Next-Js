import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Profile_Cover({ isEditing, handleEdit, handleSave, handleCancel }:any) {
    const { t } = useTranslation()
  return (
     <div className="h-40 bg-gradient-to-r from-primary via-primary/80 to-secondary relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="btn btn-sm bg-white/20 border-white/30 text-white hover:bg-white/30 gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('common.edit') || 'Edit'}
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="btn btn-sm bg-green-500/20 border-green-400/30 text-white hover:bg-green-500/30 gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('common.save') || 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-sm bg-red-500/20 border-red-400/30 text-white hover:bg-red-500/30 gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {t('common.cancel') || 'Cancel'}
                  </button>
                </div>
              )}
            </div>
          </div>
  )
}
