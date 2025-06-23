import { Invoice } from '../types'

type Props = {
  invoices: Invoice[]
  onPay: (id: string) => void
}

export default function InvoiceList({ invoices, onPay }: Props) {
  return (
    <div>
      <h2>Invoices</h2>
      {invoices.length === 0 && <p>No invoices yet</p>}
      {invoices.map((inv) => (
        <div key={inv.id} style={{ border: '1px solid #ccc', margin: '8px', padding: '8px' }}>
          <div>Customer: {inv.customer}</div>
          <div>Status: {inv.status}</div>
          <div>Due: {inv.dueDate}</div>
          <button disabled={inv.status === 'Paid'} onClick={() => onPay(inv.id)}>
            Mark Paid
          </button>
        </div>
      ))}
    </div>
  )
}
