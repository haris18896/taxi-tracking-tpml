import { Button, Checkbox, CircularProgress, FormControlLabel } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch } from 'react-redux'
import FallbackSpinner from 'src/@core/components/spinner'
import { getVehicleTripsAction } from 'src/store/vehicles/vehiclesAction'
import { VehicleCheckbox } from 'src/styles/pages/trip-view'

function VehiclesList({ loading, data, onChangeHandler, vehicle }) {
  const dispatch = useDispatch()

  return (
    <>
      {loading ? (
        <FallbackSpinner />
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
          }}
        >
          {data.map((item, index) => (
            <VehicleCheckbox key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={item.vehicleName}
                    color='info'
                    sx={{ mx: 0.5 }}
                    onChange={e => {
                      if (e.target.checked) {
                        onChangeHandler('vehicleId', item.vehicleId)
                      } else {
                        onChangeHandler('vehicleId', '')
                      }
                    }}
                    checked={item.vehicleId === vehicle}
                  />
                }
                label={item.vehicleName}
              />
            </VehicleCheckbox>
          ))}
          <Button
            color='info'
            disabled={!vehicle}
            onClick={() => {
              onChangeHandler('show', 'tripsList')

              const data = { vehicle_id: vehicle }
              const str = JSON.stringify(data)
              const buffer = Buffer.from(str, 'utf8')
              const base64encoded = buffer.toString('base64')

              dispatch(getVehicleTripsAction({ base64encoded }))
            }}
          >
            Select Vehicle
          </Button>
        </Box>
      )}
    </>
  )
}

export default VehiclesList
