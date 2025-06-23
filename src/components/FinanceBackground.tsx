import React from 'react'

export default function FinanceBackground() {
  return (
    <div className="finance-bg">
      {/* Optional grid overlay for dashboard feel */}
      <div className="bg-grid-dots" />

      {/* Floating accent blobs */}
      <div className="absolute -left-20 top-10 w-72 h-72 rounded-full bg-green-300 opacity-30 blur-xl animate-float" />
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-yellow-200 opacity-30 blur-xl animate-float [animation-duration:12s]" />

      {/* Finance themed SVG icons */}
      <svg className="icon icon-invoice" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 2h7l5 5v15H6V2z" fill="currentColor" />
        <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <svg className="icon icon-chart" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="10" width="3" height="10" rx="1" />
        <rect x="10" y="6" width="3" height="14" rx="1" />
        <rect x="16" y="13" width="3" height="7" rx="1" />
      </svg>
      <svg className="icon icon-currency" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v18M8 7h8a3 3 0 010 6H8m0 0h8a3 3 0 010 6H8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}
