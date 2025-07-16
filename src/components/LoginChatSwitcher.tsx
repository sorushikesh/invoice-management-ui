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
    <div className="relative w-full max-w-4xl flex items-center justify-center">
      <button
        onClick={() => setTab('login')}
        className={`px-4 py-2 rounded shadow-md backdrop-blur-md bg-white/80 transition-all ${tab === 'login' ? 'bg-primary text-white' : ''} ${tab ? 'absolute top-4 left-4' : 'mx-2'}`}
      >
        Login
      </button>
      <button
        onClick={() => setTab('chat')}
        className={`px-4 py-2 rounded shadow-md backdrop-blur-md bg-white/80 transition-all ${tab === 'chat' ? 'bg-primary text-white' : ''} ${tab ? 'absolute top-4 right-4' : 'mx-2'}`}
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
  )
}
