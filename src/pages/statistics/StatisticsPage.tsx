import { Box, Typography } from '@mui/material'
import React from 'react'
import AverageEventRatingChart from '../../components/statistics/AverageEventRatingChart'
import EventTypesByYearChart from '../../components/statistics/EventTypesByYearChart'
import MostCommentedEventsChart from '../../components/statistics/MostCommentedEventsChart'

const StatisticsPage = () => {
  return (
    <div>
      <br />
    <Typography margin='auto' textAlign='center' variant='h2'>Statistics</Typography>
    <Box sx={{
        // marginTop: 8,
        // marginLeft: 20,
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'space-between',
      }}>
        <EventTypesByYearChart />
        <MostCommentedEventsChart />
        <AverageEventRatingChart />
    </Box>
    </div>
  )
}

export default StatisticsPage