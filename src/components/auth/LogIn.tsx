import { useState } from 'react';
import { Container, Typography, Grid, Button, Box, Avatar, CssBaseline, AlertColor, Alert } from '@mui/material';
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { FormTextField } from '../FormTextField'
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AuthService from '../../services/auth.service';
import * as yup from "yup";
import authService from '../../services/auth.service';

interface FormValues {
  username: string;
  password: string;
}

const validationSchema = yup.object().shape({
  username: yup.string().required("Required"),
  password: yup.string().required("Required")
});

const Login = () => {
  let navigate = useNavigate();

  const [successful, setSuccessful] = useState<boolean | null>(null);
  const [alertType, setAlertType] = useState<AlertColor>("success")
  const [message, setMessage] = useState("")

  const handleSubmit = (values: any) => {
    AuthService.login(values.username, values.password)
      .then((response) => {
        setMessage(response.data)
        setAlertType("success")
        setSuccessful(true);
        setTimeout(function(){
          getCurrentProfile()
          navigate('/');
          window.location.reload();
        }, 2000);
      },
      (error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      setMessage(resMessage);
      setAlertType("error")
      setSuccessful(false);
      })
      
  }

  const getCurrentProfile = async () => {
    await authService.getCurrentUser()
    .then((response) => {
        localStorage.setItem('userdata', JSON.stringify(response.data));
        localStorage.setItem('username', response.data.username)
    })
    .catch((error) => 
      setMessage(error)
    )
  }

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
      <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
      </Box>
      <br />
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: FormValues,
          formikHelpers: FormikHelpers<FormValues>
        ) => {
          handleSubmit(values);
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="username"
                  label="Username"
                  size="small"
                  component={FormTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  size="small"
                  component={FormTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="outlined"
                  size="large"
                  color="primary"
                  disabled={formikProps.isSubmitting}
                >
                  Submit
                </Button>
                {message}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      {successful ? <Alert severity={alertType}>{message}</Alert> : null}
    </Container>
  );
}

export default Login
