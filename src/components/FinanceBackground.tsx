import { motion } from 'framer-motion'

export default function FinanceBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-dots z-0" />

      {/* Floating Blobs */}
      <motion.div
        className="absolute -left-20 top-10 w-72 h-72 rounded-full bg-green-300 opacity-30 blur-3xl z-0"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-yellow-200 opacity-30 blur-3xl z-0"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating Finance Icons */}
      <div className="absolute inset-0 flex items-end justify-center gap-10 pb-6 z-0">
        <motion.svg
          className="w-10 h-10 text-green-600 dark:text-green-400"
          viewBox="0 0 24 24"
          aria-hidden="true"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <title>Invoice</title>
          <path d="M6 2h7l5 5v15H6V2z" fill="currentColor" />
          <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
        <motion.svg
          className="w-10 h-10 text-blue-500 dark:text-blue-300"
          viewBox="0 0 24 24"
          aria-hidden="true"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        >
          <title>Chart</title>
          <rect x="4" y="10" width="3" height="10" rx="1" />
          <rect x="10" y="6" width="3" height="14" rx="1" />
          <rect x="16" y="13" width="3" height="7" rx="1" />
        </motion.svg>
        <motion.svg
          className="w-10 h-10 text-purple-500 dark:text-purple-400"
          viewBox="0 0 24 24"
          aria-hidden="true"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          <title>Currency</title>
          <path d="M12 3v18M8 7h8a3 3 0 010 6H8m0 0h8a3 3 0 010 6H8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
      </div>
    </div>
  )
}
