'use client';
// import type { Metadata } from "next";
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import Navbar from "./components/user_components/navbar";
import Map from "./components/user_components/map";
import Footer from "./components/user_components/footer";
import Mobile_Dock from "./components/user_components/mobile_dock";
import Place_Section from "./sections/place_section";
import { AuthContext } from './context/auth_context';
import Hero_Section from './components/user_components/hero_section';
import Featured_Section from './components/user_components/featured_section';






export default function Home() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }






  return (
    <>
      <Navbar />

      {/* Hero Section */}
      {/* <Hero_Section /> */}

      {/* Features Section */}
      {/* <Featured_Section /> */}

      {/* Map Section */}
      <Map />

      {/* Places Section */}
      <section id="places" className="py-20 bg-gradient-to-br from-base-100 to-base-200">
        <Place_Section />
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('user.home-page.cta-title')}
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {t('user.home-page.cta-subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/login"
                className="btn btn-white btn-lg px-8 py-4 text-lg font-semibold bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                {t('user.home-page.get-started')}
              </a>
              <a
                href="#places"
                className="btn btn-outline btn-lg px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300"
              >
                {t('user.home-page.browse-all')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Mobile_Dock />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
      `}</style>
    </>
  );
}
