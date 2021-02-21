import Link from "next/link";
import { memo, useEffect, useState } from "react"
import { getReq } from "../function/API";
import Image from 'next/image'

const ListBarang = props => {
    const [data, setdata] = useState([])
    useEffect(async () => {
        if (props.id_userReq) {
            const { res } = await getReq('barang/user', props.id_userReq, props.token)
            setdata(res)
        }
        else if (props.nama_subcategory) {
            const { res } = await getReq('barang/subcategory', props.nama_subcategory, '')
            setdata(res)
        } else {
            const { res } = await getReq('barang', '', '')
            setdata(res)
        }
    }, [])

    return (<>
        <div className="row" style={{ display: 'flex', padding: '5px' }}>
            {
                data.map(data => {
                    return (
                        <Link href={`/barang/${data.id_barang}`} key={data.id_barang}>
                            <div
                                className="card float-left"
                                style={{ margin: '0', width: '50%', padding: '2px', cursor: 'pointer' }}
                            >
                                <div style={{width: '100%', justifyItems: 'center'}}>
                                    <Image
                                        height={'100%'}
                                        width={'100%'}
                                        alt={`gambar ${data.nama_barang}`}
                                        // src={data.gambar_barang}
                                        src="/../public/404.png"
                                    />
                                </div>

                                <div style={{ margin: '10px' }}>
                                    <p style={{ margin: '0' }}>{data.nama_barang}</p>
                                    <strong>{data.harga_barang}</strong>
                                    <div style={{ display: 'flex' }}>
                                        {data.terjual_barang > 0 ?
                                            <>
                                                <p style={{ margin: '0 5px 0 0', fontSize: '12px' }}>Sold: {data.terjual_barang} | </p>
                                                <p style={{ margin: '0 5px 0 0', fontSize: '12px' }}>Ratings: {data.rating_barang}/5</p>
                                            </> :
                                            <p style={{ margin: '0 5px 0 0', fontSize: '12px' }}>Ratings: no data</p>
                                        }
                                    </div>
                                    <p style={{ margin: '0 5px 0 0', fontSize: '12px' }}>Cimahi</p>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    </>)
}

export default memo(ListBarang)

// Keterangan
// props.is_user = meminta data barang sesuai id_user
// props.is_userMe = user yg login