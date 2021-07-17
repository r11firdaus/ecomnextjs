import { memo, useEffect } from 'react'
import ListCategory from '../../components/listCategory'
import Breadcumbs from '../../components/breadcumbs';
import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

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
        <div style={{ marginTop: '-1.5rem' }}>
            <Breadcumbs />
            <ListCategory nama_category={props.nama_category} />
        </div>
    </>)
}

export default memo(index)