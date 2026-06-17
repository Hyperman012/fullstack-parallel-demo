// Customers API client.
import { apiGet, apiPost } from './api'

export type Customer = { id: number; name: string }

export function listCustomers(): Promise<Customer[]> {
  return apiGet<Customer[]>('/customers')
}

export function createCustomer(name: string): Promise<Customer> {
  return apiPost<Customer>('/customers', { name })
}
