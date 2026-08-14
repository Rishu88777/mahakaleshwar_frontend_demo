import { useState } from 'react'
import { createBooking } from '../api'
import { rupee } from '../utils/format'

const UPI_APPS = [
  { id: 'gpay', name: 'GPay', icon: '🟢' },
  { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
  { id: 'paytm', name: 'Paytm', icon: '🔵' },
  { id: 'bhim', name: 'BHIM UPI', icon: '🇮🇳' }
]

export default function CheckoutScreen({ t, lang, devotee, service, draft, visitors, amount, onPaid }) {
  const [upiApp, setUpiApp] = useState('gpay')
  const [processing, setProcessing] = useState(false)

  const pay = async () => {
    setProcessing(true)
    // stand-in for UPI gateway latency
    await new Promise((r) => setTimeout(r, 2000))
    const booking = {
      mobileNumber: devotee.mobile,
      devoteeName: visitors[0]?.name || devotee.name || 'Bhakt',
      serviceType: service.id.toUpperCase().replace(/-/g, '_'),
      serviceName: service.name[lang],
      pujanType: draft.pujanName || null,
      bookingDate: draft.date,
      timeSlot: draft.slot,
      persons: draft.persons,
      visitors,
      amount,
      paymentMode: 'UPI',
      paymentReference: 'UPI' + Math.floor(1e11 + Math.random() * 9e11),
      language: lang
    }
    const res = await createBooking(booking)
    onPaid({ ...booking, ...res })
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <section className="section">
        <h2 className="section-title">🧾 {t.bookingSummary}</h2>
        <div className="card">
          <div className="summary-row"><span className="k">{t.service}</span><span className="v">{service.name[lang]}</span></div>
          {draft.pujanName && (
            <div className="summary-row"><span className="k">🪔</span><span className="v">{draft.pujanName}</span></div>
          )}
          <div className="summary-row"><span className="k">{t.date}</span><span className="v">{draft.dateLabel}</span></div>
          <div className="summary-row"><span className="k">{t.slot}</span><span className="v">{draft.slot}</span></div>
          <div className="summary-row"><span className="k">{t.persons}</span><span className="v">{draft.persons}</span></div>
          <div className="summary-total"><span>{t.amount}</span><span>{rupee(amount)}</span></div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 4 }}>
        <h2 className="section-title">💳 {t.payWithUpi}</h2>
        <p className="section-sub">{t.upiNote}</p>
        <div className="upi-apps">
          {UPI_APPS.map((app) => (
            <button
              key={app.id}
              className={`upi-app ${upiApp === app.id ? 'active' : ''}`}
              onClick={() => setUpiApp(app.id)}
            >
              <span className="upi-icon" aria-hidden="true">{app.icon}</span>
              <span className="upi-name">{app.name}</span>
            </button>
          ))}
        </div>
        <div className="secure-note">🔒 {t.demoPayNote}</div>
      </section>

      <div className="paybar">
        <button className="btn-primary" onClick={pay} disabled={processing}>
          {t.payNow} {rupee(amount)} · UPI →
        </button>
      </div>

      {processing && (
        <div className="veil" role="status">
          <div className="spinner" aria-hidden="true"></div>
          <h3>{t.processing}</h3>
          <p>{t.processingSub}</p>
        </div>
      )}
    </main>
  )
}
