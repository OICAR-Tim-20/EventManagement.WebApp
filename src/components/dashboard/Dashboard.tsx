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
import { EEvent } from '../../models/domain';
import { Button, Grid } from '@mui/material';
import { margin } from '@mui/system';

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

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const evnts: EEvent[] = [
    {
      eventId: 0,
    title: "INMUSIC Festival",
    startDate: new Date(2022, 6, 20),
    endDate: new Date(2022, 6, 23),
    location: {
      locationId: 0,
      address: {
        city: "Zagreb",
        zipCode: "10000",
        street: "Otok mladosti",
        houseNumber: "113"
      },
      venue: "Na otoku",
    },
    user: undefined,
    picture: "https://www.inmusicfestival.com/sites/default/files/styles/uc_product/public/inm-fest-ticket-2022-web-bener-640x640pix_2.jpg?itok=KzWfiawC",
    eventType: "festival",
    username: "nmarenk",
    ticketsAvailable: 506,
    },
    {
      eventId: 1,
    title: "Severina",
    startDate: new Date(2022, 6, 14),
    endDate: new Date(2022, 6, 14),
    location: {
      locationId: 1,
      address: {
        city: "Opatija",
        zipCode: "10000",
        street: "Zagrebačka ulica",
        houseNumber: "666"
      },
      venue: "Ljetna pozornica opatija",
    },
    user: undefined,
    picture: "https://content.eventim.com/static/uploaded/at/t/r/n/j/trnj_960_360.webp",
    eventType: "koncert",
    username: "nmarenk",
    ticketsAvailable: 122,
    },
    {
      eventId: 2,
    title: "The Cure",
    startDate: new Date(2022, 10, 27),
    endDate: new Date(2022, 10, 27),
    location: {
      locationId: 2,
      address: {
        city: "Zagreb",
        zipCode: "10000",
        street: "Strossmayerova",
        houseNumber: "43"
      },
      venue: "Arena Zagreb",
    },
    user: undefined,
    picture: "https://content.eventim.com/static/uploaded/at/l/s/m/g/lsmg_960_360.webp",
    eventType: "koncert",
    username: "nmarenk",
    ticketsAvailable: 32,
    },
    {
      eventId: 3,
    title: "Tom Odell",
    startDate: new Date(2022, 6, 20),
    endDate: new Date(2022, 6, 20),
    location: {
      locationId: 3,
      address: {
        city: "Zagreb",
        zipCode: "10000",
        street: "Šubićeva",
        houseNumber: "65"
      },
      venue: "Tvornica kulture",
    },
    user: undefined,
    picture: "https://content.eventim.com/static/uploaded/at/v/i/s/d/visd_960_360.webp",
    eventType: "koncert",
    username: "nmarenk",
    ticketsAvailable: 0,
    },
    {
      eventId: 4,
      title: "PANNONIAN ROCK FESTIVAL",
      startDate: new Date(2022, 10, 15),
      endDate: new Date(2022, 10, 20),
      location: {
        locationId: 4,
        address: {
          city: "Rajevo Selo",
          zipCode: "32257",
          street: "Vladimira Nazora",
          houseNumber: "56"
        },
        venue: "Na otoku",
      },
      user: undefined,
      picture: "https://www.inmusicfestival.com/sites/default/files/styles/uc_product/public/inm-fest-ticket-2022-web-bener-640x640pix_2.jpg?itok=KzWfiawC",
      eventType: "festival",
      username: "nmarenk",
      ticketsAvailable: 202,
    }
  ]

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
            Hello, username
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
              <InboxIcon />
              <Link to="profile" style={{ textDecoration: 'none', color: 'black' }}>
                Profile
                </Link>
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
              <Link to="profiles" style={{ textDecoration: 'none', color: 'black' }}>
              {/* Conditionally render */}
                User profiles
                </Link>
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
              <Link to="profile" style={{ textDecoration: 'none', color: 'black' }}>
                All Events
                </Link>
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
              <Link to="profile" style={{ textDecoration: 'none', color: 'black' }}>
                Statistics
                </Link>
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* Conditionally render - if has no events: you havent created any events */}
        <Typography variant='h3'>
          Here are your events
        </Typography>
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Button variant='contained'>Add new event</Button>
            <Grid container spacing={8} sx={{marginLeft: 10}}>
        {evnts.map((evnt => <EventCard key={evnt.eventId} evnt={evnt} />))}
        </Grid>
          </Box>
      </Main>
      <Routes>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profiles" element={<UserProfilesPage />} />
      </Routes>
    </Box>
  );
}