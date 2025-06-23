import { useState, type ChangeEvent } from 'react'
import type { Invoice, InvoiceItem } from '../types'

type Props = {
  onSave: (invoice: Invoice) => void
}

export default function InvoiceForm({ onSave }: Props) {
  const [customer, setCustomer] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [discount, setDiscount] = useState(0)

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0, tax: 0 }])
  }

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, [field]: field === 'description' ? value : Number(value) } : item,
      ),
    )
  }

  const total = items.reduce((sum, it) => sum + it.quantity * it.price * (1 + it.tax / 100), 0) - discount

  const save = () => {
    const invoice: Invoice = {
      id: crypto.randomUUID(),
      customer,
      items,
      discount,
      status: 'Draft',
      dueDate,
    }
    onSave(invoice)
    setCustomer('')
    setDueDate('')
    setItems([])
    setDiscount(0)
  }

  return (
    <div>
      <h2>Create Invoice</h2>
      <div>
        <label>Customer</label>
        <input
          value={customer}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCustomer(e.target.value)
          }
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDueDate(e.target.value)
          }
        />
      </div>
      <div>
        <h3>Items</h3>
        {items.map((item, i) => (
          <div key={i}>
            <input
              placeholder="Description"
              value={item.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateItem(i, 'description', e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateItem(i, 'quantity', e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateItem(i, 'price', e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Tax %"
              value={item.tax}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateItem(i, 'tax', e.target.value)
              }
            />
          </div>
        ))}
        <button onClick={addItem}>Add Item</button>
      </div>
      <div>
        <label>Discount</label>
        <input
          type="number"
          value={discount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDiscount(Number(e.target.value))
          }
        />
      </div>
      <div>Total: {total.toFixed(2)}</div>
      <button onClick={save}>Save Invoice</button>
    </div>
  )
}
