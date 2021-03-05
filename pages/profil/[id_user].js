import { memo, useEffect, useState } from 'react'
import DetailProfile from '../../components/profil/detailProfile'
import Nav from '../../components/navigasi/nav'
import ListBarang from '../../components/listBarang'
import Saldo from '../../components/profil/saldo'
import cookies from 'next-cookies';
import Link from 'next/link'
import BottomNav from '../../components/navigasi/bottomNav';
import { getReq } from '../../function/API'
import { useSelector } from 'react-redux'

export const getServerSideProps = async ctx => {
    let usernameMe = null
    let id_userMe = null
    let tokenIn = null
    const cookie = cookies(ctx)
    const { id_user } = ctx.query;
    // const { username } = ctx.query;
    // if (cookie.username === username && cookie.token) {
    //     usernameMe = cookie.username
    //     tokenIn = cookie.token
    // }
    if (cookie.id_user === id_user && cookie.token) {
        id_userMe = cookie.id_user
        tokenIn = cookie.token
    }
    return {
        props: {
            usernameMe,
            token: tokenIn,
            // usernameReq: username,
            id_userMe,
            id_userReq: id_user
        }
    }
}

const index = props => {
    const [data, setdata] = useState([])
    const {sort, cod} = useSelector(state => state)
    useEffect(async () => {
        const { res } = await getReq('barang/user', props.id_userReq, props.token, sort)
        setdata(res)
    }, [sort, cod])
    return (<>
        <Nav title="Profile" />
        <div style ={{margin: '4rem 0'}}>
            <Saldo id_userMe={props.id_userMe} token={props.token} />
            <DetailProfile id_userReq={props.id_userReq} token={props.token} id_userMe={props.id_userMe} />
            {
                props.id_userMe !== null &&
                <div style={{ paddingLeft: '10px' }}>
                    <Link href="/barang/create">+ Tambah Barang</Link>
                </div>
            }
            <ListBarang data={data} />
        </div>
        <BottomNav hal="profil" />
    </>)
}

export default memo(index)