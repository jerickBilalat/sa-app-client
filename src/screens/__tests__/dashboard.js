import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {Dashboard} from '../dashboard'

test('renders screen title', () => {
  render(<Dashboard />)
  const titleElement = screen.getByText(/dashboard/i)
  expect(titleElement).toBeInTheDocument()
})
