import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer } from 'recharts'
import { string } from 'yup'
import { number } from 'yup/lib/locale'
import statisticsService from '../../services/statistics.service'


interface ChartData {
    key: string,
    value: [{
      key: string,
      value: number
    }]
 }

const EventTypesByYearChart = () => {

  const [data, setData] = useState<ChartData[]>(
    [{
      key: '2022',
      value: [{
        key: 'Fest',
        value: 9
      }]
    }]
  )
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    getEventTypesByYear()
  }, [])
  
  const getEventTypesByYear = async () => {
    debugger;
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
    <div>
        {loading ? <CircularProgress /> : null}
        {message}
        <BarChart width={300} height={300} data={data}>
          <Bar dataKey="key" fill="#8884d8" /> 
        </BarChart>
    </div>
  )
}

export default EventTypesByYearChart