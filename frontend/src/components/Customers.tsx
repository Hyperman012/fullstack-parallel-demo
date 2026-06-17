import { useEffect, useState } from 'react'
import { listCustomers, type Customer } from '../customers'

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    listCustomers().then(setCustomers)
  }, [])

  return (
    <div>
      <h1>Customers</h1>
      {customers.length === 0 ? (
        <p>No customers yet</p>
      ) : (
        <ul>
          {customers.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
