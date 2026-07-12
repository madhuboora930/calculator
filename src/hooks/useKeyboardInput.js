import { useEffect } from 'react'

const OPERATOR_KEYS = { '+': '+', '-': '−', '*': '×', '/': '÷' }

export default function useKeyboardInput({
  inputDigit,
  inputDecimal,
  chooseOperator,
  evaluate,
  clear,
  deleteLast,
  inputPercent,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        inputDigit(e.key)
        return
      }
      if (e.key === '.') {
        inputDecimal()
        return
      }
      if (OPERATOR_KEYS[e.key]) {
        chooseOperator(OPERATOR_KEYS[e.key])
        return
      }
      if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault()
        evaluate()
        return
      }
      if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        clear()
        return
      }
      if (e.key === 'Backspace') {
        deleteLast()
        return
      }
      if (e.key === '%') {
        inputPercent()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [inputDigit, inputDecimal, chooseOperator, evaluate, clear, deleteLast, inputPercent])
}
