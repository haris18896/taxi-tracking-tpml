import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig }

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // axios.interceptors.request.use(
    //   config => {
    //     const accessToken = this.getToken()
    //     if (accessToken) {
    //       // console.log('JWT Interceptor : ', accessToken)
    //       config.headers.Authorization = `${this.jwtConfig.typeBearer} ${accessToken}`
    //     }

    //     return config
    //   },
    //   error => Promise.reject(error)
    // )

    axios.interceptors.response.use(
      response => response,
      error => {
        const { response } = error
        if (response && response.status === 401) {
          console.log('JWT Error Response : ', response)

          // localStorage.clear()
          // window.location.href = '/dashboard'
        }

        return Promise.reject(error)
      }
    )
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('userData'))
  }

  setUserData(value) {
    localStorage.setItem('userData', JSON.stringify(value))
  }

  login(base64encoded) {
    var data = new FormData()
    data.append('postData', base64encoded)

    return axios.post(this.jwtConfig.loginEndpoint, data)
  }

  getDriverDetails(base64encoded) {
    var data = new FormData()
    data.append('postData', base64encoded)

    return axios.post(this.jwtConfig.getDriverDetailsEndpoint, data)
  }

  getVehicles(base64encoded) {
    var data = new FormData()
    data.append('postData', base64encoded)

    return axios.post(this.jwtConfig.getVehiclesEndpoint, data)
  }

  getVehicleTrips(base64encoded) {
    var data = new FormData()
    data.append('postData', base64encoded)

    return axios.post(this.jwtConfig.getVehicleTripsEndpoint, data)
  }

  updateTripData(base64encoded) {
    var data = new FormData()
    data.append('postData', base64encoded)

    return axios.post(this.jwtConfig.updateTripDataEndpoint, data)
  }

  getVehiclesPosition(base64encoded) {
    var data = new FormData()
    data.append('postData', base64encoded)

    return axios.post(this.jwtConfig.getVehiclePositionEndpoint, data)
  }
}
