import { motion } from 'framer-motion'

const VARIANTS = {
  digit: 'bg-surface-2 text-white hover:bg-surface-2/70',
  function: 'bg-surface text-slate-300 hover:bg-surface/70',
  operator: 'border border-op/40 bg-op/10 text-op hover:bg-op/20',
  equals: 'bg-gradient-to-br from-glow to-glow-2 text-ink font-semibold shadow-lg shadow-glow/20',
}

export default function CalcButton({ children, variant = 'digit', className = '', ...rest }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.1 }}
      className={`flex h-16 items-center justify-center rounded-2xl font-mono text-xl transition-colors duration-150 sm:h-20 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
