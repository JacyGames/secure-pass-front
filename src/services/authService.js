import axios from 'axios';
import {USER_TOKEN_KEY, ORIGIN} from '../shared/consts';
const API_URL = `${ORIGIN}/Authenticate`;
import handleLoginError from '../Components/HandleLoginError';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signup = (registerModel, setLoading) => {
  return axios.post(API_URL + '/register', registerModel)
      .then(
          (response) => {
            if (response.status === 200) {
              toast.success('Registration was successful', {
                autoClose: 3000,
              });
            }
            return response.data;
          },
      )
      .catch((error) => {
        setLoading(false);
        handleLoginError(error.response.status);
        throw error;
      });
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
        setLoading(false);
        handleLoginError(error.response.status, navigate);
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
