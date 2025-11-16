// src/components/common/Button.tsx

import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  children,
  className = '',
  type = 'button',
}) => {
  const baseStyles = 'rounded transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-muji-dark text-white hover:bg-muji-mid disabled:bg-gray-300 focus:ring-muji-mid',
    secondary: 'border-2 border-muji-mid text-muji-dark hover:bg-muji-beige disabled:border-gray-300 disabled:text-gray-300 focus:ring-muji-beige',
    ghost: 'text-muji-mid hover:text-muji-dark hover:bg-muji-beige disabled:text-gray-300 focus:ring-muji-beige',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};
