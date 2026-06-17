import { render, screen, waitFor } from '@testing-library/react'
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
