'use client'




import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/app/context/auth_context'
import Custom_Input from '@/app/custom/custom_input'
import Custom_Button from '@/app/custom/custom_button'
import Navbar from '@/app/components/user_components/navbar'
import Footer from '@/app/components/user_components/footer'
import Mobile_Dock from '@/app/components/user_components/mobile_dock'
import Custom_Spinner from '@/app/custom/custom_spinner'
import axios from 'axios';

export default function Login_Page() {
  const [loading, setLoading] = useState(false)
  const { auth, setAuth, login, register, logout } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('login')
  const { t, i18n } = useTranslation();
  const router = useRouter()




  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t('invalid-email')).required(t('required')),
      password: Yup.string().required(t('required')),
    }),


    onSubmit: async (values) => {
      
      try {
        setLoading(true)
        const res = await login(values.email, values.password)
        const role = res.user.user.role;

        
        if (res.status === 200) {
          toast.success('✅ Login successful');
          setAuth(res.user.user.user);
          if (role === 'admin') {
            router.push('/admin')
          }else if (role === 'subscriber'){
            router.push('/subscriber')
          } 
          else if (role === 'user') {
            router.push('/')
          } else {
            router.push('/')
          }
        }
      } catch (err) {
        toast.error(t('common.login-failed'));
      } finally {
        setLoading(false);
      }
    },
  });






  const registerFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',

    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('required')),
      email: Yup.string().email(t('invalid-email')).required(t('required')),
      password: Yup.string().min(6, t('min-6')).required(t('required')),

    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await register(values.name, values.email, values.password)
        if (res.status === 201) {
          toast.success('✅ Registration successful');
        
        }

        setLoading(false)
      } catch (err) {
        toast.error(t('register-failed'));
      } finally {
        setLoading(false);
      }
    },
  });
















  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-main/5 to-white">
      <Navbar />
      <div className='container m-auto px-5 flex-1 flex flex-col justify-center'>
        <div className='w-full md:w-2/3 lg:w-1/3 m-auto mt-10 p-8 shadow-2xl rounded-2xl my-10 bg-white/95 border border-gray-100'>
          <div className='flex justify-center gap-5 my-10 bg-gray-100 py-2 px-2 rounded-xl'>
            <button className={`px-5 py-2 flex-1 transition-colors ease-in-out duration-500 rounded-lg text-lg font-semibold shadow-sm ${activeTab === 'login' ? 'bg-main text-white' : 'bg-white text-main border border-main'}`} onClick={() => setActiveTab('login')}>{t('common.login')}</button>
            <button className={`px-5 py-2 flex-1 transition-colors ease-in-out duration-500 rounded-lg text-lg font-semibold shadow-sm ${activeTab === 'register' ? 'bg-main text-white' : 'bg-white text-main border border-main'}`} onClick={() => setActiveTab('register')}>{t('common.register')}</button>
          </div>
          <div className="flex flex-col items-center mb-6">
            <div className="text-main text-4xl mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118A7.5 7.5 0 0112 15.75a7.5 7.5 0 017.5 4.368M18 21.75a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{activeTab === 'login' ? t('common.login') : t('common.register')}</h2>
            <p className="text-gray-500 text-sm text-center max-w-xs mb-2">
              {activeTab === 'login' ? t('common.login-desc') : t('common.register-desc')}
            </p>
          </div>
          <div className="text-center text-2xl font-semibold">
            {activeTab === 'login' && (
              <form onSubmit={loginFormik.handleSubmit} className="space-y-4">
                <Custom_Input
                  type={"email"}
                  name="email"
                  value={loginFormik.values.email}
                  onChange={loginFormik.handleChange}
                  label={t('common.email')}
                  error={loginFormik.touched.email && typeof loginFormik.errors.email === 'string' ? loginFormik.errors.email : undefined}
                />
                <Custom_Input
                  type={"password"}
                  name="password"
                  value={loginFormik.values.password}
                  onChange={loginFormik.handleChange}
                  label={t('common.password')}
                  error={loginFormik.touched.password && typeof loginFormik.errors.password === 'string' ? loginFormik.errors.password : undefined}
                />
                {loading ? <Custom_Spinner /> : <Custom_Button type='submit' title={t('common.login')} w='w-full' />}
              </form>
            )}
            {activeTab === 'register' && (
              <form onSubmit={registerFormik.handleSubmit} className="space-y-4">
                <Custom_Input
                  type={"text"}
                  name="name"
                  value={registerFormik.values.name}
                  onChange={registerFormik.handleChange}
                  label={t('common.name')}
                  error={registerFormik.touched.name && typeof registerFormik.errors.name === 'string' ? registerFormik.errors.name : undefined}
                />
                <Custom_Input
                  type={"email"}
                  name="email"
                  value={registerFormik.values.email}
                  onChange={registerFormik.handleChange}
                  label={t('common.email')}
                  error={registerFormik.touched.email && typeof registerFormik.errors.email === 'string' ? registerFormik.errors.email : undefined}
                />
                <Custom_Input
                  type={"password"}
                  name="password"
                  value={registerFormik.values.password}
                  onChange={registerFormik.handleChange}
                  label={t('common.password')}
                  error={registerFormik.touched.password && typeof registerFormik.errors.password === 'string' ? registerFormik.errors.password : undefined}
                />
                {loading ? <Custom_Spinner /> : <Custom_Button w='w-full' title={t('common.register')} type='submit' />}
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Mobile_Dock />
    </div>
  )
}
