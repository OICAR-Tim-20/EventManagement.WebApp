import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import ProfilePage from '../auth/Profile';
import UserProfilesPage from '../../pages/profile/UserProfilesPage';
import EventCard from '../event/EventCard';
import { EEvent, User } from '../../models/domain';
import { Button, CircularProgress, Grid } from '@mui/material';
import { margin } from '@mui/system';
import UserContext from '../../context/UserContext';
import authService from '../../services/auth.service';
import { AxiosResponse } from 'axios';
import EventDetails from '../event/EventDetails';
import NewEventDetails from '../event/NewEventDetails';
import eventService from '../../services/event.service';
import { BarChart, EventAvailable, People, Person } from '@mui/icons-material';
import StatisticsPage from '../../pages/statistics/StatisticsPage';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export function UsersMenu() {
  return (
    <ListItem button>
            <ListItemIcon>
              <People />
              <Link to="/profiles" style={{ textDecoration: 'none', color: 'black' }}>
                User profiles
                </Link>
            </ListItemIcon>
    </ListItem>
  )
}

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState<string | undefined>('')
  const [userType, setUserType] = React.useState<number>(0)
  const [message, setMessage] = React.useState<string | undefined>('')
  const [evnts, setEvents] = React.useState<EEvent[]>([])

  const setUserToContext = async (response: AxiosResponse<any, any>) => {
       localStorage.setItem('userdata', JSON.stringify(response.data));
       localStorage.setItem('username', response.data.username)
       setUsername(response.data.username)
  }


  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if(localStorage.getItem('userdata') === null) {
       getCurrentProfile()
    } else {
      let user: User = JSON.parse(localStorage.getItem('userdata')!)
      setUserType(user.userType)
      setUsername(localStorage.getItem('username')!)
      getEventsByUserId(user.userId)
    }
  },[])

  const getCurrentProfile = async () => {
    setLoading(true)
    await authService.getCurrentUser()
    .then(async (response) => { 
      setUserToContext(response)
      setLoading(false) })
    .catch((error) => {
      setLoading(false)
    })
    let userFromLs = localStorage.getItem('username') === null ? '' : localStorage.getItem('username')
    setUsername(userFromLs!);
  }

  const getEventsByUserId = async (id: number) => {
    setLoading(true)
     await eventService.getEventsByUserId(id)
     .then(response => {
        setEvents(response.data)
        setLoading(false)
     })
     .catch(error => {
        setMessage(error)
        setLoading(false)
     })
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hello {username}!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Person />
              <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                Profile
                </Link>
            </ListItemIcon>
          </ListItem>
          {userType === 0  ? <UsersMenu /> : null}
          <ListItem button>
            <ListItemIcon>
              <EventAvailable />
              <Link to="/calendar" style={{ textDecoration: 'none', color: 'black' }}>
                All Events
                </Link>
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BarChart />
              <Link to="/statistics" style={{ textDecoration: 'none', color: 'black' }}>
                Statistics
                </Link>
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {loading ? <CircularProgress /> : null} 
        <Typography variant='h3'>
          {evnts.length === 0 ? "You haven't created any events!" : "Here are your events"}
        </Typography>
        <Button variant='contained'><Link to="events/new" style={{ textDecoration: 'none', color: 'black' }}>Create new event</Link></Button>
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Grid container spacing={8} sx={{marginLeft: 10}}>
        {evnts.map((evnt => <EventCard key={evnt.id} evnt={evnt} />))}
        </Grid>
          </Box>
      </Main>
      <Routes>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profiles" element={<UserProfilesPage />} />
        <Route path="events/new" element={<NewEventDetails />} />
        <Route path='statistics' element={<StatisticsPage />} />
      </Routes>
    </Box>
  );
}