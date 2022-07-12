import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { EEvent } from '../../models/domain'
import EventCard from './EventCard'

interface EventBlockProps {
  date: string,
  eventDTOs: EEvent[]
}

const EventDate = (props: EventBlockProps) => {

  const {eventDTOs, date} = props
  
  return (   
    <Grid container spacing={8}>
      <Grid item>
        <Typography variant='h3' sx={{borderBottom: '1px solid black', margin: 5}}>
             {date}
        </Typography>
      </Grid>
      <Grid container spacing={4} sx={{marginLeft: 10}}>
        {eventDTOs.map((evnt => <EventCard key={evnt.id} evnt={evnt} />))}
      </Grid> 
    </Grid>
    )
}

export default EventDate