import { useEffect, useState } from 'react'
import { calculate, numberToInputString } from '../utils/calculate'

const INITIAL_STATE = {
  currentValue: '0',
  previousValue: null,
  operator: null,
  overwrite: true,
  hasError: false,
  lastCalculation: null,
}

export default function useCalculator() {
  const [state, setState] = useState(INITIAL_STATE)
  const [history, setHistory] = useState([])

  // Recording history is a side effect of a completed calculation, so it
  // belongs in an effect — not inside the setState updater below. State
  // updater functions must stay pure; React's Strict Mode double-invokes
  // them in dev specifically to catch side effects like a nested setState
  // call, which is exactly what produced duplicated history rows earlier.
  useEffect(() => {
    if (!state.lastCalculation) return
    const { previousValue, operator, operand, result } = state.lastCalculation
    setHistory((prevHistory) =>
      [
        {
          id: crypto.randomUUID(),
          expression: `${numberToInputString(previousValue)} ${operator} ${operand}`,
          result: numberToInputString(result),
        },
        ...prevHistory,
      ].slice(0, 20),
    )
  }, [state.lastCalculation])

  const inputDigit = (digit) => {
    setState((prev) => {
      if (prev.hasError) return { ...INITIAL_STATE, currentValue: digit }
      if (prev.overwrite) return { ...prev, currentValue: digit, overwrite: false }
      if (prev.currentValue === '0' && digit === '0') return prev
      if (prev.currentValue === '0') return { ...prev, currentValue: digit }
      if (prev.currentValue.replace('-', '').replace('.', '').length >= 15) return prev
      return { ...prev, currentValue: prev.currentValue + digit }
    })
  }

  const inputDecimal = () => {
    setState((prev) => {
      if (prev.hasError) return { ...INITIAL_STATE, currentValue: '0.' }
      if (prev.overwrite) return { ...prev, currentValue: '0.', overwrite: false }
      if (prev.currentValue.includes('.')) return prev
      return { ...prev, currentValue: `${prev.currentValue}.` }
    })
  }

  const toggleSign = () => {
    setState((prev) => {
      if (prev.hasError || prev.currentValue === '0') return prev
      return {
        ...prev,
        currentValue: prev.currentValue.startsWith('-')
          ? prev.currentValue.slice(1)
          : `-${prev.currentValue}`,
      }
    })
  }

  const inputPercent = () => {
    setState((prev) => {
      if (prev.hasError) return prev
      const asPercent = parseFloat(prev.currentValue) / 100
      return { ...prev, currentValue: numberToInputString(asPercent), overwrite: true }
    })
  }

  const clear = () => {
    setState(INITIAL_STATE)
  }

  const deleteLast = () => {
    setState((prev) => {
      if (prev.hasError || prev.overwrite) return { ...INITIAL_STATE }
      const trimmed = prev.currentValue.slice(0, -1)
      return { ...prev, currentValue: trimmed === '' || trimmed === '-' ? '0' : trimmed }
    })
  }

  const chooseOperator = (nextOperator) => {
    setState((prev) => {
      if (prev.hasError) return prev
      const current = parseFloat(prev.currentValue)

      if (prev.previousValue !== null && prev.operator && !prev.overwrite) {
        const result = calculate(prev.previousValue, current, prev.operator)
        if (!Number.isFinite(result)) {
          return { ...INITIAL_STATE, currentValue: 'Error', hasError: true }
        }
        return {
          currentValue: numberToInputString(result),
          previousValue: result,
          operator: nextOperator,
          overwrite: true,
          hasError: false,
          lastCalculation: null,
        }
      }

      return {
        ...prev,
        previousValue: current,
        operator: nextOperator,
        overwrite: true,
      }
    })
  }

  const evaluate = () => {
    setState((prev) => {
      if (prev.hasError || prev.previousValue === null || prev.operator === null) return prev

      const current = parseFloat(prev.currentValue)
      const result = calculate(prev.previousValue, current, prev.operator)

      if (!Number.isFinite(result)) {
        return { ...INITIAL_STATE, currentValue: 'Error', hasError: true }
      }

      return {
        currentValue: numberToInputString(result),
        previousValue: null,
        operator: null,
        overwrite: true,
        hasError: false,
        lastCalculation: {
          previousValue: prev.previousValue,
          operator: prev.operator,
          operand: prev.currentValue,
          result,
        },
      }
    })
  }

  const clearHistory = () => setHistory([])

  const loadValue = (value) => {
    setState({ ...INITIAL_STATE, currentValue: value, overwrite: true })
  }

  return {
    currentValue: state.currentValue,
    previousValue: state.previousValue,
    operator: state.operator,
    hasError: state.hasError,
    history,
    inputDigit,
    inputDecimal,
    toggleSign,
    inputPercent,
    clear,
    deleteLast,
    loadValue,
    chooseOperator,
    evaluate,
    clearHistory,
  }
}
