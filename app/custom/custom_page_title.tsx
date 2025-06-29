import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

interface CustomPageTitleProps {
  title?: string;
  className?: string;
  backHref?: string;
}

export default function Custom_Page_Title({ title = '', className = '', backHref }: CustomPageTitleProps) {
  const router = useRouter();
  return (
    <div className={`flex items-center gap-4 py-4 px-2 bg-base-100 rounded-xl shadow mb-6 ${className}`}>
      <button
        type="button"
        onClick={() => backHref ? router.push(backHref) : router.back()}
        className="btn btn-ghost btn-circle text-main hover:bg-main/10"
        aria-label="Back"
      >
        <FaArrowLeft size={20} />
      </button>
      <h1 className="text-xl md:text-xl font-extrabold text-main tracking-tight truncate">
        {title}
      </h1>
    </div>
  );
}
