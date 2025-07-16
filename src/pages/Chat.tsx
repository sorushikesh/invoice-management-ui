import { useState } from 'react'
import { motion } from 'framer-motion'
import FinanceBackground from '../components/FinanceBackground'

interface Msg {
  sender: 'user' | 'bot'
  text: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { sender: 'user', text: input }
    setMessages((m) => [...m, userMsg])
    setInput('')
    try {
      const resp = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMsg.text }),
      })
      const data = await resp.json()
      const botText = data.message ?? data.reply ?? JSON.stringify(data)
      setMessages((m) => [...m, { sender: 'bot', text: botText }])
    } catch (err) {
      setMessages((m) => [...m, { sender: 'bot', text: 'Error sending message' }])
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAF8] via-[#E8F0EA] to-[#D8E3DC] p-4 overflow-hidden font-['Poppins','Inter',sans-serif]">
      <FinanceBackground />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-6 w-full max-w-xl flex flex-col h-[70vh]"
      >
        <div className="flex-1 overflow-y-auto mb-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={`my-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className="inline-block p-2 rounded bg-gray-100">
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            className="flex-1 border rounded p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send()
            }}
            placeholder="Type a message..."
          />
          <button className="px-4 bg-[#1F4C3B] text-white rounded" onClick={send}>
            Send
          </button>
        </div>
      </motion.div>
    </div>
  )
}
