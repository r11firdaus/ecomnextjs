import Nav from '../../components/navigasi/nav'
import ListBarang from '../../components/listBarang'
import { memo, useEffect, useState } from 'react';
import cookies from 'next-cookies';
import { getReq } from '../../function/API';
import { useSelector } from 'react-redux';

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
    const {sort, cod} = useSelector(state => state)
    const [data, setdata] = useState([])
    
    useEffect(async () => {
        const { res } = await getReq('barang/subcategory', props.nama_subcategory, '', sort)
        setdata(res)
    }, [sort, cod])

    return(<>
        <Nav />
        <div style ={{margin: '4rem 0'}}>
            <strong style={{marginLeft: '10px'}}>Result for '{props.nama_subcategory}'</strong>
            <ListBarang data={data} />
        </div>
    </>)
}

export default memo(index)