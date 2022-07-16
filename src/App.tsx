import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import UserAdministration from './components/auth/UserAdministration';
import EventCalendar from './components/event/EventDate';
import EventDetails from './components/event/EventDetails';
import NewEventDetails from './components/event/NewEventDetails';


import Auth from './pages/authpage/Auth'
import EventCalendarPage from './pages/events/EventCalendarPage';
import Home from './pages/home/Home'
import ProfilePage from './pages/profile/ProfilePage';
import UserProfilesPage from './pages/profile/UserProfilesPage';
import StatisticsPage from './pages/statistics/StatisticsPage';

function App() {
  return (
      <Router>
       <Routes>
          <Route path="*" element={ <Home/>} />
          <Route path='/auth' element={<Auth/>} />
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path="/profiles" element={<UserProfilesPage />} />
          <Route path="/profiles/:id" element={<UserAdministration />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/new" element={<NewEventDetails />} />
          <Route path="/calendar" element={<EventCalendarPage />} />
          <Route path='/statistics' element={<StatisticsPage />} />
       </Routes>
      </Router>
  );
}

export default App;
