import Nav from "../components/nav";
import BottomNav from "../components/bottomNav";
import Saldo from "../components//profil/saldo";
import PromoBanner from "../components/home/promoBanner";
import TilesMenu from "../components/home/tilesMenu";
import { memo, useEffect } from "react";
import cookies from 'next-cookies'
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { getReq } from "../function/API";
const socket = io("http://localhost:3001/");

export const getServerSideProps = async ctx => {
  // id_user_Req = halaman profil user yg dituju
  // id_userIn = jika pengguna yg telah login mnuju hal profil sendiri

  let id_userIn = null
  let tokenIn = null
  const cookie = cookies(ctx)
  if (cookie.id_user && cookie.token) {
      id_userIn = cookie.id_user
      tokenIn = cookie.token
  }
  return {
      props: {
          id_userMe: id_userIn,
          token: tokenIn
      }
  }
}

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('loadDB', async () => {
      const {res} = await getReq('chat/unread', props.id_userMe, props.token)
        dispatch({ type: 'UNREAD_MESSAGE', payload: res.length })
    })
  }, [])

  return (<>
    <Nav type="home" title="Jwallin" />
    <div style={{margin: '4.2rem 0'}}>
      <PromoBanner />
      <Saldo id_user={props.id_userMe} token={props.token} />
      <TilesMenu />    
    </div>
    <BottomNav hal="home" />
  </>)
}

export default memo(Home)