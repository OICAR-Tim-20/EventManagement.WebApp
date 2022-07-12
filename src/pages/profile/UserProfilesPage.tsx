import { Alert, AlertColor, Box, CircularProgress, Container, Grid, Typography } from '@mui/material'
import {useState, useEffect} from 'react'
import UserProfileCard from '../../components/auth/UserProfileCard'
import { User } from '../../models/domain'
import userService from '../../services/user.service'


const UserProfilesPage = () => {

  const [successful, setSuccessful] = useState<boolean | null>(null);
  const [alertType, setAlertType] = useState<AlertColor>("success")
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
      {successful ? <Alert severity={alertType}>{message}</Alert> : null}
      {loading ? <CircularProgress /> : null}
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
      {message}
      <Typography variant='h3'>
        {users.length > 0 ? 'List of registered users:' : 'There are no registered users yet!'}
      </Typography>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
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