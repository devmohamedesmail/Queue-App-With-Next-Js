'use client'
import React from 'react';
import { useTranslation } from 'react-i18next';

interface CustomInputProps {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
}

export default function Custom_Input({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  className = '',
  icon,
  error,
  disabled = false,
  required = false,
  autoComplete,
}: CustomInputProps) {
    const {t,i18n}=useTranslation()
  return (
      <div className='mb-5 w-full'>
        <label className={`text-xs mb-1   w-full block ${i18n.language === 'en' ? 'text-left ' : 'text-right '}`}>{label}</label>
        <input 
           type={type} 
           name={name}
           placeholder={placeholder} 
           value={value} 
           onChange={onChange} 
           className={`input input-neutral focus:outline-0 w-full border-gray-400 focus:border-green-600 h-12 ${i18n.language === 'en' ? 'text-left' : 'text-right'}`} />
           <p className={`text-red-500 text-xs ${i18n.language === 'en' ? 'text-left' : 'text-right'}`}>{error ? error : ''}</p>
    </div>
  );
}
