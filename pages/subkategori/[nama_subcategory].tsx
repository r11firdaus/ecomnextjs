import ListBarang from '../../components/listBarang'
import FilterHandler from '../../components/pencarian/filterHandler'
import { memo, useEffect, useState } from 'react';
import { getReq } from '../../function/API';
import { RootStateOrAny, useSelector } from 'react-redux';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { GetServerSideProps } from 'next';
import { MyIdAndToken } from '../../type';
import Router from 'next/router';

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { nama_subcategory } = ctx.query;

    return {
        props: { nama_subcategory }
    }
}

interface Props extends MyIdAndToken { nama_subcategory: string }

const index = (props: Props): JSX.Element => {
    const { sort, cod } = useSelector((state: RootStateOrAny) => state)
    const [data, setdata] = useState<any[]>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type: 'SITE_PAGE', payload: Router.pathname})
        const subCategoryLocal = localStorage.getItem('nama_subcategory');
        const barangSubCategoryLocal = localStorage.getItem('barang_subcategory');
        if (subCategoryLocal == props.nama_subcategory) {
            barangSubCategoryLocal ? setdata(JSON.parse(barangSubCategoryLocal)) : getBarang()
        } else getBarang()
    }, [sort, cod])

    const getBarang = async (): Promise<void> => {
        await getReq('barang/subcategory', props.nama_subcategory.trim(), '', sort).then((res: typeof data) => {
            localStorage.setItem('barang_subcategory', JSON.stringify(res))
            localStorage.setItem('nama_subcategory', props.nama_subcategory.trim())
            setdata(res)
        })
    }

    return (<>
        <Head><title>Category for '{props.nama_subcategory}'</title></Head>
        <strong style={{ marginLeft: '10px' }}>Category for '{props.nama_subcategory}'</strong>
        {data ? 
            data.length > 0 ? <>
                <FilterHandler />
                <ListBarang data={data} />
                </> : <h5 style={{margin: '20px', color: 'gray'}}>Not Found</h5>
            : <div className="dots-4" />
        }
    </>)
}

export default memo(index)