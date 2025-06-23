import { useState, type ChangeEvent, FormEvent } from 'react'
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
    <div className="login-page">
      <div className="login-card">
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
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
            <label htmlFor="password">Password</label>
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
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
            </button>
          </div>
          <a className="forgot-password" href="/forgot-password">
            Forgot Password?
          </a>
          <div>
            <button
              type="submit"
              className={loading ? 'loading' : ''}
              disabled={loading}
              style={{ marginRight: '0.5rem' }}
            >
              {loading ? <span className="loader" /> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
