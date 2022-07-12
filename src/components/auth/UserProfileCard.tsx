import { Avatar, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { User } from '../../models/domain'

interface UserProp {
  user: User
}

const UserProfileCard = (props : UserProp) => {
  const {user} = props

  return (
    <Card sx={{ width: 200, margin: 3 }}>
    <Avatar
        src={user.picture}
        sx={{ width: 56, height: 56 }}
      />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {user.username}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {user.email}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small"><Link to={`/profiles/${user.userId}`}>Detalji</Link></Button>
    </CardActions>
  </Card>
  )
}

export default UserProfileCard