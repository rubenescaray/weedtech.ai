import { ADD_MESSAGE, REMOVE_MESSAGE } from '../types'

const initialState = {
  show: false,
  style: 'default',
  message: 'Default Message',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return Object.assign({}, state, {
        show: true,
        style: action.style,
        message: action.message,
      });
    case REMOVE_MESSAGE:
      return Object.assign({}, state, {
        show: false,
        message: '',
      });
    default:
      return state;
  }
}