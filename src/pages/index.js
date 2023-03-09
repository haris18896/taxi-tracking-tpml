// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import useJwt from 'src/auth/jwt/useJwt'

export const getHomeRoute = role => {
  if (role === 'client') return '/acl'
  else return '/trip-view'
}

const Home = () => {
  // ** Hooks
  const user = useJwt.getUserData()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (user && user.driverId) {
      const homeRoute = getHomeRoute(user.role)

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner />
}

export default Home
