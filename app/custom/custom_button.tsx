import React from 'react';

interface CustomButtonProps {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    w?: string; // Width class
}

export default function Custom_Button({
  children = 'Button',
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  loading = false,
  icon,
  variant = 'primary',
  w= 'w-full',
}: CustomButtonProps) {
  const base = 'btn px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200';
  const variants: Record<string, string> = {
    primary: 'bg-main text-white hover:bg-main/90',
    secondary: 'bg-gray-200 text-main hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'bg-transparent border border-main text-main hover:bg-main hover:text-white',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} w-full ${variants[variant]} ${className}`}
      disabled={disabled || loading}
    >
      {loading && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
}
