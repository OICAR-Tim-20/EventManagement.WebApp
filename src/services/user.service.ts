import axios from 'axios';
import { User } from '../models/domain';

class UserService {

  updateProfile(user: User) {
    return axios.put(`/api/User/${user.userId}`, user, 
    {withCredentials: true})
  }

  getAllUsers() {
    return axios.get('/api/User/', {withCredentials: true})
  }
}

export default new UserService();