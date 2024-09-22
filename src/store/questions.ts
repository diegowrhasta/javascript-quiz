import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import confetti from 'canvas-confetti'

import { getAllQuestions } from '../services/questions'
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
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,
          fetchQuestions: async (limit: number) => {
            const json = await getAllQuestions()

            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit)

            set({ questions }, false, 'FETCH_QUESTIONS')
          },
          selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get()
            // Structure Clone - Deep Clone
            const newQuestions = structuredClone(questions)

            const questionIndex = newQuestions.findIndex(
              x => x.id === questionId
            )
            const questionInfo = newQuestions[questionIndex]
            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex

            if (isCorrectUserAnswer) {
              confetti()
            }

            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex,
            }

            set({ questions: newQuestions }, false, 'SELECT ANSWER')
          },
          goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion }, false, 'GO NEXT QUESTION')
            }
          },
          goPreviousQuestion: () => {
            const { currentQuestion } = get()
            const nextQuestion = currentQuestion - 1

            if (nextQuestion >= 0) {
              set({ currentQuestion: nextQuestion }, false, 'GO PREVIOUS QUESTION')
            }
          },
          reset: () => {
            set({ currentQuestion: 0, questions: [] }, false, 'RESET')
          },
        }
      },
      {
        name: 'questions',
      }
    )
  )
)

export { useQuestionsStore }
