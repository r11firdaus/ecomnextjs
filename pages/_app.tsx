import '../styles/skeleton.css';
import '../styles/mustard-ui.min.css';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../function/context/store';
import Navigasi from '../components/navigasi';
import Sidebar from '../components/sidebar';
import { useEffect } from 'react';
import Cookie from 'js-cookie';
import { socket } from '../function/socket';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => socket.on('loadDB', () => clear()), [])

  const clear = () => {
    const cleared = Cookie.get('cleared')
    
    if (!cleared) {
      localStorage.removeItem('chats')
      localStorage.removeItem('notification')
      localStorage.removeItem('barang_user_id')
      localStorage.removeItem('barang_user')
      Cookie.set('cleared', JSON.stringify(true))
      setTimeout(() => Cookie.remove('cleared'), 5000);
    }
  }

  return (<>
    <Provider store={store}>
      <Navigasi />
      <div className="row row-reverse" style={{ marginTop: '4.2rem' }}>
        <div className="col col-lg-9">
          <Component {...pageProps} />
        </div>
        <div className="col col-lg-3 display-lg-up">
          <Sidebar />
        </div>
      </div>
    </Provider>
  </>)
}

export default MyApp