import { CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { Bar, BarChart, LabelList, Legend, Tooltip, XAxis } from 'recharts';
import statisticsService from '../../services/statistics.service';

interface ChartData {
  key: string,
  value: number
}

const AverageEventRatingChart = () => {

  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    getEventTypesByYear()
  }, [])
  
  const getEventTypesByYear = async () => {
      setLoading(true)
      await statisticsService.AverageRatingsByEvent()
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
      <Typography variant='h4'>3 Top rated events</Typography>
      <BarChart width={300} height={300} data={data}>
        <Tooltip />
        <Bar dataKey="value" fill="#e74c3c">
          <XAxis dataKey="value"></XAxis>
          <LabelList dataKey="key" position="top" />
        </Bar>
      </BarChart>
  </div>
      );
}

export default AverageEventRatingChart