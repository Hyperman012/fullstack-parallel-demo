import { render, screen } from '@testing-library/react'
import Home from './Home'

test('renders the app title', () => {
  render(<Home />)
  expect(
    screen.getByRole('heading', { name: /full-stack parallel demo/i }),
  ).toBeInTheDocument()
})
