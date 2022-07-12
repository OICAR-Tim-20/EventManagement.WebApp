import { useState } from 'react';
import { Container, Typography, Grid, Button, Box, Avatar } from '@mui/material';
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { FormTextField } from '../FormTextField'
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AuthService from '../../services/auth.service';
import * as yup from "yup";

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

  const [message, setMessage] = useState("")

  const handleSubmit = (values: any) => {
    AuthService.login(values.username, values.password)
      .then((response) => {
        navigate('/');
        window.location.reload();
      },
      (error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      setMessage(resMessage);
      })
  }

  return (
    <Container maxWidth="md">
      <Box mb={3} p={2}>
      <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
      </Box>
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
    </Container>
  );
}

export default Login
