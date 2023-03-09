// ** React Imports
import { useState } from 'react'
import { Buffer } from 'buffer'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import useJwt from 'src/auth/jwt/useJwt'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Store && Actions
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'src/store/authentication/authAction'
import { EmailField, Label, PasswordField, useStyles } from 'src/styles/input'
import { useRouter } from 'next/router'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // ** Hooks
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** redux
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)

  // ** Vars
  const { skin } = settings

  const schema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().min(3).required()
  })

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  const formik = useFormik({
    initialValues: {
      userEmail: '',
      password: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      const data = {
        tokenId: -1,
        user: {
          userEmail: values.email,
          password: values.password
        }
      }

      const str = JSON.stringify(data)
      const buffer = Buffer.from(str, 'utf8')
      const base64encoded = buffer.toString('base64')

      if (base64encoded) {
        dispatch(login({ base64encoded, router }))
      }
    }
  })

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <LoginIllustrationWrapper>
            <LoginIllustration
              alt='login-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </LoginIllustrationWrapper>
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img alt='logo' src={themeConfig.templateLogo} style={{ width: '40px', height: '40px' }} />
              <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</TypographyStyled>
              <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
            </Box>
            {/* <Alert icon={false} sx={{ py: 3, mb: 6, ...bgColors.primaryLight, '& .MuiAlert-message': { p: 0 } }}>
              <Typography variant='caption' sx={{ mb: 2, display: 'block', color: 'primary.main' }}>
                Admin: <strong>admin@tracking.me</strong> / Pass: <strong>admin</strong>
              </Typography>
            </Alert> */}
            <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Label>Email / User Name</Label>
                <EmailField
                  autoFocus
                  error={Boolean(formik.errors.email)}
                  placeholder='Enter your username'
                  className='login-input'
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {formik.errors.email}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth>
                <Label>Password</Label>
                <PasswordField
                  placeholder='Enter your password'
                  id='auth-login-v2-password'
                  error={Boolean(formik.errors.password)}
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          className={classes.icon}
                          icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                          fontSize={20}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />

                {formik.touched.password && formik.errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {formik.errors.password}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                <FormControlLabel
                  label='Remember Me'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
                <Typography
                  variant='body2'
                  component={Link}
                  href='/forgot-password'
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              {error && !formik.values.userEmail && (
                <FormHelperText
                  sx={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'error.main',
                    textAlign: 'center',
                    marginBottom: '8px'
                  }}
                >
                  {error[0]?.loginerror}
                </FormHelperText>
              )}

              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                Login
              </Button>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
