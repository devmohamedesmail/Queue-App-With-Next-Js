import React from 'react';
import { useTranslation } from 'react-i18next';
import { useState, CSSProperties } from "react";
import { ClockLoader } from "react-spinners";

export default function Custom_Spinner() {
  const { t } = useTranslation();
  return (
    <div className='flex items-center justify-center '>
      <ClockLoader
        color="#862877"
       
        cssOverride={{ display: 'block', margin: '0 auto' } as CSSProperties}
        speedMultiplier={1}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
