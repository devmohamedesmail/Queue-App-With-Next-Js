import React, { useContext } from 'react'
import { PlaceContext } from '../../context/place_context'
import { api } from '../../config/api';
import Custom_sidebar_item from '../custom/Custom_sidebar_item';
import { useTranslation } from 'react-i18next';
import { CiHome } from "react-icons/ci";
import { MdOutlinePlace } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdInsertPageBreak } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { LiaHandsHelpingSolid } from "react-icons/lia";

function Admin_siderbar({ isSidebarOpen, setIsSidebarOpen }) {
  const { t } = useTranslation();
  const { settings } = useContext(PlaceContext)


  return (
    <>

      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-60 bg-black p-4 transform transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >

       
        <div className='flex justify-center items-center'>
            <img src={`${settings?.logo}`} className='w-18 h-18 rounded-full' alt="" />
        </div>

        <ul>

          <Custom_sidebar_item icon={<CgWebsite />} link="/"  title={t('visit-site')} />
          <Custom_sidebar_item icon={<CiHome />} link="/pages/admin/"  title={t('home')} />
          <Custom_sidebar_item icon={<MdOutlinePlace />} link="/pages/admin/places"  title={t('places')} />
          <Custom_sidebar_item icon={<FaUsersGear />} link="/pages/admin/users"  title={t('users')} />
          <Custom_sidebar_item icon={<IoSettingsOutline />} link="/pages/admin/setting"  title={t('setting')} />
          <Custom_sidebar_item icon={<MdInsertPageBreak />} link="/pages/admin/pages"  title={t('pages')} />
          <Custom_sidebar_item icon={<LiaHandsHelpingSolid />} link="/pages/admin/help"  title={t('help')} />





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

export default Admin_siderbar