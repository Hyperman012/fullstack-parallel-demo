// Suppliers API client.
import { apiGet, apiPost } from './api'

export type Supplier = { id: number; name: string }

export function listSuppliers(): Promise<Supplier[]> {
  return apiGet<Supplier[]>('/suppliers')
}

export function createSupplier(name: string): Promise<Supplier> {
  return apiPost<Supplier>('/suppliers', { name })
}
