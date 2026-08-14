import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { confirmBooking } from '../api'
import { WA_NUMBER } from '../config'
import { rupee } from '../utils/format'

const REDIRECT_SECONDS = 8

export default function SuccessScreen({ t, result }) {
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS)

  // Pre-filled message matches the bot's BOOKING_STATUS_REGEX ("ticket MK-xxxx")
  const waText = encodeURIComponent(`Ticket ${result.bookingId}`)
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waText}`

  const qrPayload = [
    'MAHAKAL-TICKET',
    result.bookingId,
    result.serviceName,
    `${result.bookingDate} ${result.timeSlot}`,
    `${result.persons} person(s)`,
    `PAID ${result.amount}`
  ].join('|')

  useEffect(() => {
    // fire immediately so the QR ticket is already in the chat when the user lands
    confirmBooking(result.bookingId)
    const tick = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    const go = setTimeout(() => { window.location.href = waLink }, REDIRECT_SECONDS * 1000)
    return () => { clearInterval(tick); clearTimeout(go) }
  }, [waLink, result.bookingId])

  return (
    <main className="success-wrap">
      <div className="success-check" aria-hidden="true">✓</div>
      <h2 className="success-title">{t.paymentSuccess}</h2>
      <p className="success-sub">{t.jaiMahakal} 🙏</p>

      <div className="ticket">
        <div className="ticket-head">
          <span className="om" aria-hidden="true">🕉️</span>
          <div>
            <div className="t1">{t.templeFull}</div>
            <div className="t2">{t.ticketTitle}</div>
          </div>
        </div>

        <div className="ticket-qr">
          <div className="qr-frame">
            <QRCodeSVG value={qrPayload} size={172} fgColor="#7a0f16" bgColor="#ffffff" level="M" />
          </div>
        </div>
        <div className="ticket-id">{result.bookingId}</div>

        <div className="ticket-tear" aria-hidden="true"></div>

        <div className="ticket-body">
          <div className="summary-row"><span className="k">{t.service}</span><span className="v">{result.serviceName}</span></div>
          {result.pujanType && (
            <div className="summary-row"><span className="k">🪔</span><span className="v">{result.pujanType}</span></div>
          )}
          <div className="summary-row"><span className="k">{t.date}</span><span className="v">{result.bookingDate}</span></div>
          <div className="summary-row"><span className="k">{t.slot}</span><span className="v">{result.timeSlot}</span></div>
          <div className="summary-row"><span className="k">{t.persons}</span><span className="v">{result.persons}</span></div>
          <div className="summary-row">
            <span className="k">{t.amount}</span>
            <span className="v">{rupee(result.amount)} <span className="paid-badge">✓ {t.paidVia}</span></span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-sec)', marginTop: 8 }}>{t.ticketNote}</p>
        </div>
      </div>

      <div style={{ maxWidth: 360, margin: '18px auto 0' }}>
        <a className="btn-wa" href={waLink}>
          💬 {t.backToWhatsApp}
        </a>
        <p className="redirect-note">
          {t.redirecting} {seconds} {t.seconds}…
        </p>
      </div>
    </main>
  )
}
