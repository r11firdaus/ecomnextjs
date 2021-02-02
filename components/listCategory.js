import { memo, useEffect, useState } from "react"
import Link from 'next/link'
import { getReq } from "../function/API"

const ListCategory = props => {
    const [data, setdata] = useState([])
    useEffect(async () => {
        if (props.nama_category) {
            const {res} = await getReq('barang/category',props.nama_category, '')
            setdata(res)
        } else {
            const {res} = await getReq('barang', '', '')
            setdata(res)
        }
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