import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface NavbarHeaderItemProps {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

export default function Navbar_Header_Item({ title, href, icon }: NavbarHeaderItemProps) {
  return (
    <Link
      className="btn btn-ghost bg-main text-white hover:bg-main/90 flex items-center gap-2 px-4 py-2 rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-main/50"
      href={href}
    >
      {icon && <span className="text-lg flex items-center">{icon}</span>}
      <span className="font-semibold tracking-wide">{title}</span>
    </Link>
  );
}
