import Saldo from "../components/profil/saldo";
import PromoBanner from "../components/home/promoBanner";
import TilesMenu from "../components/home/tilesMenu";
import { memo } from "react";
import cookies from 'next-cookies'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Sidebar from "../components/sidebar";

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
    dispatch({ type: 'SITE_PAGE', payload: 'home' })
  }, [])

  return (<>
    <div className="row row-reverse" style={{ margin: '4.2rem 0' }}>
      <div className="col col-lg-9">
        <PromoBanner />
        <Saldo id_userMe={props.id_userMe} token={props.token} />
        <TilesMenu />
      </div>
      <div className="col col-lg-3 display-lg-up">
        <Sidebar />
        <div style={{margin: '25% 20px'}}>
          <h6>Jwallin</h6>
          <small>PT. Jwallin Tbk.</small><br />
          <small>Jl. Cipageran no 69</small>
        </div>
      </div>
    </div>
    
  </>)
}

export default memo(Home)