import { memo, useEffect } from 'react'
import EditUser from '../../../components/profil/editUser'
import cookies from 'next-cookies'
import { authPage } from "../../../middleware/authrizationPage";
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: "SITE_PAGE", payload: 'Edit'})
    }, [])

    return (
        <div style={{margin: '0 10px'}}>
            <EditUser id_userMe={props.id_userMe} token={props.token} />
        </div>
    )
}

export default memo(index)