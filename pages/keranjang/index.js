import { useEffect } from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import Cart from '../../components/cart'
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
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type: 'SITE_PAGE', payload: 'cart'})
    }, [])
    return (<>
        <br /><br />
        <Cart id_userMe={props.id_userMe} token={props.token} />
    </>)
}

export default memo(index)