import '../styles/mustard-ui.min.css';
import { useEffect } from "react";
import {getReq} from '../function/API';
import cookie from 'js-cookie';
import io from "socket.io-client";
const socket = io("http://localhost:3001/");

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const id_user = cookie.get('id_user')
    const token = cookie.get('token')
    
    socket.on('loadDB', async (msg) => {
      console.log(msg);
      if (id_user && token) {
        const {res} = await getReq('chat/unread', id_user, token)
        console.log(res.length)
      }
    });

    socket.on('chat message', (msg, id_chat, receiver_user) => {
      if (receiver_user === id_user) alert(msg)
    })
}, [])

  return (<>
    <Component {...pageProps} />
  </>)
}

export default MyApp