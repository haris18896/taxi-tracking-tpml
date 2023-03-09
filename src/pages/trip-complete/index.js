import React from 'react'
import { useRouter } from 'next/router'

// ** Third Party Packages
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'

// ** MUI
import { Box } from '@mui/system'
import { Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material'

// ** Components
import useJwt from 'src/auth/jwt/useJwt'
import { isObjEmpty } from 'src/configs/utils'
import { FieldWrapper, TextLabel, TextInput, FieldHorizontalWrapper } from 'src/styles/input'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { updateTripDataAction } from 'src/store/vehicles/vehiclesAction'

function TripComplete() {
  const router = useRouter()
  const { vehicle, cost, distance, current_trip_id, trip_id } = router.query
  const dispatch = useDispatch()
  const { tripsList } = useSelector(state => state.vehicle)

  const user = useJwt.getUserData()
  const trip = tripsList[`${trip_id}`]

  const schema = Yup.object().shape({
    payment_type: Yup.string()
      .matches(/(cash|bill_to_company)/)
      .required('Payment type is required'),
    comment: Yup.string(),
    customer_name: Yup.string().required('Customer name is required'),
    customer_contact_no: Yup.string().required('Customer contact is required')
  })

  const formik = useFormik({
    initialValues: {
      customer_contact_no: '',
      customer_name: '',
      comment: '',
      payment_type: 'cash'
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          customer_contact_no: values.customer_contact_no,
          customer_name: values.customer_name,
          comment: values.comment,
          payment_type: values.payment_type,
          vehicle_id: vehicle,
          trip_id: trip?.id,
          current_trip_id: current_trip_id,
          driver_id: user?.driverId,
          vehicle_id: vehicle,
          point_id: trip?.points[0]?.id,
          latitude: trip?.points[0]?.latitude,
          longitude: trip?.points[0]?.longitude,
          time: moment(`${new Date()}`).format('YYYY-MM-DD HH:mm:ss'),
          total_distance: distance,
          amount: cost,
          action: 'trip_stop'

          // arrived_at_start:
          // trip_start:
          // arrived_at_midpoint:
          // exit_from_midpoint:
          // trip_stop:
        }

        const str = JSON.stringify(data)
        const buffer = Buffer.from(str, 'utf8')
        const base64encoded = buffer.toString('base64')

        dispatch(updateTripDataAction({ base64encoded, callback: () => router.push('/trip-view') }))
      }
    }
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <FieldWrapper>
              <TextLabel id='payment_type' sx={{ marginBottom: '0.25rem' }}>
                Payment Type
              </TextLabel>
              <FieldHorizontalWrapper
                sx={{
                  width: '-webkit-fill-available',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      id='cash'
                      name='cash'
                      type='checkbox'
                      sx={{ padding: 0, marginRight: 3 }}
                      checked={formik.values.payment_type === 'cash'}
                      onChange={() => formik.setFieldValue('payment_type', 'cash')}
                    />
                  }
                  label='Cash'
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      id='billToCompany'
                      name='billToCompany'
                      type='checkbox'
                      sx={{ padding: 0, marginRight: 3 }}
                      checked={formik.values.payment_type === 'bill_to_company'}
                      onChange={() => formik.setFieldValue('payment_type', 'bill_to_company')}
                    />
                  }
                  label='Bill To Company'
                />
              </FieldHorizontalWrapper>
            </FieldWrapper>
          </Grid>

          <Grid item xs={12} md={6}>
            <FieldWrapper>
              <TextLabel id='name' sx={{ marginBottom: '0.25rem' }}>
                Name
              </TextLabel>
              <TextInput
                fullWidth
                max={10}
                id='name'
                name='name'
                type='text'
                variant='outlined'
                placeholder='Enter Client Name'
                {...formik.getFieldProps('customer_name')}
                error={formik.touched.customer_name && Boolean(formik.errors.customer_name)}
                helperText={formik.touched.customer_name && formik.errors.customer_name}
              />
            </FieldWrapper>
          </Grid>

          <Grid item xs={12} md={6}>
            <FieldWrapper>
              <TextLabel id='comment' sx={{ marginBottom: '0.25rem' }}>
                Comment
              </TextLabel>
              <TextInput
                fullWidth
                max={10}
                id='comment'
                name='comment'
                type='text'
                variant='outlined'
                placeholder='Comment ...'
                {...formik.getFieldProps('comment')}
                error={formik.touched.comment && Boolean(formik.errors.comment)}
                helperText={formik.touched.comment && formik.errors.comment}
              />
            </FieldWrapper>
          </Grid>

          <Grid item xs={12} md={6}>
            <FieldWrapper>
              <TextLabel id='contact' sx={{ marginBottom: '0.25rem' }}>
                Contact Number
              </TextLabel>
              <TextInput
                fullWidth
                max={10}
                id='contact'
                name='contact'
                type='number'
                variant='outlined'
                placeholder='Phone Number'
                {...formik.getFieldProps('customer_contact_no')}
                error={formik.touched.customer_contact_no && Boolean(formik.errors.customer_contact_no)}
                helperText={formik.touched.customer_contact_no && formik.errors.customer_contact_no}
              />
            </FieldWrapper>
          </Grid>
        </Grid>

        <Button
          sx={{ mt: 4 }}
          type='submit'
          variant='contained'
          color='warning'
          onClick={() => {
            // router.push('/trip-view')
            formik.handleSubmit()
          }}
        >
          Complete
        </Button>
      </form>
    </>
  )
}

export default TripComplete
