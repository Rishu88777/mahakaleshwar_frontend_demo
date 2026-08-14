import { useState } from 'react'

const GENDER_VALUES = ['MALE', 'FEMALE', 'OTHER']
const ID_VALUES = ['AADHAAR', 'PASSPORT']

function emptyVisitor(name = '') {
  return { name, age: '', gender: 'MALE', idProofType: 'AADHAAR', idProofNumber: '' }
}

export default function DetailsScreen({ t, lang, service, draft, initialName, onContinue }) {
  const [visitors, setVisitors] = useState(() =>
    Array.from({ length: draft.persons }, (_, i) => emptyVisitor(i === 0 ? initialName : ''))
  )
  const [touched, setTouched] = useState(false)

  const update = (i, key, value) =>
    setVisitors((vs) => vs.map((v, idx) => (idx === i ? { ...v, [key]: value } : v)))

  const valid = visitors.every((v) => v.name.trim() && v.age && Number(v.age) > 0 && v.idProofNumber.trim())

  const handleContinue = () => {
    setTouched(true)
    if (valid) onContinue(visitors)
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <section className="section">
        <h2 className="section-title">📝 {t.visitorDetails}</h2>
        <p className="section-sub">
          {service.name[lang]} · {draft.dateLabel} · {draft.pujanName || draft.slot}
        </p>
      </section>

      <section className="section" style={{ paddingTop: 4 }}>
        {visitors.map((v, i) => (
          <div className="card visitor-card" key={i} style={{ '--i': i }}>
            <div className="visitor-title">
              <span className="visitor-num">{i + 1}</span> {t.visitor} {visitors.length > 1 ? i + 1 : ''}
            </div>
            <div className="form-grid">
              <div className="form-field wide">
                <label>{t.fullName} *</label>
                <input
                  value={v.name}
                  onChange={(e) => update(i, 'name', e.target.value)}
                  placeholder={lang === 'hi' ? 'जैसे: रमेश शर्मा' : 'e.g. Ramesh Sharma'}
                />
              </div>
              <div className="form-field">
                <label>{t.age} *</label>
                <input
                  type="number" min="1" max="120" inputMode="numeric"
                  value={v.age}
                  onChange={(e) => update(i, 'age', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>{t.gender} *</label>
                <select value={v.gender} onChange={(e) => update(i, 'gender', e.target.value)}>
                  {GENDER_VALUES.map((g, gi) => (
                    <option key={g} value={g}>{t.genders[gi]}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label>{t.idProofType} *</label>
                <select value={v.idProofType} onChange={(e) => update(i, 'idProofType', e.target.value)}>
                  {ID_VALUES.map((idv, ii) => (
                    <option key={idv} value={idv}>{t.idProofs[ii]}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label>{t.idProofNumber} *</label>
                <input
                  value={v.idProofNumber}
                  onChange={(e) => update(i, 'idProofNumber', e.target.value)}
                  placeholder={v.idProofType === 'AADHAAR' ? 'XXXX XXXX XXXX' : 'A1234567'}
                />
              </div>
            </div>
          </div>
        ))}
        {touched && !valid && <div className="strip" style={{ borderLeftColor: '#b91c1c' }}>⚠️ {t.required}</div>}
      </section>

      <div className="paybar">
        <button className="btn-primary" onClick={handleContinue}>
          {t.continue} →
        </button>
      </div>
    </main>
  )
}
