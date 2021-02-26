import Nav2 from '../../components/navigasi/nav2'
import ListBarang from '../../components/listBarang'
import { memo } from 'react';
import cookies from 'next-cookies';

export const getServerSideProps = async ctx => {
    const {nama_subcategory} = ctx.query;
    let id_userIn = null
    let token = null
    const cookie = cookies(ctx)
    if (cookie.id_user && cookie.token) {
        id_userIn = cookie.id_user
        token = cookie.token
    }

    return {
        props: {
            nama_subcategory,
            id_userMe: id_userIn,
            token
        }
    }
}

const index = props => {
    return(<>
        <Nav2 title={props.nama_subcategory} />
        <div style ={{margin: '4rem 0'}}>
            <strong style={{marginLeft: '10px'}}>Result for '{props.nama_subcategory}'</strong>
            <ListBarang nama_subcategory={props.nama_subcategory} id_userMe={props.id_userMe} token={props.token} />
        </div>
    </>)
}

export default memo(index)