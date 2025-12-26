import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'
import { tasks } from './tasks'

function App() {
  const [currentTask, setCurrentTask] = useState(null);
  const [lang, setLang] = useState('tr'); // Varsayılan dil Türkçe

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

  // Arayüz metinleri için basit bir sözlük
  const uiText = {
    tr: { title: "Dijital Nezaket Pusulası", btn: "Bana Bir Görev Ver!", subtitle: "Netiquette Matters Projesi" },
    en: { title: "Digital Kindness Compass", btn: "Give Me a Task!", subtitle: "Netiquette Matters Project" },
    pt: { title: "Bússola da Gentileza Digital", btn: "Dê-me uma Tarefa!", subtitle: "Projeto Netiquette Matters" }
  };

  return (
    <div className="container">
      {/* Logo Alanı */}
      <img src="/logo.svg" alt="Netiquette Matters Logo" style={{ maxWidth: '150px', marginBottom: '20px' }} />
      {/* Dil Seçimi Butonları */}
      <div className="lang-switcher">
        <button onClick={() => setLang('tr')} className={lang === 'tr' ? 'active' : ''}>🇹🇷 TR</button>
        <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>🇬🇧 EN</button>
        <button onClick={() => setLang('pt')} className={lang === 'pt' ? 'active' : ''}>🇵🇹 PT</button>
      </div>

      <h1>{uiText[lang].title}</h1>
      <p className="subtitle">{uiText[lang].subtitle}</p>

      <div className="card">
        {currentTask ? (
          <p className="task-text">
            {currentTask[lang]} 
          </p>
        ) : (
          <p className="placeholder">
            {lang === 'tr' ? "Bugün dünyaya nasıl bir iyilik yayacaksın?" : 
             lang === 'en' ? "How will you spread kindness today?" : 
             "Como você espalhará gentileza hoje?"}
          </p>
        )}
        
        <button className="action-btn" onClick={getRandomTask}>
          {uiText[lang].btn}
        </button>
      </div>
    </div>
  )
}

export default App
