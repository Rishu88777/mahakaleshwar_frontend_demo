/**
 * Hardcoded demo catalogue modelled on the real services of
 * shrimahakaleshwar.mp.gov.in (prices & slot pattern match the official portal).
 */

export const SERVICES = [
  {
    id: 'sheeghra-darshan',
    emoji: '🛕',
    price: 250,
    priced: true,
    maxPersons: 6,
    slotBased: true,
    name: { en: 'Sheeghra Darshan', hi: 'शीघ्र दर्शन' },
    desc: {
      en: 'Priority darshan of Baba Mahakal · ₹250 per person · hourly slots 6 AM – 6 PM',
      hi: 'बाबा महाकाल के प्राथमिकता दर्शन · ₹250 प्रति व्यक्ति · प्रातः 6 – सायं 6 प्रति घंटा स्लॉट'
    }
  },
  {
    id: 'bhasma-aarti',
    emoji: '🔥',
    price: 200,
    priced: true,
    maxPersons: 5,
    slotBased: true,
    name: { en: 'Bhasma Aarti Booking', hi: 'भस्म आरती बुकिंग' },
    desc: {
      en: 'The world-famous dawn ritual · 4:00 AM – 6:00 AM · advance booking with photo ID',
      hi: 'विश्वप्रसिद्ध प्रातःकालीन अनुष्ठान · प्रातः 4:00 – 6:00 · फोटो पहचान पत्र सहित अग्रिम बुकिंग'
    }
  },
  {
    id: 'pujan',
    emoji: '🪔',
    price: null,
    priced: true,
    maxPersons: 1,
    slotBased: false,
    name: { en: 'Pujan / Abhishek', hi: 'पूजन / अभिषेक' },
    desc: {
      en: 'Rudrabhishek, Shiv Mahimn Path, Mahamrityunjay Jaap & more — from ₹100',
      hi: 'रुद्राभिषेक, शिव महिम्न पाठ, महामृत्युंजय जाप एवं अन्य — ₹100 से'
    }
  }
]

/** Official Pujan price list (verbatim from the portal). */
export const PUJAN_TYPES = [
  { id: 'general-puja', price: 100, name: { en: 'General Puja', hi: 'सामान्य पूजा' } },
  { id: 'shiv-mahimn-path', price: 200, name: { en: 'Abhishek Shiv Mahimn Path', hi: 'अभिषेक शिव महिम्न पाठ' } },
  { id: 'rudrabhishek-vaidik', price: 300, name: { en: 'Rudrabhishek Vaidik Puja (by 1 Brahmin)', hi: 'रुद्राभिषेक वैदिक पूजा (1 ब्राह्मण द्वारा)' } },
  { id: 'rudrabhishek-ekadashani', price: 500, name: { en: 'Rudrabhishek Ekadashani — Shiv Mahimn Strot', hi: 'रुद्राभिषेक एकादशनी — शिव महिम्न स्तोत्र' } },
  { id: 'rudrabhishek-rudra-patha', price: 1000, name: { en: 'Rudrabhishek 11 Avartan — Rudra Patha', hi: 'रुद्राभिषेक 11 आवर्तन — रुद्र पाठ' } },
  { id: 'laghu-rudrabhishek', price: 3000, name: { en: 'Laghu Rudrabhishek (121 Paath)', hi: 'लघु रुद्राभिषेक (121 पाठ)' } },
  { id: 'maha-rudrabhishek', price: 15000, name: { en: 'Maha Rudrabhishek', hi: 'महा रुद्राभिषेक' } },
  { id: 'mahamrityunjay-jaap', price: 15000, name: { en: 'Mahamrityunjay Jaap (1.25 Lakh Jaap)', hi: 'महामृत्युंजय जाप (सवा लाख जाप)' } }
]

/** Hourly Sheeghra Darshan slots, 06:00 – 18:00 (matches the official portal). */
export const DARSHAN_SLOTS = [
  '06:00 AM – 07:00 AM', '07:00 AM – 08:00 AM', '08:00 AM – 09:00 AM',
  '09:00 AM – 10:00 AM', '10:00 AM – 11:00 AM', '11:00 AM – 12:00 PM',
  '12:00 PM – 01:00 PM', '01:00 PM – 02:00 PM', '02:00 PM – 03:00 PM',
  '03:00 PM – 04:00 PM', '04:00 PM – 05:00 PM', '05:00 PM – 06:00 PM'
]

export const BHASMA_SLOTS = ['04:00 AM – 06:00 AM (Bhasma Aarti)']

/** Next `n` calendar dates, starting tomorrow (bookings open one day prior). */
export function getBookingDates(n = 7) {
  const dates = []
  for (let i = 1; i <= n; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    dates.push(d)
  }
  return dates
}

const DAYS = { en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], hi: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'] }
const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  hi: ['जन', 'फ़र', 'मार्च', 'अप्रै', 'मई', 'जून', 'जुला', 'अग', 'सित', 'अक्टू', 'नव', 'दिस']
}

export function formatDate(d, lang = 'en') {
  return `${DAYS[lang][d.getDay()]}, ${d.getDate()} ${MONTHS[lang][d.getMonth()]} ${d.getFullYear()}`
}

export function isoDate(d) {
  return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`
}

/**
 * Deterministic pseudo-random availability so counts look real (live-portal
 * style, e.g. "1941 AVAILABLE") and stay stable across re-renders.
 */
export function slotAvailability(dateIndex, slotIndex) {
  const seed = (dateIndex + 3) * 2654435761 + (slotIndex + 7) * 40503
  const r = Math.abs(Math.sin(seed)) // 0..1, stable for given inputs
  if (r < 0.08) return 0 // an occasional FULL slot feels authentic
  return 400 + Math.floor(r * 1700)
}
