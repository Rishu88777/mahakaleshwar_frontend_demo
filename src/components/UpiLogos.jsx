/* Inline SVG brand marks so the payment sheet works offline (no CDN). */

export function GPayLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

export function PhonePeLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="11" fill="#5F259F" />
      <text x="24" y="31" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="19" fill="#fff">पे</text>
    </svg>
  )
}

export function PaytmLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="11" fill="#fff" stroke="#e5e7eb" />
      <text x="24" y="22" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" fill="#002E6E">Pay</text>
      <text x="24" y="35" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" fill="#00BAF2">tm</text>
    </svg>
  )
}

export function BhimLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="11" fill="#fff" stroke="#e5e7eb" />
      <path d="M14 34 L24 14 L28 22 L20 34 Z" fill="#F26522" />
      <path d="M24 34 L31 21 L34 27 L30 34 Z" fill="#00934B" />
    </svg>
  )
}

export function UpiMark({ height = 16 }) {
  return (
    <svg height={height} viewBox="0 0 80 32" aria-hidden="true">
      <path d="M52 2 L66 16 L52 30 Z" fill="#F26522" />
      <path d="M60 2 L74 16 L60 30 Z" fill="#00934B" />
      <text x="0" y="24" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="24" fill="#3d3d3d">UPI</text>
    </svg>
  )
}
