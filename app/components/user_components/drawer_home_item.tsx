import React from 'react';
import Link from 'next/link';

interface DrawerHomeItemProps {
  title?: string;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Drawer_Home_Item({
  title,
  href = '#',
  icon,
  className = '',
  onClick,
}: DrawerHomeItemProps) {
  const content = (
    <div
      className={`flex items-center gap-4 px-4 py-3  cursor-pointer  border-b ${className}`}
      onClick={onClick}
    >
      {icon && <span className="text-xl text-main flex-shrink-0">{icon}</span>}
      {title && <span className="font-medium text-sm text-base text-main">{title}</span>}
    </div>
  );

  return href && href !== '#' ? (
    <Link href={href} className="block w-full">
      {content}
    </Link>
  ) : (
    <div className="block w-full">{content}</div>
  );
}
