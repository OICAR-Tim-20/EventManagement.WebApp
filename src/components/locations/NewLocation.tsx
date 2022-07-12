import { Alert, AlertColor, Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react'
import { Location } from '../../models/domain';
import locationService from '../../services/location.service';
import { FormTextField } from '../FormTextField';

const NewLocation = () => {

  const [successful, setSuccessful] = useState<boolean | null>(null);
  const [alertType, setAlertType] = useState<AlertColor>("success")
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false) 
  const [location, setLocation] = useState<Location>({
    locationId: 0,
      address: {
        city: '',
        zipCode: '',
        street: '',
        houseNumber: ''
      },
      venue: ''
  })

  const handleSubmit = (values: Location) => {
    setLoading(true);
    locationService.createLocation(values)
    .then((response) => {
        setMessage(response.data);
        setLoading(false)
        setAlertType("success")
        setSuccessful(true);
      })
      .catch((error) => {
        setMessage(error)
        setLoading(false)
        setAlertType("error")
        setSuccessful(false);
      })
  }

  return (
    <Box>
      {successful ? <Alert severity={alertType}>{message}</Alert> : null}
      {loading ? <CircularProgress /> : null}
    <Typography component="h1" variant="h5">
            Create Location
          </Typography>
          <br></br>
          <Formik initialValues={location} enableReinitialize onSubmit={(values: Location, formikHelpers: FormikHelpers<Location>) => {handleSubmit(values); formikHelpers.setSubmitting(false)}}>
            <Form>
              <Grid container spacing={2} sx={{border: '1px solid grey'}}>
                <Grid item xs={12} sm={6}>
                <Field
                      required
                      fullWidth
                      id="location.venue"
                      label="Venue"
                      name={"venue"}
                      autoComplete="venue"
                      value={location.venue}
                      component={FormTextField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Field
                      required
                      fullWidth
                      id="address.city"
                      label="City"
                      name={"address.city"}
                      autoComplete="address.city"
                      value={location.address.city}
                      component={FormTextField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Field
                      required
                      fullWidth
                      id="address.street"
                      label="Street"
                      name={"address.street"}
                      autoComplete="address.street"
                      value={location.address.street}
                      component={FormTextField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Field
                      required
                      fullWidth
                      id="address.houseNumber"
                      label="House Number"
                      name={"address.houseNumber"}
                      autoComplete="address.houseNumber"
                      value={location.address.houseNumber}
                      component={FormTextField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Field
                      required
                      fullWidth
                      id="address.zipCode"
                      label="Zipcode"
                      name={"address.zipCode"}
                      autoComplete="address.zipCode"
                      value={location.address.zipCode}
                      component={FormTextField}
                    />
                </Grid>
                  <Grid item xs={12} sm={6}>
                  <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Location
                </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
  )
}

export default NewLocation