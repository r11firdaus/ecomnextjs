import '../styles/mustard-ui.min.css';
import '../styles/globals.css'
import { Provider } from 'react-redux';
import store from '../function/context/store';
import Navigasi from '../components/navigasi';
import Sidebar from '../components/sidebar';
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
      <div className="row row-reverse" style={{ marginTop: '4.2rem' }}>
        <div className="col col-lg-9">
          <Component {...pageProps} />
        </div>
        <div className="col col-lg-3 display-lg-up">
          <Sidebar />
          <div style={{ margin: '30px 20px' }}>
            <h6>Jwallin</h6>
            <small>PT. Jwallin Tbk.</small><br />
            <small>Jl. Cipageran no 69</small>
          </div>
        </div>
      </div>
    </Provider>
  </>)
}

export default MyApp