import { API_BASE_URL } from './config'

const HEADERS = {
  'Content-Type': 'application/json'
}

/**
 * Create a temple booking on the bot backend.
 * Gracefully degrades to a demo booking id if the backend is unreachable,
 * so the demo flow never breaks in front of an audience.
 */
export async function createBooking(booking) {
  try {
    const res = await fetch(`${API_BASE_URL}/whatsapp/bot/api/v1/temple/booking`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(booking)
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const body = await res.json()
    const data = typeof body.data === 'string' ? JSON.parse(body.data) : body.data
    return data
  } catch (e) {
    console.warn('Backend unreachable, falling back to demo booking id', e)
    return { bookingId: 'MK-' + (1000 + Math.floor(Math.random() * 9000)), demo: true }
  }
}

/**
 * Ask the bot to push the confirmation + QR ticket into the WhatsApp chat.
 * Returns true only when the backend actually accepted the confirmation, so
 * the success screen can tell "ticket sent" apart from "could not send".
 */
export async function confirmBooking(bookingId) {
  if (!bookingId) return false
  try {
    const res = await fetch(`${API_BASE_URL}/whatsapp/bot/api/v1/temple/booking/${bookingId}/confirm`, {
      method: 'POST',
      headers: HEADERS
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const body = await res.json().catch(() => ({}))
    // the API always answers 200 and carries the real status in the envelope
    return body.code === undefined || body.code === 200
  } catch (e) {
    console.warn('confirmBooking failed, wa.me redirect fallback still applies', e)
    return false
  }
}
