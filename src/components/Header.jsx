export default function Header({ t, onToggleLang, onBack }) {
  return (
    <header className="header">
      {onBack ? (
        <button className="back-btn" onClick={onBack} aria-label={t.back}>
          ‹ {t.back}
        </button>
      ) : (
        <div className="brand-mark" aria-hidden="true">🔱</div>
      )}
      <div className="brand">
        <div>
          <div className="brand-title">{t.templeName}</div>
          <div className="brand-sub">{t.templeSub}</div>
        </div>
      </div>
      <button className="lang-toggle" onClick={onToggleLang} aria-label="Change language">
        🌐 {t.langName}
      </button>
    </header>
  )
}
