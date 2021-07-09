import { GetServerSideProps } from 'next'
import { memo } from 'react'
import FormBarang from '../../../components/formBarang'
import Nav2 from '../../../components/navigasi/nav2'
import { authPage } from '../../../middleware/authrizationPage'
import { MyIdAndToken } from '../../../type'

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { id_barang } = ctx.query
    const { token, id_user } = await authPage(ctx)

    return {
        props: {
            id_barang,
            id_user,
            token
        }
    }
}

interface Props extends MyIdAndToken { id_barang: string | number }

const index = (props: Props): JSX.Element => {
    return (<>
        <div style={{ margin: '-4.5rem 0 0 0' }}>
            <Nav2 title="Update Barang" />
        </div>
        <div style={{ marginTop: '4rem' }}>
            <FormBarang
                id_barang={props.id_barang}
                id_userMe={props.id_user}
                token={props.token}
            />
        </div>
    </>)
}

export default memo(index)