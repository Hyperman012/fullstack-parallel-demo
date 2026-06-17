import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
      new Response(JSON.stringify({ id: 7, name: 'Gizmo', price: 3.5 }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

  const user = userEvent.setup()
  render(<Products />)
  await screen.findByText(/no products yet/i)

  await user.type(screen.getByLabelText(/name/i), 'Gizmo')
  await user.type(screen.getByLabelText(/price/i), '3.5')
  await user.click(screen.getByRole('button', { name: /add/i }))

  expect(await screen.findByText(/gizmo/i)).toBeInTheDocument()

  const postCall = fetchMock.mock.calls[1]
  expect(postCall[0]).toContain('/products')
  expect((postCall[1] as RequestInit).method).toBe('POST')
})
