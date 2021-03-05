import '../styles/mustard-ui.min.css';
import { useEffect } from "react";
import { getReq } from '../function/API';
import cookie from 'js-cookie';
import io from "socket.io-client";
import Link from 'next/link';
import { Provider } from 'react-redux';
import store from '../function/context/store';
const socket = io("https://jwallin.herokuapp.com/");

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const id_user = cookie.get('id_user')
    
    if (Notification.permission !== "granted") Notification.requestPermission();
    
    socket.on('chat message', async (msg, id_chat, receiver_user, sender) => {
      if (receiver_user == id_user) {
        const { res } = await getReq('user', sender, '')

        if (!Notification) console.log('Browser tidak mendukung notifikasi')
        if (Notification.permission !== "granted") Notification.requestPermission();
        else {
          let notifikasi = new Notification(res.nama_user, {
            icon: 'https://webstockreview.net/images/contact-icon-png-6.png',
            body: msg,
          });
          notifikasi.onclick = () => {
            <Link href={`/pesan/${id_chat}`} />
          };
          setTimeout(() => {
            notifikasi.close();
          }, 5000);
        }
      }
    })
  }, [])

  return (<>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>)
}

export default MyApp