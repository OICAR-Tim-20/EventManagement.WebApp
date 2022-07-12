import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EventDate from '../../components/event/EventDate'
import { EEvent, EventBlock } from '../../models/domain'
import eventService from '../../services/event.service'
import moment from "moment"

const EventCalendarPage = () => {

  const [eventBlocks, setEventBlocks] = useState<EventBlock[]>([{
    date: new Date(),
    eventDTOs: []
  }]);

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    getEventBlocks()
  }, [])
  

  const getEventBlocks = async () => {
    setLoading(true)
    await eventService.getAllByDate()
    .then(response => {
      setEventBlocks(response.data);
      setLoading(false);
    })
    .catch(error => {
      setMessage(error)
      setLoading(false)
    })
  }
  
  return (
    <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography variant='h2'>All events</Typography>
        {loading ? <CircularProgress /> : null} 
    {eventBlocks.map((eventBlock => 
    <EventDate key={eventBlock.date.toString()} eventDTOs={eventBlock.eventDTOs} date={moment(eventBlock.date).format("DD. MM. YYYY")} />))}
    </Box>
  )
}

export default EventCalendarPage