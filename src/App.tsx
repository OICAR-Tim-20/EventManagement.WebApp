import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import EventDetails from './components/event/EventDetails';

import Auth from './pages/authpage/Auth'
import Home from './pages/home/Home'
import ProfilePage from './pages/profile/ProfilePage';
import UserProfilesPage from './pages/profile/UserProfilesPage';

function App() {
  return (
      <Router>
       <Routes>
          <Route path="*" element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path="/profiles" element={<UserProfilesPage />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </Router>
  );
}

export default App;
