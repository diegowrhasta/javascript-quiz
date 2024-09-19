import { create } from 'zustand'
import { type Question } from './types'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
}

const useQuestionsStore = create<State>(set => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      set(state => ({
        questions: [
          {
            id: 1,
            question: "What's the result of the next expression?",
            code: "3 + 2 + '7'",
            answers: ['12', '327', '57', 'NaN'],
            correctAnswer: 2,
          },
        ],
      }))
    },
  }
})

export { useQuestionsStore }
