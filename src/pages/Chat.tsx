import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from '../components/Layout'

interface Msg {
  sender: 'user' | 'bot'
  text: string
}

type Props = {
  embedded?: boolean
}

export default function Chat({ embedded = false }: Props) {
  const STORAGE_KEY = 'chatMessages'
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)


  // load previous messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setMessages(JSON.parse(saved))
      } catch {
        // ignore parse errors
      }
    }
  }, [])

  // persist messages on change
  useEffect(() => {
    if (messages.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  const send = async () => {
    if (!input.trim()) return
    const userMsg: Msg = { sender: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput('')
    setLoading(true)
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
      const botText = data.answer ?? data.message ?? data.reply ?? JSON.stringify(data)
      setMessages((m) => [...m, { sender: 'bot', text: botText }])
    } catch (err) {
      setMessages((m) => [...m, { sender: 'bot', text: 'Error sending message' }])
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
  }

  const panel = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-6 w-full max-w-xl flex flex-col h-[70vh]"
    >
      <div className="flex-1 overflow-y-auto mb-2">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`my-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <span className="inline-block p-2 rounded bg-gray-100">
                {msg.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="my-1 text-left">
            <span className="inline-block p-2 rounded bg-gray-100">
              <span className="typing">
                <span />
                <span />
                <span />
              </span>
            </span>
          </div>
        )}
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
        <button
          className="px-4 bg-red-500 text-white rounded"
          type="button"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </motion.div>
  )

  if (embedded) {
    return panel
  }

  return <Layout>{panel}</Layout>
}
