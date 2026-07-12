import { AnimatePresence, motion } from 'framer-motion'
import { FiClock, FiTrash2, FiX } from 'react-icons/fi'

export default function History({ isOpen, onClose, history, onClearHistory, onSelectResult }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="glass mt-3 rounded-2xl p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-slate-400 uppercase">
                <FiClock size={13} /> History
              </p>
              <div className="flex items-center gap-3">
                {history.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearHistory}
                    aria-label="Clear history"
                    className="text-slate-500 hover:text-danger"
                  >
                    <FiTrash2 size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close history"
                  className="text-slate-500 hover:text-white"
                >
                  <FiX size={16} />
                </button>
              </div>
            </div>

            {history.length === 0 ? (
              <p className="py-4 text-center text-sm text-slate-500">No calculations yet</p>
            ) : (
              <ul className="scrollbar-none max-h-48 space-y-1 overflow-y-auto">
                {history.map((entry) => (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => onSelectResult(entry.result)}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-white/5"
                    >
                      <span className="font-mono text-xs text-slate-500">{entry.expression}</span>
                      <span className="font-mono text-sm font-medium text-white">
                        = {entry.result}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
