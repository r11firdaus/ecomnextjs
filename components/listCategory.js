import { memo, useEffect, useState } from "react"
import Link from 'next/link'

const ListCategory = props => {
    const [data, setdata] = useState([])
    useEffect(async () => {
        const req = props.nama_category ?
            await fetch(`http://localhost:3000/api/barang/category/${props.nama_category}`, {
                headers: {
                    'Authorization': `no no apirezajwallin`
                }
            }) :
            await fetch(`http://localhost:3000/api/barang/`, {
                headers: {
                    'Authorization': `no no apirezajwallin`
                }
            })
        const res = await req.json()
        setdata(res.data)
    }, [])

    return (<>
        <ul className="row" style={{ display: 'flex', padding: '5px' }}>
            {
                data.map(data => (
                    data.id_subcategory ?
                        <div className="col card" key={data.id_subcategory} style={{ margin: '2px' }}>
                            <Link href={`/subkategori/${data.nama_subcategory}`}>{data.nama_subcategory}</Link>
                        </div> :
                        <div className="col card" key={data.id_category} style={{ margin: '2px' }}>
                            <Link href={`/kategori/${data.nama_category}`}>{data.nama_category}</Link>
                        </div>
                ))
            }
        </ul>
    </>)
}

export default memo(ListCategory)

// Keterangan
// props.is_user = meminta data barang sesuai id_user
// props.is_userMe = user yg login