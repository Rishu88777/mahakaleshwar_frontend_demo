import { useMemo, useState } from 'react'
import { getDevoteeContext } from './config'
import { STRINGS } from './i18n'
import { SERVICES, PUJAN_TYPES } from './data/services'
import Header from './components/Header.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import BookingScreen from './components/BookingScreen.jsx'
import DetailsScreen from './components/DetailsScreen.jsx'
import CheckoutScreen from './components/CheckoutScreen.jsx'
import SuccessScreen from './components/SuccessScreen.jsx'
import AboutScreen from './components/AboutScreen.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const devotee = useMemo(getDevoteeContext, [])
  const [lang, setLang] = useState(devotee.lang)
  const [screen, setScreen] = useState('home') // home | booking | details | checkout | success | about
  const [service, setService] = useState(() => SERVICES.find((s) => s.id === devotee.service) || null)
  const [draft, setDraft] = useState(null) // { date, dateLabel, slot, persons, pujanType }
  const [visitors, setVisitors] = useState([])
  const [result, setResult] = useState(null)

  const t = STRINGS[lang]

  const openBooking = (s) => {
    setService(s)
    setDraft(null)
    setVisitors([])
    setScreen('booking')
  }

  const amount = useMemo(() => {
    if (!service || !draft) return 0
    if (service.id === 'pujan') {
      const pujan = PUJAN_TYPES.find((p) => p.id === draft.pujanType)
      return pujan ? pujan.price : 0
    }
    return service.price * (draft.persons || 1)
  }, [service, draft])

  const backTarget =
    screen === 'booking' ? 'home'
    : screen === 'details' ? 'booking'
    : screen === 'checkout' ? 'details'
    : screen === 'about' ? 'home'
    : null

  return (
    <div className="app">
      {screen !== 'success' && (
        <Header
          t={t}
          lang={lang}
          onToggleLang={() => setLang((l) => (l === 'en' ? 'hi' : 'en'))}
          onBack={backTarget ? () => setScreen(backTarget) : undefined}
        />
      )}

      {screen === 'home' && (
        <>
          <HomeScreen t={t} lang={lang} devotee={devotee} onSelect={openBooking} onAbout={() => setScreen('about')} />
          <Footer t={t} />
        </>
      )}

      {screen === 'about' && (
        <>
          <AboutScreen t={t} />
          <Footer t={t} />
        </>
      )}

      {screen === 'booking' && service && (
        <BookingScreen
          t={t}
          lang={lang}
          service={service}
          onContinue={(d) => { setDraft(d); setScreen('details') }}
        />
      )}

      {screen === 'details' && service && draft && (
        <DetailsScreen
          t={t}
          lang={lang}
          service={service}
          draft={draft}
          initialName={devotee.name}
          onContinue={(v) => { setVisitors(v); setScreen('checkout') }}
        />
      )}

      {screen === 'checkout' && service && draft && (
        <CheckoutScreen
          t={t}
          lang={lang}
          devotee={devotee}
          service={service}
          draft={draft}
          visitors={visitors}
          amount={amount}
          onPaid={(res) => { setResult(res); setScreen('success') }}
        />
      )}

      {screen === 'success' && result && (
        <SuccessScreen t={t} lang={lang} result={result} />
      )}
    </div>
  )
}
