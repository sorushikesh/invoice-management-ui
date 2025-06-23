import { useState, type ChangeEvent } from 'react'

type Props = {
  onLogin: (user: string) => void
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    if (username) {
      onLogin(username)
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="User"
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <button onClick={submit}>Login</button>
    </div>
  )
}
