import Nav from "../components/navigasi/nav";
import BottomNav from "../components/navigasi/bottomNav";
import Saldo from "../components/profil/saldo";
import PromoBanner from "../components/home/promoBanner";
import TilesMenu from "../components/home/tilesMenu";
import { memo } from "react";
import cookies from 'next-cookies'

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