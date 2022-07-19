import { useState, useEffect } from 'react';
import { Container, CssBaseline, Box, Typography, Grid, Button, AlertColor, Alert, CircularProgress } from '@mui/material';
import { User } from '../../models/domain';
import * as yup from 'yup'
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { FormTextField } from '../FormTextField'
import userService from '../../services/user.service';

const validationSchema = yup.object().shape({
    userId: yup.number(),
    username: yup.string().required("Required"),
    email: yup.string().email("Invalid email format").required("Required"),
    contactName: yup.string(),
    phoneNumber: yup.string().min(6, "Number needs to have minimum 6 digits."),
    address: yup.object().shape({
      city: yup.string(),
      zipCode: yup.string(),
      street: yup.string(),
      houseNumber: yup.string(),
    }).nullable(true),
    addressId: yup.number().nullable(true),
    events: yup.array().nullable(true),
    picture: yup.string()
});

const Profile = () => {
  const [user, setUser] = useState<User>({
    userId: 0,
    username: '',
    email: '',
    contactName: '',
    phoneNumber: '',
    address: {
      city: '',
      zipCode: '',
      street: '',
      houseNumber: ''
    },
    addressId: 0,
    events: [],
    picture: '',
    userType: 0 
  })
  const [message, setMessage] = useState<string>('')
  const [successful, setSuccessful] = useState<boolean | null>(null);
  const [alertType, setAlertType] = useState<AlertColor>("success")
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setUserFromDb()
  }, [])
  

  const setUserFromDb = async () => {
    setLoading(true)
    let deserializedUser: User = JSON.parse(localStorage.getItem('userdata')!);
    await userService.getUserById(deserializedUser.userId)
    .then(response => {
      setUser(response.data)
      localStorage.removeItem('userdata')
      localStorage.removeItem('username')
      localStorage.setItem('userdata', JSON.stringify(response.data))
      localStorage.setItem('username', response.data.username)
      setLoading(false)
    })
    .catch(error => {
      setUser(error)
      setLoading(false)
      setMessage(error)
    })
  }

  const handleSubmit = (values: User) => {
    setLoading(true)
    userService.updateProfile(values)
    .then((response) => {
      setMessage(response.data);
      setLoading(false)
      setSuccessful(true)
      setAlertType("success")
    })
    .catch((error) => {
      setMessage(error)
      setLoading(false)
      setSuccessful(false)
      setAlertType("error")
    })
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Update profile
          </Typography>
          <Formik initialValues={user!} validationSchema={validationSchema} enableReinitialize onSubmit={(values: User, formikHelpers: FormikHelpers<User>) => {handleSubmit(values); formikHelpers.setSubmitting(false)}}>
          {(formikProps: FormikProps<User>) => (
            <Form>
            <Grid container spacing={2}>
            {loading ? <CircularProgress /> : null} 
                  <Grid item xs={12} sm={6}>
                    <Field
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name={"username"}
                      autoComplete="username"
                      value={user?.username}
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={user?.email}
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      id="contactname"
                      label="Contact Name"
                      name="contactName"
                      autoComplete="contactName"
                      value={user?.contactName}
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phoneNumber"
                      autoComplete="phoneNumber"
                      value={user?.phoneNumber}
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      id="city"
                      label="City"
                      name="address.city"
                      autoComplete="address.city"
                      value={user?.address?.city}
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      id="zipcode"
                      label="Zipcode"
                      name="address.zipCode"
                      autoComplete="address.zipCode"
                      value={user?.address?.zipCode}
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      id="street"
                      label="Street"
                      name="address.street"
                      autoComplete="address.street"
                      defaultValue={user?.address?.street}
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      id="housenumber"
                      label="House Number"
                      name="address.houseNumber"
                      autoComplete="address.houseNumber"
                      value={user?.address?.houseNumber}
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      id="picture"
                      label="Profile Picture URL"
                      name="picture"
                      autoComplete="picture"
                      value={user?.picture}
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  </Grid>
                </Grid>
                <Button
                  id='profile-submit'
                  type="submit"
                  disabled={formikProps.isSubmitting}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update
                </Button>
                </Form>
          )}
            </Formik>
        </Box>
        {successful ? <Alert severity={alertType}>{message}</Alert> : null}
    </Container>
  )
}

export default Profile