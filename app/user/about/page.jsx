'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation();
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto bg-white shadow-2xl rounded-2xl p-10 md:p-16" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <h1 className="text-4xl font-extrabold text-primary mb-6 text-center tracking-tight drop-shadow">{t('about-title', 'About Q me')}</h1>
        <p className="mb-8 text-base-content/80 leading-relaxed text-center text-lg">
          {t('about-description', 'Q me is a modern queue management solution designed to streamline the waiting experience for both businesses and their customers. Our mission is to make waiting more efficient, transparent, and stress-free.')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          <div className="bg-primary/5 rounded-xl p-6 flex flex-col items-start">
            <h2 className="text-xl font-bold text-primary mb-2">{t('about-vision-title', 'Our Vision')}</h2>
            <p className="text-base-content/80 leading-relaxed">
              {t('about-vision', 'To revolutionize the way people wait by providing smart, digital queueing systems that empower users and improve service quality everywhere.')}
            </p>
          </div>
          <div className="bg-primary/5 rounded-xl p-6 flex flex-col items-start">
            <h2 className="text-xl font-bold text-primary mb-2">{t('about-values-title', 'Our Values')}</h2>
            <ul className="list-disc pl-6 text-base-content/80">
              <li>{t('about-value-customer', 'Customer-Centricity')}</li>
              <li>{t('about-value-innovation', 'Innovation & Simplicity')}</li>
              <li>{t('about-value-transparency', 'Transparency & Trust')}</li>
              <li>{t('about-value-improvement', 'Continuous Improvement')}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-xl font-bold text-primary mb-2">{t('about-why-title', 'Why Choose Q me?')}</h2>
          <p className="text-base-content/80 leading-relaxed max-w-2xl mx-auto">
            {t('about-why', 'With real-time updates, easy-to-use interfaces, and a commitment to excellent support, Q me helps you manage queues efficiently and keep your customers happy. Join us in transforming the waiting experience for everyone.')}
          </p>
        </div>
      </div>
    </section>
  )
}
