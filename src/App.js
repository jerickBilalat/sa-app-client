import * as React from 'react'
import axios from 'axios'
import {UnauthenticatedApp} from './unauthenticated-app'
import {AuthenticatedApp} from './authenticated-app'

function App() {
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    function fetchUser() {
      const result = axios.get(
        'http://localhost:8080/api/auth/get-user-current-data',
        {
          method: 'GET',
          headers: {
            'x-auth-token':
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MDJlODNmOTgyYTA4NzhhMWFlYTMxZmMiLCJpYXQiOjE2MTM2NjExNzgsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJpZCI6IjYwMmU4M2Y5ODJhMDg3OGExYWVhMzFmYyJ9.5m-1CceQkhwU2QcpOxSGsXJRHEYm9JsrcdVjen-fGEg',
          },
        },
      )
      return result
    }
    fetchUser().then(res => {
      setUser(res)
    })
  }, [])

  const props = {user}
  return user ? (
    <AuthenticatedApp {...props} />
  ) : (
    <UnauthenticatedApp {...props} />
  )
}

export {App}
