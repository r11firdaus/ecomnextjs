import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cart from '../../components/cart'
import { authPage } from '../../middleware/authrizationPage'
import { MyIdAndToken } from '../../type'

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { token, id_user } = await authPage(ctx)

    return {
        props: {
            id_user,
            token
        }
    }
}

const index = (props: MyIdAndToken): JSX.Element => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type: 'SITE_PAGE', payload: Router.pathname})
    }, [])

    return (<>
        <Cart id_user={props.id_user} token={props.token} />
    </>)
}

export default memo(index)