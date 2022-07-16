import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import * as yup from "yup";
import AuthService from '../../services/auth.service';
import { Alert, AlertColor } from '@mui/material';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { FormTextField } from '../FormTextField';

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  username: yup.string().required("Required"),
  email: yup.string().email("Invalid email format").required("Required"),
  password: yup.string().required("Required"),
});


 const Register = () => {
  const [successful, setSuccessful] = useState<boolean | null>(null);
  const [alertType, setAlertType] = useState<AlertColor>("success")
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (values: any) => {
    AuthService.register(values.username, values.email, values.password)
    .then((response) => {
      setMessage(response.data.message);
      setAlertType("success")
      setSuccessful(true);
    },
    (error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) ||
      error.message || error.toString();
      setMessage(resMessage);
      setAlertType("error")
      setSuccessful(false);
    });
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          </Box>
          <br />
          <Formik
        initialValues={{
          username: "",
          email: "",
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
                  name="email"
                  label="Email"
                  type="email"
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

export default Register