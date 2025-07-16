import { ReactNode } from 'react'
import FinanceBackground from './FinanceBackground'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAF8] via-[#E8F0EA] to-[#D8E3DC] p-4 overflow-hidden font-['Poppins','Inter',sans-serif]">
      <FinanceBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-transparent pointer-events-none z-0" />
      {children}
    </div>
  )
}
