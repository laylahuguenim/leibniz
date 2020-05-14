import React from 'react'
import { Container, Box, useTheme, Link } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import CalculatorSection from './components/CalculatorSection'

export default function App() {
  return (
    <>
      <Container maxWidth="md" component="header">
        <Box mt={2} mb={3}>
          <Typography variant="h4" component="h1">
            IT Calculator
          </Typography>
        </Box>
        <Box mb={4}>
          <Typography variant="subtitle1">
            Esta é uma calculadora de imposto de renda. Adicione os dados de
            cada transação feita abaixo:
          </Typography>
        </Box>
      </Container>
      <CalculatorSection />
      <Box
        component="footer"
        bgcolor="#A1D6E6"
        px={{ xs: 2, md: 5 }}
        position="fixed"
        bottom="0"
        right="0"
        left="0"
      >
        <Typography variant="overline">
          &copy; 2020{' '}
          <Link
            color="inherit"
            href="https://www.linkedin.com/in/laylahuguenim/"
          >
            Layla K
          </Link>
        </Typography>
      </Box>
    </>
  )
}
