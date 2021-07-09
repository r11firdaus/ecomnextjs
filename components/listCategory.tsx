import { memo, useEffect, useState } from "react"
import Link from 'next/link'
import { getReq } from "../function/API"

const ListCategory = (props: {nama_category?: string}) => {
    const [data, setdata] = useState([])

    const loadData = async (category: string) => {
        if (props.nama_category) {
            await getReq('barang/category', category, '').then((res:any) => setdata(res))
            
        } else await getReq('barang/category', '', '').then((res: any) => setdata(res))
    }
    
    useEffect(() => {
        loadData(props.nama_category)
    }, [])

    return (<>
        <ul className="row" style={{ display: 'flex', padding: '5px' }}>
            {
                data.map((data, i) => (
                    data.id_subcategory ?
                        <div className="col card" key={i} style={{ margin: '2px' }}>
                            <Link href={`/subkategori/${data.nama_subcategory}`}>{data.nama_subcategory}</Link>
                        </div> :
                        <div className="col card" key={i} style={{ margin: '2px' }}>
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