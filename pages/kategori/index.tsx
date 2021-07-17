import Router from 'next/router';
import { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Breadcumbs from '../../components/breadcumbs';
import ListCategory from '../../components/listCategory'

const index = (): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type: 'SITE_PAGE', payload: Router.pathname})
    }, [])
    return (<>
        <div style={{ marginTop: '-1.5rem' }}>
            <Breadcumbs />
            <ListCategory />
        </div>
    </>)
}

export default memo(index)