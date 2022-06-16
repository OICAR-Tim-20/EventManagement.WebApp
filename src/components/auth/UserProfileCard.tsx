import { Avatar, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { User } from '../../models/domain'

interface UserProp {
  user: User
}

const UserProfileCard = (props : UserProp) => {
  const {user} = props

  return (
    <Card sx={{ maxWidth: 345 }}>
    <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
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
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
  )
}

export default UserProfileCard