const initialState = {
  unreadMessage: 0,
  notification: 5
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UNREAD_MESSAGE':
      return {
        ...state,
        unreadMessage: action.payload
      }
    case 'UNREAD_NOTIFICATION':
      return {
        ...state,
        notification: action.payload
      }
    default:
      return state
  }
}

export default reducer