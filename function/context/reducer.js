const initialState = {
  unreadMessage: 0,
  notification: 0,
  id_user: null
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
    case 'ID_USER':
      return {
        ...state,
        id_user: action.payload
      }
    default:
      return state
  }
}

export default reducer