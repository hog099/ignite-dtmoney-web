import incomming from '../../assets/income.svg';
import outcomming from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import { Container } from './styles';

export function Summary() {
  return (
    <Container>
      
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomming} alt="Entradas" />
        </header>
        <strong>R$1000,00</strong>
      </div>
      
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomming} alt="Entradas" />
        </header>
        <strong>- R$1000,00</strong>
      </div>
      
      <div className="highlight-background">
        <header>
          <p>Entradas</p>
          <img src={total} alt="Entradas" />
        </header>
        <strong>R$500,00</strong>
      </div>

    </Container>
  )
}