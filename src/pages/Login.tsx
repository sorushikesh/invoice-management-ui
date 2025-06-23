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
            <label htmlFor="email">
              Email
            </label>
            <input
              id="email"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          <a className="forgot-password" href="/forgot-password">
            Forgot Password?
          </a>
          <label className="show-password" style={{ alignSelf: 'flex-start' }}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
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
