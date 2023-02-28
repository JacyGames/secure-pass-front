import axios from 'axios';
import {USER_TOKEN_KEY} from '../shared/consts';
const API_URL = 'http://localhost:8080/api/Authenticate';

const signup = (registerModel) => {
  return axios.post(API_URL + '/register', registerModel);
};

const login = (email, password) => {
  return axios
      .post(API_URL + '/login', {
        email,
        password,
      })
      .then(
          (response) => {
            if (response.data.token) {
              // eslint-disable-next-line max-len
              localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(response.data));
            }
            return response.data;
          },
      )
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          logout();
        }
        // handle other errors here
        console.error('An error occurred:', error);
        throw error;
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
