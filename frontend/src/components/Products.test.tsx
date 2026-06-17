import { render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import Products from './Products'

afterEach(() => {
  vi.restoreAllMocks()
})

test('renders an empty state when there are no products', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  )
  render(<Products />)
  expect(await screen.findByText(/no products yet/i)).toBeInTheDocument()
})
