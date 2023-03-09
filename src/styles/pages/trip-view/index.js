import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

import { Box } from '@mui/material'

export const VehicleCheckbox = styled(Box)(({ theme }) => ({
  width: '25%',

  [theme.breakpoints.down(900)]: {
    width: '33%'
  },

  [theme.breakpoints.down(600)]: {
    width: '50%'
  }
}))
