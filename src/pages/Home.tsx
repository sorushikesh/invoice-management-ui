import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Login from './Login'
import Chat from './Chat'
import FinanceBackground from '../components/FinanceBackground'

interface Props {
  readonly onLogin: (user: string) => void
}

export default function Home({ onLogin }: Props) {
  const [tab, setTab] = useState<'login' | 'chat' | null>(null)

  const toggleTab = (next: 'login' | 'chat') => {
    setTab((current) => (current === next ? null : next))
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <FinanceBackground />
      <div className="relative w-full max-w-4xl flex items-center justify-center">
        <button
          onClick={() => toggleTab('login')}
          className={`px-4 py-2 rounded shadow-md backdrop-blur-md bg-white/80 transition-all ${tab ? 'absolute top-4 left-4' : 'mx-2'
            } ${tab === 'login' ? 'bg-primary text-white' : ''}`}
        >
          Login
        </button>
        <button
          onClick={() => toggleTab('chat')}
          className={`px-4 py-2 rounded shadow-md backdrop-blur-md bg-white/80 transition-all ${tab ? 'absolute top-4 right-4' : 'mx-2'
            } ${tab === 'chat' ? 'bg-primary text-white' : ''}`}
        >
          Chat
        </button>
        <div className="w-full flex justify-center mt-10">
          <AnimatePresence mode="wait">
            {tab === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full"
              >
                <Login onLogin={onLogin} embedded />
              </motion.div>
            )}
            {tab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full"
              >
                <Chat embedded />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
