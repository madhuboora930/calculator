import { useState } from 'react'
import AnimatedBackground from './components/layout/AnimatedBackground'
import Header from './components/layout/Header'
import Display from './components/calculator/Display'
import History from './components/calculator/History'
import Keypad from './components/calculator/Keypad'
import useCalculator from './hooks/useCalculator'
import useKeyboardInput from './hooks/useKeyboardInput'

export default function App() {
  const calculator = useCalculator()
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  useKeyboardInput(calculator)

  return (
    <>
      <AnimatedBackground />
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Header
            onToggleHistory={() => setIsHistoryOpen((prev) => !prev)}
            isHistoryOpen={isHistoryOpen}
          />

          <div className="mt-4">
            <Display
              currentValue={calculator.currentValue}
              previousValue={calculator.previousValue}
              operator={calculator.operator}
              hasError={calculator.hasError}
            />

            <History
              isOpen={isHistoryOpen}
              onClose={() => setIsHistoryOpen(false)}
              history={calculator.history}
              onClearHistory={calculator.clearHistory}
              onSelectResult={(value) => {
                calculator.loadValue(value)
                setIsHistoryOpen(false)
              }}
            />

            <Keypad
              inputDigit={calculator.inputDigit}
              inputDecimal={calculator.inputDecimal}
              toggleSign={calculator.toggleSign}
              inputPercent={calculator.inputPercent}
              clear={calculator.clear}
              deleteLast={calculator.deleteLast}
              chooseOperator={calculator.chooseOperator}
              evaluate={calculator.evaluate}
            />
          </div>
        </div>
      </div>
    </>
  )
}
