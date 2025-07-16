import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Login from '../pages/Login'
import Chat from '../pages/Chat'

interface Props {
  onLogin: (user: string) => void
}

export default function LoginChatSwitcher({ onLogin }: Props) {
  const [tab, setTab] = useState<'login' | 'chat'>('login')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto flex flex-col items-center"
    >
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab('login')}
          className={`px-4 py-2 rounded shadow-md backdrop-blur-md bg-white/80 transition-colors ${tab === 'login' ? 'bg-primary text-white' : ''}`}
        >
          Login
        </button>
        <button
          onClick={() => setTab('chat')}
          className={`px-4 py-2 rounded shadow-md backdrop-blur-md bg-white/80 transition-colors ${tab === 'chat' ? 'bg-primary text-white' : ''}`}
        >
          Chat
        </button>
      </div>
      <div className="w-full flex justify-center">
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
    </motion.div>
  )
}
