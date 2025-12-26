import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Quiz() {
  const { t } = useTranslation()
  const questions = t('quiz.questions', { returnObjects: true })
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const q = questions[index]

  const select = (choice) => {
    setAnswers(prev => [...prev, choice])
    if (index + 1 >= questions.length) {
      setFinished(true)
    } else {
      setIndex(index + 1)
    }
  }

  const restart = () => {
    setIndex(0)
    setAnswers([])
    setFinished(false)
  }

  if (finished) {
    const correctCount = answers.filter((a,i) => a === questions[i].correct).length
    return (
      <div>
        <h3>{t('app.quizFinished', 'Quiz Finished')}</h3>
        <p>{t('app.correctAnswers', 'Correct answers: {{count}}', { count: correctCount })}</p>
        <button className="action-btn" onClick={restart}>{t('app.restart', 'Restart')}</button>
      </div>
    )
  }

  return (
    <div>
      <h3>{q.title}</h3>
      <div className="quiz-choices">
        {q.choices.map((c, i) => (
          <button key={i} className="choice-btn" onClick={() => select(i)}>{c}</button>
        ))}
      </div>
      <p className="quiz-progress">{`${index+1} / ${questions.length}`}</p>
    </div>
  )
}
