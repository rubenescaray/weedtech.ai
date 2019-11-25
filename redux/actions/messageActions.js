import { ADD_MESSAGE, REMOVE_MESSAGE } from '../types'

export const shootMessage = (dispatch, message, style, time) => {
    dispatch(addMessage(message, style))

    setTimeout(() => {
      dispatch(removeMessage())
    }, time)
}

export const addMessage = (message, style) => {
  return {
    type: ADD_MESSAGE,
    style: style,
    message: message,
  }
}

export const removeMessage = () => {
  return {
    type: REMOVE_MESSAGE,
  }
}