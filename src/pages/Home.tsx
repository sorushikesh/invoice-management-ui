// pages/home.tsx
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('../components/Login'))
const Chat = dynamic(() => import('../components/Chat'))

export default function Home() {
  const [tab, setTab] = useState<'none' | 'login' | 'chat'>('none')

  const backgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="w-full h-screen flex items-center justify-center relative" style={backgroundStyle}>
      {tab === 'none' && (
        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            className="px-6 py-3 bg-white/80 rounded-lg shadow font-semibold text-[#1F4C3B] hover:bg-white"
            whileHover={{ scale: 1.05 }}
            onClick={() => setTab('login')}
          >
            Login
          </motion.button>
          <motion.button
            className="px-6 py-3 bg-white/80 rounded-lg shadow font-semibold text-[#1F4C3B] hover:bg-white"
            whileHover={{ scale: 1.05 }}
            onClick={() => setTab('chat')}
          >
            Chat
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence>
        {tab === 'login' && <Login isVisible onClose={() => setTab('none')} onLogin={() => setTab('chat')} />}
        {tab === 'chat' && <Chat isVisible onClose={() => setTab('none')} />}
      </AnimatePresence>
    </div>
  )
}
