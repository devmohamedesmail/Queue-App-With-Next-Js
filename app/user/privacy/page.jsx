'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto bg-white shadow-2xl rounded-2xl p-10 md:p-16" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 text-center tracking-tight drop-shadow">{t('privacy-title', 'Privacy Policy')}</h1>
        <p className="mb-6 text-base-content/80 leading-relaxed text-center text-lg">
          {t('privacy-intro', 'Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our queue management app.')}
        </p>
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">{t('privacy-collect-title', 'Information We Collect')}</h2>
            <ul className="list-disc pl-6 text-base-content/80">
              <li>{t('privacy-collect-personal', 'Personal information (such as name, email, phone number) provided during registration or use.')}</li>
              <li>{t('privacy-collect-queue', 'Queue activity and usage data.')}</li>
              <li>{t('privacy-collect-device', 'Device and log information for security and analytics.')}</li>
              <li>{t('privacy-collect-location', 'Location data (if you allow location access for queue features).')}</li>
              <li>{t('privacy-collect-cookies', 'Cookies and similar technologies for app functionality and analytics.')}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">{t('privacy-use-title', 'How We Use Your Information')}</h2>
            <ul className="list-disc pl-6 text-base-content/80">
              <li>{t('privacy-use-provide', 'To provide, personalize, and improve our queue services.')}</li>
              <li>{t('privacy-use-communicate', 'To communicate important updates, notifications, and offers.')}</li>
              <li>{t('privacy-use-security', 'To ensure security, prevent misuse, and detect fraud.')}</li>
              <li>{t('privacy-use-analytics', 'To analyze usage and improve our app experience.')}</li>
              <li>{t('privacy-use-legal', 'To comply with legal obligations and resolve disputes.')}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">{t('privacy-share-title', 'How We Share Your Information')}</h2>
            <ul className="list-disc pl-6 text-base-content/80">
              <li>{t('privacy-share-service', 'With trusted service providers who help us operate our app (under strict confidentiality agreements).')}</li>
              <li>{t('privacy-share-legal', 'With authorities if required by law or to protect our rights and users.')}</li>
              <li>{t('privacy-share-business', 'In connection with a business transfer (e.g., merger, acquisition).')}</li>
              <li>{t('privacy-share-consent', 'With your consent or at your direction.')}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">{t('privacy-rights-title', 'Your Rights & Choices')}</h2>
            <ul className="list-disc pl-6 text-base-content/80">
              <li>{t('privacy-rights-access', 'You can access, update, or delete your personal information at any time.')}</li>
              <li>{t('privacy-rights-optout', 'You may opt out of non-essential communications and analytics.')}</li>
              <li>{t('privacy-rights-privacy', 'You can manage your privacy settings in your account profile.')}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">{t('privacy-security-title', 'How We Protect Your Information')}</h2>
            <p className="text-base-content/80 leading-relaxed">
              {t('privacy-security', 'We use industry-standard security measures, including encryption and secure servers, to protect your data. However, no system is 100% secure, so we encourage you to use strong passwords and keep your credentials confidential.')}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">{t('privacy-contact-title', 'Contact Us')}</h2>
            <p className="mb-2 text-base-content/80">{t('privacy-contact', 'If you have any questions about this Privacy Policy or your data, please contact our support team.')}</p>
          </div>
        </div>
        <div className="mt-10 text-xs text-base-content/60 text-center">{t('privacy-updated', 'Last updated: June 25, 2025')}</div>
      </div>
    </section>
  )
}
