const initialState = {
  unreadMessage: 0,
  notification: 0,
  id_user: null,
  sort: 'relevance',
  cod: false,
  loading: false,
  cart: 0,
  modalFilter: false,
  dbConnection: false
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
    case 'CHANGE_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'CART':
      return {
        ...state,
        cart: action.payload
      }
    case 'MODAL_FILTER':
      return {
        ...state,
        modalFilter: action.payload
      }
    case 'DB_CONNECTION':
      return {
        ...state,
        dbConnection: action.payload
      }
    default:
      return state
  }
}

export default reducer