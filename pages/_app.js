import '../styles/mustard-ui.min.css';
import { Provider } from 'react-redux';
import store from '../function/context/store';
import Navigasi from '../components/navigasi/'
import { useEffect } from 'react';
import { socket } from '../function/socket';
import Cookie from 'js-cookie';

const MyApp = ({ Component, pageProps }) => {

  useEffect(() => {
    // clear()
    // socket.on('loadDB', () => clear())

    // setInterval(() => {
    //   localStorage.clear()
    // }, 300000);
  }, [])

  const clear = () => {
    const cleared = Cookie.get('cleared')

    if (!cleared) {
      localStorage.clear()
      Cookie.set('cleared', true)
      setTimeout(() => Cookie.remove('cleared'), 5000);
    }
  }

  return (<>
    <Provider store={store}>
      <Navigasi />
      <Component {...pageProps} />
    </Provider>
  </>)
}

export default MyApp