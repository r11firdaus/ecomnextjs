import '../styles/mustard-ui.min.css'
import { useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001/");

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    socket.on('loadDB', (msg) => {
      console.log(msg);
    });

    socket.on('chat message', async (msg) => {
      console.log(msg)
    })
}, [])

  return (<>
    <Component {...pageProps} />
  </>)
}

export default MyApp