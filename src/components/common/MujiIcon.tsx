// src/components/common/MujiIcon.tsx

import React from 'react';

export type IconName =
  | 'check'
  | 'clock'
  | 'search'
  | 'arrow'
  | 'arrow-right'
  | 'close'
  | 'play'
  | 'drag'
  | 'warning'
  | 'trophy'
  | 'medal-gold'
  | 'medal-silver'
  | 'medal-bronze'
  | 'thinking'
  | 'lightbulb'
  | 'target'
  | 'chart'
  | 'message';

interface MujiIconProps {
  name: IconName;
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
  const icons: Record<IconName, React.ReactNode> = {
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
    'arrow-right': (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M12 5l7 7-7 7"
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
    trophy: (
      <>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z" />
      </>
    ),
    'medal-gold': (
      <>
        <circle cx="12" cy="14" r="6" />
        <path d="M12 8V2M9 8L7 2M15 8l2-6" />
      </>
    ),
    'medal-silver': (
      <>
        <circle cx="12" cy="14" r="6" />
        <path d="M12 8V2M9 8L7 2M15 8l2-6" />
      </>
    ),
    'medal-bronze': (
      <>
        <circle cx="12" cy="14" r="6" />
        <path d="M12 8V2M9 8L7 2M15 8l2-6" />
      </>
    ),
    thinking: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
      </>
    ),
    lightbulb: (
      <>
        <path d="M9 18h6M10 22h4" />
        <circle cx="12" cy="9" r="5" />
        <path d="M12 2v1" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="M18 17V9M13 17V5M8 17v-3" />
      </>
    ),
    message: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[name]}
    </svg>
  );
};
