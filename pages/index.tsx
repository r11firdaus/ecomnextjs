import { useEffect, useState, memo } from "react";
import { GetServerSideProps } from "next";
import cookies from 'next-cookies'
import dynamic from 'next/dynamic';
import { MyIdAndToken, StylesDictionary } from "../type";
import { useDispatch } from "react-redux";
import Router from "next/router";

const PromoBanner = dynamic(() => import("../components/home/promoBanner"), { ssr: false })
const TilesMenu = dynamic(() => import("../components/home/tilesMenu"), { ssr: false })
const ListBarang = dynamic(() => import("../components/listBarang"), { ssr: false })
const Saldo = dynamic(() => import("../components/profil/saldo"), { ssr: false })

export const getServerSideProps: GetServerSideProps = async ctx => {
  let id_user: string | number = null
  let token: string = null
  const cookie = cookies(ctx)
  if (cookie.id_user && cookie.token) {
    id_user = cookie.id_user
    token = cookie.token
  }
  return {
    props: {
      id_user,
      token
    }
  }
}

const dummy = [
  {
    id: 1,
    judul: 'Title 1',
    konten: 'Example Promo Banner'
  },
  {
    id: 2,
    judul: 'Title 2',
    konten: 'Example Promo Banner'
  },
  {
    id: 3,
    judul: 'Title 3',
    konten: 'Example Promo Banner'
  },
  {
    id: 4,
    judul: 'Title 4',
    konten: 'Example Promo Banner'
  },
  {
    id: 5,
    judul: 'Title 5',
    konten: 'Example Promo Banner'
  }
]

const Home = (props: MyIdAndToken): JSX.Element => {
  const [lastView, setlastView] = useState([])
  const [promo, setpromo] = useState<any[]>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: 'SITE_PAGE', payload: Router.pathname})
    const getLastView = localStorage.getItem('last_view');
    let jsonLastView = getLastView && JSON.parse(getLastView);
    jsonLastView !== null && setlastView(jsonLastView)
    setTimeout(() => {
      setpromo(dummy)
    }, 3000);
  }, [])

  return (<>
    <div style={style.container}>
      <PromoBanner data={promo} />
    </div>
    <Saldo id_user={props.id_user} token={props.token} />
    <TilesMenu />
    {lastView.length > 0 &&
      <>
        <strong>Last Viewed</strong>
        <ListBarang data={lastView} />
      </>
    }
    <style jsx>
      {`
        ::-webkit-scrollbar {
            width: 15px;
            height: 3px;
            background:white;
        }
        ::-webkit-scrollbar-track {
            border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb {
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
            background:lightgray;
        } 
      `}
    </style>
  </>)
}

export default memo(Home)

const style: StylesDictionary = {
  container: {
    display: 'flex',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    margin: '10px 0 10px 10px'
  },
}