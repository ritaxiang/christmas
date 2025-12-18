// components/ui/ChristmasIcons.tsx

import React from "react"

export const SvgSnowflake = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#B6DFF1"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v20M2 12h20" />
    <path d="M4.5 4.5l15 15M19 5l-3.5 3.5M5 19l3.5-3.5" />
    <path d="M19.5 4.5l-15 15M5 5l3.5 3.5M19 19l-3.5-3.5" />
  </svg>
)

export const SvgTree = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#8FC39A"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M12 2l4 6h-3l3 5h-3l3 5H8l3-5H8l3-5H8l4-6z" />
    <rect x="10" y="18" width="4" height="4" fill="#D9B79A" />
  </svg>
)

export const SvgStar = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#F7E9A8">
    <path d="M12 2l3 7h7l-5.5 4.2L18 21l-6-4-6 4 1.5-7.8L2 9h7z" />
  </svg>
)

export const SvgGift = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#E8A8A8"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <rect x="3" y="8" width="18" height="13" rx="2" />
    <path d="M3 8h18" />
    <path d="M12 8v13" />
    <path d="M7 4c0 2 2 4 5 4-1-3-2-5-5-4zM17 4c0 2-2 4-5 4 1-3 2-5 5-4z" />
  </svg>
)

export const SvgOrnament = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="#F4C6D4"
    stroke="#E7A4B3"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="14" r="8" />
    <rect x="10" y="2" width="4" height="4" rx="1" fill="#E7A4B3" />
    <path d="M12 6v2" stroke="#E7A4B3" />
  </svg>
)
