import PersistentDrawerLeft from '../../components/dashboard/Dashboard'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation()
  console.warn(location)
  return (
    <PersistentDrawerLeft />
  )
}

export default Home