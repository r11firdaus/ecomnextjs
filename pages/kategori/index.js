import { useEffect, memo } from 'react'
import { useDispatch } from 'react-redux'
import Breadcumbs from '../../components/breadcumbs';
import ListCategory from '../../components/listCategory'

const index = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'SITE_PAGE', payload: 'kategori' })
    }, [])

    return (<>
        <div style={{ marginTop: '-1.5rem' }}>
            <Breadcumbs />
            <ListCategory />
        </div>
    </>)
}

export default memo(index)