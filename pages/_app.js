import '../styles/mustard-ui.min.css';
import { Provider } from 'react-redux';
import store from '../function/context/store';
import { useEffect, useState } from 'react';
import loadDB from '../function/loadDB';
import Cookie from 'js-cookie';
import { socket } from '../function/socket';

function MyApp({ Component, pageProps }) {
  const [loadComp, setloadComp] = useState(false)

  useEffect(async () => {
    const getId = Cookie.get("id_user")
    const token = Cookie.get("token")
    
    if (getId !== null | undefined && token) {
      await loadDB(getId, token)
    }

    socket.on('loadDB', async () => {
      if (getId !== null | undefined && token) {
        await loadDB(getId, token)
      }
    })

    setloadComp(true)
  }, [])
  
  

  return (<>
    <Provider store={store}>
      {loadComp ? <Component {...pageProps} /> : <h4>Loading...</h4>}
    </Provider>
  </>)
}

export default MyApp