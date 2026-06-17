// Categories API client.
import { apiGet, apiPost } from './api'

export type Category = { id: number; name: string }

export function getCategories(): Promise<Category[]> {
  return apiGet<Category[]>('/categories')
}

export function createCategory(name: string): Promise<Category> {
  return apiPost<Category>('/categories', { name })
}
