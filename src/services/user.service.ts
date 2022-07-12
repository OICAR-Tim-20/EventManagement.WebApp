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

  getUserById = (id: number) => {
    return axios.get(`/api/User/${id}`, {withCredentials: true})
  }

  deleteUser = (id: number) => {
    return axios.delete(`/api/User/${id}`, {withCredentials: true})
  }
}

export default new UserService();