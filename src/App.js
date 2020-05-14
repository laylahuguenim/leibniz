import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { calcPrecoMedio, calcResultadoAuferido } from './calculator'

export default function App() {
  const [ items, setItems ] = useState([])
  const [ precoMedio, setPrecoMedio ] = useState(0)
  const [ quantidadeMedia, setQuantidadeMedia ] = useState(0)
  const [ prejuizoAcumulado, setPrejuizoAcumulado ] = useState(0)
  const [ impostoRenda, setImpostoRenda ] = useState(0)
  const { register, handleSubmit } = useForm()
  const onSubmit = data => {
    setItems([...items, data])
    let { price, quantity, tax, type } = data
    price = parseFloat(price)
    quantity = parseInt(quantity)
    tax = parseFloat(tax)

    if(type === 'compra') {
      setQuantidadeMedia(quantidadeMedia + quantity)
      setPrecoMedio(calcPrecoMedio(precoMedio, quantidadeMedia, price, quantity, tax))
    } else {
      setQuantidadeMedia(quantidadeMedia - quantity)
      let resultadoAuferido = calcResultadoAuferido(price, precoMedio, quantity, tax)

      if (resultadoAuferido <= 0) {
        setPrejuizoAcumulado(prejuizoAcumulado + Math.abs(resultadoAuferido))
      } else {
        setImpostoRenda((resultadoAuferido - Math.min(resultadoAuferido, prejuizoAcumulado)) * 0.15)
        setPrejuizoAcumulado(prejuizoAcumulado - Math.min(resultadoAuferido, prejuizoAcumulado))
      }
    }
  }
  
  return <>
    <section>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label for="date">Data:</label>
      <input name="date" type="date" ref={register} defaultValue="2020-05-10" />
      <label for="price">Preço:</label>
      <input name="price" type="number" ref={register} step="0.01" defaultValue="26.90" />
      <label for="quantity">Quantidade:</label>
      <input name="quantity" type="number" ref={register} defaultValue="100" />
      <label for="tax">Taxa:</label>
      <input name="tax" type="number" ref={register} step="0.01" defaultValue="8.50" />
      <input type="radio" id="compra" name="type" value="compra" checked ref={register} />
      <label for="compra">compra</label>
      <input type="radio" id="venda" name="type" value="venda" ref={register} />
      <label for="venda">venda</label>
      <input type="submit" />
    </form>
    </section>
    <section>
      <p>Preço médio: {precoMedio}</p>
      <p>Quantidade Média: {quantidadeMedia}</p>
      <p>Prejuizo Acumulado: {prejuizoAcumulado}</p>
      <p>Imposto Renda: {impostoRenda}</p>
    </section>
    <section id="list">
      <h2>Histórico de transações</h2>
      {items.length > 0 ? 
      <ul>
        {items.map(item => (
          <li>
            <p>Data: {item.date}</p>
            <p>Preço: {item.price}</p>
            <p>Quantidade: {item.quantity}</p>
            <p>Taxas: {item.tax}</p>
            <p>Tipo: {item.type}</p>
          </li>
        ))}
      </ul> : <p>Sem transações no momento. Utilize o formulário acima para calcular o imposto de renda.</p>}
    </section>
  </>
}