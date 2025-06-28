'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function TermsOfService() {
  const { t } = useTranslation();
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto bg-white shadow-2xl rounded-2xl p-10 md:p-16" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight drop-shadow" style={{ color: 'var(--color-main)' }}>{t('terms-title', 'Terms of Service')}</h1>
        <div className="mb-8 text-base-content/80 leading-relaxed text-left text-lg" style={{ color: 'var(--color-main)' }}>
          <p className="mb-4">{t('terms-intro', 'Please read these Terms of Service carefully before using Q me. By accessing or using our service, you agree to be bound by these terms.')}</p>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong>{t('terms-acceptance-title', 'Acceptance of Terms')}:</strong> {t('terms-acceptance', 'By using our service, you agree to comply with and be legally bound by these terms.')}</li>
            <li><strong>{t('terms-privacy-title', 'Privacy Policy')}:</strong> {t('terms-privacy', 'Your use of the service is also governed by our Privacy Policy.')}</li>
            <li><strong>{t('terms-user-title', 'User Responsibilities')}:</strong> {t('terms-user', 'You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.')}</li>
            <li><strong>{t('terms-changes-title', 'Changes to Terms')}:</strong> {t('terms-changes', 'We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the new terms.')}</li>
            <li><strong>{t('terms-contact-title', 'Contact Us')}:</strong> {t('terms-contact', 'If you have any questions about these Terms, please contact us.')}</li>
          </ol>
        </div>
        <div className="text-center text-base-content/60 text-sm" style={{ color: 'var(--color-main)' }}>
          {t('terms-last-updated', 'Last updated: June 25, 2025')}
        </div>
      </div>
    </section>
  )
}
