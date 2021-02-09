import { memo, useEffect, useState } from "react"
import Cookie from 'js-cookie'
import Router from "next/router"
import { getReq } from "../../function/API"

const DetailProfile = props => {
    const [data, setdata] = useState({})

    useEffect(async() => {
        const {res} = await getReq('user', props.id_user, '')
        setdata(res)
    }, [])

    const logoutHandler = () => {
        Cookie.remove('id_user')
        Cookie.remove('token')
        Router.push("/login")
    }

    const editHandler = (e, id) => {
        e.preventDefault()
        Router.push(`/profil/edit/`)
    }

    return (<>
        {
            data.id_user &&
            <div className="card">
                <p><strong>{data.nama_user}</strong></p>
                <p>Email: {data.email_user}</p>
                <p>Address: {data.alamat_user}</p>
                <p>Phone: {data.telepon_user}</p>
                {
                    data.id_user == props.id_userMe &&
                    <div className="card-action float-right">
                        <button
                            className="button-small button-primary"
                            onClick={e => editHandler(e, data.id_userMe)}
                        >Edit</button>
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