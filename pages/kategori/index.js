import { useEffect } from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import ListCategory from '../../components/listCategory'

const index  = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'SITE_PAGE', payload: 'kategori'})    
    }, [])
    
    return (<>
    <div style ={{margin: '4rem 0'}}>
        <ListCategory />
    </div>
    </>)
}

export default memo(index)