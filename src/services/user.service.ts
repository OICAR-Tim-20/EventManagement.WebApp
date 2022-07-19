import axios from 'axios';
import { User } from '../models/domain';

class UserService {

  updateProfile(user: User) {
    return axios.put(`https://oicartim04app.azurewebsites.net/Api/User/${user.userId}`, user)
  }

  getAllUsers() {
    return axios.get('https://oicartim04app.azurewebsites.net/Api/User/')
  }

  getUserById = (id: number) => {
    return axios.get(`https://oicartim04app.azurewebsites.net/Api/User/${id}`)
  }

  deleteUser = (id: number) => {
    return axios.delete(`https://oicartim04app.azurewebsites.net/Api/User/${id}`)
  }
}

export default new UserService();