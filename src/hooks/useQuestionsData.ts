import { useQuestionsStore } from '../store/questions'

const useQuestionsData = () => {
  const questions = useQuestionsStore(state => state.questions) // Only Observe THIS State change.

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question
    if (userSelectedAnswer == null) {
      unanswered++
      return
    }

    if (userSelectedAnswer === correctAnswer) {
      correct++
      return
    }

    incorrect++
  })

  return { correct, incorrect, unanswered }
}

export { useQuestionsData }
