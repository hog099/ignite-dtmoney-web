import React from 'react';
import incomming from '../../assets/income.svg';
import outcomming from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styles';

export function Summary() {

  const { transactions } = useTransactions();

  // const totalDeposits = transactions.reduce((acc, transaction) => {
  //   if (transaction.type === 'deposit') {
  //     return acc + transaction.amount;
  //   } else {
  //     return acc;      
  //   }
  // }, 0);

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposit += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraw += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    deposit: 0,
    withdraw: 0,
    total: 0,
  });

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomming} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
        }).format(summary.deposit)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomming} alt="Entradas" />
        </header>
        <strong>
          - {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
        }).format(summary.withdraw)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Entradas</p>
          <img src={total} alt="Entradas" />
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
        }).format(summary.total)}
        </strong>
      </div>

    </Container>
  )
}