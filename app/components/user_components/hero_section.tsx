import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Hero_Section() {
    const { t } = useTranslation();
  return (
     <section className="relative min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-secondary rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-accent rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mb-6 animate-fade-in">
              {t('user.home-page.hero-title')}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-base-content/80 mb-8 leading-relaxed animate-fade-in-delay">
              {t('user.home-page.hero-subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="#features"
                className="btn btn-primary btn-lg px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                {t('user.home-page.get-started')}
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#places"
                className="btn btn-outline btn-lg px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
              >
                {t('user.home-page.discover-places')}
              </a>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-base-content/70">Active Users</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-secondary mb-2">500+</div>
                <div className="text-base-content/70">Partner Locations</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-accent mb-2">99.9%</div>
                <div className="text-base-content/70">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
  )
}
