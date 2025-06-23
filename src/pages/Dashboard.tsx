import { useState } from 'react'
import InvoiceForm from '../components/InvoiceForm'
import InvoiceList from '../components/InvoiceList'
import type { Invoice } from '../types'

type Props = {
  user: string
}

export default function Dashboard({ user }: Props) {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const addInvoice = (invoice: Invoice) => {
    setInvoices([...invoices, invoice])
  }

  const payInvoice = (id: string) => {
    setInvoices(invoices.map((inv) => (inv.id === id ? { ...inv, status: 'Paid' } : inv)))
  }

  const stats = {
    total: invoices.length,
    paid: invoices.filter((i) => i.status === 'Paid').length,
    draft: invoices.filter((i) => i.status === 'Draft').length,
  }

  return (
    <div className="dashboard">
      <aside className="side-panel">
        <h2>Menu</h2>
        <ul>
          <li>Invoices</li>
          <li>Clients</li>
        </ul>
      </aside>
      <main className="dashboard-content">
        <h1>Welcome, {user}</h1>
        <div>
          <strong>Stats:</strong> Total {stats.total} | Draft {stats.draft} | Paid {stats.paid}
        </div>
        <InvoiceForm onSave={addInvoice} />
        <InvoiceList invoices={invoices} onPay={payInvoice} />
      </main>
    </div>
  )
}
