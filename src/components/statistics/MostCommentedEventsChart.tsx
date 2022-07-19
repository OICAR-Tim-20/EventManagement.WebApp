import { CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { Legend, Pie, PieChart, Tooltip } from 'recharts';
import statisticsService from '../../services/statistics.service';

interface ChartData {
    key: string,
    value: number
  }

const MostCommentedEventsChart = () => {
    const [data, setData] = useState<ChartData[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('')
  
    useEffect(() => {
        getMostCommentedEvents()
    }, [])
    
    const getMostCommentedEvents = async () => {
        setLoading(true)
        await statisticsService.MostCommentedEvents()
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
        <Typography variant='h4'>5 Most commented events</Typography>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={360}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#2ecc71"
            label
          />
          <Tooltip />
        </PieChart>
    </div>
        );
}

export default MostCommentedEventsChart