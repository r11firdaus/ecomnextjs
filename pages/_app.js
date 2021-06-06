import '../styles/mustard-ui.min.css';
import { Provider } from 'react-redux';
import store from '../function/context/store';
import Navigasi from '../components/navigasi/'
import { useEffect } from 'react';
import { socket } from '../function/socket';
import Cookie from 'js-cookie';
import { socketOnConnect } from '../function/socketAction';

const MyApp = ({ Component, pageProps }) => {

  useEffect(() => {
    const getId = Cookie.get('user_id')
    const token = Cookie.get('token')

    socket.on('loadDB', () => socketOnConnect(getId, token))
    
    setInterval(() => {
      socketOnConnect(getId, token)
    }, 120000);
  }, [])

  return (<>
    <Provider store={store}>
      <Navigasi />
      <Component {...pageProps} />
    </Provider>
  </>)
}

export default MyApp