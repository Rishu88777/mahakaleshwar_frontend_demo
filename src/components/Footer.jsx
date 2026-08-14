import { OFFICIAL_SITE, HELPLINE } from '../config'

export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="f-title">🕉️ {t.committee}</div>
      <div className="f-row">{t.footerAddress}</div>
      <div className="f-row">
        {t.helpline}: <a href="tel:18002331008">{HELPLINE}</a> · <a href="mailto:office@mahakaleshwar.nic.in">office@mahakaleshwar.nic.in</a>
      </div>
      <div className="f-row">
        <a href={OFFICIAL_SITE} target="_blank" rel="noreferrer">www.shrimahakaleshwar.mp.gov.in</a>
      </div>
      <div className="f-row" style={{ marginTop: 10, fontSize: 11, opacity: 0.7 }}>
        Demo project — not affiliated with the official temple administration.
      </div>
    </footer>
  )
}
