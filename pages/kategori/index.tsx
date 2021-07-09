import { memo } from 'react'
import Breadcumbs from '../../components/breadcumbs';
import ListCategory from '../../components/listCategory'

const index = (): JSX.Element => {
    return (<>
        <div style={{ marginTop: '-1.5rem' }}>
            <Breadcumbs />
            <ListCategory />
        </div>
    </>)
}

export default memo(index)