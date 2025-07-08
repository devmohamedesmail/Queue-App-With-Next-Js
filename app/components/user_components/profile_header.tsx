import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Profile_Header() {
    const { t } = useTranslation()
    return (
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">
                {t('user.profile.title')}
            </h1>
            <p className="text-base-content/60">
                {t('user.profile.subtitle')}
            </p>
        </div>
    )
}
