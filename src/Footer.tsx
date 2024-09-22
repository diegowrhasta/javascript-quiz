import { useQuestionsData } from './hooks/useQuestionsData'

function Footer () {
  const { correct, incorrect, unanswered } = useQuestionsData()

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`Correct: ${correct} - Incorrect: ${incorrect} - Unanswered: ${unanswered}`}</strong>
    </footer>
  )
}

export { Footer }
