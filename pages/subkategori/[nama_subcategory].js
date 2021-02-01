import Nav from '../../components/nav'
import ListBarang from '../../components/listBarang'
import { memo } from 'react';
import cookies from 'next-cookies';

export const getServerSideProps = async ctx => {
    const {nama_subcategory} = ctx.query;
    let id_userIn = null
    const cookie = cookies(ctx)
    if (cookie.id_user) id_userIn = cookie.id_user

    return {
        props: {
            nama_subcategory,
            id_userMe: id_userIn
        }
    }
}

const index = props => {
    return(<>
        <Nav />
        <ListBarang nama_subcategory={props.nama_subcategory} id_userMe={props.id_userMe} />
    </>)
}

export default memo(index)