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
      className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-300 transition-colors cursor-pointer ${className}`}
      onClick={onClick}
    >
      {icon && <span className="text-xl text-main flex-shrink-0">{icon}</span>}
      {title && <span className="font-medium text-base text-base-content">{title}</span>}
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
