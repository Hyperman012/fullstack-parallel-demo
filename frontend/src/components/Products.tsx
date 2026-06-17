import { useEffect, useState } from 'react'
import { listProducts, type Product } from '../products'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    listProducts().then(setProducts)
  }, [])

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
    </div>
  )
}
