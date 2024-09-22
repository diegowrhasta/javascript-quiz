import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import confetti from 'canvas-confetti'

import { type Question } from '../types'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
          const res = await fetch('http://localhost:5173/data.json')
          const json = await res.json()

          const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)

          set(_ => ({ questions }))
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get()
          // Structure Clone - Deep Clone
          const newQuestions = structuredClone(questions)

          const questionIndex = newQuestions.findIndex(x => x.id === questionId)
          const questionInfo = newQuestions[questionIndex]
          const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

          if (isCorrectUserAnswer) {
            confetti()
          }

          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          }

          set(_ => ({ questions: newQuestions }))
        },
        goNextQuestion: () => {
          const { currentQuestion, questions } = get()
          const nextQuestion = currentQuestion + 1

          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion })
          }
        },
        goPreviousQuestion: () => {
          const { currentQuestion } = get()
          const nextQuestion = currentQuestion - 1

          if (nextQuestion >= 0) {
            set({ currentQuestion: nextQuestion })
          }
        },
        reset: () => {
          set({ currentQuestion: 0, questions: [] })
        },
      }
    },
    {
      name: 'questions',
    }
  )
)

export { useQuestionsStore }
