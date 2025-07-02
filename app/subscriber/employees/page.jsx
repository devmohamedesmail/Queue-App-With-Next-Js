'use client'
import { AuthContext } from '@/app/context/auth_context';
import React, { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios';
import { api } from '@/app/config/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Custom_Page_Title from '@/app/custom/custom_page_title';
import Custom_Input from '@/app/custom/custom_input';
import Custom_Button from '@/app/custom/custom_button';
import { FaPlus, FaUser, FaEnvelope, FaUserTag } from "react-icons/fa";












function Employees() {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);




  const fetch_employees_for_place = async (placeId) => {
    try {
      const res = await axios.get(`${api.baseUrl}api/v1/subscriber/users/${placeId}`)
      setEmployees(res.data.data)
      console.log(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (auth?.user?.user?.placeId) {
      fetch_employees_for_place(auth.user.user.placeId)
    }
  }, [auth])


  const fromik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('common.name-required')),
      email: Yup.string().email(t('common.invalid-email')).required(t('email-required')),
      password: Yup.string().required(t('common.password-required')),
    }),
    onSubmit: values => {
      try {
        const res = axios.post(`${api.baseUrl}api/v1/subscriber/add/user/${auth.user.user.placeId}`, {
          name: values.name,
          email: values.email,
          password: values.password,
        })
        // Optionally, close the modal here
        document.getElementById('my_modal_3').close();
        // Refresh employee list
        fetch_employees_for_place(auth.user.user.placeId);
        toast.success(t('common.added-success'));
      } catch (error) {
        toast.error(t('common.error-occurred'));

      }
    },
  });



  return (
    <div className='container mx-auto p-4'>
      <Custom_Page_Title title={t('subscriber.employees.title')} />



      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn text-white bg-main" onClick={() => document.getElementById('my_modal_3').showModal()}>
        <FaPlus />
        {t('subscriber.employees.add-employee')}
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box rounded-2xl shadow-lg border border-gray-100 bg-white/95 p-8 relative">
          <form method="dialog">
            <button className="btn btn-sm btn-circle bg-red-600 text-white btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="flex flex-col items-center mb-6">
            <div className="text-main text-4xl mb-2">
              <FaUser />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{t('subscriber.employees.add-employee')}</h3>
            <p className="text-gray-500 text-sm text-center max-w-xs">{t('subscriber.employees.add-employee-desc', 'Fill in the details below to add a new employee.')}</p>
          </div>
          <div className='my-5 mt-6'>
            <form onSubmit={fromik.handleSubmit} className="space-y-4">
              <Custom_Input name={'name'} label={t('common.name')} type="text" placeholder={t('common.name')} value={fromik.values.name} onChange={fromik.handleChange} error={fromik.errors.name} />
              <Custom_Input name={'email'} label={t('common.email')} type="text" placeholder={t('common.email')} value={fromik.values.email} onChange={fromik.handleChange} error={fromik.errors.email} />
              <Custom_Input name={'password'} label={t('common.password')} type="password" placeholder={t('common.password')} value={fromik.values.password} onChange={fromik.handleChange} error={fromik.errors.password} />
              <Custom_Button title={t('common.save')} type="submit" />
            </form>
          </div>
        </div>
      </dialog>









      <div className="mt-6 space-y-4">
        {employees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 bg-white/90 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <FaUser className="text-blue-500 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t('subscriber.employees.no-employees')}</h3>
            <p className="text-gray-500 text-center mb-6 max-w-md">
              {t('subscriber.employees.no-employees-desc', 'You haven\'t added any employees yet. Click the button above to add your first employee.')}
            </p>
            <button 
              className="btn text-white bg-main hover:bg-main/90 transition-colors duration-200"
              onClick={() => document.getElementById('my_modal_3').showModal()}
            >
              <FaPlus />
              {t('subscriber.employees.add-employee')}
            </button>
          </div>
        ) : (
          employees.map((emp) => (
            <div
              key={emp._id}
              className="p-5 border rounded-2xl shadow flex flex-col sm:flex-row sm:items-center border-gray-200 sm:justify-between bg-white/90 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-center gap-4 mb-3 sm:mb-0">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-main/10 text-main text-2xl group-hover:bg-main group-hover:text-white transition-all duration-200">
                  <FaUser />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-800 font-semibold">
                    <FaUser className="text-main" />
                    <span>{t('name')}:</span>
                    <span>{emp.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <FaEnvelope className="text-main" />
                    <span>{t('email')}:</span>
                    <span>{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <FaUserTag className="text-main" />
                    <span>{t('role')}:</span>
                    <span className="capitalize">{emp.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Employees