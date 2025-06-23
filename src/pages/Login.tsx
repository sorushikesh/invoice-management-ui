import { useState, type ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import invoiceSvg from '../assets/invoice.svg'

type Props = {
  onLogin: (user: string) => void
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    if (username && password) {
      setLoading(true)
      setTimeout(() => {
        onLogin(username)
        setUsername('')
        setPassword('')
        setError('')
        setLoading(false)
      }, 800)
    } else {
      setError('Please enter your email and password.')
      setLoading(false)
    }
  }

  return (
    <div className="login-page flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F9FAF8] to-[#F3F4F6]">
      <motion.div
        className="login-card shadow-xl rounded-xl bg-white p-8 md:p-12 flex flex-col gap-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="login-illustration">
          <img src={invoiceSvg} alt="Invoice illustration" width={200} />
        </div>
        <form className="login-content" onSubmit={submit}>
          <div className="login-brand">
            <h1>Bilsora - Invoice Management</h1>
            <p className="tagline">Smart. Secure. Seamless Invoicing.</p>
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="input-wrapper">
            <input
              id="email"
              type="email"
              placeholder=" "
              className="w-full px-4 py-3 pr-10 rounded-md bg-[var(--input-bg)] text-[color:var(--color-text)] focus:ring-2 focus:ring-accent transition"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder=" "
              className="w-full px-4 py-3 pr-10 rounded-md bg-[var(--input-bg)] text-[color:var(--color-text)] focus:ring-2 focus:ring-accent transition"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
            <label htmlFor="password">Password</label>
            <motion.button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width="20"
                  height="20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.458 12c1.274 4.057 5.064 7 9.542 7 1.779 0 3.45-.464 4.89-1.278M6.109 6.109A10.5 10.5 0 0112 5c4.478 0 8.268 2.943 9.542 7-.6 1.914-1.72 3.63-3.185 4.94M6.109 6.109L3 3m0 0l3 3m-3-3l18 18m-7.11-7.11A3.001 3.001 0 0112 15a3 3 0 01-3-3 3 3 0 013-3c.753 0 1.438.275 1.986.734"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width="20"
                  height="20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </motion.button>
          </div>
          <a className="forgot-password" href="/forgot-password">
            Forgot Password?
          </a>
          <div>
            <motion.button
              type="submit"
              className={loading ? 'loading' : ''}
              disabled={loading}
              style={{ marginRight: '0.5rem' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 0 3px rgba(212,193,124,0.4)' }}
            >
              {loading ? <span className="loader" /> : 'Login'}
            </motion.button>
          </div>
          <div className="divider">or continue with</div>
          <div className="social-buttons" aria-label="Social login options">
            <motion.button
              type="button"
              className="social-btn"
              aria-label="Login with Google"
              whileHover={{ scale: 1.1 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.35 11.1H12v2.8h5.35c-.5 2.6-2.8 3.9-5.35 3.9a6 6 0 010-12c1.5 0 2.85.55 3.9 1.45l2.75-2.75A9.6 9.6 0 0012 2a10 10 0 100 20c5.75 0 9.9-4 9.9-10 0-.65-.05-1.3-.15-1.9Z" fill="#EA4335"/>
              </svg>
            </motion.button>
            <motion.button
              type="button"
              className="social-btn"
              aria-label="Login with GitHub"
              whileHover={{ scale: 1.1 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.33 6.84 9.69.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.9 1.58 2.36 1.12 2.94.85.09-.67.36-1.12.65-1.37-2.22-.26-4.56-1.15-4.56-5.15 0-1.14.39-2.08 1.03-2.82-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.07a9.3 9.3 0 015 0c1.9-1.35 2.74-1.07 2.74-1.07.55 1.4.2 2.44.1 2.7.64.74 1.03 1.68 1.03 2.82 0 4.01-2.34 4.88-4.57 5.14.37.33.69.97.69 1.95v2.88c0 .26.18.59.69.48A10 10 0 0022 12.2C22 6.58 17.52 2 12 2Z"/>
              </svg>
            </motion.button>
            <motion.button
              type="button"
              className="social-btn"
              aria-label="Login with Facebook"
              whileHover={{ scale: 1.1 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-7h-2.54v-2.88h2.54V9.5c0-2.5 1.48-3.89 3.75-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.88h-2.34v7A10 10 0 0022 12Z"/>
              </svg>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
