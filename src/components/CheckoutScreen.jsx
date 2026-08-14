import { useState } from 'react'
import { createBooking } from '../api'
import { rupee } from '../utils/format'
import { GPayLogo, PhonePeLogo, PaytmLogo, BhimLogo, UpiMark } from './UpiLogos.jsx'

const UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', Logo: GPayLogo },
  { id: 'phonepe', name: 'PhonePe', Logo: PhonePeLogo },
  { id: 'paytm', name: 'Paytm', Logo: PaytmLogo },
  { id: 'bhim', name: 'BHIM UPI', Logo: BhimLogo }
]

export default function CheckoutScreen({ t, lang, devotee, service, draft, visitors, amount, onPaid }) {
  const [upiApp, setUpiApp] = useState('gpay')
  const [processing, setProcessing] = useState(false)
  const [stage, setStage] = useState(0)

  const selectedApp = UPI_APPS.find((a) => a.id === upiApp)

  const pay = async () => {
    setProcessing(true)
    // staged fake gateway latency: open app → approve → confirm
    setStage(0)
    await new Promise((r) => setTimeout(r, 900))
    setStage(1)
    await new Promise((r) => setTimeout(r, 1200))
    setStage(2)
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
    await new Promise((r) => setTimeout(r, 500))
    onPaid({ ...booking, ...res })
  }

  const stages = [
    lang === 'hi' ? `${selectedApp.name} खोला जा रहा है…` : `Opening ${selectedApp.name}…`,
    lang === 'hi' ? 'भुगतान स्वीकृति प्रतीक्षारत…' : 'Waiting for approval…',
    lang === 'hi' ? 'भुगतान की पुष्टि हो रही है…' : 'Confirming payment…'
  ]

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
        <div className="pay-card">
          <div className="pay-card-head">
            <div className="pay-card-title">
              <UpiMark height={18} />
              <span>{t.payWithUpi}</span>
            </div>
            <span className="npci-chip">NPCI · भारत</span>
          </div>

          <p className="pay-card-sub">{t.upiNote}</p>

          <div className="upi-apps">
            {UPI_APPS.map(({ id, name, Logo }) => (
              <button
                key={id}
                className={`upi-tile ${upiApp === id ? 'active' : ''}`}
                onClick={() => setUpiApp(id)}
                aria-pressed={upiApp === id}
              >
                {upiApp === id && <span className="upi-check">✓</span>}
                <span className="upi-logo-wrap"><Logo size={34} /></span>
                <span className="upi-name">{name}</span>
              </button>
            ))}
          </div>

          <div className="upi-redirect-hint">
            <span className="upi-hint-logo"><selectedApp.Logo size={18} /></span>
            {lang === 'hi'
              ? <>भुगतान स्वीकृत करने हेतु आपको <b>{selectedApp.name}</b> पर भेजा जाएगा</>
              : <>You will be taken to <b>{selectedApp.name}</b> to approve {rupee(amount)}</>}
          </div>

          <div className="trust-row">
            <span>🔒 {lang === 'hi' ? '256-बिट एन्क्रिप्टेड' : '256-bit encrypted'}</span>
            <span>⚡ {lang === 'hi' ? 'तुरंत पुष्टि' : 'Instant confirmation'}</span>
            <span>🛡️ {lang === 'hi' ? '100% सुरक्षित' : '100% secure'}</span>
          </div>
        </div>
        <div className="secure-note">🔒 {t.demoPayNote}</div>
      </section>

      <div className="paybar">
        <button className="btn-primary" onClick={pay} disabled={processing}>
          🔒 {t.payNow} {rupee(amount)}
        </button>
      </div>

      {processing && (
        <div className="veil" role="status">
          <div className="veil-app-logo"><selectedApp.Logo size={54} /></div>
          <div className="spinner" aria-hidden="true"></div>
          <h3>{stages[stage]}</h3>
          <div className="veil-steps">
            {stages.map((s, i) => (
              <span key={s} className={`veil-dot ${i <= stage ? 'on' : ''}`}></span>
            ))}
          </div>
          <p>{t.processingSub}</p>
        </div>
      )}
    </main>
  )
}
