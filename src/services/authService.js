import axios from 'axios';
import {USER_TOKEN_KEY} from '../shared/consts';
const API_URL = 'http://localhost:8080/api/Authenticate';
import handleLoginError from '../Components/HandleLoginError';

const signup = (registerModel) => {
  return axios.post(API_URL + '/register', registerModel);
};

const setLoggedUser = (userData) => {
  localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(userData));
};

const login = (signInCredentials, navigate, setLoading) => {
  return axios
      .post(API_URL + '/login', signInCredentials)
      .then(
          (response) => {
            if (response.data.token) {
              setLoggedUser(response.data);
            }
            return response.data;
          },
      )
      .catch((error) => {
        if (error.response && error.response.status === 401 ||
          error.response.status === 400) {
          setLoading(false);
          handleLoginError(error.response.status, navigate);
        }
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
