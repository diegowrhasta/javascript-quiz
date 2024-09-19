import { Container, Stack, Typography } from '@mui/material'

import './App.css'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'

function App () {
  const questions = useQuestionsStore(state => state.questions)
  console.log(questions)

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
        {questions.length > 0 && <h1>Game</h1>}
      </Container>
    </main>
  )
}

export default App
