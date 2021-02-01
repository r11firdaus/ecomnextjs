import { memo } from 'react'
import ListPesan from '../../components/pesan'
import Nav from '../../components/nav'

export const getServerSideProps = async ctx => {

    return {
        props: {
            
        }
    }
}

const Pesan  = () => {
    return (<>
    <Nav />

    <ListPesan />
    </>)
}

export default memo(Pesan)