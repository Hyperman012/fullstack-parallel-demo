import { useEffect, useState } from 'react'
import { createProduct, listProducts, type Product } from '../products'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    listProducts().then(setProducts)
  }, [])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const created = await createProduct(name, Number(price))
    setProducts((current) => [...current, created])
    setName('')
    setPrice('')
  }

  return (
    <div>
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>No products yet</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} — {p.price}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="product-name">Name</label>
        <input
          id="product-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="product-price">Price</label>
        <input
          id="product-price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
