import { Box, Typography } from '@mui/material'
import React from 'react'
import AverageEventRatingChart from '../../components/statistics/AverageEventRatingChart'
import EventTypesByYearChart from '../../components/statistics/EventTypesByYearChart'

const StatisticsPage = () => {
  return (
    <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography variant='h2'>Statistics</Typography>
        <EventTypesByYearChart />
        <AverageEventRatingChart />
    </Box>
  )
}

export default StatisticsPage