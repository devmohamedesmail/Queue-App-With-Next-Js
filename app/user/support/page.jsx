'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Support() {
  const { t } = useTranslation();
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto bg-white shadow-2xl rounded-2xl p-10 md:p-16" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight drop-shadow" style={{ color: 'var(--color-main)' }}>{t('support-title', 'Support')}</h1>
        <p className="mb-8 text-base-content/80 leading-relaxed text-center text-lg" style={{ color: 'var(--color-main)' }}>
          {t('support-intro', 'Need help? Our support team is here to assist you with any questions, issues, or feedback regarding Q me.')}
        </p>
        <form className="space-y-6">
          <div>
            <label className="block text-base font-semibold mb-2" htmlFor="name" style={{ color: 'var(--color-second)' }}>{t('support-name', 'Your Name')}</label>
            <input id="name" name="name" type="text" className="w-full rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2" placeholder={t('support-name-placeholder', 'Enter your name')} style={{ color: 'var(--color-main)' }} />
          </div>
          <div>
            <label className="block text-base font-semibold mb-2" htmlFor="email" style={{ color: 'var(--color-second)' }}>{t('support-email', 'Your Email')}</label>
            <input id="email" name="email" type="email" className="w-full rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2" placeholder={t('support-email-placeholder', 'Enter your email')} style={{ color: 'var(--color-main)' }} />
          </div>
          <div>
            <label className="block text-base font-semibold mb-2" htmlFor="message" style={{ color: 'var(--color-second)' }}>{t('support-message', 'Message')}</label>
            <textarea id="message" name="message" rows={5} className="w-full rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2" placeholder={t('support-message-placeholder', 'How can we help you?')} style={{ color: 'var(--color-main)' }}></textarea>
          </div>
          <button type="submit" className="w-full font-bold rounded px-3 py-2 hover:opacity-90 transition" style={{ background: 'var(--color-second)', color: 'var(--color-main)' }}>{t('support-submit', 'Send Message')}</button>
        </form>
        <div className="mt-10 text-center text-base-content/60 text-sm" style={{ color: 'var(--color-main)' }}>
          {t('support-response', 'We aim to respond to all inquiries within 24 hours.')}
        </div>
      </div>
    </section>
  )
}
