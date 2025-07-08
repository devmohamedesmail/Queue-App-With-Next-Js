'use client'
import Avatar_Basic_Info from '@/app/components/user_components/avatar_basic_info'
import Profile_Additional_Info from '@/app/components/user_components/profile_additional_info'
import Profile_Cover from '@/app/components/user_components/profile_cover'
import Profile_Header from '@/app/components/user_components/profile_header'
import Profile_Info from '@/app/components/user_components/profile_info'
import Profile_Quick_Actions from '@/app/components/user_components/profile_quick_actions'
import { AuthContext } from '@/app/context/auth_context'
import React, { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function Profile() {
  const { auth  , logout} = useContext(AuthContext)
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: ''
  })

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
    if (auth?.user?.user) {
      setEditedProfile({
        name: auth.user.user.name || '',
        email: auth.user.user.email || '',
        phone: auth.user.user.phone || '',
        bio: auth.user.user.bio || '',
        location: auth.user.user.location || ''
      })
    }
  }, [auth])

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-50 to-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    )
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedProfile({
      name: auth?.user?.user?.name || '',
      email: auth?.user?.user?.email || '',
      phone: auth?.user?.user?.phone || '',
      bio: auth?.user?.user?.bio || '',
      location: auth?.user?.user?.location || ''
    })
  }

  const handleSave = () => {
    // TODO: Implement save logic to update user profile
    console.log('Saving profile:', editedProfile)
    setIsEditing(false)
    // You can call an API to update the profile here
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedProfile({
      name: auth?.user?.user?.name || '',
      email: auth?.user?.user?.email || '',
      phone: auth?.user?.user?.phone || '',
      bio: auth?.user?.user?.bio || '',
      location: auth?.user?.user?.location || ''
    })
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-50 to-base-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
       
        <Profile_Header />

        {/* Main Profile Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Cover Section */}
         <Profile_Cover  isEditing={isEditing} handleEdit={handleEdit} handleSave={handleSave} handleCancel={handleCancel} />

          {/* Profile Content */}
          <div className="px-8 pb-8 -mt-20 relative">
            {/* Avatar and Basic Info */}
           <Avatar_Basic_Info auth={auth} />

            {/* Profile Information */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Personal Information */}
             <Profile_Info isEditing={isEditing} setEditedProfile={setEditedProfile} editedProfile={editedProfile} auth={auth}  />

              {/* Additional Information */}
             <Profile_Additional_Info isEditing={isEditing} setEditedProfile={setEditedProfile} editedProfile={editedProfile} auth={auth} />
            </div>

            {/* Quick Actions */}
         <Profile_Quick_Actions logout={logout} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile