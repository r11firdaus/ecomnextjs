import { memo, useEffect, useState } from 'react'
import FormBarang from '../../components/formBarang'
import { authPage } from '../../middleware/authrizationPage'
import cookies from 'next-cookies';
import { GetServerSideProps } from 'next';
import { MyIdAndToken } from '../../type';
import { getReq } from '../../function/API';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

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
    const [namaSubCat, setnamaSubCat] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type: 'SITE_PAGE', payload: Router.pathname})
        loadData()
    }, [])

    const loadData = async () => {
        if (props.id_user && props.token) {
            await getReq('barang/subcategory', '', '').then((res: any[]) => setnamaSubCat(res))
        }
    }

    return (<>
        {namaSubCat.length > 0 ? 
            <FormBarang
                id_user={props.id_user}
                token={props.token}
                subCat={namaSubCat}
            /> : <div className="dots-4" />
        }
    </>)
}

export default memo(index)