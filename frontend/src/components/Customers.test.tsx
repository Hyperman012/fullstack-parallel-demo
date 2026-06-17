import { render, screen, waitFor } from '@testing-library/react'
import Customers from './Customers'

beforeEach(() => {
  vi.restoreAllMocks()
})

test('renders an empty state when there are no customers', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  )
  render(<Customers />)
  await waitFor(() => {
    expect(screen.getByText(/no customers yet/i)).toBeInTheDocument()
  })
})

test('renders a row from the API', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify([{ id: 1, name: 'Acme' }]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  )
  render(<Customers />)
  await waitFor(() => {
    expect(screen.getByText('Acme')).toBeInTheDocument()
  })
})
