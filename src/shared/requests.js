import axios from 'axios';
import {BASE_URL} from './consts';
import authHeader from '../services/authHeader';
/* import {useNavigate} from 'react-router-dom';
*/

export async function fetchPassInfos(page) {
/*  const navigate = useNavigate();
*/ try {
    (error) => {
      if (error.response && error.response.status === 401) {
        AuthService.logout();
        navigate(`../login`, {replace: true});
      };
      // eslint-disable-next-line no-console
      console.log(error);
    };
    return axios.get(`${BASE_URL}?page=${page}`, {headers: authHeader()});
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
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
