import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

import { Box, TextField, Select, InputLabel, Typography, OutlinedInput } from '@mui/material'

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.4rem',
  color: theme.palette.text.primary,
  letterSpacing: '0.18px'
}))

export const FieldWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1)
}))

export const FieldHorizontalWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: theme.spacing(2),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1)
}))

export const TextInput = styled(TextField)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1rem',

  '& .MuiOutlinedInput-root': {
    borderRadius: '5rem'
  },

  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(2, 3)
  }
}))

export const SelectInput = styled(Select)(({ theme }) => ({
  borderRadius: '5rem',

  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(2, 3),
    borderRadius: '5rem'
  }
}))

export const TextLabel = styled(InputLabel)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1)
}))

export const HeaderLabel = styled('span')(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.2rem',
  paddingBottom: theme.spacing(2),
  border: `3px solid ${theme.palette.primary.main}`,
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  color: theme.palette.primary.main
}))

export const StatsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: '-webkit-fill-available'
}))

export const PasswordField = styled(OutlinedInput)(({ theme }) => ({
  backgroundColor: 'transparent',

  // border: `2px solid ${theme.palette.primary.contrastText}`,
  borderRadius: '5rem',
  '& .MuiOutlinedInput-input': {
    // color: theme.palette.primary.contrastText,
    fontWeight: 500,
    padding: '0.25rem 1rem'
  }
}))

export const EmailField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '5rem',
    backgroundColor: 'transparent',

    // border: `2px solid ${theme.palette.primary.contrastText}`,
    '&.Mui-focused': {
      backgroundColor: 'transparent'

      // border: `2px solid ${theme.palette.primary.contrastText}`
    }
  },
  '& .MuiOutlinedInput-input': {
    // color: theme.palette.primary.contrastText,
    fontWeight: 500,
    padding: '0.25rem 1rem'
  }

  // '& .MuiInputLabel-outlined': {
  //   color: theme.palette.primary.contrastText,
  //   '&.Mui-focused': {
  //     color: theme.palette.primary.contrastText
  //   }
  // }
}))

export const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1rem',

  letterSpacing: '0.18px',
  marginBottom: theme.spacing(2)
}))

// ** Styles
export const useStyles = makeStyles(theme => ({
  icon: {},
  checkbox: {
    '&.Mui-checked': {
      // color: theme.palette.primary.contrastText
      color: 'red'
    }
  },
  button: {
    borderRadius: '5rem',
    marginTop: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconRight: {
    marginLeft: 'auto !important'
  },
  translator: {
    marginTop: '5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '12rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '0.5rem',
    padding: '0.3rem 0.4rem'
  },
  selector: {
    marginLeft: '1rem',

    '& svg': {
      display: 'none'
    },

    '& div': {
      paddingRight: '0 !important'
    }
  },
  language: {
    fontWeight: 500,
    fontSize: '1.4rem'
  }
}))
