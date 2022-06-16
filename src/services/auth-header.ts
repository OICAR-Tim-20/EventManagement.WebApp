import { AxiosRequestHeaders } from "axios";

export default function authHeader(): AxiosRequestHeaders {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }