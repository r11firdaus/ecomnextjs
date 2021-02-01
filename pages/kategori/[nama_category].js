import { memo } from 'react'
import ListCategory from '../../components/listCategory'
import Nav from '../../components/nav'

export const getServerSideProps = async ctx => {
    const {nama_category} = ctx.query;

    return {
        props: {
            nama_category
        }
    }
}

const index  = props => {
    return (<>
    <Nav />

    <ListCategory nama_category={props.nama_category} />
    </>)
}

export default memo(index)