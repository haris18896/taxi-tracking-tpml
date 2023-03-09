/* eslint-disable react-hooks/rules-of-hooks */
import useJwt from 'src/@core/auth/useJwt'

const { jwt } = useJwt({})

export default jwt
