import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('submitting the form POSTs and shows the new row', async () => {
  const fetchMock = vi
    .spyOn(globalThis, 'fetch')
    .mockResolvedValueOnce(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    .mockResolvedValueOnce(
      new Response(JSON.stringify({ id: 7, name: 'Globex' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

  render(<Customers />)
  await waitFor(() => {
    expect(screen.getByText(/no customers yet/i)).toBeInTheDocument()
  })

  await userEvent.type(screen.getByLabelText(/name/i), 'Globex')
  await userEvent.click(screen.getByRole('button', { name: /add/i }))

  await waitFor(() => {
    expect(screen.getByText('Globex')).toBeInTheDocument()
  })

  const postCall = fetchMock.mock.calls.find(
    ([, init]) => (init as RequestInit | undefined)?.method === 'POST',
  )
  expect(postCall).toBeTruthy()
  expect(postCall?.[0]).toContain('/customers')
})
