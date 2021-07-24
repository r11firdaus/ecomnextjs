import { memo, useEffect, useState } from 'react';
import { getReq } from '../../function/API';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Head from 'next/head'
import { GetServerSideProps } from 'next';
import { MyIdAndToken } from '../../type';
import Router from 'next/router';
import dynamic from 'next/dynamic';

const ListBarang = dynamic(() => import('../../components/listBarang'), {ssr: false});
const FilterHandler = dynamic(() => import('../../components/pencarian/filterHandler'), {ssr: false});

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { keyword } = ctx.query;
    const pisah = (keyword as string).split("=")
    const judul = pisah[1].replace(/_/g, " ")

    return {
        props: { keyword, judul }
    }
}

interface Props extends MyIdAndToken { 
    keyword: string,
    judul: string
}

const index = (props: Props): JSX.Element => {
    const [data, setdata] = useState<any[]>(null)
    const { sort, cod } = useSelector((state: RootStateOrAny) => state)
    const dispatch = useDispatch()

    const loadData = async () => {
        await getReq('search', props.keyword.trim(), '', sort).then((res: any) => {
            setdata(res)
        })
    }

    useEffect(() => {
        dispatch({type: 'SITE_PAGE', payload: Router.pathname})
        loadData()
    }, [props.keyword, sort, cod])

    return (<>
        <Head>
            <title>Result for '{props.judul.trim()}' | Jwallin</title>
        </Head>
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