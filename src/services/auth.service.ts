import axios from "axios";

class AuthService{

register = (username: string, email: string, password: string) => {
  return axios.post(`https://oicartim04app.azurewebsites.net/register`, {
    username,
    email,
    password,
  });
};

login = (username: string, password: string) => {
  return axios
    .post(`https://oicartim04app.azurewebsites.net/login`, {
      username,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

logout = () => {
  return axios.get(`https://oicartim04app.azurewebsites.net/logout`);
};

// getCurrentUser = () => {
//   return axios.get(`https://oicartim04app.azurewebsites.net/get_current_user`)
// };

}

export default new AuthService();
