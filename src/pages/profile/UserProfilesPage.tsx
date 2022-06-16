import { Box, Container, Grid } from '@mui/material'
import {useState, useEffect} from 'react'
import UserProfileCard from '../../components/auth/UserProfileCard'
import { User } from '../../models/domain'
import userService from '../../services/user.service'


const UserProfilesPage = () => {

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    getAllUsers();
  }, [])
  
  const getAllUsers = async () => {
    setLoading(true)
    await userService.getAllUsers()
    .then((response) => {
      setUsers(response.data);
      setLoading(false)
    })
    .catch(error => setMessage(error))
    setLoading(false)
  }


  return (
    <Container component="main" maxWidth="md">
      <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
      {message}
      <Grid container spacing={8}>
        {users.map((user => 
          <UserProfileCard key={user.userId} user={user}/>
        ))}
      </Grid>
      </Box>
    </Container>
  )
}

export default UserProfilesPage