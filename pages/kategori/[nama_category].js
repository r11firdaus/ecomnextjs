import { memo } from 'react'
import ListCategory from '../../components/listCategory'
import Nav2 from '../../components/navigasi/nav2'

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
    <Nav2 title={props.nama_category} />
    <div style ={{marginTop: '4rem'}}>
        <ListCategory nama_category={props.nama_category} />
    </div>
    </>)
}

export default memo(index)