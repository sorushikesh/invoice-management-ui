import { useState, useEffect, type ChangeEvent, FormEvent } from 'react'
import invoiceSvg from '../assets/invoice.svg'

type Props = {
  onLogin: (user: string) => void
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [dark, setDark] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
  }, [dark])

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    if (username && password) {
      onLogin(username)
      setUsername('')
      setPassword('')
      setError('')
    } else {
      setError('Please enter your email and password.')
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
          <input
            placeholder="Email"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          <input
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <label style={{ alignSelf: 'flex-start' }}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
          <div>
            <button type="submit" style={{ marginRight: '0.5rem' }}>
              Login
            </button>
            <button type="button" onClick={() => setDark(!dark)}>
              {dark ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
