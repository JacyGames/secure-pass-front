import axios from 'axios';
import {BASE_URL} from './consts';
import authHeader from '../services/authHeader';
import AuthService from '../services/authService';

export async function fetchPassInfos(page, navigate,
    setCurrentUser, setLoading) {
  const date = new Date().getTime();
  const tokenData = Date.parse(AuthService.getCurrentUser().expiration);
  try {
    const response = await axios.get(`${BASE_URL}?page=${page}`,
        {headers: authHeader()});
    return response;
  } catch (error) {
    if (tokenData < date) {
      AuthService.logout();
      setCurrentUser(false);
      navigate(`/login`, {replace: true});
      setLoading(false);
    } else {
      throw error;
    }
  }
};


export const postPassInfos = (form) => {
  try {
    return axios.post(BASE_URL, form, {headers: authHeader()});
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error');
  }
};

export const putPassInfos = async (user) => {
  try {
    return await axios.put(`${BASE_URL}/${id}`, user, {headers: authHeader()});
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error');
  }
};

export const loadUser = async (id) => {
  try {
    return axios.get(`${BASE_URL}/${id}`, {headers: authHeader()});
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error');
  }
};

export const deletePassInfos = (id) => {
  try {
    return axios.delete(`${BASE_URL}/${id}`, {headers: authHeader()});
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error');
  }
};
