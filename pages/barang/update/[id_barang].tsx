import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import FormBarang from '../../../components/formBarang'
import { getReq } from '../../../function/API'
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
    const [field, setfield] = useState<any>({})
    const [namaSubCat, setnamaSubCat] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type: 'SITE_PAGE', payload: Router.pathname})
        loadData()
    }, [])

    const loadData = async () => {
        if (props.id_barang && props.token) {
            await getReq('barang', props.id_barang, props.token)
            .then(async (res: any) => {
                await res.id_seller == props.id_user ?
                setfield(res) : Router.push('/')
            })
            await getReq('barang/subcategory', '', '').then((res: any[]) => setnamaSubCat(res))
        }
    }

    return (<>
        {field.id_seller && namaSubCat.length > 0 ?
            <FormBarang
                id_user={props.id_user}
                token={props.token}
                field={field}
                subCat={namaSubCat}
            /> : <div className="dots-4" />
        }
    </>)
}

export default memo(index)