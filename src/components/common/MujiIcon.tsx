// src/components/common/MujiIcon.tsx

import React from 'react';

interface MujiIconProps {
  name: 'check' | 'clock' | 'search' | 'arrow' | 'close' | 'play' | 'drag' | 'warning';
  size?: number;
  color?: string;
  className?: string;
}

export const MujiIcon: React.FC<MujiIconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  const icons = {
    check: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </>
    ),
    arrow: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    ),
    close: (
      <>
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </>
    ),
    play: (
      <path d="M5 3l14 9-14 9V3z" />
    ),
    drag: (
      <>
        <circle cx="9" cy="5" r="1.5" />
        <circle cx="9" cy="12" r="1.5" />
        <circle cx="9" cy="19" r="1.5" />
        <circle cx="15" cy="5" r="1.5" />
        <circle cx="15" cy="12" r="1.5" />
        <circle cx="15" cy="19" r="1.5" />
      </>
    ),
    warning: (
      <>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[name]}
    </svg>
  );
};
