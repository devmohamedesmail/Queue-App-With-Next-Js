'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Faq() {
  const { t } = useTranslation();
  const faqs = [
    {
      q: t('faq-q1', 'What is Q me and how does it work?'),
      a: t('faq-a1', 'Q me is a digital queue management app that lets you join, monitor, and manage queues remotely, reducing wait times and improving your experience.'),
    },
    {
      q: t('faq-q2', 'Is my personal information safe with Q me?'),
      a: t('faq-a2', 'Yes, we use industry-standard security measures to protect your data and never share your information without your consent.'),
    },
    {
      q: t('faq-q3', 'How do I join a queue?'),
      a: t('faq-a3', 'You can join a queue by scanning a QR code at the location or selecting a service in the app.'),
    },
    {
      q: t('faq-q4', 'Can I leave or cancel my spot in the queue?'),
      a: t('faq-a4', 'Yes, you can leave or cancel your spot at any time through the app interface.'),
    },
    {
      q: t('faq-q5', 'Who can I contact for support?'),
      a: t('faq-a5', 'You can reach our support team via the Help & Support section or by emailing us directly.'),
    },
  ];

  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto bg-white shadow-2xl rounded-2xl p-10 md:p-16" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-8 text-center tracking-tight drop-shadow">{t('faq-title', 'Frequently Asked Questions')}</h1>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-primary/5 rounded-xl p-5">
              <h2 className="text-lg font-bold text-primary mb-2">{faq.q}</h2>
              <p className="text-base-content/80 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
