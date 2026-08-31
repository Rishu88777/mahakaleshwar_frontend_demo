import { SERVICES } from '../data/services'
import { OFFICIAL_SITE } from '../config'
import { rupee } from '../utils/format'

export default function HomeScreen({ t, lang, devotee, onSelect, onAbout }) {
  const greetName = devotee.name || t.bhakt
  return (
    <main>
      {/* Hero — full-bleed photo under a twilight overlay with a soft starfield */}
      <section className="hero">
        <img className="hero-bg" src="/images/temple-hero.png" alt={t.templeFull} />
        <div className="hero-content">
          <span className="hero-badge">🕉️ {t.jaiMahakal}</span>
          <h1>{t.templeFull}</h1>
          <p className="hero-sub">{t.heroTag}</p>
          <p className="hero-om" style={{ marginTop: 6 }}>
            {t.welcome}, {greetName} 🙏
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <h2 className="section-title">{t.onlineServices}</h2>
        <p className="section-sub">{t.servicesSub}</p>
        {SERVICES.map((s, i) => (
          <button key={s.id} className="service-card" style={{ '--i': i }} onClick={() => onSelect(s)}>
            <span className="service-emoji" aria-hidden="true">{s.emoji}</span>
            <span className="service-info">
              <span className="service-name">{s.name[lang]}</span>
              <span className="service-desc" style={{ display: 'block' }}>{s.desc[lang]}</span>
            </span>
            <span className="service-price">
              {s.price ? rupee(s.price) : rupee(100)}
              <span className="from">{s.price ? t.perPerson : lang === 'hi' ? 'से प्रारंभ' : 'onwards'}</span>
            </span>
            <span className="chev" aria-hidden="true">›</span>
          </button>
        ))}
        <div className="strip">
          📿 {lang === 'hi'
            ? 'सामान्य दर्शन निःशुल्क हैं — त्रिवेणी द्वार से प्रवेश करें।'
            : 'General Darshan is free of cost — enter via the Triveni Gate.'}
        </div>
      </section>

      {/* Timings */}
      <section className="section">
        <h2 className="section-title">{t.timingsTitle}</h2>
        <div className="card">
          {t.aartis.map(([name, time]) => (
            <div className="timing-row" key={name}>
              <span className="aarti">🪔 {name}</span>
              <span className="time">{time}</span>
            </div>
          ))}
        </div>
        <div className="strip">🛕 {t.timingsNote}</div>
      </section>

      {/* About teaser */}
      <section className="section">
        <h2 className="section-title">{t.aboutTitle}</h2>
        <div className="card">
          <p className="about-text" style={{ marginTop: 0 }}>{t.aboutTeaser}</p>
          <button className="about-link" onClick={onAbout} style={{ background: 'none' }}>
            {t.readMore} →
          </button>
          <div style={{ marginTop: 14 }}>
            <a className="btn-outline" href={OFFICIAL_SITE} target="_blank" rel="noreferrer">
              🌐 {t.visitOfficial}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
