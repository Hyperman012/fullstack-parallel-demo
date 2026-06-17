import { render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import Products from './Products'

afterEach(() => {
  vi.restoreAllMocks()
})

function mockFetchJson(body: unknown, status = 200) {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    }),
  )
}

test('renders an empty state when there are no products', async () => {
  mockFetchJson([])
  render(<Products />)
  expect(await screen.findByText(/no products yet/i)).toBeInTheDocument()
})

test('renders a row from the API', async () => {
  mockFetchJson([{ id: 1, name: 'Widget', price: 9.99 }])
  render(<Products />)
  expect(await screen.findByText(/widget/i)).toBeInTheDocument()
  expect(screen.getByText(/9\.99/)).toBeInTheDocument()
})
