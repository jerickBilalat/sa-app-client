import * as React from 'react'
import {createContainer} from './testsUtils/domManipulators'
import {App} from './App'
import * as UnauthenticatedAppExports from './unauthenticated-app'
import * as AuthenticatedAppExports from './authenticated-app'
import axios from 'axios'

test('fetch user data after mounting', async () => {
  let {renderAndWait} = createContainer()

  jest.spyOn(axios, 'get').mockImplementation(() =>
    Promise.resolve({
      status: 'ok',
    }),
  )

  await renderAndWait(<App />)

  expect(axios.get).toHaveBeenCalledWith(
    'http://localhost:8080/api/auth/get-user-current-data',
    expect.objectContaining({
      method: 'GET',
      headers: {'x-auth-token': expect.anything()},
    }),
  )

  axios.get.mockRestore()
})

test('render unauthenticated app initialy when user data is not fetched', () => {
  let {render} = createContainer()

  jest
    .spyOn(UnauthenticatedAppExports, 'UnauthenticatedApp')
    .mockReturnValue(null)

  render(<App />)

  expect(UnauthenticatedAppExports.UnauthenticatedApp).toHaveBeenCalled()

  UnauthenticatedAppExports.UnauthenticatedApp.mockRestore()
})

test('render authenticated app when user data is fetched', async () => {
  let {renderAndWait} = createContainer()

  jest.spyOn(AuthenticatedAppExports, 'AuthenticatedApp').mockReturnValue(null)
  jest.spyOn(axios, 'get').mockImplementation(() =>
    Promise.resolve({
      user: 'user',
    }),
  )
  await renderAndWait(<App />)

  expect(AuthenticatedAppExports.AuthenticatedApp).toHaveBeenCalled()

  AuthenticatedAppExports.AuthenticatedApp.mockRestore()
  axios.get.mockRestore()
})

test('pass collected props to children', async () => {
  let {renderAndWait} = createContainer()

  jest.spyOn(AuthenticatedAppExports, 'AuthenticatedApp').mockReturnValue(null)
  jest
    .spyOn(UnauthenticatedAppExports, 'UnauthenticatedApp')
    .mockReturnValue(null)
  jest.spyOn(axios, 'get').mockImplementation(() =>
    Promise.resolve({
      testprop: '123',
    }),
  )
  await renderAndWait(<App />)

  expect(AuthenticatedAppExports.AuthenticatedApp).toHaveBeenCalledWith(
    {
      user: {testprop: '123'},
    },
    expect.anything(), // seems like not only props are passed to the function when evoked
  )

  expect(UnauthenticatedAppExports.UnauthenticatedApp).toHaveBeenCalledWith(
    {
      user: null,
    },
    expect.anything(), // seems like not only props are passed to the function when evoked
  )

  AuthenticatedAppExports.AuthenticatedApp.mockRestore()
  UnauthenticatedAppExports.UnauthenticatedApp.mockRestore()
  axios.get.mockRestore()
})
