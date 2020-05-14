/*

1) Para cada operação de compra deve-se recalcular o preço médio (PM) e a quantidade média (QM) da ação da seguinte forma:
PM = (PM * QM + PC * QC + TC) / (QM + QC)
QM = QM + QC
Sendo PC o preço de compra, QC a quantidade comprada, TC a taxa de corretagem de compra, PM e
QM inicialmente zero.

*/

const calcPrecoMedio = (
  precoMedioValue,
  quantMediaValue,
  precoCompra,
  quantComprada,
  taxaCorretagem
) =>
  (precoMedioValue * quantMediaValue +
    precoCompra * quantComprada +
    taxaCorretagem) /
  (quantMediaValue + quantComprada)

/*

2) Para cada operação de venda, deve-se calcular o resultado auferido (RA) e recalcular QM:
RA = (PV - PM) * QV - TV
QM = QM - QV
Sendo PV o preço de venda, QV a quantidade vendida e TV a taxa de corretagem de venda.

*/

const calcResultadoAuferido = (
  precoVenda,
  precoMedioValue,
  quantidadeVendida,
  taxaCorretagem
) => (precoVenda - precoMedioValue) * quantidadeVendida - taxaCorretagem

/*

3) Caso haja prejuízo no resultado auferido, deve-se somá-lo ao prejuízo acumulado (PA):
PA = PA + RA

Regra 3 e 4 são implementadas no próprio CalculatorSection. Assim como as atualizações da quantidade média.

*/

export { calcPrecoMedio, calcResultadoAuferido }
