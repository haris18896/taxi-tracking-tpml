// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import AuthReducer from './authentication/authSlice'
import VehiclesReducer from './vehicles/vehiclesSlice'


export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    vehicle: VehiclesReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutabilityCheck: false
    })
})
