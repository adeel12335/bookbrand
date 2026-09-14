import React from 'react';

/* Brand icon set — thin-stroke line art matching the approved ebookwriters.us mockup.
   The PNG icons shipped in /ebookwriters_assets were cropped past their own edges
   (missing pencil tips, clipped glyphs), so they are redrawn here as vectors. */

const base = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

const Svg = ({ children, ...rest }) => <svg {...base} {...rest}>{children}</svg>;

export const IconWriting = props => (
  <Svg {...props}>
    <path d="M31.6 9.9 38.1 16.4 18.2 36.3 9.5 38.5 11.7 29.8z" />
    <path d="M28.4 13.1 34.9 19.6" />
    <path d="M11.7 29.8 18.2 36.3" />
  </Svg>
);

export const IconGhostwriting = props => (
  <Svg {...props}>
    <path d="M12 7h15l9 9v25H12z" />
    <path d="M27 7v9h9" />
    <path d="M18 24h12M18 30h12M18 36h7" />
  </Svg>
);

export const IconEditing = props => (
  <Svg {...props}>
    <circle cx="22" cy="21" r="11.5" />
    <path d="M30.4 29.4 40 39" />
    <path d="M17 18h10M17 23h10M17 28h6" />
  </Svg>
);

export const IconFormatting = props => (
  <Svg {...props}>
    <rect x="8" y="8" width="32" height="32" rx="3" />
    <path d="M8 17h32" />
    <path d="M14 24h11M14 30h11M14 35h7" />
    <path d="M31 24h5M31 30h5" />
  </Svg>
);

export const IconPublishing = props => (
  <Svg {...props}>
    <path d="M14.5 35a7.5 7.5 0 0 1-.8-14.96A10.5 10.5 0 0 1 33.9 19a8 8 0 0 1 1.1 15.9" />
    <path d="M24 40V22" />
    <path d="M18.8 27.2 24 22l5.2 5.2" />
  </Svg>
);

export const IconBranding = props => (
  <Svg {...props}>
    <circle cx="24" cy="18" r="7.5" />
    <path d="M10 40a14 14 0 0 1 28 0" />
  </Svg>
);

export const IconWriters = props => (
  <Svg {...props}>
    <circle cx="19" cy="18" r="6.5" />
    <path d="M8 38a11 11 0 0 1 22 0" />
    <path d="M32 12.6a6.5 6.5 0 0 1 0 12.4" />
    <path d="M34 28.2A11 11 0 0 1 41 38" />
  </Svg>
);

export const IconQuality = props => (
  <Svg {...props}>
    <path d="m24 6 4.7 3.5 5.8-.6 1.9 5.6 4.9 3.2-2 5.5 2 5.5-4.9 3.2-1.9 5.6-5.8-.6L24 40l-4.7-3.5-5.8.6-1.9-5.6-4.9-3.2 2-5.5-2-5.5 4.9-3.2 1.9-5.6 5.8.6z" />
    <path d="m18.6 23.6 3.9 3.9 7-8.4" />
  </Svg>
);

export const IconConfidential = props => (
  <Svg {...props}>
    <rect x="11" y="21" width="26" height="19" rx="3.5" />
    <path d="M17 21v-5a7 7 0 0 1 14 0v5" />
    <path d="M24 28.5v5" />
  </Svg>
);

export const IconFast = props => (
  <Svg {...props}>
    <circle cx="24" cy="24" r="17" />
    <path d="m25.8 13.5-8.6 12.2h6.4l-1.4 8.8 8.6-12.2h-6.4z" />
  </Svg>
);

export const IconArrow = props => (
  <Svg {...props} strokeWidth={2}><path d="M10 24h28M27 13l11 11-11 11" /></Svg>
);

export const IconArrowUpRight = props => (
  <Svg {...props} strokeWidth={2}><path d="M15 33 33 15M18 15h15v15" /></Svg>
);

export const IconCheck = props => (
  <Svg {...props} strokeWidth={2.4}><path d="m10 25 9 9 19-20" /></Svg>
);

export const IconPlus = props => (
  <Svg {...props} strokeWidth={2}><path d="M24 12v24M12 24h24" /></Svg>
);

export const IconMenu = props => (
  <Svg {...props} strokeWidth={1.8}><path d="M9 16h30M9 24h30M9 32h30" /></Svg>
);

export const IconClose = props => (
  <Svg {...props} strokeWidth={1.8}><path d="M13 13l22 22M35 13 13 35" /></Svg>
);

export const IconQuote = props => (
  <svg viewBox="0 0 48 36" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M0 36V20.7C0 9.9 5.6 2.6 16.6 0l1.9 5.1c-6.1 2-9.2 5.7-9.3 11h8.2V36zm26.5 0V20.7C26.5 9.9 32.1 2.6 43.1 0L45 5.1c-6.1 2-9.2 5.7-9.3 11H44V36z" />
  </svg>
);

export const IconStar = props => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="m12 1.8 3 6.2 6.8 1-4.9 4.8 1.2 6.8-6.1-3.2-6.1 3.2 1.2-6.8L2.2 9l6.8-1z" />
  </svg>
);

export const IconBook = props => (
  <Svg {...props}>
    <path d="M24 13.5C20.5 10.2 15.8 9 10 9v26c5.8 0 10.5 1.2 14 4.5 3.5-3.3 8.2-4.5 14-4.5V9c-5.8 0-10.5 1.2-14 4.5z" />
    <path d="M24 13.5v26" />
  </Svg>
);

export const IconGlobe = props => (
  <Svg {...props}>
    <circle cx="24" cy="24" r="16" />
    <path d="M8 24h32" />
    <path d="M24 8c4.3 4.4 6.7 10.1 6.7 16S28.3 35.6 24 40c-4.3-4.4-6.7-10.1-6.7-16S19.7 12.4 24 8z" />
  </Svg>
);

export const IconChart = props => (
  <Svg {...props}>
    <path d="M9 39h30" />
    <path d="M15 39V27M24 39V15M33 39v-8" />
  </Svg>
);

export const IconMail = props => (
  <Svg {...props}><rect x="7" y="12" width="34" height="24" rx="3" /><path d="m7.8 14.5 15.1 10.6a2 2 0 0 0 2.2 0l15.1-10.6" /></Svg>
);

export const IconPhone = props => (
  <Svg {...props}><path d="M17.6 9h-5A3.6 3.6 0 0 0 9 12.9C9.9 27 21 38.1 35.1 39a3.6 3.6 0 0 0 3.9-3.6v-5l-8-3-3.4 4.1a25 25 0 0 1-11.1-11.1L20.6 17z" /></Svg>
);

export const serviceIcons = {
  writing: IconWriting,
  ghostwriting: IconGhostwriting,
  editing: IconEditing,
  formatting: IconFormatting,
  publishing: IconPublishing,
  branding: IconBranding,
};

export const valueIcons = {
  writers: IconWriters,
  quality: IconQuality,
  confidential: IconConfidential,
  fast: IconFast,
};
