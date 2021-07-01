import ListBarang from '../../components/listBarang'
import FilterHandler from '../../components/pencarian/filterHandler'
import { memo, useEffect, useState } from 'react';
import { getReq } from '../../function/API';
import { useSelector } from 'react-redux';
import Head from 'next/head'
import { useDispatch } from 'react-redux';

export const getServerSideProps = async ctx => {
    const { keyword } = ctx.query;
    const pisah = keyword.split("=")
    const judul = pisah[1].replace(/_/g, " ")

    return {
        props: { keyword, judul }
    }
}

const index = props => {
    const [data, setdata] = useState([])
    const { sort, cod } = useSelector(state => state)
    const dispatch = useDispatch()
    const [loaded, setloaded] = useState(false)

    useEffect(async () => {
        dispatch({ type: 'SITE_PAGE', payload: 'pencarian' })
        const { res } = await getReq('search', props.keyword.trim(), '', sort)
        setdata(res)
        setloaded(true)
    }, [props.keyword, sort, cod])

    return (<>
        <Head>
            <title>Result for '{props.judul.trim()}' | Jwallin</title>
        </Head>
        {loaded ?
            <>
                <strong style={{ marginLeft: '10px' }}>Result for '{props.judul.trim()}'</strong>
                <FilterHandler />
                <ListBarang data={data} />
            </> :
            <div className="dots-4" />
        }
    </>)
}

export default memo(index)