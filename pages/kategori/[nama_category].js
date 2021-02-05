import { memo } from 'react'
import ListCategory from '../../components/listCategory'
import Nav from '../../components/nav'
import BottomNav from '../../components/bottomNav';

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
    <div style ={{margin: '4rem 0'}}>
        <ListCategory nama_category={props.nama_category} />
    </div>
    <BottomNav />
    </>)
}

export default memo(index)