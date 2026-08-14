export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
export const WA_NUMBER = import.meta.env.VITE_WA_NUMBER || '919990084734'
export const OFFICIAL_SITE = 'https://www.shrimahakaleshwar.mp.gov.in/'
export const HELPLINE = '1800-233-1008'

/**
 * Context passed by the WhatsApp bot deep link:
 *   ?m=<mobile>&n=<name>&lang=<en|hi>&service=<sheeghra-darshan|bhasma-aarti|pujan>
 */
export function getDevoteeContext() {
  const q = new URLSearchParams(window.location.search)
  const lang = q.get('lang')
  return {
    mobile: q.get('m') || '',
    name: q.get('n') || '',
    lang: lang === 'hi' ? 'hi' : 'en',
    service: q.get('service') || ''
  }
}
