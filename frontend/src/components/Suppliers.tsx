import { useEffect, useState, type FormEvent } from 'react'
import { createSupplier, listSuppliers, type Supplier } from '../suppliers'

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [name, setName] = useState('')

  useEffect(() => {
    listSuppliers().then(setSuppliers)
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const created = await createSupplier(name)
    setSuppliers((prev) => [...prev, created])
    setName('')
  }

  return (
    <div>
      <h1>Suppliers</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="supplier-name">Name</label>
        <input
          id="supplier-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {suppliers.length === 0 ? (
        <p>No suppliers yet</p>
      ) : (
        <ul>
          {suppliers.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
