import Saldo from "../components/profil/saldo";
import PromoBanner from "../components/home/promoBanner";
import TilesMenu from "../components/home/tilesMenu";
import { memo } from "react";
import cookies from 'next-cookies'
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import dynamic from 'next/dynamic';

const ListBarang = dynamic(() => import("../components/listBarang"))

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
  const [lastView, setlastView] = useState([])

  useEffect(() => {
    dispatch({ type: 'SITE_PAGE', payload: 'home' })
    const getLastView = localStorage.getItem('last_view');
    let jsonLastView = getLastView && JSON.parse(getLastView);
    jsonLastView !== null && setlastView(jsonLastView)
  }, [])

  return (<>
    <PromoBanner />
    <Saldo id_userMe={props.id_userMe} token={props.token} />
    <TilesMenu />
    {lastView.length > 0 &&
      <>
        <strong>Last Viewed</strong>
        <ListBarang data={lastView} />
      </>
    }
  </>)
}

export default memo(Home)