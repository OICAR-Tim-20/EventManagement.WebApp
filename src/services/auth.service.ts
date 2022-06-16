import axios from "axios";
import {User} from '../models/domain'

class AuthService{

register = (username: string, email: string, password: string) => {
  return axios.post("/register", {
    username,
    email,
    password,
  });
};

login = (username: string, password: string) => {
  return axios
    .post("/login", {
      username,
      password,
    }, {withCredentials: true})
    .then((response) => {
      return response.data;
    });
};

logout = () => {
  return axios.get("/logout", {withCredentials: true});
};

getCurrentUser = () => {
  return axios.get("/get_current_user", {withCredentials: true})
};

}

export default new AuthService();
