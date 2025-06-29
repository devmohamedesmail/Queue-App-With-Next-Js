'use client';
import { api } from '@/app/config/api';

import axios from 'axios';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { FaPlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import Custom_Page_Title from '@/app/custom/custom_page_title';
import Custom_Button from '@/app/custom/custom_button';
import Custom_Input from '@/app/custom/custom_input';
import Custom_Spinner from '@/app/custom/custom_spinner';

export default function Add_Place() {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | File>('');
  const [daysOfWork, setDaysOfWork] = useState<string[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleDay = (day: string) => {
    setDaysOfWork((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  const formik = useFormik({
    initialValues: {
      nameEn: '',
      nameAr: '',
      addressEn: '',
      addressAr: '',
      description: '',
      locationlink: '',
      lat: '',
      lng: '',
      timeStart: '',
      timeClosed: '',
      moveTurn: false,
      estimateTime: '',
      serviceTitleEn: '',
      serviceTitleAr: '',
      serviceEstimatedTime: '',
    },
    validationSchema: Yup.object({
      nameEn: Yup.string().required(t('required')),
      nameAr: Yup.string().required(t('required')),
      addressEn: Yup.string().required(t('required')),
      addressAr: Yup.string().required(t('required')),
      description: Yup.string().required(t('required')),
      lat: Yup.string().required(t('required')),
      lng: Yup.string().required(t('required')),
      timeStart: Yup.string().required(t('required')),
      timeClosed: Yup.string().required(t('required')),
      estimateTime: Yup.string().required(t('required')),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, typeof value === 'boolean' ? String(value) : value);
        });
        formData.append('daysOfWork', JSON.stringify(daysOfWork));
        formData.append('services', JSON.stringify(services));
        if (image && typeof image !== 'string') {
          formData.append('image', image);
        }
        const formDataObject: { [key: string]: any } = {};
        formData.forEach((value, key) => {
          formDataObject[key] = value;
        });
        console.log('Form Data:', formDataObject);


        const response = await axios.post(`${api.baseUrl}api/v1/places/add/new/place`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setLoading(false)
        if (response.status === 200) {
          console.log('Place added successfully', response.data);
          toast.success(t('added-success'));
        } else {
          console.error('Error adding place');
          toast.error(t('error'));
        }
      } catch (error) {
        setLoading(false)
        toast.error(t('error'));
      } finally {
        setLoading(false)
      }
    },
  });

  const handleAddService = () => {
    const { serviceTitleEn, serviceTitleAr, serviceEstimatedTime } = formik.values;


    if (!serviceTitleEn || !serviceTitleAr || !serviceEstimatedTime) return;

    setServices((prev) => [
      ...prev,
      {
        titleEn: serviceTitleEn,
        titleAr: serviceTitleAr,
        estimatedTime: serviceEstimatedTime,
      },
    ]);

    // Clear service fields
    formik.setFieldValue('serviceTitleEn', '');
    formik.setFieldValue('serviceTitleAr', '');
    formik.setFieldValue('serviceEstimatedTime', '');
  };

  const handleRemoveService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Custom_Page_Title title={t('admin.places.create-new-place')} />

      <div className='flex justify-end items-center mb-5'>
        <Link href="/admin/places/show" className='btn text-white bg-main'>{t('admin.places.show-places')}</Link>
      </div>


      <form onSubmit={formik.handleSubmit}>
        <div className="tabs tabs-border">
          {/* Tab 1 - Place Info */}
          <input type="radio" name="my_tabs_2" className="tab flex-1" aria-label={t('admin.places.place-information')} defaultChecked />
          <div className="tab-content border-base-300 bg-base-100 p-10">
            <Custom_Input
              label={t('admin.places.name-en')}
              name="nameEn"
              value={formik.values.nameEn}
              onChange={formik.handleChange}
              error={formik.touched.nameEn && typeof formik.errors.nameEn === 'string' ? formik.errors.nameEn : undefined}
            />
            <Custom_Input
              label={t('admin.places.name-ar')}
              name="nameAr"
              value={formik.values.nameAr}
              onChange={formik.handleChange}
              error={formik.touched.nameAr && typeof formik.errors.nameAr === 'string' ? formik.errors.nameAr : undefined}
            />
            <Custom_Input
              label={t('admin.places.address-en')}
              name="addressEn"
              value={formik.values.addressEn}
              onChange={formik.handleChange}
              error={formik.touched.addressEn && typeof formik.errors.addressEn === 'string' ? formik.errors.addressEn : undefined}
            />
            <Custom_Input
              label={t('admin.places.address-ar')}
              name="addressAr"
              value={formik.values.addressAr}
              onChange={formik.handleChange}
              error={formik.touched.addressAr && typeof formik.errors.addressAr === 'string' ? formik.errors.addressAr : undefined}
            />
            <Custom_Input
              label={t('admin.places.description')}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && typeof formik.errors.description === 'string' ? formik.errors.description : undefined}
            />
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-300">
              <input
                type="file"
                hidden
                onChange={(e) => setImage(e.target.files?.[0] || '')}
              />
              <p>{t('admin.places.select-image')}</p>
            </label>
          </div>

          {/* Tab 2 - Location */}
          <input type="radio" name="my_tabs_2" className="tab flex-1" aria-label={t('admin.places.place-location')} />
          <div className="tab-content border-base-300 bg-base-100 p-10">
            <Custom_Input
              label={t('admin.places.location-link')}
              name="locationlink"
              value={formik.values.locationlink}
              onChange={formik.handleChange}
            />
            <Custom_Input
              label={t('admin.places.latitude')}
              name="lat"
              value={formik.values.lat}
              onChange={formik.handleChange}
              error={formik.touched.lat && typeof formik.errors.lat === 'string' ? formik.errors.lat : undefined}
            />
            <Custom_Input
              label={t('admin.places.longitude')}
              name="lng"
              value={formik.values.lng}
              onChange={formik.handleChange}
              error={formik.touched.lng && typeof formik.errors.lng === 'string' ? formik.errors.lng : undefined}
            />
          </div>

          {/* Tab 3 - Settings */}
          <input type="radio" name="my_tabs_2" className="tab flex-1" aria-label={t('admin.places.place-settings')} />
          <div className="tab-content border-base-300 bg-base-100 p-10">
            <Custom_Input
              type="time"
              label={t('admin.places.start-work')}
              name="timeStart"
              value={formik.values.timeStart}
              onChange={formik.handleChange}
              error={formik.touched.timeStart && typeof formik.errors.timeStart === 'string' ? formik.errors.timeStart : undefined}
            />
            <Custom_Input
              type="time"
              label={t('admin.places.close-work')}
              name="timeClosed"
              value={formik.values.timeClosed}
              onChange={formik.handleChange}
              error={formik.touched.timeClosed && typeof formik.errors.timeClosed === 'string' ? formik.errors.timeClosed : undefined}
            />
            <div className="mb-4">
              <label className="block font-semibold mb-2">{t('admin.places.work-days')}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {weekDays.map((day) => (
                  <label key={day} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={daysOfWork.includes(day)}
                      onChange={() => toggleDay(day)}
                      className="checkbox"
                    />
                    <span>{t(day.toLowerCase())}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <label className="font-semibold">{t('admin.places.move-turn')}</label>
              <input
                type="checkbox"
                className="toggle"
                name="moveTurn"
                checked={formik.values.moveTurn}
                onChange={formik.handleChange}
              />
            </div>
            <Custom_Input
              label={t('admin.places.estimated-time')}
              name="estimateTime"
              value={formik.values.estimateTime}
              onChange={formik.handleChange}
              error={formik.touched.estimateTime && typeof formik.errors.estimateTime === 'string' ? formik.errors.estimateTime : undefined}
            />

          </div>



          {/* tab 4 - services */}
          <input type="radio" name="my_tabs_2" className="tab flex-1" aria-label={t('admin.places.place-services')} />
          <div className="tab-content border-base-300 bg-base-100 p-10">

            <div className='flex flex-col md:flex-row gap-2 mb-5'>
              <Custom_Input label={t('admin.places.service-title-en')} name="serviceTitleEn" value={formik.values.serviceTitleEn} onChange={formik.handleChange} />
              <Custom_Input label={t('admin.places.service-title-ar')} name="serviceTitleAr" value={formik.values.serviceTitleAr} onChange={formik.handleChange} />
              <Custom_Input label={t('admin.places.estimated-time')} name="serviceEstimatedTime" value={formik.values.serviceEstimatedTime} onChange={formik.handleChange} />
            </div>

            <button type="button" onClick={handleAddService} className="btn btn-outline btn-neutral mb-5">
               <FaPlus />
            </button>


            <ul className="mb-5 space-y-2">
              {services.map((service, index) => (
                <li key={index} className="p-2 bg-gray-100 rounded shadow flex justify-between items-center">
                  <div className="flex-1 flex flex-col">
                    <strong>{t('admin.places.title-en')}: {service.titleEn}</strong>  
                    <strong>{t('admin.places.title-ar')}: {service.titleAr} </strong>  
                    <strong>{t('admin.places.estimated-time')}: {service.estimatedTime} </strong> 
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(index)}
                    className="btn btn-sm btn-error text-white "
                  >
                    <FaTrashAlt />
                  </button>
                </li>
              ))}
            </ul>


           
            {loading ? <Custom_Spinner /> : <Custom_Button title={t('common.save')} type="submit" /> }
          </div>






        </div>
      </form>
    </div>
  )
}
