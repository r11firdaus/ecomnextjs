import { memo } from 'react'
import EditUser from '../../../components/profil/editUser'
import cookies from 'next-cookies'
import { authPage } from "../../../middleware/authrizationPage";

export const getServerSideProps = async ctx => {
    const {token} = await authPage(ctx)
    const cookie = cookies(ctx)
    let id_userMe = null
    if(cookie.id_user) id_userMe = cookie.id_user

    return {
        props : {
            id_userMe,
            token
        }
    }
}

const index = (props) => {
    return (
        <div style={{margin: '4rem 10px'}}>
            <EditUser id_userMe={props.id_userMe} token={props.token} />
        </div>
    )
}

export default memo(index)