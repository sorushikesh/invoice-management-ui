import { useState, useEffect, type ChangeEvent } from 'react'

type Props = {
  onLogin: (user: string) => void
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
  }, [dark])

  const submit = () => {
    if (username) {
      onLogin(username)
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        placeholder="User"
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />
      <div>
        <input
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <label style={{ marginLeft: '0.5rem' }}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show
        </label>
      </div>
      <div>
        <button onClick={submit} style={{ marginRight: '0.5rem' }}>
          Login
        </button>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </div>
  )
}
