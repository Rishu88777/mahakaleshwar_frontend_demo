import { useEffect, useState } from 'react'
import { confirmBooking } from '../api'
import { WA_NUMBER } from '../config'
import { rupee } from '../utils/format'

const CONFIRM_AFTER_SECONDS = 2 // WhatsApp ticket API is called after this pause
const REDIRECT_SECONDS = 10

export default function SuccessScreen({ t, result }) {
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS)
  const [sent, setSent] = useState('')  // '' | 'sent' | 'failed'

  // No prefilled text — the confirm API pushes the QR ticket into the chat
  // automatically; the user just lands back on WhatsApp and finds it there.
  const waLink = `https://wa.me/${WA_NUMBER}`

  useEffect(() => {
    // deliver the WhatsApp QR ticket shortly after payment success, so the
    // message is already waiting in the chat when the redirect below fires
    const confirmTimer = setTimeout(async () => {
      const ok = await confirmBooking(result.bookingId)
      setSent(ok ? 'sent' : 'failed')
    }, CONFIRM_AFTER_SECONDS * 1000)
    const tick = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    const go = setTimeout(() => { window.location.href = waLink }, REDIRECT_SECONDS * 1000)
    return () => { clearTimeout(confirmTimer); clearInterval(tick); clearTimeout(go) }
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

        <div className="ticket-id" style={{ paddingTop: 16 }}>{result.bookingId}</div>

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
        </div>
      </div>

      <div className={`wa-status ${sent === 'sent' ? 'sent' : ''}`} role="status">
        {sent === 'sent' && <>✅ {t.waTicketSent}</>}
        {sent === 'failed' && <>💬 {t.backToWhatsApp}</>}
        {!sent && (
          <><span className="wa-mini-spinner" aria-hidden="true"></span> {t.waTicketSending}</>
        )}
      </div>

      <div style={{ maxWidth: 360, margin: '16px auto 0' }}>
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
