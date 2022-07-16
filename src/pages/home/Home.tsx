import PersistentDrawerLeft from '../../components/dashboard/Dashboard'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('userdata') === null) {
      navigate('/auth')
    }
  }, [])
  

  return (
    <PersistentDrawerLeft />
  )
}

export default Home