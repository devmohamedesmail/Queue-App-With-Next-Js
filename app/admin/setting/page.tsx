'use client'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik';
import { PlaceContext } from '@/app/context/place_context';
import axios from 'axios';
import { api } from '@/app/config/api';
import { toast } from 'react-toastify';
import Custom_Input from '@/app/custom/custom_input';
import Custom_Button from '@/app/custom/custom_button';
import Custom_Page_Title from '@/app/custom/custom_page_title';
import Custom_Spinner from '@/app/custom/custom_spinner';
import { DataContext } from '@/app/context/data_context';

function SettingPage() {
  const { t } = useTranslation();
  const { places, fetchplaces } = useContext(PlaceContext);
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  // Define a local Settings type for safety
  type Settings = {
    nameEn?: string;
    nameAr?: string;
    descriptionEn?: string;
    descriptionAr?: string;
    address?: string;
    email?: string;
    phone?: string;
    logo?: string;
  };
  const { settings } = useContext(DataContext) as { settings: Settings | null };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nameEn: settings?.nameEn || '',
      nameAr: settings?.nameAr || '',
      descriptionEn: settings?.descriptionEn || '',
      descriptionAr: settings?.descriptionAr || '',
      address: settings?.address || '',
      email: settings?.email || '',
      phone: settings?.phone || '',
      logo: settings?.logo || '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('nameEn', values.nameEn);
        formData.append('nameAr', values.nameAr);
        formData.append('descriptionEn', values.descriptionEn);
        formData.append('descriptionAr', values.descriptionAr);
        formData.append('address', values.address);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        if (logo) {
          formData.append('logo', logo);
        }
        const res = await axios.post(`${api.baseUrl}api/v1/settings/update/settings`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success(t('added-success'));
      } catch (error) {
        console.log(error);
        toast.error(t('error'));
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <Custom_Page_Title title={t('admin.settings.title')} />
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Custom_Input label={t('admin.settings.site-name-en')} value={formik.values.nameEn} name="nameEn" onChange={formik.handleChange} />
            <Custom_Input label={t('admin.settings.site-name-ar')} value={formik.values.nameAr} name="nameAr" onChange={formik.handleChange} />
            <Custom_Input label={t('admin.settings.site-description-en')} value={formik.values.descriptionEn} name="descriptionEn" onChange={formik.handleChange} />
            <Custom_Input label={t('admin.settings.site-description-ar')} value={formik.values.descriptionAr} name="descriptionAr" onChange={formik.handleChange} />
            <Custom_Input label={t('admin.settings.site-email')} value={formik.values.email} name="email" onChange={formik.handleChange} />
            <Custom_Input label={t('admin.settings.site-phone')} value={formik.values.phone} name="phone" onChange={formik.handleChange} />
            <label htmlFor="logo" className='border border-dashed p-3 flex justify-center items-center flex-col py-10 my-5'>
              {settings?.logo && (
                <img src={`${settings.logo}`} alt="" className="w-18 h-18" />
              )}
              <input id="logo" type='file' className='hidden' onChange={(e) => setLogo(e.target.files?.[0] || null)} />
              <p className=''>{t('admin.settings.site-logo')}</p>
            </label>
          </div>
          {loading ? <Custom_Spinner /> : <Custom_Button type="submit" title={t('common.update')} />}
        </form>
      </div>
    </div>
  );
}

export default SettingPage