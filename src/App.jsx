import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'
import './i18n'
import { useTranslation } from 'react-i18next'
import Quiz from './Quiz'

function App() {
  const [currentTask, setCurrentTask] = useState(null);
  const { t, i18n } = useTranslation()
  const [lang, setLang] = useState(i18n.language || 'tr');
  const [page, setPage] = useState('task'); // 'task' veya 'quiz'

  // Rastgele görev seçme fonksiyonu
  const getRandomTask = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const randomIndex = Math.floor(Math.random() * tasks.length);
    setCurrentTask(tasks[randomIndex]);
  }

  // UI texts come from i18n via `t`.
  const uiText = t('app', { returnObjects: true })
  const tasks = t('tasks', { returnObjects: true })
  const december = t('december', { returnObjects: true })

  return (
    <div className="container">
      <img src="/logo.svg" alt="Netiquette Matters Logo" style={{ maxWidth: '150px', marginBottom: '20px' }} />

      <div className="lang-switcher">
        <button onClick={() => { i18n.changeLanguage('tr'); setLang('tr') }} className={lang === 'tr' ? 'active' : ''}>🇹🇷 TR</button>
        <button onClick={() => { i18n.changeLanguage('en'); setLang('en') }} className={lang === 'en' ? 'active' : ''}>🇬🇧 EN</button>
        <button onClick={() => { i18n.changeLanguage('pt'); setLang('pt') }} className={lang === 'pt' ? 'active' : ''}>🇵🇹 PT</button>
      </div>

      <h1>{uiText.title}</h1>
      <p className="subtitle">{uiText.subtitle}</p>

      <div className="tabs">
        <button onClick={() => setPage('task')} className={page === 'task' ? 'active' : ''}>{uiText[lang].taskTab}</button>
        <button onClick={() => setPage('quiz')} className={page === 'quiz' ? 'active' : ''}>{uiText[lang].quizTab}</button>
        <button onClick={() => setPage('program')} className={page === 'program' ? 'active' : ''}>{uiText[lang].programTab}</button>
      </div>

      <div className="card">
        {page === 'task' ? (
          <>
            {currentTask ? (
              <p className="task-text">{currentTask}</p>
            ) : (
              <p className="placeholder">{uiText.placeholder}</p>
            )}
            <button className="action-btn" onClick={() => { const randomIndex = Math.floor(Math.random() * tasks.length); confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); setCurrentTask(tasks[randomIndex]) }}>{uiText.btn}</button>
          </>
        ) : page === 'quiz' ? (
          <Quiz />
        ) : (
          <div className="program">
            <h2>{december.title}</h2>
            <p className="subtitle">{december.goal}</p>
            {december.weeks.map(w => (
              <div key={w.week} style={{ textAlign: 'left', margin: '12px 0' }}>
                <h4>{(lang==='tr' ? `Hafta ${w.week}: ` : lang==='en' ? `Week ${w.week}: ` : `Semana ${w.week}: `) + w.title}</h4>
                <ul>
                  {w.activities.map((a,i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
