import { memo } from 'react'
import Bubble from '../../components/pesan'
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

    <Bubble />
    </>)
}

export default memo(Pesan)