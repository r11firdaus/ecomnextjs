import { memo } from 'react'
import ListBarang from '../../components/listBarang'
import Nav from '../../components/nav'
import cookies from 'next-cookies';

export const getServerSideProps = async ctx => {
    let id_userIn = null
    const cookie = cookies(ctx)
    if (cookie.id_user) id_userIn = cookie.id_user

    return {
        props: {
            id_userMe: id_userIn
        }
    }
}

const Barang  = props => {
    return (<>
    <Nav />

    <ListBarang id_userMe={props.id_userMe} />
    </>)
}

export default memo(Barang)