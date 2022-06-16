import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';

import React from 'react'
import { EEvent } from '../../models/domain';
import moment from 'moment';
import { Link } from 'react-router-dom';

interface EventProp  {
   evnt : EEvent
}

const EventCard = (props: EventProp) => {

  const {evnt} = props

  return (
    <Card sx={{ maxWidth: 345, margin: 3 }} >
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {evnt.username}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={evnt.title}
        subheader={moment(evnt.startDate).format("DD-MM-YYYY")  + " - " + moment(evnt.endDate).format("DD-MM-YYYY")}
      />
    <CardMedia
      component="img"
      height="140"
      image={evnt.picture}
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {evnt.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {evnt.eventType}
      </Typography>
      <Typography>Dostupno ulaznica: {evnt.ticketsAvailable}</Typography>
    </CardContent>
    <CardActions>
      <Link to={`/events/${evnt.eventId}`}>
        <Button size="small">Detalji</Button>
      </Link>
    </CardActions>
  </Card>
  )
}

export default EventCard