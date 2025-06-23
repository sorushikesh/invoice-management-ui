import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './App.css'

export default function App() {
  const [user, setUser] = useState<string | null>(null)

  return (
    <div className="App">
      {user ? <Dashboard user={user} /> : <Login onLogin={setUser} />}
    </div>
  )
}
