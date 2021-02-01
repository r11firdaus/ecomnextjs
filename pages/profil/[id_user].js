import { memo } from 'react'
import DetailProfile from '../../components/profil/detailProfile'
import Nav from '../../components/nav'
import ListBarang from '../../components/listBarang'
import Saldo from '../../components/profil/saldo'
import cookies from 'next-cookies';

export const getServerSideProps = async ctx => {
    // id_user_Req = halaman profil user yg dituju
    // id_userIn = jika pengguna yg telah login mnuju hal profil sendiri

    let id_userIn = null
    let tokenIn = null
    const cookie = cookies(ctx)
    const {id_user} = ctx.query;
    if (cookie.id_user === id_user && cookie.token) {
        id_userIn = cookie.id_user
        tokenIn = cookie.token
    }
    return {
        props: {
            id_userMe: id_userIn,
            id_user_Req: id_user,
            token: tokenIn
        }
    }
}

const index = props => {
    return (<>
    <Nav title="Profile" id_user={props.id_userMe} />
    <Saldo id_user={props.id_userMe} token={props.token} />
    <DetailProfile id_user={props.id_user_Req} token={props.token} id_userMe={props.id_userMe} />
    <ListBarang id_user={props.id_user_Req} token={props.token} id_userMe={props.id_userMe} />
    </>)
}

export default memo(index)