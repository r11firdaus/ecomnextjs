import Nav from "../components/nav";
import BottomNav from "../components/bottomNav";
import Saldo from "../components//profil/saldo";
// import PromoBanner from "../components/promoBanner";
// import TilesMenu from "../components/tilesMenu";
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
    <div style={{margin: '4rem 0'}}>
      <Saldo id_user={props.id_userMe} token={props.token} />
      
      {/* <PromoBanner />

      <TilesMenu />     */}

    </div>
    <BottomNav hal="home" />
  </>)
}

export default memo(Home)