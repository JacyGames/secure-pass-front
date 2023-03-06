import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../services/authService';

const handleLoginError = (errorStatus, navigate) => {
  AuthService.logout();
  navigate ? navigate(`/login`, {replace: true}) : null;

  switch (errorStatus) {
    case 401:
      toast.error('wrong login or password', {
        autoClose: 3000,
      });
      break;
    case 400:
      toast.error('Email is not valid', {
        autoClose: 3000,
      });
      break;
    case 403:
      toast.error('Access denied', {
        autoClose: 3000,
      });
      break;
    case 404:
      toast.error('Resource not found', {
        autoClose: 3000,
      });
      break;
    case 500:
      toast.error('Server error', {
        autoClose: 3000,
      });
      break;
    default:
      toast.error('Unknown error', {
        autoClose: 3000,
      });
      break;
  }
};

export default handleLoginError;
