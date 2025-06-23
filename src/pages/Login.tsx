import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import FinanceBackground from '../components/FinanceBackground'

type Props = {
  onLogin: (user: string) => void
}

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const toggleRotation = showPassword ? 0 : 180

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (email && password) {
      onLogin(email)
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAF8] via-[#E8F0EA] to-[#D8E3DC] p-4 overflow-hidden font-['Poppins','Inter',sans-serif]">
      <FinanceBackground />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-[#1F4C3B] text-center">
          Bilsora – Invoice Management
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Smart. Secure. Seamless Invoicing.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
              className="w-full rounded-md bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1F4C3B] text-gray-800"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
              className="w-full rounded-md bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1F4C3B] text-gray-800 pr-10"
            />
            <motion.button
              type="button"
              animate={{ rotate: toggleRotation }}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-[#1F4C3B] focus:outline-none focus:ring-2 focus:ring-[#1F4C3B]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <span role="img" aria-hidden="true">
                  🙈
                </span>
              ) : (
                <span role="img" aria-hidden="true">
                  👁️
                </span>
              )}
            </motion.button>
          </div>

          <div>
            <a
              href="/forgot-password"
              className="text-sm text-[#1F4C3B] hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#1F4C3B] text-white py-2 rounded-md mt-2"
          >
            Login
          </motion.button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-gray-600 text-sm">or continue with</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <div className="flex justify-center space-x-3">
            <button
              type="button"
              aria-label="Login with Google"
              className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.35 11.1H12v2.8h5.35c-.5 2.6-2.8 3.9-5.35 3.9a6 6 0 010-12c1.5 0 2.85.55 3.9 1.45l2.75-2.75A9.6 9.6 0 0012 2a10 10 0 100 20c5.75 0 9.9-4 9.9-10 0-.65-.05-1.3-.15-1.9Z"
                  fill="#EA4335"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Login with GitHub"
              className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.33 6.84 9.69.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.9 1.58 2.36 1.12 2.94.85.09-.67.36-1.12.65-1.37-2.22-.26-4.56-1.15-4.56-5.15 0-1.14.39-2.08 1.03-2.82-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.07a9.3 9.3 0 015 0c1.9-1.35 2.74-1.07 2.74-1.07.55 1.4.2 2.44.1 2.7.64.74 1.03 1.68 1.03 2.82 0 4.01-2.34 4.88-4.57 5.14.37.33.69.97.69 1.95v2.88c0 .26.18.59.69.48A10 10 0 0022 12.2C22 6.58 17.52 2 12 2Z"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Login with Facebook"
              className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#1877F2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-7h-2.54v-2.88h2.54V9.5c0-2.5 1.48-3.89 3.75-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.88h-2.34v7A10 10 0 0022 12Z"
                />
              </svg>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

