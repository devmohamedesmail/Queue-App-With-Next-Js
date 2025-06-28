'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Help_Center() {
  const { t } = useTranslation();
  const helpTopics = [
    {
      title: t('helpcenter-getting-started-title', 'Getting Started'),
      desc: t('helpcenter-getting-started-desc', 'Learn how to create an account, join a queue, and start using Q me.'),
      link: '/pages/user/faq',
      linkLabel: t('helpcenter-faq-link', 'Read FAQ'),
    },
    {
      title: t('helpcenter-manage-queue-title', 'Managing Your Queue'),
      desc: t('helpcenter-manage-queue-desc', 'Tips for joining, leaving, and monitoring your queue status.'),
      link: '/support',
      linkLabel: t('helpcenter-support-link', 'Contact Support'),
    },
    {
      title: t('helpcenter-privacy-title', 'Privacy & Security'),
      desc: t('helpcenter-privacy-desc', 'Understand how we protect your data and your privacy rights.'),
      link: '/pages/user/privacy',
      linkLabel: t('helpcenter-privacy-link', 'Privacy Policy'),
    },
    {
      title: t('helpcenter-troubleshooting-title', 'Troubleshooting'),
      desc: t('helpcenter-troubleshooting-desc', 'Find solutions to common issues and get help fast.'),
      link: '/support',
      linkLabel: t('helpcenter-support-link', 'Contact Support'),
    },
  ];

  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto bg-white shadow-2xl rounded-2xl p-10 md:p-16" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-8 text-center tracking-tight drop-shadow">{t('helpcenter-title', 'Help Center')}</h1>
        <p className="mb-10 text-base-content/80 leading-relaxed text-center text-lg">
          {t('helpcenter-intro', 'Find answers, tips, and support for using Q me. We are here to help you get the most out of your queue experience.')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {helpTopics.map((topic, idx) => (
            <div key={idx} className="bg-primary/5 rounded-xl p-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow">
              <div>
                <h2 className="text-xl font-bold text-primary mb-2">{topic.title}</h2>
                <p className="text-base-content/80 leading-relaxed mb-4">{topic.desc}</p>
              </div>
              <a href={topic.link} className="inline-block mt-auto text-primary font-semibold hover:underline hover:text-yellow-500 transition">
                {topic.linkLabel}
              </a>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center text-base-content/60 text-sm">
          {t('helpcenter-contact', 'Still need help?')} <a href="/support" className="text-primary font-semibold hover:underline">{t('helpcenter-contact-link', 'Contact our support team')}</a>
        </div>
      </div>
    </section>
  )
}
