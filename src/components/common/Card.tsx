// src/components/common/Card.tsx

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  onClick,
}) => {
  const paddingStyles = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-muji-beige ${paddingStyles[padding]} ${onClick ? 'cursor-pointer hover:border-muji-mid transition-colors' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
