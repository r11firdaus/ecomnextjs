import { memo, useEffect, useState } from "react"
import Cookie from 'js-cookie'
import Router from "next/router"
import { getReq } from "../../function/API"
import { useDispatch } from "react-redux"
import Link from "next/link"
import { PencilSquare } from "react-bootstrap-icons"
import { MyIdAndToken, UserData } from "../../type"
import dynamic from 'next/dynamic'

const Skeleton = dynamic(() => import('../skeleton/skel-detailProfile'), {ssr: false})

interface Props extends MyIdAndToken { id_userReq: string|number }

const DetailProfile = (props: Props): JSX.Element => {
    const [data, setdata] = useState<UserData>(null)
    const [avatar, setavatar] = useState<string>("")
    const dispatch = useDispatch()

    useEffect(() => {
        const getId = Cookie.get('id_user');
        loadData(getId)
    }, [])
    
    const loadData = async (id: string|number): Promise<void> => {
        if (props.id_userReq == id) {
            const myData = localStorage.getItem('mydata');
            if (myData) setdata(JSON.parse(myData))
            else {
                await getReq('user', props.id_userReq, '').then((res: UserData) => {
                    localStorage.setItem('mydata', JSON.stringify(res))
                    setdata(res)
                })
            }
            const avatarLocal = localStorage.getItem("avatar")
            avatarLocal && setavatar(avatarLocal)
        } else {
            await getReq('user', props.id_userReq, '').then((res: UserData) => {
                setdata(res)
            })
        }
    }

    const logoutHandler = (): void => {
        Cookie.remove('id_user')
        Cookie.remove('token')
        dispatch({ type: 'ID_USER', payload: null })
        dispatch({ type: 'CART', payload: 0 })
        localStorage.clear();
        Router.push("/login")
    }

    const editHandler = (e: any): void => {
        e.preventDefault()
        Router.push(`/profil/edit/`)
    }

    return (<>
        {
            data?.id_user ?
            <div className="card" style={{ margin: "10px", padding: "8px 0px" }}>
                <div className="row">
                    <div className="col col-sm-4" style={{height:"100", width: "100"}}>
                        {props.id_user !== null &&
                            <div className="align-center" >
                                <img height="100" width="100" src={avatar} style={{borderRadius: "100px"}} />
                                <p
                                    className="align-center"
                                    style={{ marginTop: "-30px"}}
                                ><Link href="/profil/edit/avatar">Edit</Link></p>
                            </div>
                        }
                    </div>
                    <div className="col col-sm-6">
                        <div className="row">
                            <p className="col-xs-10"><strong>{data.nama_user}</strong></p>
                            {data.id_user == props.id_user &&
                                <PencilSquare className="col-xs-2" size={20} color="#be9b7b" onClick={e => editHandler(e)}/>
                            }
                        </div>
                        <p>Email: {data.email_user}</p>
                        <p>Address: {`${data.alamat_user}, ${data.kota_user}, ${data.provinsi_user}`}</p>
                        <p>Phone: {data.telepon_user}</p>
                    </div>
                </div>
                {
                    data.id_user == props.id_user &&
                    <div className="card-action float-right">
                        <button
                            className="button-small button-primary-text"
                            onClick={logoutHandler}
                        >Logout</button>
                    </div>
                }
            </div> :
            <div className="card" style={{ margin: "10px", padding: "8px 0px" }}>
                <Skeleton />
            </div>
        }
    </>)
}

export default memo(DetailProfile)