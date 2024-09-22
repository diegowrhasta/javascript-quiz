import { useQuestionsStore } from './store/questions'

function Footer () {
  const questions = useQuestionsStore(state => state.questions)

  let correct = 0
  let incorrect = 0
  let unsanswered = 0

  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question
    if (userSelectedAnswer == null) {
      unsanswered++
      return
    }

    if (userSelectedAnswer === correctAnswer) {
      correct++
      return
    }

    incorrect++
  })

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`Correct: ${correct} - Incorrect: ${incorrect} - Unanswered: ${unsanswered}`}</strong>
    </footer>
  )
}

export { Footer }
