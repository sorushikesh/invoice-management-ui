import { useState } from 'react'
import Login from './Login'
import Chat from './Chat'

interface Props {
  onLogin: (user: string) => void
}

export default function Home({ onLogin }: Props) {
  const [tab, setTab] = useState<'login' | 'chat'>('login')

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="mb-4 space-x-2 sticky top-0 bg-white/90 p-2 z-10">
        <button
          onClick={() => setTab('login')}
          className={`px-4 py-2 rounded ${
            tab === 'login' ? 'bg-[#1F4C3B] text-white' : 'bg-gray-200'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setTab('chat')}
          className={`px-4 py-2 rounded ${
            tab === 'chat' ? 'bg-[#1F4C3B] text-white' : 'bg-gray-200'
          }`}
        >
          Chat
        </button>
      </div>
      <div className="w-full flex-1">
        {tab === 'login' ? <Login onLogin={onLogin} /> : <Chat />}
      </div>
    </div>
  )
}
