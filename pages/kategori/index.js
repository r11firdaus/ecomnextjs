import { memo } from 'react'
import ListCategory from '../../components/listCategory'
import Nav2 from '../../components/navigasi/nav2'

const index  = props => {
    return (<>
    <Nav2 title="Category" />
    <div style ={{margin: '4rem 0'}}>
        <ListCategory />
    </div>
    </>)
}

export default memo(index)