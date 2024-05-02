import axios from "axios";
const baseURL = process.env.apiUrl;
export default class AuthAPI {
  static login(data) {
    return axios.post(`${baseURL}/api/v1/login`, data);
  }

  static register(data) {
    return axios.post(`${baseURL}/api/v1/register`, data);
  }

  static reset(data) {
    return axios.post(`${baseURL}/api/v1/forgot`, data);
  }

  static logout(data) {
    return axios.get(`${baseURL}/api/v1/logout`, {
      headers: { Authorization: data },
    });
  }

  static resetPwd(data) {
    return axios.post(`${baseURL}/api/v1/password/reset`, data);
  }

  static invite(data) {
    return axios.post(`${baseURL}/api/v1/invited`, data);
  }
}
