import {
  getAllVehiclesActions,
  getDriverDetailsAction,
  getVehicleTripsAction,
  updateTripDataAction,
  getVehiclesPositionAction
} from './vehiclesAction'

import { createSlice } from '@reduxjs/toolkit'

export const VehiclesReducer = createSlice({
  name: 'vehicles',
  initialState: {
    vehiclesListPending: false,
    driversDetailsPending: false,
    tripsListPending: false,
    updateTripPending: false,
    vehiclePositionPending: false,
    vehiclesList: [],
    driverDetails: [],
    tripsList: [],
    updateTrip: [],
    vehiclePosition: [],
    error: null
  },
  reducers: {
    resetVehiclePosition: state => (state.vehiclePosition = {}),
    resetDriverDetails: state => (state.driverDetails = {}),
    resetVehiclesList: state => (state.vehiclesList = []),
    resetTripsList: state => (state.tripsList = [])
  },
  extraReducers: builder => {
    builder

      // ** get All Vehicles
      .addCase(getAllVehiclesActions.pending, state => {
        state.vehiclesListPending = true
      })
      .addCase(getAllVehiclesActions.fulfilled, (state, action) => {
        state.vehiclesListPending = false
        state.vehiclesList = action.payload.data
      })
      .addCase(getAllVehiclesActions.rejected, (state, action) => {
        state.vehiclesListPending = false
        state.error = action.payload
      })

      // ** get Trips List
      .addCase(getVehicleTripsAction.pending, state => {
        state.tripsListPending = true
      })
      .addCase(getVehicleTripsAction.fulfilled, (state, action) => {
        state.tripsListPending = false
        state.tripsList = action.payload.data
      })
      .addCase(getVehicleTripsAction.rejected, (state, action) => {
        state.tripsListPending = false
        state.error = action.payload
      })

      // ** get Driver Details
      .addCase(getDriverDetailsAction.pending, state => {
        state.driversDetailsPending = true
      })
      .addCase(getDriverDetailsAction.fulfilled, (state, action) => {
        state.driversDetailsPending = false
        state.driverDetails = action.payload
      })
      .addCase(getDriverDetailsAction.rejected, (state, action) => {
        state.driversDetailsPending = false
        state.error = action.payload
      })

      // ** update trip
      .addCase(updateTripDataAction.pending, state => {
        state.updateTripPending = true
      })
      .addCase(updateTripDataAction.fulfilled, (state, action) => {
        state.updateTripPending = false
        state.updateTrip = action.payload
      })
      .addCase(updateTripDataAction.rejected, (state, action) => {
        state.updateTripPending = false
        state.error = action.payload
      })

      // ** get vehicles position
      .addCase(getVehiclesPositionAction.pending, state => {
        state.vehiclePositionPending = true
      })
      .addCase(getVehiclesPositionAction.fulfilled, (state, action) => {
        state.vehiclePositionPending = false
        state.vehiclePosition = action.payload?.data?.vehicleposition[0]
      })
  }
})

export const { resetTripsList, resetVehiclesList, resetDriverDetails, resetVehiclePosition } = VehiclesReducer.actions

export default VehiclesReducer.reducer
