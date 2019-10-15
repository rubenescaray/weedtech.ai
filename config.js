import axios from 'axios'
export const WEEDTECH_URL = "http://54.89.157.88:3000";

export let token = '';

if (typeof localStorage !== 'undefined') { 
  token = localStorage.getItem('token');
}

export const loadToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (token === null) {
      console.log('No token')
      return null;
    }
    return token;
  } catch (error) {
    return null;
  }
}

export const selectStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? 'rgba(68, 132, 115, 0.5)' : null,
      color: 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
};

export const options = [
  { value: 'chocolate', label: 'Indica' },
  { value: 'strawberry', label: 'Sativa' },
  { value: 'vanilla', label: 'Kush' }
]

export const numberOptions = [
  { value: 1, label: '1' },
  { value: 0, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' }
]

export const selectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: 'rgba(68, 132, 115, 0.5)',
  }
})

export const saveToken = (token) => {
  try {
    localStorage.setItem('token', token)
  } catch (error) {
    return null;
  }
}

export const isLoggedIn = token ? token : null;

const proxyurl = "https://cors-anywhere.herokuapp.com/";

const httpClient = axios.create({
  baseURL: proxyurl + WEEDTECH_URL,
  // headers: { Authorization: `Bearer ${token}` }
})
export default httpClient;