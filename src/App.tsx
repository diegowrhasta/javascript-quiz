import { Container, Stack, Typography } from '@mui/material'

import { Game } from './Game'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './Start'

import './App.css'
import { useQuestionsStore } from './store/questions'

function App () {
  const questions = useQuestionsStore(state => state.questions)

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack
          direction='row'
          gap={2}
          alignItems='center'
          justifyContent='center'
        >
          <JavaScriptLogo></JavaScriptLogo>
          <Typography variant='h2' component='h1'>
            JavaScript Quizz
          </Typography>
        </Stack>

        {!questions.length && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
