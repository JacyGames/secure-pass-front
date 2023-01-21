import axios from 'axios';
import {BASE_URL} from './consts';

export async function fetchPassInfos(page) {
  try {
    return axios.get(`${BASE_URL}?page=${page}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error');
  }
};

export const postPassInfos = (form) => {
  try {
    return axios.post(BASE_URL, form);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error');
  }
};
