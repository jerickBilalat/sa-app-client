import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {AuthenticatedApp} from './authenticated-app'

test('renders title', () => {
  render(<AuthenticatedApp />)
  const titleElement = screen.getByText(/AuthenticatedApp/i)
  expect(titleElement).toBeInTheDocument()
})
