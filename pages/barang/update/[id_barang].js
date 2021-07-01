import { memo } from 'react'
import FormBarang from '../../../components/formBarang'
import Nav2 from '../../../components/navigasi/nav2'
import { authPage } from '../../../middleware/authrizationPage'

export const getServerSideProps = async ctx => {
    const { id_barang } = ctx.query
    const { token, id_user } = await authPage(ctx)

    return {
        props: {
            id_barang,
            id_userMe: id_user,
            token
        }
    }
}

const index = props => {

    return (<>
        <Nav2 title="Update Barang" />
        <FormBarang
            id_barang={props.id_barang}
            id_userMe={props.id_userMe}
            token={props.token}
        />
    </>)
}

export default memo(index)