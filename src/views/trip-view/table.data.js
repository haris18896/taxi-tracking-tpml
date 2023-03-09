/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@mui/material'
import moment from 'moment'
import Link from 'next/link'

export const columns = ({ router, vehicleId }) => {
  return [
    {
      name: 'Pick Up',
      selector: row => row?.points[0]?.address
    },
    {
      name: 'Drop Off',
      selector: row => row?.points[1]?.address
    },
    {
      name: 'Name',
      selector: row => row?.name
    },
    {
      name: 'Start Date',
      selector: row => row?.start_date.split(' ')[0]
    },
    {
      name: 'end Date',
      selector: row => row?.end_date.split(' ')[0]
    },
    {
      name: 'Duration',
      cell: row => {
        const duration = moment.duration(row?.mapData?.routes[0].duration, 'seconds')
        const hours = duration.hours()
        const minutes = duration.minutes()

        return <span>{hours > 0 ? `${hours} Hours ${minutes} minutes` : `${minutes} minutes`}</span>
      }
    },
    {
      name: 'Distance',
      selector: row => `${(row?.mapData?.routes[0].distance / 1000).toFixed(1)} Kms`
    },
    {
      name: 'Cost',
      selector: row => `$ ${(row?.mapData?.routes[0].duration / 100).toFixed(2)}`
    },
    {
      name: 'Start Trip',
      cell: row => {
        const duration = moment.duration(row?.mapData?.routes[0].duration, 'seconds')
        const hours = duration.hours()
        const minutes = duration.minutes()

        return (
          <Button
            color='info'
            onClick={() =>
              router.push(
                `/map?pickup=${row?.points[0]?.longitude},${row?.points[0]?.latitude}&dropoff=${row?.points[1]?.longitude},${row?.points[1]?.latitude}&` +
                  new URLSearchParams({
                    pickupLocation: row?.points[0]?.address.slice(0, 20),
                    dropOffLocation: row?.points[1]?.address.slice(0, 20),
                    cost: (row?.mapData?.routes[0].duration / 100).toFixed(2),
                    vehicle: vehicleId
                  })
              )
            }
          >
            Start
          </Button>
        )
      }
    }
  ]
}
