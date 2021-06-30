import { memo } from 'react'
import ListCategory from '../../components/listCategory'
import Breadcumbs from '../../components/breadcumbs';

export const getServerSideProps = async ctx => {
    const { nama_category } = ctx.query;

    return {
        props: {nama_category}
    }
}

const index = props => {
    return (<>
        <div style={{ margin: '4rem 0'}}>
            <Breadcumbs />
            <ListCategory nama_category={props.nama_category} />
        </div>
    </>)
}

export default memo(index)