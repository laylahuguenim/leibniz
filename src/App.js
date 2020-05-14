import React from 'react'
import {
  Container,
  Box,
} from '@material-ui/core'
import { Typography } from '@material-ui/core'
import CalculatorSection from './components/CalculatorSection'

export default function App() {

  return (
    <>
      <Container maxWidth="md" component="header">
        <Box mt={2} mb={4}>
          <Typography variant="h3" component="h1">
            Calculadora de Imposto de Renda
          </Typography>
        </Box>
      </Container>
      <CalculatorSection />
    </>
  )
}
