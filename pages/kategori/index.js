import { memo } from 'react'
import ListCategory from '../../components/listCategory'
import Nav from '../../components/nav'
import BottomNav from '../../components/bottomNav';

const index  = props => {
    return (<>
    <Nav />
    <div style ={{margin: '4rem 0'}}>
        <ListCategory />
    </div>
    <BottomNav />
    </>)
}

export default memo(index)