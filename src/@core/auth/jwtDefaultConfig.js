/* eslint-disable lines-around-comment */
export default {
  // registerEndpoint: '/jwt/register',
  loginEndpoint: 'https://login.tracking.me/app/index.php?c=user&a=login',
  getDriverDetailsEndpoint: 'https://login.tracking.me/app/index.php?c=driverTaxiApi&a=getDriverDetails',
  getVehiclesEndpoint: 'https://login.tracking.me/app/index.php?c=driverTaxiApi&a=getDriverVehicles',
  getVehicleTripsEndpoint: 'https://login.tracking.me/app/index.php?c=driverTaxiApi&a=getVehicleTripData',
  updateTripDataEndpoint: 'https://login.tracking.me/app/index.php?c=driverTaxiApi&a=updateTripProgressData',
  getVehiclePositionEndpoint: 'https://login.tracking.me/app/index.php?c=vehicle&a=getvehicleposition',
  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  typeBearer: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
