const MAX_SIGNIFICANT_DIGITS = 10

/** Rounds away binary floating-point artifacts like 0.1 + 0.2 = 0.30000000000000004 */
export function roundResult(value) {
  if (!Number.isFinite(value)) return value
  return Number(value.toPrecision(MAX_SIGNIFICANT_DIGITS))
}

/** Pure arithmetic. Division by zero returns Infinity/NaN — callers check with Number.isFinite. */
export function calculate(a, b, operator) {
  switch (operator) {
    case '+':
      return roundResult(a + b)
    case '−':
      return roundResult(a - b)
    case '×':
      return roundResult(a * b)
    case '÷':
      return roundResult(a / b)
    default:
      return b
  }
}

/**
 * Formats a raw input string (as typed, e.g. "1234.50") for display with
 * thousands separators on the integer part, while preserving a trailing
 * decimal point or trailing zeros the user is still typing.
 */
export function formatDisplayValue(rawValue) {
  if (rawValue === 'Error') return 'Error'

  // Extremely large/small results come back from the engine in JS's own
  // exponential notation (e.g. "1e-8"), which isn't safe to split on "."
  // and comma-format as an integer — show it as-is instead.
  if (rawValue.includes('e') || rawValue.includes('E')) return rawValue

  const isNegative = rawValue.startsWith('-')
  const unsigned = isNegative ? rawValue.slice(1) : rawValue
  const [integerPart, decimalPart] = unsigned.split('.')

  const formattedInteger = new Intl.NumberFormat('en-US').format(BigInt(integerPart || '0'))
  const sign = isNegative ? '-' : ''

  if (decimalPart === undefined) return `${sign}${formattedInteger}`
  return `${sign}${formattedInteger}.${decimalPart}`
}

/** Converts a finished numeric result into the plain string the calculator state expects. */
export function numberToInputString(value) {
  if (!Number.isFinite(value)) return 'Error'
  return String(value)
}
