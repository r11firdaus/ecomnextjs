const initialState = {
  unreadMessage: 0,
  notification: 0,
  id_user: null,
  sort: '',
  cod: false
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
    case 'CHANGE_SORT':
      return {
        ...state,
        sort: action.payload
      }
    case 'CHANGE_COD':
      return {
        ...state,
        sort: action.payload
      }
    default:
      return state
  }
}

export default reducer