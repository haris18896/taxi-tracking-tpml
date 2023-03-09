// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import useJwt from 'src/auth/jwt/useJwt'

import { useSelector } from 'react-redux'

const GuestGuard = props => {
  const { children, fallback } = props
  const user = useJwt.getUserData()
  const { loginInProgress } = useSelector(state => state.auth)
  const router = useRouter()
  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (window.localStorage.getItem('userData')) {
      router.replace('/trip-view')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])
  if (loginInProgress || (!loginInProgress && user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
