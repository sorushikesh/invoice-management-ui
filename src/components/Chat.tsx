import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaRobot, FaUser, FaTrash } from 'react-icons/fa'

interface Message {
  sender: 'user' | 'bot'
  text: string
  timestamp?: string
}

type Props = {
  onClose: () => void
  isVisible?: boolean
}

const STORAGE_KEY = 'chat_messages'

export default function Chat({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [streamingBotMessage, setStreamingBotMessage] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setMessages(JSON.parse(stored))
    } else {
      setMessages([
        {
          sender: 'bot',
          text: 'Hello! How can I help you today?',
          timestamp: new Date().toISOString(),
        },
      ])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    const chatbox = document.getElementById('chat-scroll')
    if (chatbox) {
      chatbox.scrollTop = chatbox.scrollHeight
    }
  }, [messages, typing, streamingBotMessage])

  const formatTime = (iso?: string) => {
    if (!iso) return ''
    const date = new Date(iso)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const clearChat = () => {
    localStorage.removeItem(STORAGE_KEY)
    setMessages([
      {
        sender: 'bot',
        text: 'Hello! How can I help you today?',
        timestamp: new Date().toISOString(),
      },
    ])
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg: Message = {
      sender: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setStreamingBotMessage('')

    try {
      const res = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ message: userMsg.text }),
      })

      const data = await res.json()
      const fullResponse = data.answer || 'No response.'

      let index = 0
      const streamInterval = setInterval(() => {
        setStreamingBotMessage((msg) => {
          const next = msg + fullResponse[index]
          index++

          if (index >= fullResponse.length) {
            clearInterval(streamInterval)
            setMessages((prev) => [
              ...prev,
              {
                sender: 'bot',
                text: fullResponse,
                timestamp: new Date().toISOString(),
              },
            ])
            setStreamingBotMessage('')
            setTyping(false)
          }

          return next
        })
      }, 20)
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: '❌ Failed to reach server.',
          timestamp: new Date().toISOString(),
        },
      ])
      setTyping(false)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-xl relative"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <AiOutlineCloseCircle size={16} />
        </motion.button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Chat Assistant</h2>

        {/* Chat Box */}
        <div
          id="chat-scroll"
          className="h-[60vh] overflow-y-auto border rounded-lg p-4 space-y-3 dark:bg-gray-700 dark:border-gray-600"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                    <FaRobot />
                  </div>
                )}
                <div>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 dark:bg-gray-600 dark:text-white rounded-bl-none'
                    }`}
                  >
                    <div className="prose prose-sm dark:prose-invert">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                  <div className="text-xs mt-1 text-gray-500 text-right">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold text-sm">
                    <FaUser />
                  </div>
                )}
              </motion.div>
            ))}

            {streamingBotMessage && (
              <motion.div
                key="streaming"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                  <FaRobot />
                </div>
                <div className="max-w-xs px-4 py-2 rounded-lg text-sm bg-white dark:bg-gray-600 text-gray-900 dark:text-white font-mono whitespace-pre-wrap">
                  {streamingBotMessage}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
          <button
            onClick={clearChat}
            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            title="Clear chat"
          >
            <FaTrash />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
