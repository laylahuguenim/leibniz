import React, { useState } from 'react'
import {
  makeStyles,
  Container,
  Box,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  Typography,
  TextField,
  FormControlLabel,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { calcPrecoMedio, calcResultadoAuferido } from '../../calculator'
import HistorySection from '../HistorySection/HistorySection'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #F4F7FF 30%, #A1D6E6 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(67, 145, 169, 0.3)',
    padding: '0 30px',
    '& form': {
      '& > label': {
        margin: '4px 0px',
      },
      '& > div': {
        marginBottom: 12,
      },
      '& fieldset': {
        marginTop: 4,
      },
    },
  },
})

const CalculatorSection = () => {
  const classes = useStyles()

  const [items, setItems] = useState([])
  const [precoMedio, setPrecoMedio] = useState(0)
  const [quantidadeMedia, setQuantidadeMedia] = useState(0)
  const [prejuizoAcumulado, setPrejuizoAcumulado] = useState(0)
  const [impostoRenda, setImpostoRenda] = useState(0)
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    //console.log(data)
    setItems([...items, data])
    let { price, quantity, tax, type } = data
    price = parseFloat(price)
    quantity = parseInt(quantity)
    tax = parseFloat(tax)

    if (type === 'compra') {
      setQuantidadeMedia(quantidadeMedia + quantity)
      setPrecoMedio(
        calcPrecoMedio(precoMedio, quantidadeMedia, price, quantity, tax)
      )
    } else {
      setQuantidadeMedia(quantidadeMedia - quantity)
      let resultadoAuferido = calcResultadoAuferido(
        price,
        precoMedio,
        quantity,
        tax
      )

      if (resultadoAuferido <= 0) {
        setPrejuizoAcumulado(prejuizoAcumulado + Math.abs(resultadoAuferido))
      } else {
        setImpostoRenda(
          (resultadoAuferido - Math.min(resultadoAuferido, prejuizoAcumulado)) *
            0.15
        )
        setPrejuizoAcumulado(
          prejuizoAcumulado - Math.min(resultadoAuferido, prejuizoAcumulado)
        )
      }
    }
  }

  return (
    <>
      <Container maxWidth="md" component="section" className={classes.root}>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          pt={4}
          mb={8}
        >
          <Box
            component="form"
            width="45%"
            onSubmit={handleSubmit(onSubmit)}
            mb={8}
          >
            <InputLabel htmlFor="date">Data:</InputLabel>
            <TextField
              name="date"
              type="date"
              inputRef={register}
              defaultValue="2020-05-10"
            />
            <InputLabel htmlFor="price">Preço:</InputLabel>
            <TextField
              name="price"
              type="number"
              inputRef={register}
              step="0.01"
              defaultValue="26.90"
            />
            <InputLabel htmlFor="quantity">Quantidade:</InputLabel>
            <TextField
              name="quantity"
              type="number"
              inputRef={register}
              defaultValue="100"
            />
            <InputLabel htmlFor="tax">Taxa:</InputLabel>
            <TextField
              name="tax"
              type="number"
              inputRef={register}
              step="0.01"
              defaultValue="8.50"
            />
            <Box display="block">
              <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de Operação</FormLabel>
                <RadioGroup aria-label="type" defaultValue="compra" name="type">
                  <FormControlLabel
                    value="compra"
                    inputRef={register}
                    control={<Radio />}
                    label="Compra"
                  />
                  <FormControlLabel
                    value="venda"
                    inputRef={register}
                    control={<Radio />}
                    label="Venda"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Button type="submit" variant="outlined" color="primary">
              Calcular
            </Button>
          </Box>
          <Box width="45%">
            <Box mb={2}>
              <Typography variant="h4" component="h2">
                Resultados
              </Typography>
            </Box>
            <Typography variant="body1">
              Imposto de Renda a ser pago: <strong>{impostoRenda}</strong>
            </Typography>
            <Typography variant="body1">
              Preço Médio: <strong>{precoMedio}</strong>
            </Typography>
            <Typography variant="body1">
              Quantidade Média: <strong>{quantidadeMedia}</strong>
            </Typography>
            <Typography variant="body1">
              Prejuizo Acumulado: <strong>{prejuizoAcumulado}</strong>
            </Typography>
          </Box>
        </Box>
      </Container>
      <HistorySection items={items} />
    </>
  )
}

export default CalculatorSection
