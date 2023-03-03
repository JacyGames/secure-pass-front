import axios from 'axios';
import {USER_TOKEN_KEY} from '../shared/consts';
const API_URL = 'http://localhost:8080/api/Authenticate';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signup = (registerModel) => {
  return axios.post(API_URL + '/register', registerModel);
};

const login = (email, password, navigate, setLoading) => {
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
        if (error.response && error.response.status === 401 ||
          error.response.status === 400) {
          setLoading(false);
          logout();
          navigate(`/login`, {replace: true});
          if (error.response.status === 401) {
            toast.error('wrong login or password', {
              autoClose: 3000});
          } else if (error.response.status === 400) {
            toast.error('Email is not valid', {
              autoClose: 3000});
          }
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
