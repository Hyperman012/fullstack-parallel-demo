import { useEffect, useState, type FormEvent } from 'react'
import { createCategory, getCategories, type Category } from '../categories'

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState('')

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const created = await createCategory(name)
    setCategories((prev) => [...prev, created])
    setName('')
  }

  return (
    <div>
      <h1>Categories</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category-name">Name</label>
        <input
          id="category-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {categories.length === 0 ? (
        <p>No categories yet</p>
      ) : (
        <ul>
          {categories.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
