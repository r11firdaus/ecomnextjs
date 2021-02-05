import { memo } from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import Cart from '../../components/cart'
import { authPage } from '../../middleware/authrizationPage'
import Router from 'next/router'

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
        <div style = {{height: '3rem', display: 'flex', position: 'fixed', background: 'white', width: '100%', borderBottom: '1px solid grey'}}>
        <ArrowLeft size={20} style={{marginTop: '13px', marginLeft: '10px', cursor: 'pointer'}} onClick={() => Router.back()} />
        <strong style={{marginTop: '11px', marginLeft: '10px'}}>Cart</strong>
        </div>
        <br /><br />
        <Cart id_userMe={props.id_userMe} token={props.token} />
    </>)
}

export default memo(index)