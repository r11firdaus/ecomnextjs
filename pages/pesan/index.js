import { memo } from 'react'
import ListPesan from '../../components/pesan'
import Nav from '../../components/nav'
import BottomNav from '../../components/bottomNav';

export const getServerSideProps = async ctx => {

    return {
        props: {
            
        }
    }
}

const Pesan  = () => {
    return (<>
    <Nav />
    <div style ={{margin: '4rem 0'}}>
        <ListPesan />
    </div>
    <BottomNav hal="pesan" />
    </>)
}

export default memo(Pesan)