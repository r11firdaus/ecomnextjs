import { memo } from 'react'
import FormBarang from '../../components/formBarang'
import Nav2 from '../../components/navigasi/nav2'
import { authPage } from '../../middleware/authrizationPage'
import cookies from 'next-cookies';

export const getServerSideProps = async ctx => {
    const { token } = await authPage(ctx)
    const cookie = cookies(ctx)
    let id_userMe;
    if (cookie.id_user) id_userMe = cookie.id_user

    return {
        props: {
            id_userMe,
            token
        }
    }
}

const index = props => {

    return (<>
        <Nav2 title='Create Barang' />
        <FormBarang
            id_userMe={props.id_userMe}
            token={props.token}
        />
    </>)
}

export default memo(index)