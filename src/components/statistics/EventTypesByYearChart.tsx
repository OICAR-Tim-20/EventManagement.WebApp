import { CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis } from 'recharts'

import statisticsService from '../../services/statistics.service'

interface ChartData {
    year: number,
    numberOfConcerts: number,
    numberOfFestivals: number,
    numberOfParties: number
 }

const EventTypesByYearChart = () => {

  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    getEventTypesByYear()
  }, [])
  
  const getEventTypesByYear = async () => {
      setLoading(true)
      await statisticsService.EventTypesByYear()
     .then((response) => {
        setData(response.data)
        setLoading(false);
     })
     .catch((error) => {
        setMessage(error)
        setLoading(false)
     })
  }

  return (
    <div style={{margin: '20px'}}>
        {loading ? <CircularProgress /> : null}
        {message}
        <Typography variant='h4'>Event types by year</Typography>
        <BarChart width={300} height={300} data={data}>
          <XAxis dataKey="year" />
          <Tooltip />
          <Bar dataKey="numberOfConcerts" fill="#8884d8" />
          <Bar dataKey="numberOfFestivals" fill="#0088FE" />
          <Bar dataKey="numberOfParties" fill="#82ca9d" />
        </BarChart>
    </div>
  )
}

export default EventTypesByYearChart