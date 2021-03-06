import { memo, useEffect } from 'react'
import EditUser from '../../../components/profil/editUser'
import cookies from 'next-cookies'
import { authPage } from "../../../middleware/authrizationPage";
import { GetServerSideProps } from 'next';
import { MyIdAndToken } from '../../../type';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

export const getServerSideProps: GetServerSideProps = async ctx => {
    const {token} = await authPage(ctx)
    const cookie = cookies(ctx)
    let id_user: string|number|undefined
    if(cookie.id_user) id_user = cookie.id_user

    return {
        props : {
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
    return (
        <div style={{margin: '0 10px'}}>
            <EditUser id_user={props.id_user} token={props.token} />
        </div>
    )
}

export default memo(index)