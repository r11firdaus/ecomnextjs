import ListBarang from '../../components/listBarang'
import FilterHandler from '../../components/pencarian/filterHandler'
import { memo, useEffect, useState } from 'react';
import cookies from 'next-cookies';
import { getReq } from '../../function/API';
import { RootStateOrAny, useSelector } from 'react-redux';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { GetServerSideProps } from 'next';
import { MyIdAndToken } from '../../type';

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { nama_subcategory } = ctx.query;
    let id_user: string|number = null;
    let token: string = null;
    const cookie = cookies(ctx)
    if (cookie.id_user && cookie.token) {
        id_user = cookie.id_user
        token = cookie.token
    }

    return {
        props: {
            nama_subcategory,
            id_user,
            token
        }
    }
}

interface Props extends MyIdAndToken { nama_subcategory: string }

const index = (props: Props): JSX.Element => {
    const { sort, cod } = useSelector((state: RootStateOrAny) => state)
    const [data, setdata] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const subCategoryLocal = localStorage.getItem('nama_subcategory');
        const barangSubCategoryLocal = localStorage.getItem('barang_subcategory');
        dispatch({ type: 'SITE_PAGE', payload: 'subkategori' })
        if (subCategoryLocal == props.nama_subcategory) {
            barangSubCategoryLocal ? setdata(JSON.parse(barangSubCategoryLocal)) : getBarang()
        } else getBarang()
    }, [sort, cod])

    const getBarang = async (): Promise<void> => {
        await getReq('barang/subcategory', props.nama_subcategory, props.token, sort).then((res: typeof data) => {
            localStorage.setItem('barang_subcategory', JSON.stringify(res))
            localStorage.setItem('nama_subcategory', props.nama_subcategory)
            setdata(res)
        })
    }

    return (<>
        <Head><title>Category for '{props.nama_subcategory}'</title></Head>
        <strong style={{ marginLeft: '10px' }}>Category for '{props.nama_subcategory}'</strong>
        <FilterHandler />
        <ListBarang data={data} />
    </>)
}

export default memo(index)