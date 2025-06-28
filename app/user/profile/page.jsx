'use client'
import { AuthContext } from '@/app/context/auth_context'
import React, { useContext } from 'react'

function Profile() {
  const { auth } = useContext(AuthContext)
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-base-200">
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg ring-4 ring-primary/20">
          {/* Avatar or initials */}
          {auth?.user?.user?.avatar ? (
            <img src={auth.user.user.avatar} alt="Avatar" className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-4xl font-bold text-white">
              {auth?.user?.user?.name?.[0]?.toUpperCase() || '?'}
            </span>
          )}
        </div>
        <h2 className="text-2xl font-extrabold text-primary mb-1">{auth?.user?.user?.name}</h2>
        <p className="text-base-content/70 mb-4">{auth?.user?.user?.email}</p>
        <div className="w-full border-t border-base-200 my-4"></div>
        <div className="w-full flex flex-col gap-2">
          {/* Add more profile details here if needed */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base-content/80">Role:</span>
            <span className="badge badge-outline badge-primary text-xs px-3 py-1">
              {auth?.user?.user?.role || 'User'}
            </span>
          </div>
        </div>
        {/* Add edit profile or logout button if needed */}
      </div>
    </div>
  )
}

export default Profile