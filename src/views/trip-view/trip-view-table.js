import React from 'react'
import PropTypes from 'prop-types'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable, { createTheme } from 'react-data-table-component'

// ** Custom Components
import { columns } from './table.data'
import Spinner from 'src/@core/components/spinner'
import { useRouter } from 'next/router'

// ** pagination
// import ReactPagination from 'src/components/pagination'

createTheme(
  'solarized',
  {
    text: {
      primary: '#',
      secondary: '#2aa198'
    },
    background: {
      default: 'transparent'
    },
    context: {
      background: '#e3f2fd',
      text: '#000'
    },
    divider: {
      default: 'rgba(216, 214, 222, 0.1)'
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)'
    },
    context: {
      background: '#c8d1ed !important',
      color: '#000 !important'
    }
  },
  'dark'
)

function TripViewTable({
  rows,
  loading,
  vehicleId

  // page,
  // total,
  // limit,
  // handlePageChange
}) {
  const router = useRouter()
  
  return (
    <>
      <DataTable
        data={rows}
        pointerOnHover
        theme='solarized'
        progressPending={loading}
        progressComponent={<Spinner />}
        columns={columns({ router, vehicleId })}
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}

        // rowsPerPage={limit}
      />

      {/* {total > 10 && (
        <ReactPagination
          total={total}
          limit={limit}
          page={page}
          handleLimit={e => handleLimitChange(e)}
          handlePagination={(e, page) => handlePageChange(page)}
        />
      )} */}
    </>
  )
}

export default TripViewTable

TripViewTable.propTypes = {
  loading: PropTypes.bool,
  total: PropTypes.number,
  page: PropTypes.number,
  limit: PropTypes.number,
  handleLimitChange: PropTypes.func,
  handlePageChange: PropTypes.func
}
