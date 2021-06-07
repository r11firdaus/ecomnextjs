import '../styles/mustard-ui.min.css';
import { Provider } from 'react-redux';
import store from '../function/context/store';
import Navigasi from '../components/navigasi/'
import { useEffect } from 'react';
import { socket } from '../function/socket';
import Cookie from 'js-cookie';

const MyApp = ({ Component, pageProps }) => {

  useEffect(() => {
    const cleared = Cookie.get('cleared')

    socket.on('loadDB', () => {
      if (!cleared) {
        setTimeout(() => {
          Cookie.set('cleared', true)
          localStorage.clear()
          console.log('data cleared')
        }, 1000);
        setTimeout(() => Cookie.remove('cleared'), 5000);
      }
    })
    
    setInterval(() => {
      localStorage.clear()
    }, 300000);
  }, [])

  return (<>
    <Provider store={store}>
      <Navigasi />
      <Component {...pageProps} />
    </Provider>
  </>)
}

export default MyApp