import { useState } from 'react'
import { PUJAN_TYPES, DARSHAN_SLOTS, BHASMA_SLOTS, getBookingDates, formatDate, isoDate, slotAvailability } from '../data/services'
import { rupee } from '../utils/format'

export default function BookingScreen({ t, lang, service, onContinue }) {
  const dates = getBookingDates(7)
  const [dateIndex, setDateIndex] = useState(0)
  const [slot, setSlot] = useState(null)
  const [persons, setPersons] = useState(1)
  const [pujanType, setPujanType] = useState(null)

  const isPujan = service.id === 'pujan'
  const slots = service.id === 'bhasma-aarti' ? BHASMA_SLOTS : DARSHAN_SLOTS
  const selectedPujan = PUJAN_TYPES.find((p) => p.id === pujanType)
  const amount = isPujan ? (selectedPujan ? selectedPujan.price : 0) : service.price * persons
  const canContinue = isPujan ? !!pujanType : !!slot

  const handleContinue = () => {
    const d = dates[dateIndex]
    onContinue({
      date: isoDate(d),
      dateLabel: formatDate(d, lang),
      slot: isPujan ? (lang === 'hi' ? 'मंदिर द्वारा निर्धारित' : 'Assigned by temple') : slot,
      persons: isPujan ? 1 : persons,
      pujanType,
      pujanName: selectedPujan ? selectedPujan.name[lang] : null
    })
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <section className="section">
        <h2 className="section-title">{service.emoji} {service.name[lang]}</h2>
        <p className="section-sub">{service.desc[lang]}</p>
      </section>

      {/* Date selection */}
      <section className="section" style={{ paddingTop: 8 }}>
        <h3 style={{ fontSize: 16 }}>📅 {t.selectDate}</h3>
        <div className="date-scroll">
          {dates.map((d, i) => (
            <button
              key={i}
              className={`date-chip ${i === dateIndex ? 'active' : ''}`}
              onClick={() => { setDateIndex(i); setSlot(null) }}
            >
              <div className="dow">{formatDate(d, lang).split(',')[0]}</div>
              <div className="dom">{d.getDate()}</div>
              <div className="mon">{formatDate(d, lang).split(' ')[2]}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Slot or Pujan type */}
      {!isPujan ? (
        <section className="section" style={{ paddingTop: 4 }}>
          <h3 style={{ fontSize: 16 }}>🕐 {t.selectSlot}</h3>
          <div className="slot-grid">
            {slots.map((s, i) => {
              const avail = slotAvailability(dateIndex, i)
              const full = avail === 0
              return (
                <button
                  key={s}
                  disabled={full}
                  className={`slot-btn ${slot === s ? 'active' : ''} ${full ? 'full' : ''}`}
                  onClick={() => setSlot(s)}
                >
                  <div className="slot-time">{s}</div>
                  <div className="slot-avail">
                    {full ? t.slotFull : `${avail.toLocaleString('en-IN')} ${t.available}`}
                  </div>
                </button>
              )
            })}
          </div>
          <div className="strip">
            💰 {rupee(service.price)} {t.perPerson}
          </div>
        </section>
      ) : (
        <section className="section" style={{ paddingTop: 4 }}>
          <h3 style={{ fontSize: 16 }}>🪔 {t.selectPujan}</h3>
          {PUJAN_TYPES.map((p) => (
            <button
              key={p.id}
              className={`pujan-option ${pujanType === p.id ? 'active' : ''}`}
              onClick={() => setPujanType(p.id)}
            >
              <span className="pujan-radio" aria-hidden="true"></span>
              <span className="pujan-name">{p.name[lang]}</span>
              <span className="pujan-price">{rupee(p.price)}</span>
            </button>
          ))}
        </section>
      )}

      {/* Persons */}
      {!isPujan && (
        <section className="section" style={{ paddingTop: 4 }}>
          <h3 style={{ fontSize: 16 }}>👥 {t.persons}</h3>
          <div className="stepper">
            <button onClick={() => setPersons((p) => p - 1)} disabled={persons <= 1}>−</button>
            <span className="count">{persons}</span>
            <button onClick={() => setPersons((p) => p + 1)} disabled={persons >= service.maxPersons}>+</button>
            <span style={{ fontSize: 12.5, color: 'var(--text-sec)' }}>
              (max {service.maxPersons})
            </span>
          </div>
        </section>
      )}

      <div className="paybar">
        <button className="btn-primary" disabled={!canContinue} onClick={handleContinue}>
          {t.continue} {amount > 0 ? `· ${rupee(amount)}` : ''} →
        </button>
      </div>
    </main>
  )
}
