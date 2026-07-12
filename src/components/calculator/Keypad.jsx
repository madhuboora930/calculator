import { MdBackspace } from 'react-icons/md'
import CalcButton from './CalcButton'

export default function Keypad({
  inputDigit,
  inputDecimal,
  toggleSign,
  inputPercent,
  clear,
  deleteLast,
  chooseOperator,
  evaluate,
}) {
  return (
    <div className="mt-4 grid grid-cols-4 gap-3">
      <CalcButton variant="function" onClick={clear} aria-label="Clear">
        C
      </CalcButton>
      <CalcButton variant="function" onClick={deleteLast} aria-label="Delete last digit">
        <MdBackspace size={20} />
      </CalcButton>
      <CalcButton variant="function" onClick={inputPercent} aria-label="Percent">
        %
      </CalcButton>
      <CalcButton variant="operator" onClick={() => chooseOperator('÷')} aria-label="Divide">
        ÷
      </CalcButton>

      <CalcButton onClick={() => inputDigit('7')}>7</CalcButton>
      <CalcButton onClick={() => inputDigit('8')}>8</CalcButton>
      <CalcButton onClick={() => inputDigit('9')}>9</CalcButton>
      <CalcButton variant="operator" onClick={() => chooseOperator('×')} aria-label="Multiply">
        ×
      </CalcButton>

      <CalcButton onClick={() => inputDigit('4')}>4</CalcButton>
      <CalcButton onClick={() => inputDigit('5')}>5</CalcButton>
      <CalcButton onClick={() => inputDigit('6')}>6</CalcButton>
      <CalcButton variant="operator" onClick={() => chooseOperator('−')} aria-label="Subtract">
        −
      </CalcButton>

      <CalcButton onClick={() => inputDigit('1')}>1</CalcButton>
      <CalcButton onClick={() => inputDigit('2')}>2</CalcButton>
      <CalcButton onClick={() => inputDigit('3')}>3</CalcButton>
      <CalcButton variant="operator" onClick={() => chooseOperator('+')} aria-label="Add">
        +
      </CalcButton>

      <CalcButton variant="function" onClick={toggleSign} aria-label="Toggle sign">
        ±
      </CalcButton>
      <CalcButton onClick={() => inputDigit('0')}>0</CalcButton>
      <CalcButton onClick={inputDecimal} aria-label="Decimal point">
        .
      </CalcButton>
      <CalcButton variant="equals" onClick={evaluate} aria-label="Equals">
        =
      </CalcButton>
    </div>
  )
}
