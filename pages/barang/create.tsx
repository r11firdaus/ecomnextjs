import { memo } from 'react'
import FormBarang from '../../components/formBarang'
import Nav2 from '../../components/navigasi/nav2'
import { authPage } from '../../middleware/authrizationPage'
import cookies from 'next-cookies';
import { GetServerSideProps } from 'next';
import { MyIdAndToken } from '../../type';

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { token } = await authPage(ctx)
    const cookie = cookies(ctx)
    let id_user: string|number = null;
    if (cookie.id_user) id_user = cookie.id_user

    return {
        props: {
            id_user,
            token: token && token
        }
    }
}

const index = (props: MyIdAndToken): JSX.Element => {
    return (<>
        <Nav2 title='Create Barang' />
        <FormBarang
            id_user={props.id_user}
            token={props.token}
        />
    </>)
}

export default memo(index)