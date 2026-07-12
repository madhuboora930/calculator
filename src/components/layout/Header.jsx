import { FiArrowLeft, FiClock } from 'react-icons/fi'

export default function Header({ onToggleHistory, isHistoryOpen }) {
  return (
    <header className="glass mx-auto flex max-w-md items-center justify-between rounded-full px-5 py-3">
      <a
        href="https://madhuboora.online"
        title="Back to Portfolio"
        className="flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
      >
        <FiArrowLeft size={16} />
        <span className="hidden sm:inline">Portfolio</span>
      </a>

      <span className="font-mono text-sm font-semibold text-white">Neon Calc</span>

      <button
        type="button"
        onClick={onToggleHistory}
        aria-label={isHistoryOpen ? 'Hide history' : 'Show history'}
        aria-pressed={isHistoryOpen}
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
          isHistoryOpen ? 'bg-glow/20 text-glow' : 'text-slate-400 hover:text-white'
        }`}
      >
        <FiClock size={16} />
      </button>
    </header>
  )
}
