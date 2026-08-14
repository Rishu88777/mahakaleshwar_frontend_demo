import { OFFICIAL_SITE } from '../config'

export default function AboutScreen({ t }) {
  return (
    <main>
      <section className="hero" style={{ height: 220 }}>
        <img className="hero-bg" src="/images/temple-hero.png" alt={t.templeFull} />
        <div className="hero-content">
          <span className="hero-badge">🕉️ {t.jaiMahakal}</span>
          <h1 style={{ fontSize: 23 }}>{t.aboutTitle}</h1>
        </div>
      </section>

      <section className="section">
        <div className="card">
          <p className="about-text" style={{ marginTop: 0 }}>{t.aboutTeaser}</p>
          <p className="about-text">{t.aboutP2}</p>
          <p className="about-text">{t.aboutP3}</p>
          <div style={{ marginTop: 16 }}>
            <a className="btn-outline" href={OFFICIAL_SITE} target="_blank" rel="noreferrer">
              🌐 {t.visitOfficial}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
