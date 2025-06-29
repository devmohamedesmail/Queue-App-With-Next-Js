'use client'
import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next';
import { PlaceContext } from '@/app/context/place_context';
import DataTable from 'react-data-table-component';
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Custom_Page_Title from '@/app/custom/custom_page_title';
import axios from 'axios';
import { api } from '@/app/config/api';



export default function Show_Places() {
  const { t, i18n } = useTranslation();
  const { places } = useContext(PlaceContext);
  const [filterText, setFilterText] = useState('');
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true);
  }, []);

  
  const filteredItems = places?.filter(
    item =>
      item.nameEn?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.nameAr?.toLowerCase().includes(filterText.toLowerCase())
  ) || [];

  const columns = [
    {
      name: t('admin.places.name-ar'),
      selector: (row:any) => row.nameAr,
      sortable: true,
    },
    {
      name: t('admin.places.name-en'),
      selector: (row:any) => row.nameEn,
      sortable: true,
    },
    {
      name: t('common.image'),
      selector: (row:any) => row.image,
      sortable: true,
      cell: (row:any) => (
        <img
          src={`${row.image}`}
          alt={row.nameEn || 'image'}
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      name: t('common.actions'),
      cell: (row:any) => (
        <div className="flex space-x-2">
          <Link href={`/admin/places/show/edit/${row._id}`} className="btn btn-success btn-sm"> <MdEdit color='white' /> </Link>
          <button className="btn btn-error btn-sm bg-red-600" onClick={() => handleDeletePlace(row)}><FaTrash color='white' /></button>
        </div>
      ),
    }
  ];

  const handleDeletePlace = async (row: any) => {
    if (window.confirm(t('admin.places.confirm-delete', 'Are you sure you want to delete this place?'))) {
      // TODO: Replace with actual delete logic
      const response  = await axios.post(`${api.baseUrl}api/v1/places/delete/place/${row._id}`);
      if (response.status === 200) {
        window.location.reload();

      }
    }
  };





  return (
    <div>
     <Custom_Page_Title title={t('admin.places.title')} />
      <div className='flex justify-between items-center mb-5'>
        <input
          type="text"
          className="input input-bordered focus:outline-0 max-w-xs"
          placeholder={t('search')}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Link href="/admin/places" className='btn bg-main text-white'>{t('admin.places.add-place')}</Link>
      </div>

      {isClient && (
        <DataTable
          title={t('places')}
          columns={columns}
          data={filteredItems}
          pagination
          highlightOnHover
          responsive
          // customStyles={customStyles}
          noDataComponent={<div className="text-center py-4">{t('common.no-data')}</div>}
        />
      )}


      

   

    </div>
  )
}
