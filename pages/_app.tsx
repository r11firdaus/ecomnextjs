import '../styles/skeleton.css';
import '../styles/mustard-ui.min.css';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../function/context/store';
import Navigasi from '../components/navigasi';
import Sidebar from '../components/sidebar';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import Router from 'next/router'
import { socket } from '../function/socket';

const MyApp = ({ Component, pageProps }) => {
  const [page, setpage] = useState<string>('')
  
  useEffect(() => {
    clear()
    socket.on('loadDB', () => clear())
  }, [])
  
  useEffect(() => {
    const halaman = Router.pathname;
    setpage(halaman)
  }, [Component])

  const clear = () => {
    const cleared = Cookie.get('cleared')
    
    if (!cleared) {
      localStorage.clear()
      Cookie.set('cleared', JSON.stringify(true))
      console.log(`cleared is ${cleared}`);
      setTimeout(() => {
        Cookie.remove('cleared')
        console.log(cleared)
      }, 5000);
    }
  }

  return (<>
    <Provider store={store}>
      <Navigasi page= {page} />
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