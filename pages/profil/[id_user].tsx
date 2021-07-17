import { memo, useEffect, useState } from 'react'
import DetailProfile from '../../components/profil/detailProfile'
import cookies from 'next-cookies';
import Link from 'next/link'
import { getReq } from '../../function/API'
// import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
import FilterHandler from '../../components/pencarian/filterHandler'
import { GetServerSideProps } from 'next';
import { MyIdAndToken } from '../../type';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
const ListBarang = dynamic(() => import('../../components/listBarang'), {ssr: false})
const Saldo = dynamic(() => import('../../components/profil/saldo'), {ssr: false})

export const getServerSideProps: GetServerSideProps = async ctx => {
    let usernameMe: string = null;
    let id_user: string|number = null;
    let tokenIn: string = null;
    const cookie = cookies(ctx);
    const id_userReq = ctx.query.id_user;
    // const { username } = ctx.query;
    // if (cookie.username === username && cookie.token) {
    //     usernameMe = cookie.username
    //     tokenIn = cookie.token
    // }
    if (cookie.id_user === id_userReq && cookie.token) {
        id_user = cookie.id_user
        tokenIn = cookie.token
    }
    return {
        props: {
            usernameMe,
            token: tokenIn,
            // usernameReq: username,
            id_user,
            id_userReq
        }
    }
}

interface Props extends MyIdAndToken {
    usernameMe: string|undefined,
    id_userReq: string|number
}

const index = (props: Props): JSX.Element => {
    const [data, setdata] = useState([])
    const [loaded, setloaded] = useState<boolean>(false)
    const dispatch = useDispatch()
    // const { sort, cod } = useSelector(state => state)

    useEffect(() => {
        dispatch({type: 'SITE_PAGE', payload: Router.pathname})
        const barangUserLocal = localStorage.getItem('barang_user_id');
        const barangLocal = localStorage.getItem('barang_user');
        barangUserLocal == props.id_userReq && barangLocal ? setdata(JSON.parse(barangLocal)) : getBarang()
        setloaded(true)
    }, [])

    const getBarang = async (): Promise<void> => {
        await getReq('barang/user', props.id_userReq, props.token, '').then((res: any) => {  // nanti diisi variable sort
            localStorage.setItem('barang_user', JSON.stringify(res))
            localStorage.setItem('barang_user_id', props.id_userReq.toString())
            setdata(res)
        })
    }
    
    return (<>
        <div style={{ margin: '-1rem 0 2.5rem 0'}}>
            {loaded ?
                <>
                    <DetailProfile id_userReq={props.id_userReq} token={props.token} id_user={props.id_user} />
                    <Saldo id_user={props.id_user} token={props.token} />
                    {
                        props.id_user !== null &&
                        <div style={{ paddingLeft: '10px' }}>
                            <Link href="/barang/create">+ Tambah Barang</Link>
                        </div>
                    }
                    <FilterHandler />
                    <ListBarang data={data} />
                </> : <div className="dots-4" />
            }
        </div>
    </>)
}

export default memo(index)