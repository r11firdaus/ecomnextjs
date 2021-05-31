import ListBarang from '../../components/listBarang'
import { memo, useEffect, useState } from 'react';
import cookies from 'next-cookies';
import { getReq } from '../../function/API';
import { useSelector } from 'react-redux';
import Head from 'next/head';

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
        const subCategoryLocal = localStorage.getItem('nama_subcategory');
        const barangSubCategoryLocal = localStorage.getItem('barang_subcategory');
        subCategoryLocal == props.nama_subcategory && barangSubCategoryLocal ? setdata(JSON.parse(barangSubCategoryLocal)) : getBarang()
    }, [sort, cod])

    const getBarang = async () => {
        const { res } = await getReq('barang/subcategory', props.nama_subcategory, props.token, sort)
        localStorage.setItem('barang_subcategory', JSON.stringify(res))
        localStorage.setItem('nama_subcategory', props.nama_subcategory)
        setdata(res)
    }

    return(<>
        <Head><title>Category for '{props.nama_subcategory}'</title></Head>
        <div style ={{margin: '4rem 0'}}>
            <strong style={{marginLeft: '10px'}}>Category for '{props.nama_subcategory}'</strong>
            <ListBarang data={data} />
        </div>
    </>)
}

export default memo(index)