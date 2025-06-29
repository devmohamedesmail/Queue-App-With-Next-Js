import React, { useContext } from 'react'
import { PlaceContext } from '../../context/place_context'
import { api } from '../../config/api';

import { useTranslation } from 'react-i18next';
import { CiHome } from "react-icons/ci";
import { MdOutlinePlace } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdInsertPageBreak } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { DataContext } from '@/app/context/data_context';
import Sidebar_Item from './sidebar_item';

function Admin_Siderbar({ isSidebarOpen, setIsSidebarOpen }:any) {
  const { t } = useTranslation();
  const { settings }:any = useContext(DataContext)


  return (
    <>

      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-60 bg-black p-4 transform transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >

       
        <div className='flex justify-center items-center'>
            <img src={`${settings?.logo}`} className='w-18 h-18 rounded-full' alt="" />
        </div>

        <ul className='mt-4 space-y-2 text-white'>

          

               <Sidebar_Item icon={<CgWebsite />} link="/"  title={t('admin.sidebar.visit-site')} target="_blank" />
               <Sidebar_Item icon={<CiHome />} link="/admin/"  title={t('admin.sidebar.home')} />
               <Sidebar_Item icon={<MdOutlinePlace />} link="/admin/places"  title={t('admin.sidebar.places')} />
               <Sidebar_Item icon={<FaUsersGear />} link="/admin/users"  title={t('admin.sidebar.users')} />
               <Sidebar_Item icon={<IoSettingsOutline />} link="/admin/setting"  title={t('admin.sidebar.setting')} />
               <Sidebar_Item icon={<MdInsertPageBreak />} link="/admin/pages"  title={t('admin.sidebar.pages')} />
               <Sidebar_Item icon={<LiaHandsHelpingSolid />} link="/admin/help"  title={t('admin.sidebar.help')} />


        </ul>









      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}


    </>
  )
}

export default Admin_Siderbar