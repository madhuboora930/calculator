import { useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'
import { formatDisplayValue } from '../../utils/calculate'

export default function Display({ currentValue, previousValue, operator, hasError }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard API unavailable — silently ignore
    }
  }

  return (
    <div className="glass relative rounded-2xl px-5 py-6 sm:px-6">
      <div className="flex h-5 items-center justify-end font-mono text-sm text-slate-400">
        {previousValue !== null && operator && (
          <span>
            {formatDisplayValue(String(previousValue))} {operator}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-end justify-between gap-3">
        <p
          aria-live="polite"
          className={`glow-display font-mono text-4xl font-semibold break-all sm:text-5xl ${
            hasError ? 'text-danger' : 'text-gradient'
          }`}
        >
          {hasError ? currentValue : formatDisplayValue(currentValue)}
        </p>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy result"
          title="Copy result"
          className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-white"
        >
          {copied ? <FiCheck size={16} className="text-glow-2" /> : <FiCopy size={16} />}
        </button>
      </div>
    </div>
  )
}
