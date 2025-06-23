export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  tax: number;
}

export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';

export interface Invoice {
  id: string;
  customer: string;
  items: InvoiceItem[];
  discount: number;
  status: InvoiceStatus;
  dueDate: string;
}
