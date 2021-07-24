import { memo, useEffect } from 'react'
import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const ListCategory = dynamic(() => import('../../components/listCategory'), {ssr: false});
const Breadcumbs = dynamic(() => import('../../components/breadcumbs'), {ssr: false});

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { nama_category } = ctx.query;

    return {
        props: { nama_category }
    }
}

const index = (props: {nama_category: string}): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type: 'SITE_PAGE', payload: Router.pathname})
    }, [])
    return (<>
        <Head>
            <title>Find {props.nama_category} | Jwallin</title>
            <meta name="Keywords" content={props.nama_category} />
        </Head>
        <div style={{ marginTop: '-1.5rem' }}>
            <Breadcumbs />
            <ListCategory nama_category={props.nama_category} />
        </div>
    </>)
}

export default memo(index)