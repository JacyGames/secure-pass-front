import {BASE_URL} from './consts';

export async function getPasswords(page) {
  try {
    const dataResponse = await fetch(`${BASE_URL}?page=${page}`);
    const data = await dataResponse.json();
    return data;
  } catch (error) {
    alert('Error');
  }
}
