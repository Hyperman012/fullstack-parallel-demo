// Products API client. Components call these; tests mock `fetch`.
import { apiGet, apiPost } from './api'

export type Product = { id: number; name: string; price: number }

export function listProducts(): Promise<Product[]> {
  return apiGet<Product[]>('/products')
}

export function createProduct(name: string, price: number): Promise<Product> {
  return apiPost<Product>('/products', { name, price })
}
