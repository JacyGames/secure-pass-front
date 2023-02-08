import axios from 'axios';
import {USER_TOKEN_KEY} from '../shared/consts';
const API_URL = 'http://localhost:8080/api/Authenticate';

const signup = (RegisterModel) => {
  return axios.post(API_URL + '/register', RegisterModel);
};

const login = (email, password) => {
  return axios
      .post(API_URL + '/login', {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(response.data));
        }

        return response.data;
      });
};

const logout = () => {
  localStorage.removeItem(USER_TOKEN_KEY);
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(USER_TOKEN_KEY));
};

const AuthService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;