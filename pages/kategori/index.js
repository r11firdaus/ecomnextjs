import { memo } from 'react'
import ListCategory from '../../components/listCategory'
import Nav from '../../components/nav'

const index  = props => {
    return (<>
    <Nav />

    <ListCategory />
    </>)
}

export default memo(index)