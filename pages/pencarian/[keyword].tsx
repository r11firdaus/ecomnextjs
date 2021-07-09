import ListBarang from '../../components/listBarang'
import FilterHandler from '../../components/pencarian/filterHandler'
import { memo, useEffect, useState } from 'react';
import { getReq } from '../../function/API';
import { RootStateOrAny, useSelector } from 'react-redux';
import Head from 'next/head'
import { GetServerSideProps } from 'next';
import { MyIdAndToken } from '../../type';

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
    const [data, setdata] = useState([])
    const { sort, cod } = useSelector((state: RootStateOrAny) => state)
    const [loaded, setloaded] = useState<boolean>(false)

    const loadData = async () => {
        await getReq('search', props.keyword.trim(), '', sort).then((res: any) => {
            setdata(res)
        })
        return setloaded(true)
    }

    useEffect(() => {
        loadData()
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