import { memo } from 'react'
import Cart from '../../components/cart'
import Nav from '../../components/nav'
import { authPage } from '../../middleware/authrizationPage'

export const getServerSideProps = async ctx => {
    const { token, id_user } = await authPage(ctx)

    return {
        props: {
            id_userMe: id_user,
            token
        }
    }
}

const index = props => {
    return (<>
        <Nav />
        <Cart />
        <Cart />
    </>)
}

export default memo(index)