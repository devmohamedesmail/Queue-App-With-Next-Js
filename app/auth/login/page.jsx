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

export default function page() {
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
        console.log("res", res)
      } catch (err) {
        console.log(err);
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
          setName('')
          setEmail('')
          setPassword('')
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
    <div>
      <Navbar />
      <div className='container m-auto px-5'>



        <div className='w-full md:1/2 lg:w-1/3 m-auto mt-10 p-5  shadow-lg rounded-lg my-10'>
          <div className='flex justify-center gap-5 my-10 bg-gray-200 py-2 px-2 rounded-lg'>
            <button className={`px-5 py-2 flex-1 transition-colors ease-in-out duration-500 rounded-lg ${activeTab === 'login' ? 'bg-main text-white' : 'bg-white text-black'}`} onClick={() => setActiveTab('login')}>{t('login')}</button>
            <button className={`px-5 py-2 flex-1 transition-colors ease-in-out duration-500 rounded-lg ${activeTab === 'register' ? 'bg-main text-white' : 'bg-white text-black'}`} onClick={() => setActiveTab('register')}>{t('register')}</button>
          </div>

          <div className="text-center text-2xl font-semibold">
            {activeTab === 'login' &&
              (
                <form onSubmit={loginFormik.handleSubmit}>
                  <div className='  '>
                    <h1 className='text-xl font-bold text-center mb-3'>{t('login')}</h1>
                    <Custom_Input
                      type={"email"}
                      name="email"
                      value={loginFormik.values.email}
                      onChange={loginFormik.handleChange}
                      label={t('email')}
                      error={loginFormik.touched.email && loginFormik.errors.email}
                    />
                    <Custom_Input
                      type={"password"}
                      name="password"
                      value={loginFormik.values.password}
                      onChange={loginFormik.handleChange}
                      label={t('password')}
                      error={loginFormik.touched.password && loginFormik.errors.password}
                    />

                    {loading ? <Custom_Spinner /> : <Custom_Button type='submit' title={t('login')} />}

                  </div>
                </form>
              )

            }
            {activeTab === 'register' &&

              (
                <form onSubmit={registerFormik.handleSubmit}>
                  <div>
                    <h1 className='text-xl font-bold text-center mb-3'>{t('register')}</h1>
                    <Custom_Input
                      type={"text"}
                      name="name"

                      value={registerFormik.values.name}
                      onChange={registerFormik.handleChange} label={t('name')}
                      error={registerFormik.touched.name && registerFormik.errors.name}
                    />
                    <Custom_Input
                      type={"email"}
                      name="email"
                      value={registerFormik.values.email}
                      onChange={registerFormik.handleChange}
                      label={t('email')}
                      error={registerFormik.touched.email && registerFormik.errors.email}
                    />
                    <Custom_Input
                      type={"password"}
                      name="password"
                      value={registerFormik.values.password} onChange={registerFormik.handleChange}
                      label={t('password')}
                      error={registerFormik.touched.password && registerFormik.errors.password}
                    />


                    {loading ? <Customer_Spinner /> :
                    
                    
                  
                    
                    <Custom_Button w='w-full' title={t('register')} type='submit' />}
                  </div>
                </form>
              )


            }
          </div>

        </div>








      </div>
      <Footer />
      <Mobile_Dock />
    </div>
  )
}
