import Router from 'next/router';
import httpClient from '../../config'
import axios from 'axios';
import { REGISTER, AUTHENTICATE, DEAUTHENTICATE } from '../types';
import { setCookie, removeCookie } from '../../utils/cookie';

export const authenticate = (token) => {
  localStorage.setItem('token', token);
  return {
    type: AUTHENTICATE,
    payload: token,
  }
}

export const deauthenticate = () => {
  Router.push('/')
  
  return {
    type: DEAUTHENTICATE,
  }
}

// register user
export const register = ({ firstname, lastname, mobile_no, email_id, password, confirm_password }, type) => {
  if (type !== 'register') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    axios.post(`${API}/${type}`, {firstname, lastname, mobile_no, email_id, password, confirm_password })
      .then((response) => {
        Router.push('/signin');
        console.log(response.data.meta.message);
      })
      .catch((err) => {
        switch (error.response.status) {
          case 422:
          alert(error.response.data.meta.message);
            break;
          case 401:
          alert(error.response.data.meta.message);
            break;
          case 500:
          alert('Interval server error! Try again!');
            break;
          default:
          alert(error.response.data.meta.message);
            break;
        }
      });
  };
};