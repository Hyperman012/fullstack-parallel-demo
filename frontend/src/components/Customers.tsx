import { useEffect, useState, type FormEvent } from 'react'
import { createCustomer, listCustomers, type Customer } from '../customers'

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [name, setName] = useState('')

  useEffect(() => {
    listCustomers().then(setCustomers)
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const created = await createCustomer(name)
    setCustomers((prev) => [...prev, created])
    setName('')
  }

  return (
    <div>
      <h1>Customers</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="customer-name">Name</label>
        <input
          id="customer-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
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
