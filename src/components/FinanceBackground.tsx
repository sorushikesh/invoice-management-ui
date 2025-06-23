import React from 'react'

export default function FinanceBackground() {
  return (
    <div className="finance-bg">
      <svg className="icon icon-invoice" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 2h7l5 5v15H6V2z" fill="currentColor" />
        <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <svg className="icon icon-chart" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="10" width="3" height="10" rx="1" />
        <rect x="10" y="6" width="3" height="14" rx="1" />
        <rect x="16" y="13" width="3" height="7" rx="1" />
      </svg>
      <svg className="icon icon-currency" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v18M8 7h8a3 3 0 010 6H8m0 0h8a3 3 0 010 6H8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  )
}
