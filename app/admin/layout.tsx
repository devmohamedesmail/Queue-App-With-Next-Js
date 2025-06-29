'use client'
import React, { useState } from 'react'
import Admin_Header from '../components/admin_components/admin_header'
import Admin_Siderbar from '../components/admin_components/admin_siderbar'

export default function Layout({ children }:any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="h-screen flex overflow-hidden">
     
    
        <Admin_Siderbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
   
      <div className="flex flex-col flex-1 overflow-hidden">
    
        <Admin_Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 overflow-auto  p-4 container mx-auto">
          {children}
        </div>
      </div>





    </div>
  )
}
