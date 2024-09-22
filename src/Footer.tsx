import { Button } from '@mui/material'
import { useQuestionsData } from './hooks/useQuestionsData'
import { useQuestionsStore } from './store/questions'

function Footer () {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore(state => state.reset)

  return (
    <>
      <footer style={{ marginTop: '16px' }}>
        <strong>{`Correct: ${correct} - Incorrect: ${incorrect} - Unanswered: ${unanswered}`}</strong>
      </footer>
      <Button onClick={reset}>Reset Game</Button>
    </>
  )
}

export { Footer }
