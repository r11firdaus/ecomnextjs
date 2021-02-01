import { memo, useEffect, useState } from "react"
import Cookie from 'js-cookie'
import Router from "next/router"

const DetailProfile = props => {
    const [data, setdata] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3000/api/user/${props.id_user}`, {
                headers: {
                    'Authorization': `no no apirezajwallin`
                }
            }).then(res => res.json()).then(json => setdata(json.data))

    }, [])

    const logoutHandler = () => {
        Cookie.remove('id_user')
        Cookie.remove('token')
        Router.push("/login")
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