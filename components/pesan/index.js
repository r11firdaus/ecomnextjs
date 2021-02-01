import Link from "next/link"
import { memo, useEffect, useState } from "react"
import Cookie from 'js-cookie'

const ListPesan = () => {
    const [data, setdata] = useState([])
    const [id, setid] = useState(null)

    useEffect(async () => {
        const getId = Cookie.get('id_user')
        if (getId) setid(getId)
        const req = await fetch(`/api/user`, {
            headers: {
                'Authorization': `no no apirezajwallin`
            }
        })
        const res = await req.json()
        setdata(res.data)
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