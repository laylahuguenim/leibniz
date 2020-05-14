import React from 'react'
import { Container, Typography } from '@material-ui/core'

const HistorySection = ({ items }) => {
return <Container maxWidth="md" component="section">
<Typography variant="h5" component="h3">
  Histórico de transações
</Typography>
{items.length > 0 ? (
  <ul>
    {items.map((item) => (
      <li>
        <Typography variant="body1">{item.date}</Typography>
        <Typography variant="body1">Operação de {item.type}</Typography>
        <Typography variant="body1">Preço: {item.price}</Typography>
        <Typography variant="body1">Quantidade: {item.quantity}</Typography>
        <Typography variant="body1">Taxas: {item.tax}</Typography>
      </li>
    ))}
  </ul>
) : (
  <Typography variant="subtitle1">
    Sem transações no momento. Utilize o formulário acima para calcular
    o imposto de renda.
  </Typography>
)}
</Container>
}

export default HistorySection