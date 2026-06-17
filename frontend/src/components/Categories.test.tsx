import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Categories from './Categories'
import { getCategories, createCategory, type Category } from '../categories'

vi.mock('../categories')

const getCategoriesMock = vi.mocked(getCategories)
const createCategoryMock = vi.mocked(createCategory)

beforeEach(() => {
  vi.clearAllMocks()
  getCategoriesMock.mockResolvedValue([])
})

test('renders an empty state when there are no categories', async () => {
  getCategoriesMock.mockResolvedValue([])
  render(<Categories />)
  await waitFor(() => {
    expect(screen.getByText(/no categories yet/i)).toBeInTheDocument()
  })
})

test('renders a row from the mocked client', async () => {
  getCategoriesMock.mockResolvedValue([{ id: 1, name: 'Hardware' }] as Category[])
  render(<Categories />)
  await waitFor(() => {
    expect(screen.getByText('Hardware')).toBeInTheDocument()
  })
})

test('submitting the form calls createCategory', async () => {
  getCategoriesMock.mockResolvedValue([])
  createCategoryMock.mockResolvedValue({ id: 5, name: 'Software' } as Category)
  render(<Categories />)
  await waitFor(() => {
    expect(screen.getByText(/no categories yet/i)).toBeInTheDocument()
  })

  await userEvent.type(screen.getByLabelText(/name/i), 'Software')
  await userEvent.click(screen.getByRole('button', { name: /add/i }))

  await waitFor(() => {
    expect(createCategoryMock).toHaveBeenCalledWith('Software')
  })
  expect(screen.getByText('Software')).toBeInTheDocument()
})
