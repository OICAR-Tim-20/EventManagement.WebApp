import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { number } from 'yup/lib/locale'
import { EEvent } from '../../models/domain'
import eventService from '../../services/event.service'
import EventCard from '../event/EventCard'

interface UserProps {
    userId: number
}

const DashboardEvents = (props: UserProps) => {

    const { userId } = props

    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState<string | undefined>('')
    const [evnts, setEvents] = React.useState<EEvent[]>([])
  
    const getEventsByUserId = async (id: number) => {
        setLoading(true)
         await eventService.getEventsByUserId(id)
         .then(response => {
            setEvents(response.data)
            setLoading(false)
         })
         .catch(error => {
            setMessage(error)
            setLoading(false)
         })
      }
  useEffect(() => {
    getEventsByUserId(userId)
  }, [])
  
  return (
    <div>
    {loading ? <CircularProgress /> : null}
    {message}
        <Typography variant='h3'>
          {evnts.length === 0 ? "You haven't created any events!" : "Here are your events"}
        </Typography>
        <Button variant='contained'><Link to="events/new" style={{ textDecoration: 'none', color: 'black' }}>Create new event</Link></Button>
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Grid container spacing={8} sx={{marginLeft: 10}}>
        {evnts.map((evnt => <EventCard key={evnt.id} evnt={evnt} />))}
        </Grid>
          </Box>
    </div>
  )
}

export default DashboardEvents