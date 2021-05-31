import ListBarang from '../../components/listBarang'
import { memo, useEffect, useState } from 'react';
import { getReq } from '../../function/API';
import { useSelector } from 'react-redux';
import Head from 'next/head'
import { useDispatch } from 'react-redux';

export const getServerSideProps = async ctx => {
    const {keyword} = ctx.query;
    const pisah = keyword.split("=")
    const judul = pisah[1].replace(/_/g, " ")

    return {
        props: {keyword, judul}
    }
}

const index = props => {
    const [data, setdata] = useState([])
    const {sort, cod} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(async () => {
        dispatch({type: 'SITE_PAGE', payload: 'pencarian'})
        const {res} = await getReq('search', props.keyword, '', sort)
        setdata(res)
    }, [props.keyword, sort, cod])

    return(<>
        <Head>
            <title>Result for '{props.judul}' | Jwallin</title>
        </Head>
        <div style ={{margin: '4rem 0'}}>
            <strong style={{marginLeft: '10px'}}>Result for '{props.judul}'</strong>
            <ListBarang data={data} />
        </div>
    </>)
}

export default memo(index)

// next
// perbaiki listBarang di page subcategory, api subcategory, dan api barang by id_user