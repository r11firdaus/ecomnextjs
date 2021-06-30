import { memo, useEffect, useState } from "react"
import Cookie from 'js-cookie'
import Router from "next/router"
import { getReq } from "../../function/API"
import { useDispatch } from "react-redux"
import Link from "next/link"
import { PencilSquare } from "react-bootstrap-icons"

const DetailProfile = props => {
    const [data, setdata] = useState({})
    const [avatar, setavatar] = useState("")
    const dispatch = useDispatch()

    useEffect(async () => {
        const getId = Cookie.get('id_user');
        if (props.id_userReq == getId) {
            const myData = localStorage.getItem('mydata');
            if (myData) setdata(JSON.parse(myData))
            else {
                const { res } = await getReq('user', props.id_userReq, props.token)
                localStorage.setItem('mydata', JSON.stringify(res))
                setdata(res)
            }
            const avatarLocal = localStorage.getItem("avatar")
            avatarLocal && setavatar(avatarLocal)
        } else {
            const { res } = await getReq('user', props.id_userReq, '')
            setdata(res)
        }
    }, [])

    const logoutHandler = () => {
        Cookie.remove('id_user')
        Cookie.remove('token')
        dispatch({ type: 'ID_USER', payload: null })
        dispatch({ type: 'CART', payload: 0 })
        localStorage.clear();
        Router.push("/login")
    }

    const editHandler = (e, id) => {
        e.preventDefault()
        Router.push(`/profil/edit/`)
    }

    return (<>
        {
            data.id_user &&
            <div className="card" style={{ margin: "10px", padding: "8px 0px" }}>
                <div className="row">
                    <div className="col col-sm-4" style={{height:"100", width: "100"}}>
                        {props.id_userMe !== null &&
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
                            {data.id_user == props.id_userMe &&
                                <PencilSquare className="col-xs-2" size={20} color="#be9b7b" onClick={e => editHandler(e, data.id_userMe)}/>
                            }
                        </div>
                        <p>Email: {data.email_user}</p>
                        <p>Address: {`${data.alamat_user}, ${data.kota_user}, ${data.provinsi_user}`}</p>
                        <p>Phone: {data.telepon_user}</p>
                    </div>
                </div>
                {
                    data.id_user == props.id_userMe &&
                    <div className="card-action float-right">
                        <button
                            className="button-small button-primary-text"
                            onClick={logoutHandler}
                        >Logout</button>
                    </div>
                }
            </div>
        }
    </>)
}

export default memo(DetailProfile)