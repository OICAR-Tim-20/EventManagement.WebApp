import { Alert, AlertColor, Box, Button, CircularProgress, Container, CssBaseline, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Field, Form, Formik, FormikHelpers, validateYupSchema } from 'formik'
import { useState, useEffect } from 'react'
import { EEvent, Location } from '../../models/domain'
import EventService from '../../services/event.service'
import { FormTextField } from '../FormTextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import LocationsTable from '../locations/LocationsTable';
import NewLocation from '../locations/NewLocation';

const NewEventDetails = () => {

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

  const [evnt, setEvent] = useState<EEvent>({
    id: 0,
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    locationId: 0,
    location: {
      locationId: 0,
      address: {
        city: '',
        zipCode: '',
        street: '',
        houseNumber: ''
      },
      venue: ''
    },
    username: localStorage.getItem('username')!,
    eventType: 'Concert',
    ticketsAvailable: 0,
    ticketPrice: 0,
    picture: ''
  })

  const [successful, setSuccessful] = useState<boolean | null>(null);
  const [alertType, setAlertType] = useState<AlertColor>("success")
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    setEvent(prevState => ({
        ...evnt,
        location: location,
        locationId: location.locationId
    }))
  }, [location])
  
  const handleSubmit = (values: EEvent) => {
        setLoading(true)
        values.username = localStorage.getItem('username')!;
        EventService.createEvent(values)
      .then((response) => {
        setMessage(response.data);
        setLoading(false)
        setSuccessful(true)
        setAlertType("success")
      })
      .catch((error) => {
        setMessage(error)
        setLoading(false)
        setMessage(error)
        setLoading(false)
      })
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5">
            Create Event
          </Typography>
          <br></br>
          <Formik initialValues={evnt} enableReinitialize onSubmit={(values: EEvent, formikHelpers: FormikHelpers<EEvent>) => {handleSubmit(values); formikHelpers.setSubmitting(false)}}>
            <Form>
              <Grid container spacing={2} sx={{border: '1px solid grey'}}>
              {loading ? <CircularProgress /> : null} 
                <Grid item xs={12} sm={12}>
                <Field
                      required
                      fullWidth
                      id="title"
                      label="Title"
                      name={"title"}
                      autoComplete="title"
                      value={evnt?.title}
                      onChange={(newValue: string) => {
                        setEvent(prevState => ({
                          ...evnt,
                          title: newValue
                        }))
                     }}
                      component={FormTextField}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Start Date"
                    value={evnt.startDate}
                    onChange={(newValue) => {
                      setEvent(prevState => ({
                        ...evnt,
                        startDate: newValue
                      }))
                   }}
                    renderInput={(params) => <TextField {...params} />}
                     />
                </LocalizationProvider>
                </Grid>
                
                <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="End Date"
                    value={evnt.endDate}
                    onChange={(newValue) => {
                        setEvent(prevState => ({
                            ...evnt,
                            endDate: newValue
                          }))
                    }}
                    renderInput={(params) => <TextField {...params} />}
                     />
                     </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <Select 
                        labelId="eventType"
                        id="eventType"
                        value={evnt.eventType}
                        onChange={(newValue) => setEvent(prevState => ({
                            ...evnt,
                            eventType: newValue.target.value
                          }))}
                        sx={{ minWidth: 130 }}
                        >
                          <MenuItem value={'Concert'}>Concert</MenuItem>
                          <MenuItem value={'Festival'}>Festival</MenuItem>
                          <MenuItem value={'Party'}>Party</MenuItem>
                        </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Field
                      required
                      fullWidth
                      id="ticketsAvailable"
                      label="Tickets available"
                      name={"ticketsAvailable"}
                      autoComplete="ticketsAvailable"
                      value={evnt?.ticketsAvailable}
                      onChange={(newValue: string) => {
                        setEvent(prevState => ({
                          ...evnt,
                          ticketsAvailable: +newValue
                        }))
                     }}
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Field
                      required
                      fullWidth
                      id="picture"
                      label="Link to event image"
                      name={"picture"}
                      autoComplete="picture"
                      value={evnt?.picture}
                      component={FormTextField}
                      onChange={(newValue: string) => {
                        setEvent(prevState => ({
                          ...evnt,
                          picture: newValue
                        }))
                     }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Field
                      required
                      fullWidth
                      id="ticketPrice"
                      label="Ticket price"
                      name={"ticketPrice"}
                      autoComplete="ticketPrice"
                      value={evnt?.ticketPrice}
                      component={FormTextField}
                      onChange={(newValue: string) => {
                        setEvent(prevState => ({
                          ...evnt,
                          ticketPrice: +newValue
                        }))
                     }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Grid item xs={12} sm={12}>
                    <Field
                      required
                      fullWidth
                      id="location.venue"
                      label="Location"
                      name={"location.venue"}
                      autoComplete="location.venue"
                      value={evnt.location.venue}
                      component={FormTextField}
                    />
                </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography>Available Locations</Typography>
                   <LocationsTable setLocation={setLocation} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Event
                </Button>
                </Grid>
              </Grid>
              {successful ? <Alert severity={alertType}>{message}</Alert> : null}
            </Form>
          </Formik>
          </Box>
        <NewLocation />
    </Container>
  )
}

export default NewEventDetails