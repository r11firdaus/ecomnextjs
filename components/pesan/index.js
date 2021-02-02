import Link from "next/link"
import { memo, useEffect, useState } from "react"
import Cookie from 'js-cookie'
import { getReq } from "../../function/API"

const ListPesan = () => {
    const [data, setdata] = useState([])
    const [id, setid] = useState(null)

    useEffect(async () => {
        const getId = Cookie.get('id_user')
        if (getId) setid(getId)
        const {res} = await getReq('user', '', '')
        setdata(res)
    }, [])

    return (<>
        <ul className="row" style={{ listStyle: 'none', margin: '20px 5px' }}>
            {
                data.map(data => {
                    return (
                        data.id_user != id &&
                        <li className="col" key={data.id_user}><Link href="#">{data.nama_user}</Link></li>
                    )
                })
            }
        </ul>
    </>)
}

export default memo(ListPesan)