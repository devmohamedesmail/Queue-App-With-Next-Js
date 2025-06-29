'use client'
import { api } from '@/app/config/api'
import Custom_Page_Title from '@/app/custom/custom_page_title';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useTranslation } from 'react-i18next'
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Custom_Input from '@/app/custom/custom_input';
import Custom_Button from '@/app/custom/custom_button';
import { PlaceContext } from '@/app/context/place_context';
import { useFormik } from 'formik';
import Custom_Spinner from '@/app/custom/custom_spinner';
import { toast } from 'react-toastify';


function Users_Page() {
  const [users, setusers] = useState<any[]>([]);
  const { t, i18n } = useTranslation();
  const [filterText, setFilterText] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const {places} = useContext(PlaceContext)
  const [loading, setLoading] = useState(false);

  const fetch_users = async () => {
    try {
      const res = await axios.get(`${api.baseUrl}api/v1/users`);
      setusers(res.data.users || []);
    } catch (error) {
      toast.error(t('common.fetch-error'));
    }
  };

  useEffect(() => {
    fetch_users();
  }, []);

  const filteredItems = users.filter(
    (item: any) =>
      (item.name?.toLowerCase() || '').includes(filterText.toLowerCase()) ||
      (item.email?.toLowerCase() || '').includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: t('common.name'),
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: t('common.email'),
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: t('admin.users.role'),
      selector: (row: any) => row.role,
      sortable: true,
    },
    {
      name: t('common.actions'),
      cell: (row: any) => (
        <div className="flex space-x-2">
          <button
            className="btn btn-success btn-xs"
            onClick={() => {
              setSelectedUser(row);
              (document.getElementById('my_modal_3') as HTMLDialogElement)?.showModal();
            }}
          >
            <MdEdit color="white" />
          </button>
          <button className="btn btn-error bg-red-600 btn-xs" onClick={() => handleDeleteUser(row)}>
            <FaTrash color="white" />
          </button>
        </div>
      ),
    },
  ];



const formik = useFormik({
    initialValues: {
      name: selectedUser?.name || '',
      email: selectedUser?.email || '',
      role: selectedUser?.role || '',
      placeId: selectedUser?.placeId || '',
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log('Form values:', values);
      setLoading(true);
      try {
        const res = await axios.post(`${api.baseUrl}api/v1/auth/edit/user/${selectedUser?._id}`, values);
        if (res.status === 200) {
          fetch_users();
          setSelectedUser(null);
          (document.getElementById('my_modal_3') as HTMLDialogElement)?.close();
        }
          setLoading(false);
          toast.success(t('common.update-success'));
      } catch (error) {
          toast.error(t('common.update-error'));
          setLoading(false);
      }finally{
        setLoading(false);
      }
    },
  });

  const handleDeleteUser = async (user: any) => {
    if (!window.confirm(t('common.confirm-delete-user'))) return;
    setLoading(true);
    try {
      const res = await axios.get(`${api.baseUrl}api/v1/auth/delete/user/${user._id}`);
      if (res.status === 200) {
        fetch_users();
        toast.success(t('common.delete-success'));
      }
    } catch (error) {
      toast.error(t('common.error-occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Custom_Page_Title title={t('admin.users.title')} />


      <div className="w-full m-auto px-5 md:w-1/2 flex justify-center items-center">
        <Custom_Input
          placeholder={t('common.search')}
          value={filterText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}

        />
      </div>
      <DataTable
        
        columns={columns}
        data={filteredItems}
        pagination
        highlightOnHover
        responsive
      
        noDataComponent={<Custom_Spinner />}
      />


      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-md rounded-2xl shadow-2xl bg-white dark:bg-base-200 p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-base-300 bg-gradient-to-r from-primary/90 to-primary/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold uppercase text-white border-2 border-white">
                {selectedUser?.name?.[0] || '?'}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight text-white">{t('admin.users.edit-user')} {selectedUser?.name}</h3>
                <p className="text-sm text-white/80">{selectedUser?.email}</p>
              </div>
            </div>
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20 transition"
                aria-label="Close"
              >
                ✕
              </button>
            </form>
          </div>
          {selectedUser ? (
            <div className="px-6 py-6 bg-white dark:bg-base-200">
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <Custom_Input
                  label={t('common.name')}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  disabled
                  className="input input-bordered w-full bg-gray-100 dark:bg-base-300 border border-gray-200 dark:border-base-300"
                />
                <Custom_Input
                  label={t('common.email')}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  disabled
                  className="input input-bordered w-full bg-gray-100 dark:bg-base-300 border border-gray-200 dark:border-base-300"
                />
                {/* Role select */}
                <div>
                  <label className={`block font-semibold mb-1 ${i18n.language === 'ar' ? 'text-right' : ''}`}>{t('admin.users.role')}</label>
                  <select
                    className="select select-bordered w-full"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                  >
                    <option value="">{t('admin.users.select-role')}</option>
                    <option value="admin">{t('admin.users.admin')}</option>
                    <option value="subscriber">{t('admin.users.subscriber')}</option>
                    <option value="user">{t('admin.users.user')}</option>
                  </select>
                </div>
                {/* Place select if role is subscriber */}
                {formik.values.role === 'subscriber' && (
                  <div>
                    <label className="block font-semibold mb-1">{t('select-place')}</label>
                    <select
                      className="select select-bordered w-full"
                      name="placeId"
                      value={formik.values.placeId}
                      onChange={formik.handleChange}
                    >
                      <option value="">{t('choose-place')}</option>
                      {places && places.length > 0 && places.map((place: any) => (
                        <option key={place._id} value={place._id}>{place.nameEn || place.name}</option>
                      ))}
                    </select>
                  </div>
                )}
               
{loading ? <Custom_Spinner />:   <Custom_Button
                  title={t('common.update')}
                  type="submit"
                  className="w-full mt-4  shadow-md hover:scale-[1.02] transition"
                />}
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-base-200">
              <span className="text-5xl mb-3">😕</span>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">{t('no-user-selected')}</p>
            </div>
          )}
        </div>
      </dialog>





      
    </div>
  )
}

export default Users_Page