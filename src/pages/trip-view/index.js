import React, { useState, useEffect, useMemo } from 'react'

// ** useJwt
import useJwt from 'src/auth/jwt/useJwt'

// ** Components
import TripViewTable from 'src/views/trip-view/trip-view-table'

// ** Store && Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllVehiclesActions, getVehicleTripsAction } from 'src/store/vehicles/vehiclesAction'
import VehiclesList from 'src/views/trip-view/vehiclesList'
import { Title } from 'src/styles/input'
import { Router } from 'next/router'
import FallbackSpinner from 'src/@core/components/spinner'
import { resetVehiclesList } from 'src/store/vehicles/vehiclesSlice'

function TripListing() {
  const dispatch = useDispatch()
  const user = useJwt.getUserData()

  const [vehicleId, setVehicleId] = useState('')
  const [show, setShow] = useState('vehiclesList')
  const [data, setData] = useState(null)

  const { vehiclesListPending, vehiclesList, tripsListPending, tripsList } = useSelector(state => state.vehicle)

  const onChangeHandler = (name, value) => {
    if (name === 'vehicleId') setVehicleId(value)
    if (name === 'show') setShow(value)
  }

  useEffect(() => {
    if (user?.driverId) {
      const data = { driver_id: user?.driverId }
      const str = JSON.stringify(data)
      const buffer = Buffer.from(str, 'utf8')
      const base64encoded = buffer.toString('base64')

      dispatch(getAllVehiclesActions({ base64encoded }))
    }
  }, [user?.driverId, dispatch])

  const rows = useMemo(async () => {
    const list = []
    for (const [key, value] of Object.entries(tripsList)) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${value?.points[0]?.longitude},${value?.points[0]?.latitude};${value?.points[1]?.longitude},${value?.points[1]?.latitude}?annotations=maxspeed&overview=full&geometries=geojson&` +
            new URLSearchParams({
              access_token:
                'pk.eyJ1IjoiaGFyaXN0cmFja2luZyIsImEiOiJjbGVneWQ3anowanJvM3ZsZDdiNTB2aGk2In0.-YLuxE0bmfGbf8x3GH3n7A'
            })
        )
        const data = await response.json()
        const updatedValue = await { ...value, mapData: data }

        list.push(updatedValue)
      } catch (error) {
        console.error('error : ', error)
      }
    }

    return list
  }, [tripsList])

  useEffect(() => {
    rows
      .then(listRows => {
        setData(listRows)
      })
      .catch(error => {
        alert(error)
      })
  }, [rows])

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetVehiclesList())
  //   }
  // }, [dispatch])

  return (
    <>
      {show === 'vehiclesList' ? (
        vehiclesListPending ? (
          <FallbackSpinner />
        ) : (
          <VehiclesList
            vehicle={vehicleId}
            data={vehiclesList}
            loading={vehiclesListPending}
            onChangeHandler={onChangeHandler}
          />
        )
      ) : show === 'tripsList' ? (
        <>
          <Title>Trips List</Title>
          <TripViewTable loading={tripsListPending} rows={data} vehicleId={vehicleId} />
        </>
      ) : null}
    </>
  )
}

export default TripListing
