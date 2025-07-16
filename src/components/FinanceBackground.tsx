import { useState } from 'react'
import Login from '../pages/Login'
import Chat from '../pages/Chat'

export default function FinanceBackground() {
  const [activeTab, setActiveTab] = useState<'none' | 'login' | 'chat'>('none')

  return (
    <div className="relative w-full min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-dots pointer-events-none z-0" />

      {/* Floating Blobs */}
      <div className="absolute -left-20 top-10 w-72 h-72 rounded-full bg-green-300 opacity-30 blur-3xl animate-float z-0" />
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-yellow-200 opacity-30 blur-3xl animate-float [animation-duration:12s] z-0" />

      {/* Tab Buttons */}
      {activeTab === 'none' ? (
        <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
          <div className="flex gap-6">
            <button
              className="px-6 py-3 text-lg font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className="px-6 py-3 text-lg font-semibold rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
              onClick={() => setActiveTab('chat')}
            >
              Chat
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Top-right Switch/Close Buttons */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            {activeTab !== 'login' && (
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
            )}
            {activeTab !== 'chat' && (
              <button
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                onClick={() => setActiveTab('chat')}
              >
                Chat
              </button>
            )}
            <button
              className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500"
              onClick={() => setActiveTab('none')}
            >
              Close
            </button>
          </div>

          {/* Content Card */}
          <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md text-left">
              {activeTab === 'login' && <Login onLogin={() => {}} />}
              {activeTab === 'chat' && <Chat />}
            </div>
          </div>
        </>
      )}

      {/* Floating Finance Icons */}
      <div className="absolute inset-0 flex items-end justify-center gap-10 pb-6 z-0 pointer-events-none">
        <svg className="w-10 h-10 text-green-600 dark:text-green-400" viewBox="0 0 24 24" aria-hidden="true">
          <title>Invoice</title>
          <path d="M6 2h7l5 5v15H6V2z" fill="currentColor" />
          <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg className="w-10 h-10 text-blue-500 dark:text-blue-300" viewBox="0 0 24 24" aria-hidden="true">
          <title>Chart</title>
          <rect x="4" y="10" width="3" height="10" rx="1" />
          <rect x="10" y="6" width="3" height="14" rx="1" />
          <rect x="16" y="13" width="3" height="7" rx="1" />
        </svg>
        <svg className="w-10 h-10 text-purple-500 dark:text-purple-400" viewBox="0 0 24 24" aria-hidden="true">
          <title>Currency</title>
          <path d="M12 3v18M8 7h8a3 3 0 010 6H8m0 0h8a3 3 0 010 6H8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}
