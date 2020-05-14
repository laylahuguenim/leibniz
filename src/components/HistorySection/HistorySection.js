import React from 'react'
import { Container, Typography, Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    '& ul': {
      listStyle: 'none',
    },
  },
})

const HistorySection = ({ items }) => {
  const classes = useStyles()

  return (
    <Box mb={8}>
      <Container maxWidth="md" component="section" className={classes.root}>
        <Box mb={2}>
          <Typography variant="h5" component="h3">
            Histórico de transações
          </Typography>
        </Box>
        {items.length > 0 ? (
          <Box component="ul" p={0}>
            {items.map(({ date, type, price, tax, quantity }, index) => (
              <Box
                mb={2}
                p={2}
                component="li"
                key={index.toString()}
                bgcolor={type == 'compra' ? '#78bae8' : '#ff9393'}
              >
                <Typography variant="body1">
                  <strong>
                    {date} -> {type.toUpperCase()}
                  </strong>
                </Typography>
                <Typography variant="body1">Preço: {price}</Typography>
                <Typography variant="body1">Quantidade: {quantity}</Typography>
                <Typography variant="body1">Taxas: {tax}</Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="subtitle1">
            Sem transações no momento. Utilize o formulário acima para calcular
            o imposto de renda.
          </Typography>
        )}
      </Container>
    </Box>
  )
}

export default HistorySection
