import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {UnauthenticatedApp} from './unauthenticated-app'

test('renders title', () => {
  render(<UnauthenticatedApp />)
  const titleElement = screen.getByText(/UnauthenticatedApp/i)
  expect(titleElement).toBeInTheDocument()
})
