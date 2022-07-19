import { Alert, AlertColor, Box, Button, CircularProgress, Container, CssBaseline, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EEvent, Location } from '../../models/domain'
import EventService from '../../services/event.service'
import { FormTextField } from '../FormTextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import LocationsTable from '../locations/LocationsTable';
import eventService from '../../services/event.service';

const EventDetails = () => {
  const navigate = useNavigate()

  const {id} = useParams()

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
    username: '',
    eventType: 'Festival',
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
    getEventById(id!);
  }, [])
  
  useEffect(() => {
      setEvent(prevState => ({
        ...evnt,
        location: location,
        locationId: location.locationId
    }))
  }, [location])
  
  const getEventById = async (id: string) => {
    setLoading(true)
    await EventService.getEventById(id)
    .then((response) => {
      setEvent(response.data)
      setLoading(false)
    })
    .catch((error) => {
      setMessage(error)
      setLoading(false)
    })
  }

  const handleSubmit = (values: EEvent) => {
        values.id = +id!
        values.username = localStorage.getItem('username')!;
        EventService.updateEvent(values)
      .then((response) => {
        setMessage(response.data);
        setLoading(false)
        setSuccessful(true)
        setAlertType("success")
        setTimeout(function(){
          navigate(-1)
        }, 2000);
        
      })
      .catch((error) => {
        setMessage(error)
        setLoading(false)
        setSuccessful(false)
        setAlertType("error")     
      })
  }

  const deleteEvent = (id: number) => {
    eventService.deleteEvent(id)
    .then((response) => {
      setMessage(response.data);
      setLoading(false)
      setSuccessful(true)
      setAlertType("success")
      setTimeout(function(){
        navigate(-1)
      }, 2000);
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
            Update Event
          </Typography>
          <br></br>
          <Formik initialValues={evnt} enableReinitialize onSubmit={(values: EEvent, formikHelpers: FormikHelpers<EEvent>) => {handleSubmit(values); formikHelpers.setSubmitting(false)}}>
            <Form>
              <Grid container spacing={2}>
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
                        label="Event Type"
                        onChange={(newValue) => setEvent(prevState => ({
                          ...evnt,
                          eventType: newValue.target.value
                        }))}
                        >
                          <MenuItem value={'Concert'}>Concert</MenuItem>
                          <MenuItem value={'Festival'}>Festival</MenuItem>
                          <MenuItem value={'Party'}>Party</MenuItem>
                        </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Field
                      disabled
                      required
                      fullWidth
                      id="ticketsAvailable"
                      label="Tickets available"
                      name={"ticketsAvailable"}
                      autoComplete="ticketsAvailable"
                      value={evnt?.ticketsAvailable}
                      component={FormTextField}
                      onChange={(newValue: string) => {
                        setEvent(prevState => ({
                          ...evnt,
                          ticketsAvailable: +newValue
                        }))
                     }}
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
                      onChange={(newValue: string) => {
                        setEvent(prevState => ({
                          ...evnt,
                          picture: newValue
                        }))
                      }}
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Field
                      disabled
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
                  <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update Event
                </Button>
                <Button
                  variant="contained"
                  color='error'
                  sx={{ mt: 3, mb: 2, marginLeft: 3}}
                  onClick={() => {deleteEvent(+id!)}}
                >
                  Delete Event
                </Button>
              </Grid>
              {successful ? <Alert severity={alertType}>{message}</Alert> : null}
            </Form>
          </Formik>
          </Box>
    </Container>
  )
}

export default EventDetails