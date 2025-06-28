
import React from 'react'
import Navbar from '@/app/components/user_components/navbar';
import Footer from '@/app/components/user_components/footer';
import Mobile_Dock from '@/app/components/user_components/mobile_dock';

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <Mobile_Dock />
    </div>
  )
}
