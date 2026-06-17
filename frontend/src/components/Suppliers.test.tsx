import { render, screen, waitFor } from '@testing-library/react'
import Suppliers from './Suppliers'

beforeEach(() => {
  vi.restoreAllMocks()
})

test('renders an empty state when there are no suppliers', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  )
  render(<Suppliers />)
  await waitFor(() => {
    expect(screen.getByText(/no suppliers yet/i)).toBeInTheDocument()
  })
})
